
const preuentrada = 5;  //precio entrada para todas las pelis

class Cartelera {

    llista = [];
    activa = [];
    max = 8;

    constructor(dades) {

        var info = JSON.parse(dades).items;
        //console.log(info);

        for (var i = 0; i < this.max; i++) {
            var film = new Pelicula(info[i]); //objecte basad en la info de la pelicula
            this.llista.push(film); // fica totes les pelicules al vector llista
        }

        return this;

    }

    toString() {
        for (var i = 0; i < this.llista.length; i++) {
            this.llista[i].toString();
        }
    }

}

class Pelicula {

    titulo;
    imagen;
 
    constructor(dades) {   
        this.titulo = dades.title;  
        this.imagen = dades.image; 
    }

    toString() {
        dibujarCartelera(this.imagen, this.titulo);
    }

}

class comanda {         //declaracion de la clase comanda

    comidas = [];       //vectores que guardan los elementos comidas bebidas y peliculas para calcular su total
    bebidas = [];
    entradapelis = [];

    constructor() {     //constructor de la clase sirve 
    }

    sumarcomida(nom, cantidad, preu) { //metodo recibe de la funcion los 3 parametros que llegan desde los botones del html

        var comida = [nom, cantidad, preu]; //crea un vector del producto seleccionado

        var fet = false;

        for (var i = 0; i < this.comidas.length; i++) { //bucle que comprueba si el producto esta repetido en ese caso se suma la cantidad y asi calcular el precio 

            if (this.comidas[i][0] === nom) {       // si el nom coincide con el existente quiere decir que ya existe ese producto

                this.comidas[i][1]++;                   //se suma la cantidad

                fet = true;

            }

        }

        if (fet === false) {

            this.comidas.push(comida);                  //en este caso el producto no existe y se realiza un push para sumar al vector comida

        }

    }

    sumarbebida(nom, cantidad, preu) {      //metodo recibe de la funcion los 3 parametros que llegan desde los botones del html

        var bebida = [nom, cantidad, preu]; //crea un vector del producto seleccionado

        var fet = false;

        for (var i = 0; i < this.bebidas.length; i++) {         //bucle que comprueba si el producto esta repetido en ese caso se suma la cantidad y asi calcular el precio 

            if (this.bebidas[i][0] === nom) {            // si el nom coincide con el existente quiere decir que ya existe ese producto

                this.bebidas[i][1]++;                   //se suma la cantidad

                fet = true;

            }
        }

        if (fet === false) {

            this.bebidas.push(bebida);          //en este caso el producto no existe y se realiza un push para sumar al vector comida

        }

    }

    sumarentrada(sala, sesion, cantidad) {      //metodo que recibe de la funcion los 3 parametros que llegan desde los botones del html

        var entradas = [sala, sesion, cantidad];        //crea un vector del producto seleccionado

        var fet = false;

        for (var i = 0; i < this.entradapelis.length; i++) {

            if (this.entradapelis[i][0] === sala && this.entradapelis[i][1] === sesion) { // en este caso comparamos sesion y pelicula y sumamos la cantidad

                this.entradapelis[i][2]++;

                fet = true;

            }

        }

        if (fet === false) {

            this.entradapelis.push(entradas);           //en este caso el producto no existe y se realiza un push para sumar al vector comida

        }
    }

    restarComida(nom) {     //metodo para restar al que se le pasa el parametro nom para saber si ha sido seleccionado

        for (var i = 0; i < this.comidas.length; i++) {
            if (this.comidas[i][0] === nom) {       //recorremos el vector comidas y si en la posicion cero coincide con el nombre del producto que queremos restar . . .
                if (this.comidas[i][1] === 1) {     //y si ademas la cantidad solo es una . . . 
                    this.comidas.splice(i, 1);      // eliminamos del todo ese producto del ticket 
                } else {

                    this.comidas[i][1] = this.comidas[i][1] - 1;    //la cantidad es mayor que 1 por lo tanto simplemente restamos 1 a la cantidad pero el producto se mantiene mientras haya uno seleccionado 

                }
            }
        }
    }

    restarBebida(nom) { //realiza lo mismo que el anterior pero con la bebida

        for (var i = 0; i < this.bebidas.length; i++) {
            if (this.bebidas[i][0] === nom) {
                if (this.bebidas[i][1] === 1) {
                    this.bebidas.splice(i, 1);
                } else {

                    this.bebidas[i][1] = this.bebidas[i][1] - 1;

                }
            }
        }

    }

    restarEntradas(pelicula, sesion) { //lo mismo que en los dos metodos anteriores pero en este caso se compara el nombre de la pelicula y su sesion

        for (var i = 0; i < this.entradapelis.length; i++) {
            if (this.entradapelis[i][0] === pelicula && this.entradapelis[i][1] === sesion) {
                if (this.entradapelis[i][2] === 1) {
                    this.entradapelis.splice(i, 1);
                } else {

                    this.entradapelis[i][2] = this.entradapelis[i][2] - 1;

                }
            }
        }

    }

    totalComanda() {    //metodo para calcular el total del ticket  

        var totalTicket = 0;

        var tEntrada = 0;

        for (var i = 0; i < this.entradapelis.length; i++) { //se realiza un bucle por el vector de las entradas 

            tEntrada = this.entradapelis[i][2] * preuentrada + tEntrada; //se suma a la variable tEntrada la cantidad de peliculas y se multiplica por el precio de la entrada 

        }

        var tComida = 0;

        for (var i = 0; i < this.comidas.length; i++) { //lo mismo que en el caso anterior

            tComida = this.comidas[i][1] * this.comidas[i][2] + tComida;

        }

        var tBebida = 0;

        for (var i = 0; i < this.bebidas.length; i++) { //lo mismo que en el caso anterior

            tBebida = this.bebidas[i][1] * this.bebidas[i][2] + tBebida;

        }

        totalTicket = tEntrada + tBebida + tComida; //se suma las 3 variables a la variable totalTicket, de esta manera calculamos sobre los vectores y representara su valor 

        return totalTicket; //a la hora de llamar a este metodo devolvera el valor de la variable totalTicket

    }

}


