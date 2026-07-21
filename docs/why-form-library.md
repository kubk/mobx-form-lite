# Why a form library?

MobX is powerful enough to manage form state on its own, and for many forms you probably don't need a form library.

But if you notice yourself repeatedly implementing dirty flags, validation, dynamic lists, and conversion to an API payload, `mobx-form-lite` provides a thin set of helpers for them.

## Side by side comparison

Let's build a form for editing an article with the following requirements:

- Title is required
- Description must be at most 80 characters long
- There must be at least one tag, and every tag is required
- The Save button is disabled until a field changes
- Validation errors are hidden until the first submit

## Naive Mobx implementation

<<< @/snippets/why-form-library/1.ts

None of this code is particularly complicated but that's a lot of boilerplate.

## Using mobx-form-lite

<<< @/snippets/why-form-library/2.ts

`TextField` holds the value, dirty state, touched state, and validation error. `ListField` does the same for the dynamic list. `isFormDirty`, `isFormValid`, and `formTouchAll` work recursively, including every tag.

The 2 states have different purposes: `isDirty` disables Save until something changes, while `isTouched` keeps errors hidden until the first submit.

```tsx
<form
  onSubmit={(event) => {
    event.preventDefault();
    store.submit();
  }}
>
  <input
    value={store.form.title.value}
    onChange={(event) => store.form.title.onChange(event.target.value)}
  />
  {/* Validation errors are hidden until the first submit */}
  {store.form.title.isTouched && store.form.title.error ? (
    <div>{store.form.title.error}</div>
  ) : null}
  {/* other form fields */}
  <button type="submit" disabled={!store.isDirty}>
    Save
  </button>
</form>
```

As you see, `mobx-form-lite` provides those reusable pieces while leaving the form as regular MobX state.
