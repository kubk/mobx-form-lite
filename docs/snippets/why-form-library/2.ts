import { makeAutoObservable } from 'mobx'
import { formTouchAll, formToPlain, isFormDirty, isFormValid, ListField, TextField } from 'mobx-form-lite'
import { api } from './api'

function validateRequired(value: string) {
  if (!value.trim()) return 'This field is required'
}

function validateDescription(value: string) {
  if (value.length > 80) return 'Use 80 characters or fewer'
}

function atLeastOne(items: unknown[]) {
  if (!items.length) return 'Add at least one tag'
}

function createTag(value = '') {
  return new TextField(value, { validate: validateRequired })
}

export class ArticleStore {
  form = {
    title: new TextField('Why a form library?', { validate: validateRequired }),
    description: new TextField('Small helpers for MobX forms', {
      validate: validateDescription,
    }),
    tags: new ListField([createTag('mobx'), createTag('forms')], {
      validate: atLeastOne,
    }),
  }

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  addTag() {
    this.form.tags.push(createTag())
  }

  removeTag(index: number) {
    this.form.tags.removeByIndex(index)
  }

  get isDirty() {
    return isFormDirty(this.form)
  }

  submit() {
    // if form is invalid - show all the errors to user
    if (!isFormValid(this.form)) {
      formTouchAll(this.form)
      return
    }

    // convert the entire form to plain data recursively
    return api.saveArticle(formToPlain(this.form))
  }
}
