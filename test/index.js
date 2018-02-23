import loader from '../src/index';

const compile = (input, options) => {
  // Mock webpack loader options
  const loaderFn = loader.bind({
    cacheable() {},
    options
  });

  return loaderFn(input);
};

describe('react-markdown-loader', () => {
  describe('compiler', () => {
    it('should contain react import', () => {
      expect(compile('')).toEqual(
        expect.stringContaining('import React from "react";')
      );
    });

    it('should handle a basic string', () => {
      expect(compile('Test')).toEqual(expect.stringContaining('<p>Test</p>'));
    });

    it('should handle headings correctly', () => {
      expect(compile('# Hello World')).toEqual(
        expect.stringContaining('<h1>Hello World</h1>')
      );
    });
  });
});
