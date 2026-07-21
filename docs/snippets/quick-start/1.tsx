import { observer, useLocalObservable } from 'mobx-react-lite'
import { TextField, isFormValid } from 'mobx-form-lite'

function validateName(value: string) {
  if (!value) return 'Please enter name'
}

function validateEmail(value: string) {
  if (!value.includes('@')) return 'Please enter a valid email'
}

export const Example = observer(() => {
  const form = useLocalObservable(() => ({
    name: new TextField('', { validate: validateName }),
    email: new TextField('', { validate: validateEmail }),
  }))

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        alert(`Name: ${form.name.value}, Email: ${form.email.value}`)
      }}
    >
      <InputField field={form.name} label='Name' name='name' />
      <InputField field={form.email} label='Email' name='email' type='email' />
      <button type='submit' disabled={!isFormValid(form)}>
        Submit
      </button>
    </form>
  )
})
