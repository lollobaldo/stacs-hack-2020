import dottie from 'dottie';

// getKeys :: obj -> [keys]
export const getKeys = (obj, prefix = '') => (
  Object.keys(obj).reduce((res, el) => {
    if (Array.isArray(obj[el])) {
      return res;
    }
    if (typeof obj[el] === 'object' && obj[el] !== null) {
      // if obj, get nested children
      return [
        ...res,
        ...getKeys(obj[el], `${prefix}${el}/`),
      ];
    }
    return [...res, prefix + el];
  }, [])
);

export const rgbToHex = (rgb) => {
  const unpackRgb = (rgbExpression) => {
    const components = rgbExpression
      .replace(/[^\d,]/g, '')
      .split(',')
      .map((n) => Number(n));
    const [r, g, b] = components;
    return { r, g, b };
  };

  const decToHex = (dec) => {
    let hex = Number(dec).toString(16);
    if (hex.length < 2) {
      hex = `0${hex}`;
    }
    return hex;
  };

  const { r, g, b } = unpackRgb(rgb);
  const red = decToHex(r);
  const green = decToHex(g);
  const blue = decToHex(b);
  return `#${red}${green}${blue}`;
};


// return object with nested children
export const assignWithPath = (obj, path, value) => {
  dottie.set(obj, path.replace(/\//g, '.'), value);
  return obj;
};

export const parseMqttMessage = (message) => {
  switch (message) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      // HACK: returns a number if number, else string
      return +message || message;
  }
};

// export const importAll = (require) => (
//   require.keys().reduce((acc, next) => {
//     // eslint-disable-next-line import/no-dynamic-require
//     acc[next.replace('./', '')] = require(next);
//     return acc;
//   }, {})
// );

// const v1 = {};
// const v2 = {ciao: {mamma:2, cacca:1,}};
// console.log(assignWithPath(v2, 'ciao/mamma', 3));
