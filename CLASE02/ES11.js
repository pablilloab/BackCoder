let var1 = "p";
let var2 = var1 || "entre por or";

//console.log(var2);

let varN = var1 ?? "entre por or";
//console.log(varN);


class Persona {
    nombre = "";
    apellido =""
    #nombreCompleto = `${this.nombre} ${this.apellido}` //propiedad privada
    
    constructor(nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.#nombreCompleto = `${nombre} ${apellido}`;
    }
}

const persona1 = new Persona("Pablo", "Bari");
console.log(persona1);

