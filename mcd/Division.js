function Division(dividendo, divisor){
    this.dividendo = dividendo;
    this.divisor = divisor;
    this.cociente = dividendo / divisor;
    this.residuo = dividendo % divisor;

    this.getDividendo = function (){
        return dividendo
    }

    this.getDivisor = function () {
        return divisor
    }
    
}