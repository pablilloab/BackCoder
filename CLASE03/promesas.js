/* al prometer algo queda en pending, 
puede ser cumplida fullfilled o resolved o puede ser rejected rechazada
*/


const dividir = (dividendo, divisor) =>{
    return new Promise ((resolve, reject)=>{
        if(divisor === 0){
            reject("No se puede hacer divisiones por cero");
        }else{
            resolve(dividendo / divisor);
        }
    })
}


dividir(9,3)
    .then(res => console.log(res)) //cuando se resuelve la promesa
    .catch( err => console.log(err)) //cuando es rechazada
    .finally(console.log("Fin de la operación")) //siempre




