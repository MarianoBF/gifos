"use strict";

document.getElementById("abrirMenu").addEventListener("click", abrirNav);

function abrirNav() {
  document.getElementById("menu").style.width = "100%";
  document.getElementById("abrirMenu").style.display = "none";
  document.getElementById("cerrarMenu").style.display = "inline";
}
 
document.getElementById("cerrarMenu").addEventListener("click", cerrarNav);

function cerrarNav() {
  if (window.matchMedia("(max-width: 767px)").matches) {
  document.getElementById("menu").style.width = "0%";
  document.getElementById("abrirMenu").style.display = "inline";
  document.getElementById("cerrarMenu").style.display = "none";
  }
}

window.onload = function() {
  let nocturno = localStorage.getItem("nocturno");
  nocturno == "1" ? oscurizador() : null;
}

document.getElementById("modoOscuro").addEventListener("click", cargadorOscurizador);

function cargadorOscurizador() {
  let nocturno = localStorage.getItem("nocturno");
  nocturno === "1" ? localStorage.setItem("nocturno", "0") : localStorage.setItem("nocturno", "1");
  oscurizador()
}

function oscurizador() {

  document.getElementsByTagName("body")[0].classList.toggle("bodyNocturno");
  document.getElementById("trendingGifos").classList.toggle("backgroundOscuroNocturno");
  document.getElementById("facebook").classList.toggle("iconoFBNocturno");
  document.getElementById("twitter").classList.toggle("iconoTWNocturno");
  document.getElementById("instagram").classList.toggle("iconoIGNocturno");
  document.getElementById("cerrarModal").classList.toggle("textoNocturno");
  document.getElementById("barraBusqueda").classList.toggle("barraNocturna");
  document.getElementById("formulario").classList.toggle("formNocturno");
  document.getElementById("iconoBusqueda").classList.toggle("iconoBusquedaNocturno");
  document.getElementById("logo").classList.toggle("logoNocturno")
  document.getElementById("menu").classList.toggle("desplegableNocturno")
  document.getElementById("enlaceCaptura").classList.toggle("enlaceCapturaNocturno")
  document.getElementById("flechaIzquierda").classList.toggle("flechaIzquierdaNocturna")
  document.getElementById("flechaDerecha").classList.toggle("flechaDerechaNocturna")

  let burger = document.getElementById("abrirMenu"); let burgerAux = burger.getAttribute("src")
  burgerAux === "./images/burger.svg" ? burger.setAttribute("src", "./images/burger_noct.svg") : burger.setAttribute("src", "./images/burger.svg")

  let cerrar = document.getElementById("cerrarMenu"); let cerrarAux = cerrar.getAttribute("src")
  cerrarAux === "./images/close.svg" ? cerrar.setAttribute("src", "./images/close_noct.svg") : cerrar.setAttribute("src", "./images/close.svg")

  let camara = document.getElementById("camaraCaptura"); let camaraAux = camara.getAttribute("src")
  camaraAux === "./images/captura/camara_luz.svg" ? camara.setAttribute("src", "./images/captura/camara_luz_noct.svg") : camara.setAttribute("src", "./images/captura/camara_luz.svg")

  let cinta = document.getElementById("cintaCaptura"); let cintaAux = cinta.getAttribute("src")
  cintaAux === "./images/captura/pelicula.svg" ? cinta.setAttribute("src", "./images/captura/pelicula_noct.svg") : cinta.setAttribute("src", "./images/captura/pelicula.svg")

  let textosNegros = document.getElementsByClassName("textoNegro")
  for (let t of textosNegros) {
    t.classList.toggle("textoBlanco")
  }

  let botonesRedondeados = document.getElementsByClassName("botonRedondeado")
  for (let bot of botonesRedondeados) {
    bot.classList.toggle("botonRedondeadoNocturno")
  }

  cerrarNav();
}
