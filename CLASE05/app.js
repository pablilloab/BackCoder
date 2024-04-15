//genero server express
import express from "express";
//import nombreappjs from "./asdad/dasdd/nombreappjs" --> para importar la clase
//se campbia el requiere por import
//al ginal const manager = new nombreclase()
//export defaylt la coinst q instancion la clase
//desde al archivo que va a usar import notesManager from "direccion";

const app = express(); //instancio el modulo, crea el servidor

//inicializar la app de express necesito
//configurar
const port = 8080;
const ready = console.log("Server ready en el puerto " + port);

app.listen(port, ready); //me pongo en esuchca en el puerto y sitodo esta ok ejecuto el callback ready

//middleware para configurar el servidor
app.use(express.urlencoded({extended:true})) //params

//app.get(index, index_function)
//index_function(requerimientos, respuesta )=> {codigo}
/*Tipos de respuesta:
send() envía strings/objects/arrays al cliente.
render() procesa y envía una vista desde el servidor al cliente.
json() agrega las cabeceras HTTP correspondientes y envía un json al cliente.*/

/*Códigos de estado de las respuestas:
200 (éxito)
201 (éxito al crear)
400 (error cliente con todas sus variantes)
401 (no autenticado)
403 (no permitido)
404 (no encontrado)
500 (error servidor con todas sus variantes)*/

//endpoint con logica
app.get("/",(req, res)=>{
    try{
        const message = "Mi primer response desde express";
        return res.json({status:200, response: message})
    }catch (error){
        console.log(error); //desde aca consoleo el error en consola para debugger
        return res.json({status:500, response: error.message});
    }
})

//endpoint que llama a una function
app.get("/products", read);

//desde aca calleo a mis funciones de producto
function read(req, res){
    try {
        const message = "llamar al read de productos";
        return res.json({status:200, response:message});

    } catch (error) {
        console.log(error);
        return res.json({status:500, response: error.message});
    }
}


app.get("/products/:pid", readOne);
function readOne(req, res){
    try {
        const {pid} = req.params;

        const message = pid;
        return res.json({status:200, response:message});

    } catch (error) {
        console.log(error);
        return res.json({status:500, response: error.message});
    }
}

/*https://github.com/ignacioborraz/coder-notes*/