
const index = require('../index.js');
const appJs = require('../app.js');

// const arraySomeLinks = [
//   {
//     text: 'monalisaeyebrows',
//     href: 'https://www.monalisahasnoeyebrows.com/',
//     file: 'algunoslinks.md',
//     line: 1
//   }
// ]

let absoluteRoute = '/Users/ceci/Documents/LABORATORIA/MD links/SCL019-md-links/algunoslinks.md',
    relativeRoute = 'algunoslinks.md',
    absoluteRouteExisnt = '/Users/ceci/Documents/LABORATORIA/MD links/SCL019-md-links/thispathdoesntexist.md',
    anotherExtRoute = '/Users/ceci/Documents/LABORATORIA/MD links/SCL019-md-links/index.js';

   describe('la ruta es o no absoluta', () => {
    test('debería retornar true si es absoluta', () => {
     let isAbsolute = appJs.isPathAbsolute(absoluteRoute);
     expect(isAbsolute).toBe(true);
   });
   test('debería retornar false si es relativa', () => {
    let isRelative = appJs.isPathAbsolute(relativeRoute);
    expect(isRelative).toBe(false);
});
});

describe('conviertiendo ruta relativa a ruta absoluta', () => {
  test('retorna ruta absoluta', () => {
    let routeIsRelative = appJs.absolutedPath(relativeRoute);
    expect(routeIsRelative).toBe(absoluteRoute);
  });
});


describe('si ruta es relativa, retorna función absolutedPath, si no, retorna ruta intacta', () => {
  test('si ruta es relativa, retorna función absolutedPath', () => {
    let routeIsRelative = appJs.isPathAbsolute(relativeRoute);
    expect(routeIsRelative).toBe(false);
  });
  test('si la ruta es absoluta debería retornar la ruta ingresada sin cambios', () => {
    let routeAbsolute = appJs.isPathAbsolute(absoluteRoute)
    expect(routeAbsolute).toBe(true);
  });
});


describe('chequeando si archivo existe', () => {
  test('si la ruta existe retorna true', () => {
      let routeExists = appJs.fileExists(absoluteRoute)
      expect(routeExists).toBe(true);
  });
  test('si la ruta no existe retorna false', () => {
      let routeDoesNotExists = appJs.fileExists(absoluteRouteExisnt)
      expect(routeDoesNotExists).toBe(false);
  });
});

describe('obteniendo extensión del archivo', () => {
  test('si archivo es de tipo markdown retorna .md', () => {
    let extMd = appJs.pathExtName(absoluteRoute);
    expect(extMd).toBe('.md');
  });
  test('archivo de otro tipo debiese retornar extensión que corresponde', () => {
    let otherExt = appJs.pathExtName(anotherExtRoute);
    expect(otherExt).toBe('.js');
  });
});


