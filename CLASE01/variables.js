//let nombre = "Pablo";
//const nombres = ["Pablo", "Coqui", "Pimpi"];

//var let y problemas de scope

function testVar() {
    var name = "Coqui";
    if (true){
        name = "Severus";
    }
    console.log(`El valor de var es : ${name}`);
}

//testVar();

function testLet(){
    let name = "Pablo";
    if(true){
        let name = "Alejandro"
    }

    console.log(`El valor de let es ${name}`);
}

//testLet();

function testConst(){
    const name = "Pablo";
    if(true){
        const name = "Alejandro"
    }

    console.log(`El valor de let es ${name}`);
}

//testConst();


const persona = {
    nombre: "Pablo",
    apellido: "Bari"
};

console.log(persona);

persona.nombre = "Batman";
persona.edad = 25;

console.log(persona);