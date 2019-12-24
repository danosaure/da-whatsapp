import namespace from './../namespace';

export default (path) => namespace(`APP${path ? `.${path}` : ''}`);
