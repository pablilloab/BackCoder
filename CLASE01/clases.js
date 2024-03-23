class Persona{
    nombre;
    apellido;
    static cantidadPersonas = 0;

    constructor(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
        Persona.cantidadPersonas++;
    }

    static getCantidadPersonas(){
        console.log(`hasta el momento se crearon ${Persona.cantidadPersonas}`);
    }
}

const persona1 = new Persona("Pablo", "Bari");
console.log(persona1);

Persona.getCantidadPersonas();