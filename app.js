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

// ******* VALIDAR LINKS *******

const returnLinks = (archive) => {
    const splitLines = archive.split("\n"); //eslint-disable-line
      let linksList = [];
      for (let i=0; i<splitLines.length; i++) {
        const line = splitLines[i];
        //const regularEx = /(http(s)?:\/\/[^\s)]+)/g; //links sin markdown
        const regularEx = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g; //links con markdown
        const links = line.matchAll(regularEx);
        const match = regularEx.test(line);
        if (match) {
          for (const link of links) {
            const data = {
              text: link[1],
              href: link[2],
              //file: inputPath,
              line: i + 1,
            };
            //validateLink(link[2])
            linksList.push(data);
          }
        }
      }
      console.log(`Se han encontrado ${linksList.length} links`.magenta)
      console.log(linksList)
      return linksList;
  }

const mdData = (route) => fs.readFile(route, "utf-8", (error, archive) => {
    if (error) {
        console.log("archivo no existe"); //eslint-disable-line no-alert
        return false;
    }
    else {
        returnLinks(archive)
    }
});

// const validateLink = (link) => {
//     const options = {
//       hostname: url.parse(link).host,
//       port: 443,
//       path: url.parse(link).pathname,
//       method: "HEAD",
//     }
//     const req = https.request(options, link => {
//       console.log(`Status Code: ${link.statusCode} para ${options.hostname+options.path}`)
    
//       link.on('data', d => {
//         process.stdout.write(d)
//       })
//       return link.statusCode
//     })
//     req.on('error', error => {
//       //console.error(error)
//       console.log(`Status Code: NOTFOUND ${link} no existe`)
//     })
//     req.end()
//     return link.statusCode
//   }

//Esta promesa lee los links y verifica su status
const linkValidation = (link) => {
    return new Promise((resolve) => {
      //options detalla las características de la petición http
      const options = {
        method: 'HEAD',
        hostname: url.parse(link).host, //ruta donde se envía la petición
        port: 443, //canal del servidor, que escucha la petición, suele ocuparse el 80
        path: url.parse(link).pathname, //todo lo que está después del slash
      }

      const req = https.request(options, response => {
        //console.log(response)
        const validSatus = {
          linkname: link,
          Code: response.statusCode,
          status: response.statusCode <= 399,
        };
        resolve(validSatus);
  
      });
      
      
      req.on('error', error => {
        //console.error(error)
        const invalidStatus = {
          linkname: link,
          status: error.statusCode >= 400,
        };
        resolve(invalidStatus); //en promesas, resolve = return
      })
  
      req.end()
  })
};
  



module.exports = {
    isPathAbsolute: isPathAbsolute,
    absolutedPath: absolutedPath,
    pathAbsoluteOrRelative,
    normalizedPath: normalizedPath,
    fileExists,
    pathExtName,
    fileAccess,
    mdData,
    returnLinks,
    linkValidation
};