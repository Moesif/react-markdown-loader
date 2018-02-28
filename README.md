# :sparkles: react-markdown-loader

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![license][license]][license-url]

Transform Markdown with interpolated JS expressions and JSX elements into React component Webpack modules.

## Features

* Interpolates JSX expressions and JSX elements between `{{}}` delimiters.
* Avoid having to include Markdown rendering and code highlighting libraries on the client bundle.
* Produces ES6+ code which can be run through `babel-loader`.
* Supports code highlighting by using [rehype-highlight](https://github.com/rehypejs/rehype-highlight) (Check out the [tutorial](#adding-code-highlighting)).
* Markdown gets processed through [remark](https://github.com/wooorm/remark) and [rehype](https://github.com/wooorm/rehype), so you can include any plugins for either of these tools.

## Getting Started

Install react-markdown-loader using [`npm`](https://www.npmjs.com/):

```bash
npm install --save react-markdown-loader
```

Or via [`yarn`](https://yarnpkg.com/en/package/@hugmanrique/react-markdown-loader):

```bash
yarn add @hugmanrique/react-markdown-loader
```

The minimum supported Node version is `v6.11.5`.

Let's get started by adding the loader to the `webpack.config.js` file:

```javascript
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.md$/,
        loader: [
          'babel-loader',
          '@hugmanrique/react-markdown-loader'
        ]
      }
    ]
  }
};
```

Then, create a file named `hello-world.md`. This will contain the content we want to render:

```markdown
# GitHub Flavored Markdown

Hi {props.username}! Let's get the whole "linebreak" thing out of the way.
The next paragraph contains two phrases separated by a single newline character:

Roses are red
Violets are blue

## Math is hard

In first grade I learned that 2 + 2 = {{2 + 2}}.
```

Add the following import to your `Component.js`:

```js
import React from 'react';
import HelloWorld from 'hello-world.md';

export default class BlogPost extends React.PureComponent {
  render() {
    return <HelloWorld username={'Anonymous'} />;
  }
}
```

Finally run `webpack` and your component will render the Markdown content.

## Additional Configuration

### Passing Remark and Rehype plugins

[Remark](https://github.com/wooorm/remark) is automatically handled by react-markdown-loader using [`jsxtreme-markdown`](https://github.com/mapbox/jsxtreme-markdown), so you can pass any [plugins](https://github.com/remarkjs/remark/blob/master/doc/plugins.md) you'd like by adding them to your `webpack.config.js`:

```js
{
  test: /\.md$/,
  loader: [
    'babel-loader',
    '@hugmanrique/react-markdown-loader'
  ],
  options: {
    remarkPlugins: [
      require('remark-slug')
    ]
  }
}
```

As the parsed Markdown is passed into [rehype](https://github.com/wooorm/rehype) to convert it to HTML nodes, you can also pass any [plugins](https://github.com/wooorm/rehype/blob/master/doc/plugins.md) for it the same way:

```js
{
  test: /\.md$/,
  loader: [
    'babel-loader',
    '@hugmanrique/react-markdown-loader'
  ],
  options: {
    rehypePlugins: [
      require('rehype-picture')
    ]
  }
};
```

### Accessing the front matter

To access the front matter variables from your Markdown document, you can use the JSX `{{}}` delimiters:

```markdown
---
title: Hello world
---

# {{ frontMatter.title }}
```

You can also access them from your project as we export the `frontMatter` variable from the produced module. First, create a Markdown document:

```markdown
---
googleUrl: https://google.com
---

Hi!
```

Finally, open any JavaScript file on your project and add the `frontMatter` variable to your import:

```javascript
import Document, { frontMatter } from './document.md';

console.log(frontMatter.googleUrl);
// → 'https://google.com'
```

## Examples

### Adding code highlighting

react-markdown-loader doesn't support code highlighting out of the box, but it's pretty easy to add it! First, install [`rehype-highlight`](https://github.com/rehypejs/rehype-highlight) using `npm`:

```bash
npm install --save rehype-highlight
```

Or via `yarn`:

```bash
yarn add rehype-highlight
```

Next, open your `webpack.config.js` and add the rehype plugin:

```js
const highlight = require('rehype-highlight')

module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.md$/,
        loader: [
          'babel-loader',
          '@hugmanrique/react-markdown-loader'
        ],
        options: {
          rehypePlugins: [
            highlight
          ]
        }
      }
    ]
  }
};
```

> Note: If you want to pass any `rehype-highlight` [options](https://github.com/rehypejs/rehype-highlight#options), you can pass in an array where the first object is the highlight plugin and the second one is the options array:
>
> ```js
> {
>   rehypePlugins: [
>     [
>       highlight,
>       {
>         prefix: 'code-',
>         ignoreMissing: true
>       }
>     ]
>   ];
> }
> ```

### Adding emojis

:wink: You can replace `:emoji:` shortcodes to real UTF-8 emojis by installing [`remark-emoji`](https://github.com/rhysd/remark-emoji) using `npm`:

```bash
npm install --save remark-emoji
```

Or via `yarn`:

```bash
yarn add remark-emoji
```

Next, open your `webpack.config.js` and add the remark plugin:

```js
const emoji = require('remark-emoji')

module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.md$/,
        loader: [
          'babel-loader',
          '@hugmanrique/react-markdown-loader'
        ],
        options: {
          remarkPlugins: [
            emoji
          ]
        }
      }
    ]
  }
};
```

# License

[MIT](LICENSE) &copy; [Hugo Manrique](https://hugmanrique.me)

[npm]: https://img.shields.io/npm/v/@hugmanrique/react-markdown-loader.svg
[npm-url]: https://npmjs.com/package/@hugmanrique/react-markdown-loader
[node]: https://img.shields.io/node/v/@hugmanrique/react-markdown-loader.svg
[node-url]: https://nodejs.org
[deps]: https://img.shields.io/david/hugmanrique/react-markdown-loader.svg
[deps-url]: https://david-dm.org/hugmanrique/react-markdown-loader
[tests]: https://img.shields.io/travis/hugmanrique/react-markdown-loader/master.svg
[tests-url]: https://travis-ci.org/hugmanrique/react-markdown-loader
[license-url]: LICENSE
[license]: https://img.shields.io/github/license/hugmanrique/react-markdown-loader.svg
[cover]: https://img.shields.io/coveralls/hugmanrique/react-markdown-loader.svg
[cover-url]: https://coveralls.io/r/hugmanrique/react-markdown-loader/
