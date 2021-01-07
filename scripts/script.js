
/*
1-MENÚ DESPLEGABLE
2-BARRA BÚSQUEDA (SUGERENCIAS Y RESULTADOS)
3-TRENDING (TEXTO Y GIFS)
4-CALESITA
*/


/*********************************
1-MENÚ DESPLEGABLE
*********************************/

  function openNav() {
    document.getElementById("menu").style.width = "100%";
    document.getElementById("abrirmenu").style.display = "none";
    document.getElementById("cerrarmenu").style.display = "inline";
  }
 
  function closeNav() {
    document.getElementById("menu").style.width = "0%";
    document.getElementById("abrirmenu").style.display = "inline";
    document.getElementById("cerrarmenu").style.display = "none";
  }


/*********************************
2-BARRA BÚSQUEDA (SUGERENCIAS Y RESULTADOS)
*********************************/

function sugerencias() {

let sugerencia = document.querySelector(".busqueda").value; 

if (sugerencia.length > 2) {

let urlSugerencias = "https://api.giphy.com/v1/tags/related/" 
+sugerencia
+"?api_key=uTnjhcYC0B52sTn6MzoPXGkdJ6yxZgYQ"

fetch(urlSugerencias)
  .then(res => res.json())
  .then(({ data }) => data.map(mostrarSugerencias))

function mostrarSugerencias (sug) {

let opcionSug = document.createElement("option"); 
var valorSug = document.createTextNode(sug.name); 
  opcionSug.appendChild(valorSug); 
  document.getElementById("busquedasSugeridas").appendChild(opcionSug); 

};}
}

function buscar() {

event.preventDefault();

var busqueda = document.querySelector(".busqueda").value; 

document.getElementById("resultadosBusqueda").style.display = "initial";
document.getElementById("tituloBusqueda").innerHTML = busqueda

let vaciar = document.getElementById("contenedorBusqueda");
vaciar.textContent = "";

function mostrarGiphy (gif) {
  let imagen = document.createElement('IMG')
  imagen.src = gif.images.preview_gif.url
  document.getElementById("contenedorBusqueda").appendChild(imagen);
}

let urlBusqueda = "https://api.giphy.com/v1/gifs/search?" 
+"api_key=uTnjhcYC0B52sTn6MzoPXGkdJ6yxZgYQ"
+"&q="
+busqueda
+"&lang=es"
+"&limit=12"

fetch(urlBusqueda)
  .then(resultado => resultado.json())
  .then(({ data }) =>  data.map(mostrarGiphy));
  
}

/*********************************
3- TRENDING (TEXTO Y GIFS)
*********************************/

let urlTrending = "https://api.giphy.com/v1/gifs/trending?" 
+"api_key=uTnjhcYC0B52sTn6MzoPXGkdJ6yxZgYQ"
+"&limit=12"

fetch(urlTrending)
  .then(res => res.json())
  .then(({ data }) => data.map(mostrarTrending))

function mostrarTrending (gif) {
  let imagen = document.createElement('IMG')
  imagen.src = gif.images.preview_gif.url
  document.getElementById("contenedorTrending").appendChild(imagen);
}

let urlTemasTrending = "https://api.giphy.com/v1/trending/searches?" 
+"api_key=uTnjhcYC0B52sTn6MzoPXGkdJ6yxZgYQ"

fetch(urlTemasTrending)
  .then(res => res.json())
  .then(({ data }) => data.map(mostrarTemasTrending))

function mostrarTemasTrending (tema) {
  tema = mayusculizar(tema)
  document.getElementById("temasTrending").innerHTML += tema + " - " 
  
}



/*********************************
4-CALESITA
*********************************/

var firstval = 0;
var runSlider;

function Carousel() {
clearTimeout(runSlider);
    firstval += 2;
    parent = document.getElementById('contenedorTrending');
    parent.style.left = "-" + firstval + "px";
    if (!(firstval % 180)) {
        setTimeout(Carousel, 3000);
        firstval = 0;
        var firstChild = parent.firstElementChild;
        parent.appendChild(firstChild);
        parent.style.left= 0;
        return;
    }
    runCarousel = setTimeout(Carousel, 10);
}
Carousel();

//OPCIÓN BOTONES
// function leftClick(){
// firstval += 2;
//     parent = document.getElementById('imagenesCalesita');
//     parent.style.left = "-" + firstval + "px";
    
//     if (!(firstval % 130)) {
        
//         firstval = 0;
//         var firstChild = parent.firstElementChild;
//         parent.appendChild(firstChild);
//         parent.style.left= 0;
//         return;
//     }
//     runSlider = setTimeout(leftClick, 10);
// }

// function rightClick(){
// firstval += 2;
//     parent = document.getElementById('imagenesCalesita');
//     parent.style.left =  firstval + "px";
    
//     if (!(firstval % 130)) {
        
//         firstval = 0;
//         var firstChild = parent.firstElementChild;
//         parent.appendChild(firstChild);
//         parent.style.left= 0;
//         return;
//     }
//     runSlider = setTimeout(rightClick, 10);
// }


/********************
5-AUX
*******************/

let mayusculizar = (palabras) => {
  palabras = palabras.split(" ");
  palabras = palabras.map((word, index) => word[0].toUpperCase() + word.slice(1));
  palabras = palabras.join(" ")
  return palabras }