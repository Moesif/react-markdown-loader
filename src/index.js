import { getOptions as getWebpackOptions } from 'loader-utils';
import { toComponentModule } from '@mapbox/jsxtreme-markdown';

export default function(source) {
  const options = getOptions(this) || {};
  this.cacheable();

  const output = toComponentModule(source, options);

  return;
}

const frontMatterStmt = 'const frontMatter';

function exportFrontMatter(output) {
  return output.replace(frontMatterStmt, `export ${frontMatterStmt}`);
}

function getOptions(context) {
  return {
    ...getWebpackOptions(context),
    name: 'ReactMarkdown',
    // TODO Could we compile with Babel?
    precompile: false
  };
}
