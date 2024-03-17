# Fields

Fields are just Mobx stores that represent HTML fields. They hold the state of the field and provide a way to validate it.

| **Field**     | **Description**                                                                            |
| ------------- | ------------------------------------------------------------------------------------------ |
| TextField     | Text field suitable for regular and textarea inputs                                        |
| BooleanField  | Boolean field suitable for checkboxes                                                      |
| ListField     | List field suitable for list of fields                                                     |
| BooleanToggle | Boolean toggle suitable for toggles. Use it when you just need a toggle without validation |
