# Login form

In this example we'll create a login form with Ant Design and API. There is clickable demo in the end of the article. First make sure you have installed all the needed libraries:

```bash
npm install mobx-form-lite antd
```

We'll start with creating a `Field` component that connects [Antd](https://ant.design/) with `mobx-form-lite`:

<<< @/snippets/example-antd-api/1.tsx

::: info
You write a field component once to adapt it to your UI kit and then reuse it anywhere in the project. The `mobx-form-lite` will release ready-to-use fields for the popular UI kits in the future.
:::

## Mobx store

Let's define store that will hold the form state and logic:

<<< @/snippets/example-antd-api/2.tsx

## React component

It is enough to render a React component like this:

<<< @/snippets/example-antd-api/3.tsx

## Connecting to API

We'll use mock API for this example. Let's define a function that will simulate the login request:

<<< @/snippets/example-antd-api/4.tsx

## Updated store

`mobx-form-lite` is a small library that provides only the form state and validation logic. It won't provide any API-related logic. Let's add it:

- A loader state to indicate that the form is submitting
- A submit method that will send the form data to the server

You're free to use any request library you like. We'll use the `isSubmitting` flag to show a loader on the submit button:

<<< @/snippets/example-antd-api/5.tsx{15,21-41}

- Inside the submit method, we first touch all the fields to display validation errors. Then we check if the form is valid, and if it is, we send the form data to the server.
- The utility `formToPlain` is not required. It's a shorthand for converting the form state to a plain object. Manual alternative:

<<< @/snippets/example-antd-api/6.tsx

It recursively converts the form state to a plain object, which is useful when you have nested fields.

## Updated React component

<<< @/snippets/example-antd-api/7.tsx{10,22}

We've finished. Enjoy the clickable demo and play with the code below:

<iframe src="https://stackblitz.com/edit/vite-react-ts-xagd3i?embed=1&view=preview" style="margin-top: 20px" width="100%" height="500px"></iframe>
