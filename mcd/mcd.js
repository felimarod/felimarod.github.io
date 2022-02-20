var euclides = new Euclides();


function calcular(){
    try {
        verificar()
    } catch (error) {
        alert(error)
    }
}

function verificar(){
    num1 = parseInt(document.getElementById("numero1").value);
    num2 = parseInt(document.getElementById("numero2").value);
    num3 = parseInt(document.getElementById("numero3").value);

    numeros = new Array(num1, num2, num3);
    
    numeros.forEach(numero => {
        if(isNaN(numero)){
            throw "Por favor ingrese números"
        } else if(numero == 0){
            throw "Ingrese números mayores a cero"
        }
    });

    euclides.setNumeros(numeros)
    
    if(!euclides.tieneCombinacionesLineales()){
        throw "Estos 3 números no tienen combinación lineal"
    }
    //document.getElementById("solucion").innerHTML = '<div class="row"><div class="col text-center m-1 p-2 shadow rounded"><h3>Algoritmo Extendido de Euclides</h3><p class="text_start" id="aEuclides"></p></div><div class="col text-center m-1 p-2 shadow rounded"><h3>Identidad de Bezout</h3><p class="text_start" id="iBezout"></p></div><div class="col text-center m-1 p-2 shadow rounded"><h3>Combinación Lineal</h3><p class="text_start" id="cLineal"></p></div></div>'
}