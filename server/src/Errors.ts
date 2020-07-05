import { Response } from "express";

export class BaseError extends Error {
  constructor(public status: number, public message: string) {
    super();
  }
}

export class BadRequestError extends BaseError {
  constructor(message = "Неверно заполненный запрос") {
    super(400, message);
    this.name = "BadRequestError";
  }
}

export class InternalServerError extends BaseError {
  constructor(public message = "Непредвиденная ошибка сервера") {
    super(500, message);
    this.name = "InternalServerError";
  }
}

export class NotFoundError extends BaseError {
  constructor(message = "Запрашиваемый ресурс не найден") {
    super(404, message);
    this.name = "NotFoundError";
  }
}

export class AuthenticationError extends BaseError {
  constructor(status = 401, message = "Невалидный токен доступа") {
    super(status, message);
    this.name = "AuthenticationError";
  }
}

export class AuthorizationError extends BaseError {
  constructor(
    status = 403,
    message = "У вас нет прав доступа к запрашиваему ресурсу"
  ) {
    super(status, message);
    this.name = "AuthorizationError";
  }
}

export function ErrorHandel(error: BaseError, res: Response) {
  const { status, name, message } = error;
  res.status(status).json({
    status: status,
    name: name,
    message: message,
  });
}
