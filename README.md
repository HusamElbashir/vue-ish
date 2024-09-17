# Vue-ish

[![Build Status](https://github.com/HusamIbrahim/vue-ish/actions/workflows/main.yml/badge.svg)](https://github.com/HusamElbashir/vue-ish) [![Coverage Status](https://img.shields.io/codecov/c/github/HusamIbrahim/vue-ish)](https://codecov.io/github/HusamIbrahim/vue-ish) [![License](https://img.shields.io/github/license/HusamIbrahim/vue-ish)](https://github.com/HusamIbrahim/vue-ish/blob/dev/LICENSE)

> A bare-bones implementation of Vue.js-like reactivity

## 👋 Introduction

**Vue-ish** is a minimalistic library that demonstrates the most basic reactivity features in modern front-end JavaScript frameworks such as Vue.js.

[Live Demo](https://husamelbashir.github.io/vue-ish)

### Motivation

After having used Vue.js for a while I became interested in digging deeper to understand how modern JS frameworks do some of the *magic* that they do. There are a couple of resources online that attempt to explain the Vue source code with varying degrees of granularity. However, with the expception of Evan You's course [Advanced Vue.js Features from the Ground Up
](https://frontendmasters.com/courses/advanced-vue) non of these resources explain the concepts at a fundamental level. What was lacking for me was a self-contained example of reactivity implemented with all the fluff removed. After wading through the source code and reading a few online resources and finally reaching Eureka with Evan's lectures, I decided to create this example for people who are interested in learning about reactivity.

## 🚀 Usage

Simply include **Vue-ish** as a script in your `index.html` file. You can [grab it from here](https://github.com/HusamIbrahim/vue-ish/tree/dev/dist) or use it from a CDN.

```html
<script src="https://cdn.jsdelivr.net/gh/HusamIbrahim/vue-ish@dev/dist/vue-ish.js"></script>
```

### API

#### vueish.observe(object)

- *Arguments*: `{Object} object`
- *Returns*: A reactive object
- *Usage*:

```javascript
const obj = { foo: 'bar' }
vueish.observe(obj) // makes obj reactive and returns it
```

#### vueish.autoRun(callback)

- *Arguments*: `{Function} callback`
- *Usage*:

```javascript
vueish.autoRun(() => {
  // This is the reactive zone! Using any reactive object
  // property here will cause the callback function to be
  // re-invoked whenever that property's value changes.
})
```

#### vueish.config.verbose

- *Type*: `boolean`
- *Default*: `false`
- *Usage*:

```javascript
// Turns verbose mode on. A message is logged in the console
// when any reactive object property is accessed or set.
vueish.config.verbose = true
```

### Hello world example

```javascript
// Create a new "h1" element
const h1 = document.createElement('h1')

// Append the element to the DOM
document.body.appendChild(h1)

// Create a reactive state object
const state = vueish.observe({ text: '' })

// Bind the "h1" element's text content to the state object's "text" property
vueish.autoRun(() => { h1.textContent = state.text })

// Modify the state object's "text" property and watch the "h1" element react!
state.text = 'Hello World'
```

## 🛠️ Development Setup

After cloning the repo run:

```bash
$ yarn # install project dependencies
```

### Useful npm scripts

```bash
# start a development server with hot reloading enabled
$ yarn run start

# build the vue-ish bundle and demo files
$ yarn run build

# run the test suite
$ yarn run test

# run the test suite and generate code coverage reports
$ yarn run test:cover
```

## 🤓 Technical Details

Reactivity in Vue 2.x depends on the use of [Object.defineProperty](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) to make reactive objects (think `data` option, for example) by walking over their properties and converting them into getter/setters[[🡕]](https://vuejs.org/v2/guide/reactivity.html#How-Changes-Are-Tracked). This allows Vue to intercept object property access/assignment to collect dependencies and notify subscribers(watchers), respectively. It is also why Vue cannot detect object property addition/deletion or direct array member assignment, and why it needs special API methods such as `Vue.set` to deal with these use cases[[🡕]](https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats). Note that this will change in Vue 3.x, which will employ an ES6 [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) based observation mechanism[[🡕]](https://medium.com/the-vue-point/plans-for-the-next-iteration-of-vue-js-777ffea6fabf).

The same strategy is used in **Vue-ish**, with two major differences:

1. In Vue there's a bookkeeping system wherein watchers keep track of their dependencies and dependencies keep track of their subscribers. This allows Vue to deal with stale dependencies, and is ommitted from **Vue-ish** for simplicity.
2. Vue [performs DOM updates asynchronously](https://vuejs.org/v2/guide/reactivity.html#Async-Update-Queue) for performance reasons. It uses a [scheduler](https://github.com/vuejs/vue/blob/dev/src/core/observer/scheduler.js), which batchs work that needs to be done in the same event loop and flushes the batch queue in the next event loop *tick*. On the other hand, **Vue-ish** performs updates synchronously for simplicty.

## 👩‍🏫 Lessons Learned

### Core Lessons

- How reactivity works in Vue.js
- ES5's [Object.defineProperty](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) static method

### Secondary Lessons

- Using Jest's custom matchers to write DRY unit tests
- Writing environment dependent webpack configurations from scratch
- Writing scripts to manipulate build artifacts
- CI/CD using GitHub Actions

## 🗺 Where To Go From Here

So you've learned how basic reactivity works in a modern JS framework and you're ready to take on greater challenges. These resources should help you on your journey towards enlightenment 💡

- [Advanced Vue.js Features from the Ground Up](https://frontendmasters.com/courses/advanced-vue):
This is an excellent course that explains how various aspects of modern JS frameworks are implemented at a fundamental level. From the creator of Vue himself 🤘
- [Read Vue Source Code](https://github.com/numbbbbb/read-vue-source-code):
A great series that walks through the Vue source code. I found it to be at just the right pace and granularity.
- [Vue.js source code](https://github.com/vuejs/vue): For the truly adventurous 🚀

## 📄 License

[MIT](http://opensource.org/licenses/MIT)
