
const appJs = require('./app.js');
const colors = require('colors');

//input para ingresar la ruta en consola
const prompt = require('prompt-sync')();

let inputPath = prompt('Ingresa la ruta del archivo: '.magenta);
console.log(`Ruta ingresada: '${inputPath}'`.white);

let pathConverted = appJs.pathAbsoluteOrRelative(inputPath);

pathConverted = appJs.normalizedPath(pathConverted);
console.log('listo mi ruta es absolute '.green + pathConverted.yellow);

pathConverted = appJs.normalizedPath(pathConverted);
appJs.fileExists(pathConverted);
appJs.pathExtName(pathConverted);
appJs.fileAccess(pathConverted);