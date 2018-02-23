import { getOptions as getWebpackOptions } from 'loader-utils';
import { toComponentModule } from '@mapbox/jsxtreme-markdown';

export default function(source) {
  const options = getOptions(this) || {};
  this.cacheable();

  return toComponentModule(source, options);
}

function getOptions(context) {
  return {
    ...getWebpackOptions(context),
    name: 'ReactMarkdown',
    // TODO Could we compile with Babel?
    precompile: false
  };
}
