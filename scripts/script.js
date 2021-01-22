
/*
1-MENÚ DESPLEGABLE
2-BARRA BÚSQUEDA (SUGERENCIAS Y RESULTADOS)
3-TRENDING (TEXTO Y GIFS)
4-CALESITA
5-MODAL
6-AUX
*/

/*********************************
1-MENÚ DESPLEGABLE y MODO OSCURO
*********************************/
{
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
  document.getElementsByTagName("body")[0].classList.toggle("bodyNocturno");
  document.getElementById("trendingGIFOS").classList.toggle("backgroundOscuroNocturno");
  document.getElementById("facebook").classList.toggle("iconoFBNocturno");
  document.getElementById("twitter").classList.toggle("iconoTWNocturno");
  document.getElementById("instagram").classList.toggle("iconoIGNocturno");
  document.getElementById("cerrarModal").classList.toggle("textoNocturno");
  document.getElementById("barraBusqueda").classList.toggle("barraNocturna");
  document.getElementById("formulario").classList.toggle("formNocturno");
  document.getElementById("iconoBusqueda").classList.toggle("iconoBusquedaNocturno");


  
  let logo = document.getElementById("logo"); let logoaux = logo.getAttribute("src")
  logoaux === "./images/logo-mobile.svg" ? logo.setAttribute("src", "./images/logo-mobile-modo-noct.svg") : logo.setAttribute("src", "./images/logo-mobile.svg")
  
  let burger = document.getElementById("abrirMenu"); let burgeraux = burger.getAttribute("src")
  burgeraux === "./images/burger.svg" ? burger.setAttribute("src", "./images/burger-modo-noct.svg") : burger.setAttribute("src", "./images/burger.svg")

  let cerrar = document.getElementById("cerrarMenu"); let cerraraux = cerrar.getAttribute("src")
  cerraraux === "./images/close.svg" ? cerrar.setAttribute("src", "./images/close-modo-noct.svg") : cerrar.setAttribute("src", "./images/close.svg")

  let textosNegros = document.getElementsByClassName("textoNegro")
  for (t of textosNegros) {
    t.classList.toggle("textoBlanco")
  }
  cerrarNav();
}
}
/*********************************
2-BARRA BÚSQUEDA (SUGERENCIAS Y RESULTADOS)
*********************************/
{
document.getElementById("barraBusqueda").addEventListener("keyup", sugerencias);

function sugerencias() {
  let sugerencia = document.getElementById("barraBusqueda").value; 
  let cantidadMaximaSugerencias = 5;

  if (sugerencia.length > 2) {

    document.getElementById("busquedasSugeridas").innerHTML = "";

    let urlSugerencias = "https://api.giphy.com/v1/tags/related/" 
    +sugerencia
    +"?api_key=uTnjhcYC0B52sTn6MzoPXGkdJ6yxZgYQ"

    fetch(urlSugerencias)
      .then(res => res.json())
      .then(({ data }) => data.map(mostrarSugerencias))

    function mostrarSugerencias (sug) {
        if (document.getElementById("busquedasSugeridas").childElementCount < cantidadMaximaSugerencias) { 
        let opcionSug = document.createElement("li");
        opcionSug.className = "opcionesBusquedasSugeridas";
        opcionSug.addEventListener("click", buscarSugerencias)
        let valorSug = document.createTextNode(sug.name); 
        opcionSug.appendChild(valorSug); 
        document.getElementById("busquedasSugeridas").appendChild(opcionSug); 
        }
      }
    }
  }

function buscarSugerencias() {
  let busqueda = this.innerText;
  Buscar(busqueda);
  document.getElementById("busquedasSugeridas").innerHTML = ""; 
  }


document.getElementById("iconoBusqueda").addEventListener("click", buscarBarra);
let formulario = document.getElementsByName("formulario");
formulario[0].addEventListener("submit", buscarBarra);

function buscarBarra(e) {
  e.preventDefault() 
  let busqueda = document.getElementById("barraBusqueda").value; 
  Buscar(busqueda)
  }
  //   document.getElementById("verMasGif").addEventListener("click", ExpandirLimite);
  //   function ExpandirLimite() {
  //     limite += 12;
  //     buscarBarra()
  //   }

function buscarTrending() {
  let busqueda = this.id;
  Buscar(busqueda);
  }
}
/*********************************
3- TRENDING (TEXTO Y GIFS)
*********************************/
{
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

}
/*********************************
4-CALESITA y MIS GIFOS
*********************************/
{
let contenedor = document.getElementById('contenedorTrending');
let corredor = 0;
let calesitaGirando = setInterval(clicDerecho, 2000);

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

document.getElementById("enlaceMisGifos").addEventListener("click", mostrarMisGifos)

function mostrarMisGifos() {
  document.getElementById("menu").style.width = "0%";
  document.getElementById("misGifos").style.display = "initial";
  const gifosGuardados = {...localStorage};
  for (let i = 0; i < localStorage.length; i++) {
    let llave = localStorage.key(i);
    let src = localStorage.getItem(llave)
    console.log(src)
    mostrarGiphyNoBusqueda(src, "contenedorMisGifos")
  }
  
    }
}

/********************
5-MODAL
*******************/
{
setTimeout(activarModales, 1000)

let idActivo = "";
let urlActivo = "";

function activarModales() {
  const gifs = document.querySelectorAll(".gifChico")
  for (let gif of gifs) { gif.addEventListener("click", modalGif) };
 }
  
function modalGif() {
  let imagen = document.getElementById(this.id);
  imagen.classList.add("modalGifImagen");
  imagen.classList.remove("gifChico");
  idActivo = this.id;
  urlActivo = this.src;
  let contenedor = document.getElementById("modal");
  contenedor.classList.add("modalGifContenedor");
  document.getElementById("cerrarModal").style.display = "initial";
  document.getElementById("guardarGif").style.display = "initial";
  clearInterval(calesitaGirando)

}


document.getElementById("cerrarModal").addEventListener("click", cerrarModalGif);

function cerrarModalGif() {
  let imagen = document.getElementById(idActivo);
  imagen.classList.add("gifChico");
  imagen.classList.remove("modalGifImagen");
  document.getElementById("modal").classList.remove("modalGifContenedor");
  let cerrador = document.getElementById("cerrarModal");
  cerrador.style.display = "none";
  calesitaGirando = setInterval(clicDerecho, 2000)
}

document.getElementById("guardarGif").addEventListener("click", GuardarGif);
function GuardarGif() {
  localStorage.setItem("gif"+Id(), urlActivo)
}


const Id = GenerarId()

function GenerarId() {
    let i = 0; 
    return function GenerarIdAux(){ return i++}
}


}
/********************
6-FUNCIONES AUXILIARES Y GENERALES
*******************/

function mayusculizar(palabras) {
  palabras = palabras.split(" ");
  palabras = palabras.map((word, index) => word[0].toUpperCase() + word.slice(1));
  palabras = palabras.join(" ")
  return palabras 
}

function Buscar (busqueda) {
  let limite = 12;
  document.getElementById("resultadosBusqueda").style.display = "initial";
  document.getElementById("tituloBusqueda").innerHTML = busqueda
  let vaciar = document.getElementById("contenedorBusqueda");
  vaciar.textContent = ""; 
   
  let urlBusqueda = "https://api.giphy.com/v1/gifs/search?" 
  +"api_key=uTnjhcYC0B52sTn6MzoPXGkdJ6yxZgYQ"
  +"&q="
  +busqueda
  +"&lang=es"
  +"&limit="
  +limite
  
  fetch(urlBusqueda)
    .then(resultado => resultado.json())
    .then(({ data }) =>  data.map(mostrarGiphyBusqueda));
  }

function mostrarGiphyBusqueda (gif) {
  let imagen = document.createElement('IMG');
  imagen.src = gif.images.preview_gif.url;
  imagen.className = "gifChico";
  document.getElementById("contenedorBusqueda").appendChild(imagen);
  }

function mostrarGiphyNoBusqueda (gif, puntoInsercion) {
  let imagen = document.createElement('IMG');
  imagen.src = gif;
  imagen.className = "gifChico";
  document.getElementById(puntoInsercion).appendChild(imagen);
  }
  