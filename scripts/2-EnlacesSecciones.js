"use strict";

document.getElementById("enlaceFavoritos").addEventListener("click", mostrarFavoritos)

function mostrarFavoritos() {
  cerrarNav()
  gifsEnDisplay = [];
  document.getElementById("contenedorFavoritos").innerHTML = "";
  document.getElementById("favoritos").style.display = "initial";
  document.getElementById("misGifos").style.display = "none";
  document.getElementById("captura").style.display = "none";
  document.getElementById("busqueda").style.display = "none";
  document.getElementById("resultadosBusqueda").style.display = "none";
  document.getElementById("trendingGifos").style.display = "none";
  
  let limiteFavoritos = 12;
  let totalFavoritos = 0;
  let favoritosMostrados = 0;

  for (let i = 0; i < localStorage.length; i++) {
    let llave = localStorage.key(i);
    if (llave.match(/gifFavorito/)) {
      totalFavoritos++} 
    }

  if (totalFavoritos === 0) {sinFavoritos()
  } else {

    totalFavoritos > limiteFavoritos ? document.getElementById("verMasGifFavs").style.display = "initial" : document.getElementById("verMasGif").style.display = "none";
    document.getElementById("verMasGifFavs").addEventListener("click", asignarCantidad)

    mostrarFavoritosDisplay()

    function mostrarFavoritosDisplay() {
      totalFavoritos < 12 ? limiteFavoritos = totalFavoritos : null;
      document.getElementById("contenedorFavoritos").innerHTML = "";

      for (let i = 0; i < localStorage.length ; i++) {
        let llave = localStorage.key(i);
          if (llave.match(/gifFavorito/)) {
            let gifId = localStorage.getItem(llave);
            mostrarGiphyNoBusqueda(gifId, "contenedorFavoritos")
            favoritosMostrados++}
          if (favoritosMostrados == limiteFavoritos){ break }
      }
    }

    function asignarCantidad() {
      totalFavoritos > limiteFavoritos + 12 ? limiteFavoritos +=12 : limiteFavoritos = totalFavoritos;
      favoritosMostrados = 0; 
      mostrarFavoritosDisplay()
      totalFavoritos > limiteFavoritos ? document.getElementById("verMasGifFavs").style.display = "initial" : document.getElementById("verMasGifFavs").style.display = "none";
    }
  }
}

document.getElementById("enlaceMisGifos").addEventListener("click", mostrarMisGifos)

function mostrarMisGifos() {
  cerrarNav()
  gifsEnDisplay = [];
  document.getElementById("contenedorMisGifos").innerHTML = "";
  document.getElementById("favoritos").style.display = "none";
  document.getElementById("misGifos").style.display = "initial";
  document.getElementById("captura").style.display = "none";
  document.getElementById("busqueda").style.display = "none";
  document.getElementById("resultadosBusqueda").style.display = "none";
  document.getElementById("trendingGifos").style.display = "none";

  let limiteMisGifos = 12;
  let totalMisGifos = 0;
  let misGifosMostrados = 0;

  for (let i = 0; i < localStorage.length; i++) {
    let llave = localStorage.key(i);
    if (llave.match(/gifSubido/)) {
      totalMisGifos++} 
    }

  if (totalMisGifos === 0) {sinMisGifos()
    } else { 

    totalMisGifos > limiteMisGifos ? document.getElementById("verMasMisGifos").style.display = "initial" : document.getElementById("verMasMisGifos").style.display = "none";
    document.getElementById("verMasMisGifos").addEventListener("click", asignarCantidadGifos)

    mostrarMisGifosDisplay()

    function mostrarMisGifosDisplay() {
      document.getElementById("contenedorMisGifos").innerHTML = "";
    
      for (let i = 0; i< localStorage.length; i++) {
        let llave = localStorage.key(i);
        if (llave.match(/gifSubido/)) {
          let gifId = localStorage.getItem(llave);
          mostrarGiphyNoBusqueda(gifId, "contenedorMisGifos");
          misGifosMostrados++}
          if (misGifosMostrados == limiteMisGifos){ break }
        }
    }

    function asignarCantidadGifos() {
      totalMisGifos > limiteMisGifos + 12 ? limiteMisGifos +=12 : limiteMisGifos = totalMisGifos;
      misGifosMostrados = 0; 
      mostrarMisGifosDisplay()
      totalMisGifos > limiteMisGifos ? document.getElementById("verMasMisGifos").style.display = "initial" : document.getElementById("verMasMisGifos").style.display = "none";
    }
  }
}

document.getElementById("enlaceCaptura").addEventListener("click", mostrarCaptura)

function mostrarCaptura() {
  cerrarNav()
  gifsEnDisplay = [];
  document.getElementById("contenedorFavoritos").innerHTML = "";
  document.getElementById("favoritos").style.display = "none";
  document.getElementById("misGifos").style.display = "none";
  document.getElementById("captura").style.display = "initial";
  document.getElementById("busqueda").style.display = "none";
  document.getElementById("resultadosBusqueda").style.display = "none";
  document.getElementById("trendingGifos").style.display = "none";
}

document.getElementById("logo").addEventListener("click", mostrarInicio)

function mostrarInicio() {
  cerrarNav()
  gifsEnDisplay = gifsEnDisplayTrending;
  document.getElementById("busqueda").style.display = "initial";
  document.getElementById("trendingGifos").style.display = "initial";
  document.getElementById("favoritos").style.display = "none";
  document.getElementById("misGifos").style.display = "none";
  document.getElementById("resultadosBusqueda").style.display = "none";
  document.getElementById("captura").style.display = "none";
}

function cerrarNav() {
  if (window.matchMedia("(max-width: 767px)").matches) {
  document.getElementById("menu").style.width = "0%";
  document.getElementById("abrirMenu").style.display = "inline";
  document.getElementById("cerrarMenu").style.display = "none";
  }
}