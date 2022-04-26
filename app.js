const path = require('path');
const fs = require('fs');
const colors = require("colors");
const url = require("url");
const https = require('https')


const isPathAbsolute = (route) => path.isAbsolute(route); // Verficar si la ruta es absoluta o relativa
const absolutedPath = (route) => path.resolve(route); // si ruta es relativa la convierte a absoluta

// Función para retornar ruta absoluta
const pathAbsoluteOrRelative = (route) => {
    return isPathAbsolute(route) ? (route) : absolutedPath(route)
}

const normalizedPath = (route) => path.normalize(route); // Normaliza la ruta

const fileExists = (route) => fs.existsSync(route); // Función para corroborar si el archivo existe

const pathExtName = (route) => path.extname(route); //extname es el método que revisa la extensión del archivo


// Acceder al archivo sólo si su extensión es '.md' y si el archivo existe
const fileAccess = (route) => {
    if ((pathExtName(route) === '.md') && (fileExists(route) === true)) {
        console.log(`
        .Λ＿Λ.
       (　ˇωˇ)　
       `.yellow + `estoy trabajando para usted \n`.magenta);
        return true
    }
    // Existe pero no es un archivo md
    else if ((pathExtName(route) !== '.md') && (fileExists(route) === true)) {
        return console.log('tu archivo no es .md y no lo puedo leer :/'.red);
    }

    // No existe
    else if (fileExists(route) === false) {
        return console.log('esta ruta ni siquiera existe! estás segura que escribiste bien?'.red)
    }
}



module.exports = {
    isPathAbsolute: isPathAbsolute,
    absolutedPath: absolutedPath,
    pathAbsoluteOrRelative,
    normalizedPath: normalizedPath,
    fileExists,
    pathExtName,
    fileAccess
};