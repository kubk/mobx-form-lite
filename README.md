<h1 align="center">
	mobx-form-lite
	<br><a href="https://badge.fury.io/js/mobx-form-lite"><img src="https://badge.fury.io/js/mobx-form-lite.svg" alt="Npm Version"></a>
<a href="https://www.npmjs.com/package/mobx-form-lite"><img src="http://img.shields.io/npm/dm/mobx-form-lite.svg" alt="NPM downloads"></a>
<a href="https://github.com/kubk/mobx-form-lite/actions/workflows/node.js.yml"><img src="https://github.com/kubk/mobx-form-lite/actions/workflows/node.js.yml/badge.svg?branch=main" alt="Tests"></a>
</h1>
<p align="center">Lightweight form management for MobX</p>

### Features:

- ✅ If you know MobX, you already know `mobx-form-lite`. The library is just a set of stores such as `TextField`, `BooleanField`, and helper functions like `isFormTouched`, `isFormValid` that operate on those stores.
- 🛠️ Type-safe, including nested forms. No JSON-based configuration.
- 🪶 Lightweight ([~1 kb](https://github.com/kubk/mobx-form-lite/blob/b1d52f9f604e056dca43707fc0bec752f931b01e/package.json#L24) gzipped) since MobX does all the heavy lifting.
- 🚀 Performant. It avoids unnecessary re-renders, thanks to MobX.
- 🔄 Flexible. Supports all the possible ways of defining MobX stores, such as `﻿makeAutoObservable`, `﻿useLocalObservable`, or decorators.

### Installation

```
npm i mobx-form-lite
```

### Documentation

To check out docs, visit [https://kubk.github.io/mobx-form-lite/](https://kubk.github.io/mobx-form-lite/)

### State

The package is close to a major release. If the documentation doesn't answer your questions, please check the unit tests or [create an issue](https://github.com/kubk/mobx-form-lite/issues/new).
