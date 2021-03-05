"use strict";
let gifsEnDisplay;
let gifsEnDisplayTrending;


// Constantes
const APIKEY = "uTnjhcYC0B52sTn6MzoPXGkdJ6yxZgYQ"



function mayusculizar(palabras) {
  palabras = palabras.split(" ");
  palabras = palabras.map((word) => word[0].toUpperCase() + word.slice(1));
  palabras = palabras.join(" ")
  return palabras 
}

function buscar (busqueda, limiteBusqueda) {
  let hayMas = false;
  let limite = 12;
  let desplazamiento = limiteBusqueda - 12; 
  document.getElementById("resultadosBusqueda").style.display = "initial";
  document.getElementById("tituloBusqueda").innerHTML = busqueda
  if (limiteBusqueda === 12 ) {
  let vaciar = document.getElementById("contenedorBusqueda");
  vaciar.textContent = ""; 
}
   
  let urlBusqueda = "https://api.giphy.com/v1/gifs/search?" 
  +"api_key="
  +APIKEY
  +"&q="
  +busqueda
    +"&lang=es"
  +"&limit="
  +limite
  +"&offset="
  +desplazamiento
  
  fetch(urlBusqueda)
    .then(resultado => {
      if (resultado.status === 200) {
        return resultado.json(); 
      }else {
        console.log("Hubo un problema con la búsqueda")
      }
      })
    .then(({ pagination, data }) => {
      if (data.length === 0) {sinResultados()
    } else { data.map(mostrarGiphyBusqueda);
      pagination.total_count >= limiteBusqueda ? hayMas = true : hayMas = false;
      hayMas ? document.getElementById("verMasGif").style.display = "initial" : document.getElementById("verMasGif").style.display = "none";
    }
    });   
  }

function mostrarGiphyBusqueda (gif) {
  gifsEnDisplay.push(gif)
  let contenedorImagen = document.createElement("DIV");
  contenedorImagen.className = "contenedorImagen"

  let imagen = document.createElement("IMG");
  imagen.src = gif.images.fixed_width.url;
  imagen.data_titulo = gif.title;
  imagen.data_usuario = gif.username;
  imagen.id = gif.id;
  imagen.className = "gifChico";
  contenedorImagen.append(imagen)
  document.getElementById("contenedorBusqueda").appendChild(contenedorImagen);
  activarModalesOtros()
}

function mostrarGiphyNoBusqueda (gif, puntoInsercion) {
  let urlRecuperar = "https://api.giphy.com/v1/gifs" 
  +"?api_key="
  +APIKEY
  +"&ids="
  +gif

  fetch(urlRecuperar)
    .then(res => res.json())
    .then(({ data }) => data.map(mostrarGiphyNoBusquedaAux))

  function mostrarGiphyNoBusquedaAux(gif2) {
    gifsEnDisplay.push(gif2)
    let contenedorImagen = document.createElement("DIV");
    contenedorImagen.className = "contenedorImagen"

    let imagen = document.createElement("IMG");
    imagen.src = gif2.images.fixed_width.url;
    imagen.data_titulo = gif2.title;
    imagen.data_usuario = gif2.username;
    imagen.id = gif2.id;
    imagen.className = "gifChico";

    contenedorImagen.append(imagen)
    document.getElementById(puntoInsercion).appendChild(contenedorImagen);
    activarModalesOtros()
  }
}
  
function sinResultados() {
  let imagen = document.createElement("IMG");
  imagen.src = "./images/icon_busqueda_sin_resultados.svg";
  imagen.classList.add("mensajeResultadosGrid", "centradoMargin")

  let texto = document.createElement("P");
  texto.innerText = "Intenta con otra búsqueda.";
  texto.className = "mensajeResultadosGrid";
  texto.classList.add("textoVerdeResultados");
  document.getElementById("contenedorBusqueda").append(imagen, texto);
}

function sinFavoritos() {
  let imagen = document.createElement("IMG");
  imagen.src = "./images/icon_favoritos_sin_contenido.svg";
  imagen.classList.add("mensajeResultadosGrid", "centradoMargin")

  let texto = document.createElement("P");
  texto.innerText = "¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!";
  texto.className = "mensajeResultadosGrid";
  texto.classList.add("textoVerdeResultados");
  document.getElementById("contenedorFavoritos").append(imagen, texto);
}

function sinMisGifos() {
  let imagen = document.createElement("IMG");
  imagen.src = "./images/icon_mis_gifos_sin_contenido.svg";
  imagen.classList.add("mensajeResultadosGrid", "centradoMargin")

  let texto = document.createElement("P");
  texto.innerText = "¡Anímate a crear tu primer GIFO!";
  texto.className = "mensajeResultadosGrid";
  texto.classList.add("textoVerdeResultados");
  document.getElementById("contenedorMisGifos").append(imagen, texto);
}

let contar = "";

function contador() {
  let tiempo = 0;
  contar = setInterval( function(){
    tiempo++;
    document.getElementById("segundos").innerHTML = acomodar(tiempo%60);
    document.getElementById("minutos").innerHTML = acomodar(parseInt(tiempo/60));
  }, 1000);

  function acomodar(numero) { 
    numero = "00" + numero;
    return numero.slice(-2)
  }
}