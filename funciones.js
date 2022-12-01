
var com = new comanda(); //variable global que conecta la clase comanda con las funciones 


var urlAPI = "https://imdb-api.com/en/API/InTheaters/";
var key = "k_f7wa69xu";
//var key = "k_a97zqf5z";

var sesion1 = 'Tarde';
var sesion2 = 'Noche';

getCartelera();

function getCartelera() {
    var url = urlAPI + key;
    getData(url, "tramitarCartelera");
}

function getData(url, destino) {

    const con = new XMLHttpRequest();

    con.onreadystatechange = function () {
        if (con.readyState === 4 && con.status === 200) {

            window[destino](con.responseText);

        } else {
            console.log(con.readyState + ' ' + con.status);
        }
    };

    con.open("GET", url);
    con.send();
}

function tramitarCartelera(datos) {
    var cartelera = new Cartelera(datos);
    cartelera.toString();
}

function AddComida(nombre, qt, precio) {    //funcion añadir comida que llega de los botones de los diferentes eleemntos de comida con los 3 parametros 
    com.sumarcomida(nombre, qt, precio);    //conecta con el metodo para añadir una comida a la comanda
    dibujarcom(com);                        //funcion que dibuja lo que hay en el vector comidas
    ticketenvivo();                         // funcion que dibuja el total del ticket en vivo
}

function AddBebida(nombre, qt, precio) {
    com.sumarbebida(nombre, qt, precio);
    dibujarbeb(com);
    ticketenvivo();
}

function AddEntrada(salas, sesiones, qt) {
    com.sumarentrada(salas, sesiones, qt);
    dibujar(com);
    ticketenvivo();
}

function total() {
    com.totalticketc(com);
}

function pedido() {
    com.tramitar();
}

function dibujarCartelera(portada, titulo) {
    var contentPeli = document.getElementById('display-pelis');

    var cardPeli = document.createElement('div');
    cardPeli.setAttribute('class', 'card');

    var imgPeli = document.createElement('img');
    imgPeli.src = portada;

    var contButtons = document.createElement('div');
    contButtons.setAttribute('class', 'container-buttons');
    
    var butSesionTarde = document.createElement('button');
    butSesionTarde.textContent  = "Sesion tarde";
    butSesionTarde.setAttribute('onclick', "AddEntrada('" + titulo.replace("'"," ") + "', 'Sesion Tarde', 1)" );
    
    var butSesionNoche = document.createElement('button');
    butSesionNoche.textContent  = "Sesion Noche";
    butSesionNoche.setAttribute('onclick', "AddEntrada('" + titulo.replace("'"," ") + "', 'Sesion Noche', 1)" );
    
    contButtons.appendChild(butSesionTarde);
    contButtons.appendChild(butSesionNoche);

    contentPeli.appendChild(cardPeli);

    cardPeli.appendChild(imgPeli);

    cardPeli.insertAdjacentHTML('beforeend', contButtons.outerHTML);
    
}

function dibujar(com) { //funcion para dibujar la comanda nos llega en cuanto se presiona sobre el boton de alguna de las peliculas

    document.getElementById('mitabla1').style.display = ''; // muestra la tabla que se encuentra en el id mitabla1
    var preuentrada = 5;

    var mitabla = document.getElementById('mitabla_cuerpo'); //recoge la tabla donde veremos la informacion quq queremos mostrar

    mitabla.innerHTML = "<tr></tr>";        // elimina la primera linea, la idea es mostrar siempre lo que tenemos en nuestro vector entradapelis

    for (var i = 0; i < com.entradapelis.length; i++) { // bucle que recorre el vector entradapelis

        var fila = mitabla.insertRow(0);    //variable que añade una fila justo despues de la tabla mitabla_cuerpo

        var celTitulo = fila.insertCell(0); //inserta una celda dentro de la fila . . .
        celTitulo.innerHTML = com.entradapelis[i][0];  //muestra la informacion de la posicion 0

        var celSesion = fila.insertCell(1);
        celSesion.innerHTML = com.entradapelis[i][1];

        var celCantidad = fila.insertCell(2);
        celCantidad.innerHTML = com.entradapelis[i][2];

        var celPrecio = fila.insertCell(3);
        celPrecio.innerHTML = com.entradapelis[i][2] * preuentrada + " € "; //calculamos el precio total de las peliculas seleccionadas

        var celDelete = fila.insertCell(4);
        celDelete.innerHTML = '<button onclick="deleteRow(' + i + ')"> X </button>'; //boton que se crea cada vez que añadamos una peli nueva y enviamos la posicion de la peli como parametro para borrarla

    }

    ticketenvivo();

}

function dibujarcom(com) {  // funcion para dibujar la comanda nos llega en cuanto se presiona sobre el boton de alguna de las comidas

    document.getElementById('mitabla2').style.display = ''; // muestra la tabla que se encuentra en el id mitabla2

    var mitabla = document.getElementById('mitabla_comidas');  // recoge la tabla donde veremos la informacion que queremos mostrar

    mitabla.innerHTML = "<tr></tr>"; // elimina la primera linea, la idea es mostrar siempre lo que tenemos en nuestro vector entradapelis

    for (var i = 0; i < com.comidas.length; i++) { // bucle que recorre el vector comidas
        var fila = mitabla.insertRow(1); //variable que añade una fila justo despues de la tabla mitabla_comidas en este caso una fila mas abajo de la de las entradas

        var celConcepto = fila.insertCell(0); //inserta una celda dentro de la fila . . .
        celConcepto.innerHTML = com.comidas[i][0];//muestra la informacion de la posicion que sea

        var celCantidad = fila.insertCell(1);
        celCantidad.innerHTML = com.comidas[i][1];

        var celCantidad = fila.insertCell(2);
        celCantidad.innerHTML = com.comidas[i][1] * com.comidas[i][2] + "€"; // calculamos el precio total de las comidas seleccionadas

        var celDelete = fila.insertCell(3);
        celDelete.innerHTML = '<button onclick="deleteRowcom(' + i + ')"> X </button>';//boton que se crea cada vez que añadamos una comida nueva y enviamos la posicion de la comida como parametro para borrarla

    }

    ticketenvivo();

}

function dibujarbeb(com) { //lo mismo que con la comida

    document.getElementById('mitabla3').style.display = '';

    var mitabla = document.getElementById('mitabla_bebidas');

    mitabla.innerHTML = "<tr></tr>";

    for (var i = 0; i < com.bebidas.length; i++) {

        var fila = mitabla.insertRow(1);
        var celConcepto = fila.insertCell(0);

        celConcepto.innerHTML = com.bebidas[i][0];

        var celCantidad = fila.insertCell(1);

        celCantidad.innerHTML = com.bebidas[i][1];

        var celCantidad = fila.insertCell(2);

        celCantidad.innerHTML = com.bebidas[i][1] * com.bebidas[i][2] + "€";

        var celDelete = fila.insertCell(3);

        celDelete.innerHTML = '<button onclick="deleteRowbeb(' + i + ')"> X </button>';
    }
    ticketenvivo();
}

function deleteRow(r) { //recibe el parametro del boton para borrar, de cada peli . . . 
    com.restarEntradas(com.entradapelis[r][0], com.entradapelis[r][1]); //envia la informacion al metodo para que la borre
    dibujar(com);   //enviamos a la funcion dibujar para que nos muestre los valores que hemos borrado
}

//lo mismo para cada boton de borrar

function deleteRowcom(r) {
    com.restarComida(com.comidas[r][0]);
    dibujarcom(com);
}

function deleteRowbeb(r) {
    com.restarBebida(com.bebidas[r][0]);
    dibujarbeb(com);
}

function borrarPedido(){
   com.entradapelis = [];
   dibujar(com);
   com.comidas = [];
   dibujarcom(com);
   com.bebidas = [];
   dibujarbeb(com);
}


function ticketenvivo() {   // funcion que dibuja lo que se va sumando o restando al total del ticket 
    if (com.totalComanda() === 0) { // borra las tablas en caso de que no exista nada seleccionado 
        document.getElementById('mitabla3').style.display = 'none';
        document.getElementById('mitabla2').style.display = 'none';
        document.getElementById('mitabla1').style.display = 'none';
    }

    document.getElementById("ticket").innerHTML = " Total : " + (com.totalComanda()).toFixed(2) + " € "; //recibe el valor de totalTicket que le hemos puesto return y nos lo muestra con un toFixed
    com.totalComanda() === 0?  document.getElementById("ticket").innerHTML = "" : null;
}