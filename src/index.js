import { getOptions as getWebpackOptions } from 'loader-utils';
import { toComponentModule } from '@mapbox/jsxtreme-markdown';
import transform from './transformer';

export default function(source) {
  const options = getOptions(this) || {};
  this.cacheable();

  return toComponentModule(source, options);
}

function getOptions(context) {
  return {
    ...getWebpackOptions(context),
    template: transform,
    // TODO Could we compile with Babel?
    precompile: false
  };
}
