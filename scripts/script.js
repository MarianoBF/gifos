
/*
1-MENÚ DESPLEGABLE
2-BARRA BÚSQUEDA (SUGERENCIAS Y RESULTADOS)
3-TRENDING (TEXTO Y GIFS)
4-CALESITA
*/


/*********************************
1-MENÚ DESPLEGABLE y MODO OSCURO
*********************************/
document.getElementById("abrirMenu").addEventListener("click", abrirNav);

function abrirNav() {
  document.getElementById("menu").style.width = "100%";
  document.getElementById("abrirMenu").style.display = "none";
  document.getElementById("cerrarMenu").style.display = "inline";
}
 
document.getElementById("cerrarMenu").addEventListener("click", cerrarNav);

function cerrarNav() {
  document.getElementById("menu").style.width = "0%";
  document.getElementById("abrirMenu").style.display = "inline";
  document.getElementById("cerrarMenu").style.display = "none";
}

document.getElementById("modoOscuro").addEventListener("click", oscurizador);

function oscurizador() {
  document.getElementsByTagName("body")[0].classList.toggle("modoOscuro");
  cerrarNav();
}

/*********************************
2-BARRA BÚSQUEDA (SUGERENCIAS Y RESULTADOS)
*********************************/

document.getElementById("barraBusqueda").addEventListener("keyup", sugerencias);

function sugerencias() {

let sugerencia = document.getElementById("barraBusqueda").value; 

if (sugerencia.length > 2) {

  document.getElementById("busquedasSugeridas").innerHTML = "";


let urlSugerencias = "https://api.giphy.com/v1/tags/related/" 
+sugerencia
+"?api_key=uTnjhcYC0B52sTn6MzoPXGkdJ6yxZgYQ"

fetch(urlSugerencias)
  .then(res => res.json())
  .then(({ data }) => data.map(mostrarSugerencias))

function mostrarSugerencias (sug) {
  // document.getElementById("busquedasSugeridas").textContent = '';

let opcionSug = document.createElement("option");
opcionSug.className = "opcionesBusquedasSugeridas"
let valorSug = document.createTextNode(sug.name); 
  opcionSug.appendChild(valorSug); 
  document.getElementById("busquedasSugeridas").appendChild(opcionSug); 
}

}

;}

document.getElementById("iconoBusqueda").addEventListener("click", buscar);


let formulario = document.getElementsByName("formulario");
formulario[0].addEventListener("submit", buscar);

function buscar() {

event.preventDefault();

let busqueda = document.getElementById("barraBusqueda").value; 

document.getElementById("resultadosBusqueda").style.display = "initial";
document.getElementById("tituloBusqueda").innerHTML = busqueda

let vaciar = document.getElementById("contenedorBusqueda");
vaciar.textContent = "";

function mostrarGiphy (gif) {
  let imagen = document.createElement('IMG');
  imagen.src = gif.images.preview_gif.url;
  imagen.className = "gifChico";
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

let urlTemasTrending = "https://api.giphy.com/v1/trending/searches?" 
+"api_key=uTnjhcYC0B52sTn6MzoPXGkdJ6yxZgYQ"

fetch(urlTemasTrending)
  .then(res => res.json())
  .then(({ data }) => data.map(mostrarTemasTrending))

let cantidadTrending = 0;

function mostrarTemasTrending (tema) {
  tema = mayusculizar(tema)
  cantidadTrending++
  cantidadTrending < 8 ? document.getElementById("temasTrending").innerHTML += tema + " - " : 
  cantidadTrending == 8 ? document.getElementById("temasTrending").innerHTML += tema : null;
}


let urlTrending = "https://api.giphy.com/v1/gifs/trending?" 
+"api_key=uTnjhcYC0B52sTn6MzoPXGkdJ6yxZgYQ"
+"&limit=12"

fetch(urlTrending)
  .then(res => res.json())
  .then(({ data }) => data.map(mostrarTrending))

function mostrarTrending (gif) {
  let imagen = document.createElement('IMG');
  imagen.src = gif.images.preview_gif.url;
  imagen.className = "gifChico";
  document.getElementById("contenedorTrending").appendChild(imagen);
}


/*********************************
4-CALESITA
*********************************/

let firstval = 0;
let runSlider;

function Carousel() {
clearTimeout(runSlider);
    firstval += 2;
    parent = document.getElementById('contenedorTrending');
    parent.style.left = "-" + firstval + "px";
    if (!(firstval % 180)) {
        setTimeout(Carousel, 3000);
        firstval = 0;
        let firstChild = parent.firstElementChild;
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
//         ***var firstChild = parent.firstElementChild;
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
//         ****var firstChild = parent.firstElementChild;
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
  return palabras 
}