# Functions

Field functions are used to manipulate the form as a whole. They are used to check the form state, reset it, and more.

| **Function**             | **Description**                                                                                 |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| isFormValid              | Check if the form is valid                                                                      |
| formReset                | Reset all fields to their initial values                                                        |
| formToPlain              | Convert form to plain object (doesn't support TypeScript type inference yet)                    |
| isFormEmpty              | Check if the form is empty                                                                      |
| isFormDirty              | Check if form has any changed field                                                             |
| isFormTouched            | Check if the form is touched. A touched field is a field that has been focused and then blurred |
| formTouchAll             | Set all fields as touched recursively                                                           |
| formUnTouchAll           | Set all fields as untouched recursively                                                         |
| isFormTouchedAndValid    | Check if the form is touched and valid                                                          |
| isFormTouchedAndHasError | Check if form has any touched field with error                                                  |
