class Bezout {
    combinacionLineal = "";

    constructor(listaDivisiones, numeros, mcd){
        this.listaDivisiones = listaDivisiones;
        this.numerosIniciales = numeros;
        this.mcd = mcd;
        listaRegresion = [];
        listaIdentidades = [];
    }
    
    realizarCombinacionLineal = function(){
        aux = []
        linea = "";
        
        // Diccionario para manejar los números iniciales y sus coeficientes
        listaCoeficientes = {};
        
        // Usando las divisiones del algoritmo de Euclides:
        // 1) Organizamos de abajo hacia a arriba
        // 2) Ordenamos para tener la identidad de Bezout
        // 3) Para cumpir bien el punto 2 multiplicamos por -1 a los cocientes
        for (int i = listaDivisiones.size()-1; i >= 0 ; i--) {
            if(listaDivisiones.get(i).getResiduo() != 0){
                aux = new int [4];
                aux[0] = listaDivisiones.get(i).getResiduo();
                aux[1] = listaDivisiones.get(i).getDividendo();
                aux[2] = listaDivisiones.get(i).getDivisor();
                aux[3] = -listaDivisiones.get(i).getCociente();
                listaIdentidades.add(aux);
            }
        }

        // Ingresamos los números que toman juego en la regresión lineal
        for(int numero: numerosIniciales)
            listaCoeficientes.put(numero, 0);
        aux = listaIdentidades.get(0);
        listaCoeficientes.put(aux[1],0);
        for(int i = 1; i < listaIdentidades.size(); i++) {
            aux = listaIdentidades.get(i);
            listaCoeficientes.put(aux[0],0);
        }
        listaCoeficientes.put(aux[2],0);
        listaCoeficientes.put(aux[1],0);

        // Hallamos los coeficientes de los números que toman importancia en las
        // identidades obtenidas anteriormente
        int constanteInicial = 0;
        listaRegresion.clear();
        
        for (int i = 0; i < listaIdentidades.size(); i++) {
            aux = listaIdentidades.get(i);
            
            
            if(i==0) {
                constanteInicial = aux[1];
                listaCoeficientes.replace(aux[1], 1);
                listaCoeficientes.replace(aux[2], aux[3]);
            } else {
                //System.out.println("CI: " + constanteInicial + "\n"+ Arrays.toString(aux));
                if(constanteInicial == aux[2])
                    constanteInicial = aux[1];
                
                listaCoeficientes.replace(aux[1], listaCoeficientes.get(aux[0]) + listaCoeficientes.get(aux[1]));
                listaCoeficientes.replace(aux[2], listaCoeficientes.get(aux[0]) * aux[3]+ listaCoeficientes.get(aux[2]));
            }
            
            linea = mcd + " = ";            
            
            if(listaCoeficientes.get(constanteInicial) == 1)
                linea += constanteInicial + " ";
            else 
                linea += constanteInicial + "(" + listaCoeficientes.get(constanteInicial) + ") ";
            
            for(int j=2; j>=1;j--)
                if(constanteInicial != aux[j])
                    if(listaCoeficientes.get(aux[j]) == 1)
                        linea += "+ " + aux[j] + " ";
                    else
                        linea += "+ " + aux[j] + "(" + listaCoeficientes.get(aux[j]) + ") ";
            
            listaRegresion.add(linea);
        }
        
        combinacionLineal =  mcd + " = ";
        for(int i = 0; i < numerosIniciales.length; i++){
            if(listaCoeficientes.get(numerosIniciales[i]) == 1)
                combinacionLineal += numerosIniciales[i] + " ";
            else
                combinacionLineal += numerosIniciales[i] + "(" + listaCoeficientes.get(numerosIniciales[i]) + ") ";
            if ( i < numerosIniciales.length-1)
                combinacionLineal += "+ ";
        }
    }

    public List<String> getListaRegresion() {
        return listaRegresion;
    }
    
    getListaIdentidades(){
        List<String> retorno = new ArrayList<>();
        
        listaIdentidades.forEach(linea -> {
//            if(linea[3] != -1)
                retorno.add(linea[0] + " = " + linea[1] + " - " + linea[2] + "(" + (-linea[3]) + ")");
//            else
//                retorno.add(linea[0] + " = " + linea[1] + " - " + linea[2]);
        });
        return retorno;
    }

    getCombinacionLineal() {
        return combinacionLineal;
    }
    
}
