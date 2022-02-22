var listaDivisiones
var listaCoeficientes
class Bezout {
    constructor(listaDivisiones, listaNumeros, mcd){
        listaDivisiones = listaDivisiones;
        this.listaNumeros = listaNumeros
        this.mcd = mcd
        this.listaRegresion = []
        this.listaIdentidades = []
    }
    realizarCombinacionLineal = function (){
        this.listaIdentidades = []
        var aux = []
        // Diccionario para manejar los números iniciales y sus coeficientes
        listaCoeficientes = {}

        for (let i = listaDivisiones.length -1; i >= 0; i--) {
            aux = []
            if (listaDivisiones[i].residuo != 0) {
                aux.push(listaDivisiones[i].residuo)
                aux.push(listaDivisiones[i].dividendo)
                aux.push(listaDivisiones[i].divisor)
                aux.push(-listaDivisiones[i].cociente)
                this.listaIdentidades.push(aux)
            }
        }

        //ingresamos los números que toman juego en la regresión lineal
        for( const num of this.listaNumeros )
            listaCoeficientes[num] = 0
        aux = this.listaIdentidades[0]
        listaCoeficientes[aux[1]] = 0
        for (let i = 1; i < this.listaIdentidades.length; i++) {
            listaCoeficientes[this.listaIdentidades[i][0]] = 0
        }
        listaCoeficientes[aux[2]] = 0
        listaCoeficientes[aux[1]] = 0


        // Hallamos los coeficientes de los números que toman importancia en las
        // identidades obtenidas anteriormente
        let constanteInicial = 0;
        this.listaRegresion = [];
        for (let i = 0;  i < this.listaIdentidades.length; i++) {
            aux = this.listaIdentidades[i]
            if(i==0){
                constanteInicial = aux[1]
                listaCoeficientes[aux[1]] = 1
                listaCoeficientes[aux[2]] = aux[3]
            } else {
                if(constanteInicial == aux[2])
                    constanteInicial = aux[1]

                listaCoeficientes[aux[1]] += listaCoeficientes[aux[0]]
                listaCoeficientes[aux[2]] += listaCoeficientes[aux[0]] * aux[3]
            }
            let linea = this.mcd + " = "
            if(listaCoeficientes[constanteInicial] == 1)
                linea += constanteInicial + " "
            else
                linea += constanteInicial + "(" + listaCoeficientes[constanteInicial] + ") "

            for (let j = 2; j >= 1; j--) 
                if(constanteInicial != aux[j])
                    if(listaCoeficientes[aux[j]] == 1)
                        linea += "+ " + aux[j] + " "
                    else
                        linea += "+ " + aux[j] + "(" + listaCoeficientes[aux[j]] + ") "
            
            this.listaRegresion.push(linea)
        }
        
    }
    getListaRegresion = function (){
        return this.listaRegresion
    }
    getCombinacionLineal = function (){
        return this.listaRegresion[this.listaRegresion.length -1]
    }
    getListaIdentidades = function () {
        return this.listaIdentidades
    }
}
