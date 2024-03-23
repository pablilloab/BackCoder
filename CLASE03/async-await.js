const dividir = (dividendo, divisor) =>{
    return new Promise ((resolve, reject)=>{
        if(divisor === 0){
            reject("No se puede hacer divisiones por cero");
        }else{
            resolve(dividendo / divisor);
        }
    })
}


const calcularAsync = async ()=>{
    try{

        let resultado = await dividir(9,2);
        console.log(`El resultado es ${resultado}`);

    }catch(error){
        
        console.log(`Error ${error}`);
    }
}

calcularAsync();