var combinacionesNumeros;
var listaDivisiones = [];
var listaAlgoritmos = [];

class Euclides {
    constructor(numeros){
        this.combinacionesLineales = [];
        this.resultado = 1;
        numeros.sort(function (a, b) { return a - b; });
        this.numeros = numeros    
    }
    tieneCombinacionesLineales = function () {
        let mcdAux = 0, contadorLineas = 0;
        combinacionesNumeros = getCombinaciones(this.numeros);

        for (let j =0; j < combinacionesNumeros.length; j++) {
            let posible = combinacionesNumeros[j];
            contadorLineas = 0;

            for(let  i = posible.length-2; i >= 0; i--){
                if(i == posible.length-2){
                    mcdAux = mcd(posible[i], posible[i+1]);
                    if(cantidadAlgoritmos(posible[i], posible[i+1]) > 1)
                        contadorLineas++;
                } else {
                    if(cantidadAlgoritmos(posible[i], mcdAux) > 1)
                        contadorLineas++;
                    mcdAux = mcd(posible[i], mcdAux);
                }
            }
            //System.out.println(contadorLineas);
            if(contadorLineas == posible.length-1)
                this.combinacionesLineales.push(posible);
        }
        return this.combinacionesLineales.length > 0;        
    }
    mcd = function(){
        let numerosOrdenados = combinacionesNumeros[0];
        listaDivisiones = [];
        this.resultado = 1;
        for(let i = numerosOrdenados.length-2; i >= 0; i--)
            if(i == numerosOrdenados.length-2)
                this.resultado = mcd(numerosOrdenados[i], numerosOrdenados[i+1]);
            else
                this.resultado = mcd(numerosOrdenados[i], this.resultado);
        return this.resultado;
    }
    getResultado = function (){
        return this.resultado
    }
    getCombinacionesLineales = function (){
        return this.combinacionesLineales
    }
    getListaAlgoritmos = function (){
        return listaAlgoritmos
    }
    hallarMCD = function(n){
        let numerosOrdenados = this.combinacionesLineales[n];
        listaDivisiones = [];
        this.resultado = 1;
        for(let i = numerosOrdenados.length-2; i>=0;i--)
            if(i == numerosOrdenados.length-2)
                this.resultado = mcd(numerosOrdenados[i], numerosOrdenados[i+1]);
            else
                this.resultado = mcd(numerosOrdenados[i], this.resultado);
        
        // Guardar algoritmos de Euclides en una lista
        listaAlgoritmos = []
        for (const linea of listaDivisiones) {
            let stLinea = linea.dividendo + " = " + linea.divisor + " x " + linea.cociente + " + " + linea.residuo
            listaAlgoritmos.push(stLinea)
        }
    }
}

mcd = function(mayor, menor){
    if(mayor < menor){
        let aux = menor;
        menor = mayor;
        mayor = aux;
    }
    
    let auxDic = {
        dividendo: mayor,
        divisor: menor,
        cociente: parseInt(mayor / menor),
        residuo: mayor % menor
    }
    listaDivisiones.push(auxDic);
    while(listaDivisiones[listaDivisiones.length-1].residuo != 0){
        auxDic = {
            dividendo: listaDivisiones[listaDivisiones.length-1].divisor,
            divisor: listaDivisiones[listaDivisiones.length-1].residuo,
            cociente: parseInt(listaDivisiones[listaDivisiones.length-1].divisor / listaDivisiones[listaDivisiones.length-1].residuo),
            residuo: listaDivisiones[listaDivisiones.length-1].divisor % listaDivisiones[listaDivisiones.length-1].residuo
        }
        listaDivisiones.push(auxDic)
    }
    listaAlgoritmos = [];
    return listaDivisiones[listaDivisiones.length - 1].divisor;
}

cantidadAlgoritmos = function (num1, num2){
    listaAlgoritmos = []
    listaDivisiones = []
    mcd(num1, num2);
    // Guardar divisiones como algoritmo de Euclides
    for (let index = 0; index < listaDivisiones.length; index++) {
        const element = listaDivisiones[index];
        listaAlgoritmos.push(
            element.divisor + " = " + element.dividendo + " x " + element.cociente + " + " + element.residuo
        )
    }
    return listaAlgoritmos.length;
}