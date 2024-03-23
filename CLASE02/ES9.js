let objeto1 = {
    prop1: 1,
    prop2: 2
}

//copia el objeto 1 en el 2
let objeto2={
    ...objeto1,
    prop3: 3
}

console.log("obj1", objeto1);
console.log("obj2", objeto2);

let objeto3 = {
    ...objeto2,
    prop2: 8 //si la propiedad existe la cambia, sino la agrega
}

console.log("obj3", objeto3);

//operador rest
let {prop2, ...otros} = objeto3;
console.log(otros);