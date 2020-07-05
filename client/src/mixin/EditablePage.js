import { mapState } from "vuex";
const EditablePage = {
  destroyed() {
    this.watcher && this.watcher();
  },
  mounted() {
    this.setModel(this.$store.state.persons.person);
    this.watcher = this.$store.subscribe((mutation) => {
      if (mutation.type === "setPerson") {
        this.setModel(mutation.payload);
      }
      if (
        mutation.type === "updatePersonPostion" &&
        this.fields.includes("positions")
      ) {
        this.model.positions = mutation.payload;
      }
      if (
        mutation.payload &&
        mutation.payload.id &&
        !this.$route.params.personId
      ) {
        this.$router.replace(`/persons/${mutation.payload.id}`);
      }
    });
  },
  data() {
    return {
      domainId: null,
      fields: [],
      excludeFields: [],
      editing: this.$route.params.personId ? false : true,
      saving: false,
    };
  },
  computed: {
    personId() {
      return this.$route.params.personId;
    },
    ...mapState({
      authUser: (state) => state.auth.user,
    }),
    canEdit() {
      return this.authUser && this.domainId
        ? this.authUser.permissions.some(
            (p) => p.domainId === this.domainId && p.access === "w"
          )
        : false;
    },
  },
  methods: {
    hasRole(roleId) {
      return this.authUser.roles.some((r) => r.id === roleId);
    },
    async save() {
      this.saving = true;
      const model = { ...this.model };
      delete model.avatar;
      if (this.excludeFields && this.excludeFields.length) {
        for (const field of this.excludeFields) {
          delete model[field];
        }
      }
      try {
        if (model.skills && model.skills.some((s) => typeof s === "string")) {
          model.skills = model.skills.map((s) =>
            typeof s === "string" ? { label: s } : s
          );
        }
        const person = await this.$store.dispatch("savePerson", {
          ...model,
          id: this.$route.params.personId,
        });
        this.toogle();
        return person;
      } catch (error) {
        console.log(error);
      } finally {
        this.saving = false;
      }
    },
    async validateAndSave() {
      if (this.$refs.form) {
        return this.$refs.form
          .validate()
          .then(() => this.save())
          .catch(() => false);
      } else {
        return this.save();
      }
    },
    cancel() {
      this.reset();
      this.toogle();
    },
    reset() {
      this.setModel(this.$store.state.persons.person);
    },
    setModel(original) {
      this.model = this.fields.reduce(
        (acc, key) => Object.assign(acc, { [key]: original[key] }),
        {}
      );
    },
    toogle() {
      this.editing = !this.editing;
    },
  },
};

export { EditablePage };
