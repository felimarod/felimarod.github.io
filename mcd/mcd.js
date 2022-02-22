var solucion = document.getElementById("solucion")
var euclides
var bezout
var numeros

function calcular(){
    solucion.innerHTML =  ""
    if(verificar()){
        hallarValores()
    }
}

function verificar(){
    num1 = parseInt(document.getElementById("numero1").value);
    num2 = parseInt(document.getElementById("numero2").value);
    num3 = parseInt(document.getElementById("numero3").value);

    // Verifica que los datos ingresados sean números
    if(isNaN(num1) || isNaN(num2) || isNaN(num3)){
        solucion.innerHTML = '<div class="row"><div class="col-3"></div> <div class="col-6 border rounded text-center shadow m-1 p-2"> Por favor ingrese números </div></div>'
        return false
    }

    numeros = new Array(num1, num2, num3);
    for (const numero of numeros) 
        if(numero <= 0){
            solucion.innerHTML = '<div class="row"><div class="col-3"></div> <div class="col-6 border rounded text-center shadow m-1 p-2"> Ingrese números mayores a cero </div></div>'
            return false;
        }

    euclides = new Euclides(numeros)
    
    if( !euclides.tieneCombinacionesLineales() ){
        solucion.innerHTML = '<div class="row"><div class="col-3"></div> <div class="col-6 border rounded text-center shadow m-1 p-2"> <h3>mcd('+ num1 + ", " + num2 + ", " + num3 +') = ' + euclides.mcd() +' </h3> <br> No tienen combinación lineal </div></div>'
        return false
    } 
    return true
}

function hallarValores() {
    let listaCombinacionesDiferentes = []
    let stSolucionCompleta = ""
    for(let index = 0; index < euclides.getCombinacionesLineales().length; index++){
        let stSolucionIndividual = ""
        //console.log(euclides.getCombinacionesLineales()[index], index)
        euclides.hallarMCD(index)
        if(index == 0){
            stSolucionIndividual = '<div class="row"><div class="col-3"></div> <div class="col-6 border rounded text-center shadow m-1 p-2"> <h3>mcd('
            for (let j = 0; j < numeros.length; j++) {
                const num = numeros[j];
                if(j == numeros.length-1)
                    stSolucionIndividual += num 
                else
                    stSolucionIndividual += num + ", "
            } 
            stSolucionIndividual += ') = ' + euclides.getResultado() +' </h3> </div></div>'
        }

        //Algoritmo Extendido de Euclides
        stSolucionIndividual +='<br><div class = "border rounded m-1 p-2"><div class="row m-4"><div class="col text-center m-1 p-2 shadow rounded"><h3>Algoritmo Extendido de Euclides</h3><p class="text_start" id="aEuclides' + index +'">'

        // Imprimir algoritmos de Euclides en una lista
        euclides.getListaDivisiones().forEach(operacion => {
            stSolucionIndividual += operacion.dividendo + " = " + operacion.divisor + " x " + operacion.cociente + " + " + operacion.residuo + "<br>"
        });
        stSolucionIndividual +='</p></div>'

        bezout = new Bezout(euclides.getListaDivisiones(), euclides.getNumeros(), euclides.getResultado())
        bezout.realizarCombinacionLineal()

        //Identidad de Bezout
        stSolucionIndividual +='<div class="col text-center m-1 p-2 shadow rounded"><h3>Identidad de Bezout</h3><p class="text_start" id="iBezout' + index +'">'
        for (const linea of bezout.getListaIdentidades()) {
            stSolucionIndividual += linea[0] + " = " + linea[1] + " - " + linea[2] + "(" + (-linea[3]) + ")<br>"
        }
        stSolucionIndividual +='</p></div>'

        
        //Combinacion Lineal
        stSolucionIndividual += '<div class="col text-center m-1 p-2 shadow rounded"><h3>Combinación Lineal</h3><p class="text_start" id="cLineal' + index +'">'
        for(const linea of bezout.getListaRegresion()){
            stSolucionIndividual += linea + "<br>"
        }
        stSolucionIndividual +='</p></div></div>'

        stSolucionIndividual += '<div class="row"><div class="col-2"></div> <div class="col-8 border rounded text-center shadow m-1 p-2"> <h2>Resultado ' + (listaCombinacionesDiferentes.length + 1) + '</h2> '+ bezout.getCombinacionLineal() +'</div></div></br></div><br>'

        if(!listaCombinacionesDiferentes.includes(bezout.getCombinacionLineal())){
            listaCombinacionesDiferentes.push(bezout.getCombinacionLineal())
            stSolucionCompleta += stSolucionIndividual
        }
    }
    solucion.innerHTML+=  stSolucionCompleta + "<br><br>"
}
