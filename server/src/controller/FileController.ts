import { NextFunction, Request, Response, Handler } from "express";
import { getRepository } from "typeorm";
import { Person } from "../entity/Person";
import { unlinkSync } from "fs";
import { AdaptationFile } from "../entity/AdaptationFiles";
import { AdaptationFileType } from "../enums/AdaptationFileType";
import { BadRequestError } from "../Errors";
import { DismissalFile } from "../entity/DismissalFiles";
import { SalaryFile } from "../entity/SalaryFiles";
import { Salary } from "../entity/Salary";

export const checkUserExist: Handler = async (req, res, next) => {
  if (req.body.userId) {
    try {
      await getRepository(Person).findOneOrFail(req.body.userId);
      return true;
    } catch (error) {
      res
        .status(404)
        .json(new Error(`Пользователь с id: ${req.body.userId} не найден`));
      return false;
    }
  } else {
    next("Не предоставлен id пользователя");
  }
};

export class FileController {
  async uploadProfileAvatar(req: Request, res: Response, next: NextFunction) {
    if (req.file && req.body.id) {
      try {
        await getRepository(Person).findOneOrFail(req.body.id);
        const path = `/uploads/${req.body.id}/${req.file.filename}`;
        await getRepository(Person).update(req.body.id, {
          avatar: path,
        });
        res.status(200).json(path);
      } catch (error) {
        unlinkSync(req.file.path);
        res
          .status(400)
          .json(
            new Error(
              `Ошибка сохранения аватара для пользователя с id ${req.body.id}`
            )
          );
      }
    } else {
      res.status(400).json(new Error("Отсутствует id пользователя"));
    }
  }
  async uploadAdaptationFiles(req: Request, res: Response, next: NextFunction) {
    if (!(await checkUserExist(req, res, next))) return;
    if (req.files && !Array.isArray(req.files)) {
      const { adaptation, summary } = req.files;
      let files: Partial<AdaptationFile>[];
      if (adaptation) {
        const programFiles = adaptation.map((f) => ({
          path: `/uploads/${req.body.id}/${f.filename}`,
          type: AdaptationFileType.Program,
        }));
        files = programFiles;
      }
      if (summary) {
        const summaryFile = summary[0]
          ? {
              path: `/uploads/${req.body.id}/${summary[0].filename}`,
              type: AdaptationFileType.Summary,
            }
          : null;
        files = (files || []).concat(summaryFile);
      }
      if (files) {
        try {
          const newFiles = await getRepository(AdaptationFile).save(files);
          await getRepository(Person)
            .createQueryBuilder("person")
            .relation("adaptationFiles")
            .of(req.body.id)
            .add(newFiles);
          res.status(200).json(newFiles);
        } catch (error) {
          res.status(200).json(error);
        }
      } else {
        next(new BadRequestError("Не передано файлов для сохранения"));
      }
    } else {
      res.status(400).json(new Error("Передайте список файлов для сохранения"));
    }
  }
  async uploadDismissFile(req: Request, res: Response, next: NextFunction) {
    if (!(await checkUserExist(req, res, next))) return;
    if (req.file) {
      try {
        const file = await getRepository(DismissalFile).save({
          path: `/uploads/${req.body.id}/${req.file.filename}`,
        });
        await getRepository(Person)
          .createQueryBuilder("person")
          .relation("dismissalFile")
          .of(req.body.userId)
          .add(file);
        res.status(200).json(file);
      } catch (error) {
        next(error);
      }
    }
    next(new BadRequestError("File not provided"));
  }
  async uploadSalaryFile(req: Request, res: Response, next: NextFunction) {
    if (!(await checkUserExist(req, res, next))) return;
    // if (req.body.salaryId) {
    //   if (!(await getRepository(Salary).findOne(req.body.salaryId))) {
    //     next(
    //       new BadRequestError(
    //         `Пересмотр зарплаты с id: ${req.body.salaryId} не существует`
    //       )
    //     );
    //   }
    // } else {
    //   next(new BadRequestError("Передайте id пересмотра зарплаты"));
    // }
    if (req.file) {
      try {
        const file = await getRepository(SalaryFile).save({
          path: `/uploads/${req.body.id}/${req.file.filename}`,
        });
        // await getRepository(Salary)
        //   .createQueryBuilder("salary")
        //   .relation("file")
        //   .of(req.body.salaryId)
        //   .set(file);
        res.status(200).json(file);
      } catch (error) {
        next(error);
      }
    }
  }
}
