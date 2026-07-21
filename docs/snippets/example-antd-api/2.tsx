import { TextField } from 'mobx-form-lite'

function validateEmail(value: string) {
  if (!value.includes('@')) {
    return 'Please input a valid email'
  }
}

function validatePassword(value: string) {
  if (!value) return 'Please input your password'
}

class LoginFormStore {
  form = {
    email: new TextField('', { validate: validateEmail }),
    password: new TextField('', { validate: validatePassword }),
  }
}
