function sumar (num1, num2){
    let suma = num1 + num2;
     console.log(suma);
}

//sumar(2,5);


function sumarRetorno(num1, num2){
    return num1 + num2;
}

//let suma = sumarRetorno(5,3);
//console.log(suma);

function miPrueba(nombre){
    if(nombre == "Pablo"){
        return true
    }else{
        return false
    }
    console.log("aca no llego");
} 

//console.log(miPrueba("Pablo"));


// funcion flechas

const sumador = (num1, num2) =>{
    let suma = num1 + num2;
    return suma;
}

console.log(sumador(3,2));