import stringifyObject from 'stringify-object';

export default function({ jsx, frontMatter }) {
  const { imports = [] } = frontMatter;

  // React needs to be imported as we use JSX
  if (!imports.React) {
    imports.React = 'react';
  }

  const importBody = Object.keys(imports)
    .map(name => {
      return createImport(name, imports[name]);
    })
    .reduce((prev, current) => {
      // React import always goes first
      if (current.indexOf('React') !== -1) {
        return `${current}\n${prev}`;
      }

      return `${prev}\n${current}`;
    });

  return `
  ${importBody};

  export const frontMatter = ${getFrontMatter(frontMatter)};

  export default class ReactMarkdown extends React.PureComponent {
    render() {
      const props = this.props;

      return ${jsx};
    }
  }`;
}

function createImport(name, route) {
  return `import ${name} from '${route}';`;
}

function getFrontMatter(frontMatter) {
  delete frontMatter.imports;

  return stringifyObject(frontMatter);
}
