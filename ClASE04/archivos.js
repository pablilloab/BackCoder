//fs syncronico
//OPERACIONES
/*
writeFileSync = Para escribir contenido en un archivo. Si el archivo no existe, lo crea. Si existe, lo sobreescribe.
readFileSync = Para obtener el contenido de un archivo.
appendFileSync = Para añadir contenido a un archivo. ¡No se sobreescribe!
unlinkSync = Es el “delete” de los archivos. eliminará todo el archivo, no sólo el contenido.
existsSync = Corrobora que un archivo exista!
*/

const fs = require('fs');
fs.writeFileSync('./ejemplo.txt','Primer escritura del archivo'); //creo el archivo (path, que escribo)

if(fs.existsSync('./ejemplo.txt')){ //verifico si el archivo existe
    
    //leo el archivo
    let contenido = fs.readFileSync('./ejemplo.txt', 'utf-8');
    console.log(contenido);

    //agrego contenido
    fs.appendFileSync("./ejemplo.txt", "Mas contenido");
    contenido = fs.readFileSync('./ejemplo.txt', 'utf-8');

    console.log(contenido);

    //borro el archivo
    fs.unlinkSync('./ejemplo.txt');
}