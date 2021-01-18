
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

let opcionSug = document.createElement("li");
opcionSug.className = "opcionesBusquedasSugeridas";
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

function buscarTrending() {

  let busqueda = this.id; 
  
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
  let temaTrending = document.createElement('A');
  temaTrending.id = tema
  temaTrending.addEventListener("click", buscarTrending);
  cantidadTrending < 8 ? temaTrending.innerHTML = tema + " - ":
  cantidadTrending == 8 ? temaTrending.innerHTML = tema: null;
  document.getElementById("temasTrending").appendChild(temaTrending)
}


let urlGIFTrending = "https://api.giphy.com/v1/gifs/trending?" 
+"api_key=uTnjhcYC0B52sTn6MzoPXGkdJ6yxZgYQ"
+"&limit=12"

fetch(urlGIFTrending)
  .then(res => res.json())
  // .then(({ data }) => console.log(data))
  .then(({ data }) => data.map(mostrarTrending))

function mostrarTrending (gif) {
  let imagen = document.createElement('IMG');
  imagen.src = gif.images.preview_gif.url;
  imagen.className = "gifChico";
  imagen.id = gif.id
  document.getElementById("contenedorTrending").appendChild(imagen);
}


/*********************************
4-CALESITA
*********************************/

let contenedor = document.getElementById('contenedorTrending');
let corredor = 0;
let calesitaGirando = setInterval(clicDerecho, 2000)


document.getElementById("flechaIzquierda").addEventListener("click", clicIzquierdo);

function clicIzquierdo(){
    corredor += 200;
    corredor2 = corredor + "px"
    contenedor.style.marginLeft = corredor2;
}

document.getElementById("flechaDerecha").addEventListener("click", clicDerecho);

function clicDerecho(){
    corredor -= 200;
    corredor >= -1200 ? corredor2 = corredor + "px" : corredor2 = corredor = 0;
    contenedor.style.marginLeft = corredor2;
}

/********************
5-MODAL
*******************/

setTimeout(activarModales, 1000)

let idActivo = "";

function activarModales() {
  const gifs = document.querySelectorAll(".gifChico")
  for (let gif of gifs) { gif.addEventListener("click", modalGif) };
 }
  
function modalGif() {
  let imagen = document.getElementById(this.id);
  imagen.classList.add("modalGifImagen");
  imagen.classList.remove("gifChico");
  idActivo = this.id;
  let contenedor = imagen.parentElement;
  contenedor.classList.add("modalGifContenedor");
  contenedor.classList.remove("contenedorTrending");
  let cerrador = document.getElementById("cerrarModal");
  cerrador.style.display = "initial";
  clearInterval(calesitaGirando)
}


document.getElementById("cerrarModal").addEventListener("click", cerrarModalGif);

function cerrarModalGif() {
  let imagen = document.getElementById(idActivo);
  imagen.classList.add("gifChico");
  imagen.classList.remove("modalGifImagen");
  let contenedor = imagen.parentElement;
  contenedor.classList.remove("modalGifContenedor");
  contenedor.classList.add("contenedorTrending");
  let cerrador = document.getElementById("cerrarModal");
  cerrador.style.display = "none";
  calesitaGirando = setInterval(clicDerecho, 2000)
}




/********************
6-AUX
*******************/

function mayusculizar(palabras) {
  palabras = palabras.split(" ");
  palabras = palabras.map((word, index) => word[0].toUpperCase() + word.slice(1));
  palabras = palabras.join(" ")
  return palabras 
}