import {
  formTouchAll,
  isFormValid,
  ListField,
  TextField,
  validators,
} from "mobx-form-lite";
import { makeAutoObservable } from "mobx";

// #region validation
const validateRequired = (value: unknown) => {
  if (!value) {
    return "This field is required";
  }
};

const isInteger = (value: unknown) => {
  if (!Number.isInteger(Number(value))) {
    return "Please enter a valid number";
  }
};

const validateExperience = (items: ExperienceItemType[]) => {
  if (items.length === 0) {
    return "Please add at least one experience";
  }
};
// #endregion validation

export type ExperienceItemType = {
  company: TextField<string>;
  years: TextField<string>;
};

// #region createExp
const createExperienceItem = () => ({
  company: new TextField("", { validate: validateRequired }),
  years: new TextField("", {
    validate: validators.all(validateRequired, isInteger),
  }),
});
// #endregion createExp

// #region formstore
export class ResumeStore {
  form = {
    name: new TextField("", { validate: validateRequired }),
    lastname: new TextField("", { validate: validateRequired }),
    fatherName: new TextField(""),
    age: new TextField("", {
      validate: validators.all(validateRequired, isInteger),
    }),
    jobTitle: new TextField("", { validate: validateRequired }),
    experience: new ListField<ExperienceItemType>([], {
      validate: validateExperience,
    }),
  };
  // #endregion formstore

  // #region manageExp
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  addExperience() {
    this.form.experience.push(createExperienceItem());
  }

  removeExperience(index: number) {
    this.form.experience.removeByIndex(index);
  }
  // #endregion manageExp

  // #region sumExp
  get sumYearExperience() {
    if (this.form.experience.value.some((item) => item.years.error)) {
      return 0;
    }

    return this.form.experience.value.reduce(
      (acc, item) => acc + Number(item.years.value),
      0,
    );
  }
  // #endregion sumExp

  submit() {
    if (!isFormValid(this.form)) {
      formTouchAll(this.form);
      return;
    }

    alert("Form has been sent");
  }
}
