
"use strict";

let contenedor = document.getElementById("contenedorTrending");
let corredor = 0;
let calesitaGirando = setInterval(clicDerecho, 3000);
let valorAjuste = "";

(window.matchMedia("(max-width: 767px)").matches) ? valorAjuste = 272 : valorAjuste = 378

document.getElementById("flechaIzquierda").addEventListener("click", clicIzquierdo);

let corredor2;

function clicIzquierdo(){
    corredor += valorAjuste;
    corredor <= 0 ? corredor2 = corredor + "px" : corredor2 = corredor = 0;
    corredor2 = corredor + "px"
    contenedor.style.marginLeft = corredor2;
}

document.getElementById("flechaDerecha").addEventListener("click", clicDerecho);

function clicDerecho(){
    corredor -= valorAjuste;
    corredor >= -valorAjuste*11 ? corredor2 = corredor + "px" : corredor2 = corredor = 0;
    contenedor.style.marginLeft = corredor2;
}

let idActivo = "";
let urlActivo = "";
let tituloActivo = "";
let usuarioActivo = "";
let posicion;

function activarModalesTrending() { //Activa modales y el overlay con íconos y nombre
  const gifs = document.querySelectorAll(".gifTrending")
  for (let gif of gifs) { 
    if (window.matchMedia("(max-width: 767px)").matches) {
      gif.addEventListener("click", modalGifMob)
    } else {
    gif.parentNode.addEventListener("mouseenter", modalGifDesk);
    gif.parentNode.addEventListener("mouseleave", cerrarModalGifDesk);
    }
  } 
 }

function activarModalesOtros() { //Activa modales y el overlay con íconos y nombre
  const gifs = document.querySelectorAll(".gifChico")
  for (let gif of gifs) { 
    if (window.matchMedia("(max-width: 767px)").matches) {
      gif.addEventListener("click", modalGifMob)
    } else {
    gif.parentNode.addEventListener("mouseenter", modalGifDesk);
    gif.parentNode.addEventListener("mouseleave", cerrarModalGifDesk);
    }
  } 
 }

  
function modalGifDesk() {

  urlActivo = this.firstChild.src;

  posicion = (gifsEnDisplay.findIndex(item => item.images.fixed_width.url === urlActivo))

  idActivo = gifsEnDisplay[posicion].id;
  usuarioActivo = gifsEnDisplay[posicion].username;
  tituloActivo = gifsEnDisplay[posicion].title;

  let imagen = document.getElementById(this.firstChild.id)
  imagen.parentNode.style.background = "rgba(87, 46, 229, 0.5)"
  imagen.style.opacity = "0.3"
  
  let contenedorIconosModal = document.createElement("DIV");
  contenedorIconosModal.className = "contenedorIconosModal"

  let descargar = document.createElement("A");
  descargar.setAttribute("href", "javascript:void(0)");
  descargar.className = "iconoEnOverlayDescargar";
  descargar.addEventListener("click", descargarGif) 

  let favorito;
  if (document.getElementById("favoritos").style.display === "initial") {
    favorito = document.createElement("A");
    favorito.setAttribute("href", "javascript:void(0)");
    favorito.className = "iconoEnOverlayBorrar";
    favorito.addEventListener("click", borrarGifFavorito);
    } else {
    favorito = document.createElement("A");
    favorito.setAttribute("href", "javascript:void(0)");
    favorito.className = "iconoEnOverlayFavorito";
    favorito.addEventListener("click", guardarGifFavorito); 
  }  
  
  let pantallaCompleta = document.createElement("A");
  pantallaCompleta.setAttribute("href", "javascript:void(0)");
  pantallaCompleta.className = "iconoEnOverlayPantallaCompleta";
  pantallaCompleta.addEventListener("click", modalGifMobDisplay);
  
  let titulo = document.createElement("P");
  
  if (tituloActivo.match(/\s[b|B]y\s[\w|\s|\W]+$/) !== null) {
    let corte = tituloActivo.match(/\sby\s[\w|\s|\W]+$/).index;
    tituloActivo = tituloActivo.slice(0,corte);
    }
  if (tituloActivo.match(/GIF$/) !== null) {
    let corte = tituloActivo.match(/GIF$/).index;
    tituloActivo = tituloActivo.slice(0,corte);
    }

  titulo.append(document.createTextNode(tituloActivo));
  titulo.classList.add("epigrafeModalDesk");

  let usuario = document.createElement("P");
  usuario.append(document.createTextNode(usuarioActivo));
  usuario.className = "epigrafeModalDesk";

  imagen.parentNode.append(descargar, favorito, pantallaCompleta, usuario, titulo);
  imagen.append(contenedorIconosModal);
}

function cerrarModalGifDesk() {
  let imagen = document.getElementById(this.firstChild.id);
  let contenedor = (this);
  contenedor.style.background = "none";
  imagen.style.opacity = "1";
  imagen.firstChild.remove();

  let iconosObsoletos = contenedor.getElementsByTagName("A");
    for (let i = iconosObsoletos.length - 1 ; i >= 0; i--) {
      contenedor.removeChild(iconosObsoletos[i]); }
  
      let textosObsoletos = contenedor.getElementsByTagName("P");
    for (let i = textosObsoletos.length - 1 ; i >= 0; i--) {
      contenedor.removeChild(textosObsoletos[i]); }
} 

function modalGifMob() {
   clearInterval(calesitaGirando)
   urlActivo = this.src;
  posicion = (gifsEnDisplay.findIndex(item => item.images.fixed_width.url === urlActivo))
  idActivo = gifsEnDisplay[posicion].id;
  // urlActivo = this.src;
  usuarioActivo = gifsEnDisplay[posicion].username;
  tituloActivo = gifsEnDisplay[posicion].title;

  modalGifMobDisplay()
}

let subContenedor;

function modalGifMobDisplay() {

  document.getElementById("subcontenedorModal").remove();

  subContenedor = document.createElement("DIV");
  subContenedor.id = "subcontenedorModal"

  let imagenModal = document.createElement("IMG");
  imagenModal.src = gifsEnDisplay[posicion].images.original.url;
  imagenModal.className = "modalGifImagen";
  imagenModal.id = "modalAbierto"

  let titulo = document.createElement("P");
  
  let tituloAux = gifsEnDisplay[posicion].title
  
  if (tituloAux.match(/\s[b|B]y\s[\w|\s|\W]+$/) !== null) {
    let corte = tituloAux.match(/\sby\s[\w|\s|\W]+$/).index;
    tituloAux = tituloAux.slice(0,corte);
    }
  if (tituloAux.match(/GIF$/) !== null) {
    let corte = tituloAux.match(/GIF$/).index;
    tituloAux = tituloAux.slice(0,corte);
    }

  titulo.append(document.createTextNode(tituloAux))
  titulo.className = "epigrafeModal"

  let usuario = document.createElement("P");
  usuario.append(document.createTextNode(gifsEnDisplay[posicion].username))
  usuario.className = "epigrafeModal"

  let flechaIzq = document.createElement("A");
  flechaIzq.id = "flechaIzquierdaModal"
  flechaIzq.className = "flecha flechaIzquierda"
  flechaIzq.addEventListener("click", modalIzquierda);


  let flechaDer = document.createElement("A");
  flechaDer.id = "flechaDerechaModal"
  flechaDer.className = "flecha flechaDerecha"
  flechaDer.addEventListener("click", modalDerecha)

  let contenedorModal = document.getElementById("modal");


  let textoViejo = subContenedor.getElementsByTagName("p");
    for (let i = textoViejo.length - 1 ; i >= 0; i--) {
      subContenedor.removeChild(textoViejo[i]); }
  

  subContenedor.append(imagenModal, titulo, usuario, flechaDer, flechaIzq)
  contenedorModal.append(subContenedor);


  contenedorModal.classList.add("modalGifContenedor");
  document.getElementById("cerrarModal").style.display = "initial";
  document.getElementById("borrarGif").style.display = "none";
  document.getElementById("guardarGif").style.display = "initial";
  document.getElementById("descargarGif").style.display = "initial";
  if (document.getElementById("favoritos").style.display === "initial") {
    document.getElementById("guardarGif").style.display = "none";
    document.getElementById("borrarGif").style.display = "initial";
  }
}

function modalIzquierda() {
  posicion >= 1 ? posicion-- : posicion = 0;
  subContenedor.innerHTML = ""
  modalGifMobDisplay()
}

function modalDerecha() {
  posicion < (gifsEnDisplay.length - 1) ? posicion++ : posicion = gifsEnDisplay.length - 1;
  subContenedor.innerHTML = ""
  modalGifMobDisplay()
}

document.getElementById("cerrarModal").addEventListener("click", cerrarModalGif);

function cerrarModalGif() {
  document.getElementById("modalAbierto").remove();
  document.getElementById("modal").classList.remove("modalGifContenedor");
  let cerrador = document.getElementById("cerrarModal");
  cerrador.style.display = "none";
  calesitaGirando = setInterval(clicDerecho, 3000)
}

document.getElementById("guardarGif").addEventListener("click", guardarGifFavorito);

function guardarGifFavorito() {
  console.log(gifsEnDisplay[posicion].id, idActivo, localStorage.getItem("gifFavorito"+gifsEnDisplay[posicion].id))
  localStorage.getItem("gifFavorito"+gifsEnDisplay[posicion].id) ? null : localStorage.setItem("gifFavorito"+gifsEnDisplay[posicion].id, gifsEnDisplay[posicion].id)
}

document.getElementById("borrarGif").addEventListener("click", borrarGifFavoritoMob);

function borrarGifFavorito() {
  localStorage.removeItem("gifFavorito"+idActivo);
  this.parentNode.remove();
}

function borrarGifFavoritoMob() {
  localStorage.removeItem("gifFavorito"+gifsEnDisplay[posicion].id);
  cerrarModalGif()
  mostrarFavoritos();
}

document.getElementById("descargarGif").addEventListener("click", descargarGif);

function descargarGif() {
  fetch(gifsEnDisplay[posicion].images.original.url)
  .then((response) => response.blob())
  .then((blob) => {
    const urlAux = window.URL.createObjectURL(new Blob([blob]));
    const AAux = document.createElement("A");
    AAux.href = urlAux;
    AAux.setAttribute("download", "GifBajado.gif");
    document.body.appendChild(AAux);
    AAux.click();
    AAux.parentNode.removeChild(AAux);
  })
}
