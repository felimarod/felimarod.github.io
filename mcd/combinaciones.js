var combinacionesNumeros = []
var numeroCombinaciones = 0;


function factorial(numero){
    if(numero == 0)
        return 1;
    else
        return factorial(numero-1) * numero;
}
//Devuelve un arreglo con las combinaciones posibles de el arreglo dado(n)
function getCombinaciones(n){
    numeroCombinaciones = factorial(n.length);
    
    // Lista de arreglos con posiciones
    let posiciones = [];
    // Lista
    let aux = [];
    
    
    //Recorre la cantidad de combinaciones posibles
    for(let i = 0; i < numeroCombinaciones ; i++){
        //Recorre las posiciones
        do{
            let contador = 0;
            aux = [];

            do{
                let num;
                do{
                    num = Math.floor(Math.random() * n.length);
                }while(aux.includes(num));
                aux.push(num);
                contador++;
            }while(contador < n.length);
            
        }while(existeArreglo(aux, posiciones));
        
        posiciones.push(aux);
    }

    combinacionesNumeros = [];
    
    for (let index = 0; index < posiciones.length; index++) {
        const arregloPos = posiciones[index];
        aux = [];
        for(let pos = 0; pos < arregloPos.length; pos++){
            aux.push(n[arregloPos[pos]]);
        }
        combinacionesNumeros.push(aux);
    }
    return combinacionesNumeros
}

function existeArreglo(array, listaArreglos){
    let incidencias;
    for(let index = 0; index < listaArreglos.length; index++){
        let comparar = listaArreglos[index];
        incidencias = 0;
        for (var i = 0; i < comparar.length; i++)
            if(array[i] === comparar[i])
                incidencias++;
        if(incidencias === array.length)
            return true;
    }
    return false;
}