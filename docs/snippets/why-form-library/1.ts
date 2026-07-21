import { makeAutoObservable } from "mobx";
import { api } from "./api";

function validateRequired(value: string) {
  if (!value.trim()) return "This field is required";
}

function validateDescription(value: string) {
  if (value.length > 80) return "Use 80 characters or fewer";
}

function atLeastOne(items: unknown[]) {
  if (!items.length) return "Add at least one tag";
}

export class ArticleStore {
  form = {
    title: {
      value: "Why a form library?",
      isDirty: false,
      isTouched: false,
      error: undefined as string | undefined,
    },
    description: {
      value: "Small helpers for MobX forms",
      isDirty: false,
      isTouched: false,
      error: undefined as string | undefined,
    },
    tags: {
      values: [
        {
          value: "mobx",
          isDirty: false,
          isTouched: false,
          error: undefined as string | undefined,
        },
        {
          value: "forms",
          isDirty: false,
          isTouched: false,
          error: undefined as string | undefined,
        },
      ],
      isDirty: false,
      isTouched: false,
      error: undefined as string | undefined,
    },
  };

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  changeTitle(value: string) {
    this.form.title.value = value;
    this.form.title.isDirty = true;
    this.form.title.error = validateRequired(value);
  }

  changeDescription(value: string) {
    this.form.description.value = value;
    this.form.description.isDirty = true;
    this.form.description.error = validateDescription(value);
  }

  changeTag(index: number, value: string) {
    const tag = this.form.tags.values[index];
    tag.value = value;
    tag.isDirty = true;
    tag.error = validateRequired(value);
  }

  addTag() {
    this.form.tags.values.push({
      value: "",
      isDirty: false,
      isTouched: false,
      error: "This field is required",
    });
    this.form.tags.isDirty = true;
    this.form.tags.error = undefined;
  }

  removeTag(index: number) {
    this.form.tags.values.splice(index, 1);
    this.form.tags.isDirty = true;
    this.form.tags.error = atLeastOne(this.form.tags.values);
  }

  get isDirty() {
    return (
      this.form.title.isDirty ||
      this.form.description.isDirty ||
      this.form.tags.isDirty ||
      this.form.tags.values.some((tag) => tag.isDirty)
    );
  }

  get isValid() {
    return (
      !this.form.title.error &&
      !this.form.description.error &&
      !this.form.tags.error &&
      this.form.tags.values.every((tag) => !tag.error)
    );
  }

  submit() {
    // if form is invalid - show all the errors to user
    if (!this.isValid) {
      this.form.title.isTouched = true;
      this.form.description.isTouched = true;
      this.form.tags.isTouched = true;
      this.form.tags.values.forEach((tag) => {
        tag.isTouched = true;
      });
      return;
    }

    // manually convert every field to plain data
    return api.saveArticle({
      title: this.form.title.value,
      description: this.form.description.value,
      tags: this.form.tags.values.map((tag) => tag.value),
    });
  }
}
