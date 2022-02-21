var solucion = document.getElementById("solucion")
document.getElementById("numero1").value = 23;
document.getElementById("numero2").value = 42;
document.getElementById("numero3").value = 52;
var euclides
var numeros

function calcular(){
    if(verificar()){
        hallarValores()
        //mostrarResultados()
    }
}

function verificar(){
    num1 = parseInt(document.getElementById("numero1").value);
    num2 = parseInt(document.getElementById("numero2").value);
    num3 = parseInt(document.getElementById("numero3").value);

    numeros = new Array(num1, num2, num3);
    
    numeros.forEach(numero => {
        if(isNaN(numero)){
            solucion.innerHTML = '<div class="row"><div class="col-3"></div> <div class="col-6 border rounded text-center shadow m-1 p-2"> Por favor ingrese números </div></div>'
            return false
        } else if(numero == 0){
            solucion.innerHTML = '<div class="row"><div class="col-3"></div> <div class="col-6 border rounded text-center shadow m-1 p-2"> Ingrese números mayores a cero </div></div>'
            return false;
        }
    });

    euclides = new Euclides(numeros)
    
    if( !euclides.tieneCombinacionesLineales() ){
        solucion.innerHTML = '<div class="row"><div class="col-3"></div> <div class="col-6 border rounded text-center shadow m-1 p-2"> <h3>mcd('+ num1 + ", " + num2 + ", " + num3 +') = ' + euclides.mcd() +' </h3> <br> No tienen combinación lineal </div></div>'
        return false
    } 
    return true
}

function hallarValores() {
    let listaCombinacionesDiferentes = []
    let combinacionImpresa = false;
    for(let index = 0; index < euclides.getCombinacionesLineales().length; index++){
        //console.log(euclides.getCombinacionesLineales()[index], index)
        euclides.hallarMCD(index)
        if(index == 0){
            stSolucionDiv = '<div class="row"><div class="col-3"></div> <div class="col-6 border rounded text-center shadow m-1 p-2"> <h3>mcd('
            for (let j = 0; j < numeros.length; j++) {
                const num = numeros[j];
                if(j == numeros.length-1)
                    stSolucionDiv += num 
                else
                    stSolucionDiv += num + ", "
            } 
            stSolucionDiv += ') = ' + euclides.getResultado() +' </h3> </div></div>'
        }

        //Algoritmo Extendido de Euclides
        var listaEuclides = ""
        stSolucionDiv +='<br><div class="row"><div class="col text-center m-1 p-2 shadow rounded"><h3>Algoritmo Extendido de Euclides</h3><p class="text_start" id="aEuclides' + index +'">'
        euclides.getListaAlgoritmos().forEach(linea => {
            listaEuclides += linea + "<br>"
        });
        stSolucionDiv += listaEuclides
        stSolucionDiv +='</p></div>'
        if(index == 0){
            combinacionImpresa = false
            listaCombinacionesDiferentes.push("aEuclides" + index)
        } else {

            for (let j = 0; j < listaCombinacionesDiferentes.length; j++) {
                const parrafo = document.getElementById(listaCombinacionesDiferentes[j]).value;
                alert(parrafo)
                //if(parrafo == listaEuclides)
            }


        }


        //Identidad de Bezout
        stSolucionDiv +='<div class="col text-center m-1 p-2 shadow rounded"><h3>Identidad de Bezout</h3><p class="text_start" id="iBezout' + index +'">'
        stSolucionDiv +='</p></div>'

        
        //Combinacion Lineal
        stSolucionDiv += '<div class="col text-center m-1 p-2 shadow rounded"><h3>Combinación Lineal</h3><p class="text_start" id="cLineal' + index +'">'

        stSolucionDiv +='</p></div></div>'

    }
    //document.getElementById("solucion").innerHTML = ''
    solucion.innerHTML= stSolucionDiv + "<br><br>"
}

function mostrarResultados(){

}