let numbers = [1,2,3,4,5,6];

//metodo map de array permite crear una copia del array con alguna modificacion
//qye se necesite hacer
let numbersExp = numbers.map((number, index) => number ** index);

//console.log(numbersExp);


//metodo include, es case sensitive

let nombres = ["Juan", "Pedro", "Pablo"]

if(nombres.includes("Juan")){
    console.log("SISI");
}else{
    console.log("El nombre no se encuentra en el array");
}




