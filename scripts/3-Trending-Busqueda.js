"use strict";

document.getElementById("barraBusqueda").addEventListener("keyup", sugerencias);
    
    function sugerencias() {
      let sugerencia = document.getElementById("barraBusqueda").value; 
      let cantidadMaximaSugerencias = 5;
    
      document.getElementById("busquedasSugeridas").innerHTML = "";
      document.getElementById("busquedasSugeridas").style.display = "initial";
    
      let urlSugerencias = "https://api.giphy.com/v1/tags/related/" 
      +sugerencia
      +"?api_key="
      +APIKEY
    
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
    
    function buscarSugerencias() {
      let busqueda = this.innerText;
      buscar(busqueda, 12);
      document.getElementById("busquedasSugeridas").innerHTML = ""; 
      }
    
    document.getElementById("iconoBusqueda").addEventListener("click", buscarBarra);
    let formulario = document.getElementsByName("formulario");
    formulario[0].addEventListener("submit", buscarBarra);
    
    function buscarBarra(e) {
      e.preventDefault() //Para prevenir reload
      let busqueda = document.getElementById("barraBusqueda").value;
      localStorage.setItem("busqueda", busqueda) 
      buscar(busqueda, 12)
      localStorage.setItem("limite", 12)
      }
      
    document.getElementById("verMasGif").addEventListener("click", ExpandirLimite);
      function ExpandirLimite(e) {
        let limite = +localStorage.getItem("limite");
        limite += 12;
        localStorage.setItem("limite", limite);
        e.preventDefault() //Para prevenir reload
        let busqueda = localStorage.getItem("busqueda") 
        buscar(busqueda, limite)
        }
    
        let urlTemasTrending = "https://api.giphy.com/v1/trending/searches?" 
+"api_key="
+APIKEY

fetch(urlTemasTrending)
  .then(res => res.json())
  .then(({ data }) => data.map(mostrarTemasTrending))
  .catch(error => console.log("Hubo un problema al cargar los temas trending: " + error))

let cantidadTrending = 0;

function mostrarTemasTrending (tema) {
  tema = mayusculizar(tema)
  cantidadTrending++
  let temaTrending = document.createElement("A");
  temaTrending.id = tema
  temaTrending.addEventListener("click", buscarTrending);
  cantidadTrending < 8 ? temaTrending.innerHTML = tema + " - ":
  cantidadTrending == 8 ? temaTrending.innerHTML = tema: null;
  document.getElementById("temasTrending").appendChild(temaTrending)
}

function buscarTrending() {
  let busqueda = this.id;
  localStorage.setItem("busqueda", busqueda) 
  buscar(busqueda, 12);
  localStorage.setItem("limite", 12)
}

const urlGifTrending = "https://api.giphy.com/v1/gifs/trending?"+"api_key="+APIKEY+"&limit=12"

async function getTrending(urlGifTrending) {
  let resultado = await fetch(urlGifTrending)
  let datos = await resultado.json()
  return datos.data
}

function mostrarTrending (gif) {
  let contenedorImagen = document.createElement("DIV");
  contenedorImagen.className = "contenedorImagenTrending"

  let imagen = document.createElement("IMG");
  imagen.src = gif.images.original.url;
  imagen.data_titulo = gif.title;
  imagen.data_usuario = gif.username;
  imagen.className = "gifTrending";
  imagen.id = gif.id;
  contenedorImagen.append(imagen);

  document.getElementById("contenedorTrending").appendChild(contenedorImagen);
  activarModalesTrending()
}

getTrending(urlGifTrending).then(gifs => {
  gifs.forEach(gif => mostrarTrending(gif));

  gifsEnDisplayTrending = gifs //  gifs.map(gif => gif.images.original.url)
  gifsEnDisplay = gifsEnDisplayTrending
});

