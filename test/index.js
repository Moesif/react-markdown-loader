import loader from '../src/index';
import stripIndent from 'strip-indent';

const compile = (input, options) => {
  // Mock webpack loader options
  const loaderFn = loader.bind({
    cacheable() {},
    options
  });

  return loaderFn(input);
};

const prepareText = text => stripIndent(text).trim();

const fakeDocument = prepareText(`
---
title: Hello world
imports:
  test: './test'
---

# Hello world
`);

let compiled;

describe('react-markdown-loader', () => {
  describe('compiler', () => {
    it('should compile correctly', () => {
      compiled = compile(fakeDocument);

      expect(compiled).toMatch("import React from 'react';");
    });

    it('should convert content correctly', () => {
      expect(compiled).toMatch('<h1>Hello world</h1>');
    });

    it('should export the front matter', () => {
      expect(compiled).toMatch('export const frontMatter =');
      expect(compiled).toMatch("title: 'Hello world'");
    });

    it('should import module from frontmatter', () => {
      expect(compiled).toEqual(
        expect.stringContaining("import test from './test';")
      );
    });
  });
});
