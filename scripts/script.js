
"use strict";
/*
1-MENÚ DESPLEGABLE
2-BARRA BÚSQUEDA (SUGERENCIAS Y RESULTADOS)
3-TRENDING (TEXTO Y GIFS)
4-CALESITA y MODAL
5-ENLACES INICIO FAVORITOS y MIS GIFOS
6-CAPTURAR GIF
7-FUNCIONES AUXILIARES Y GENERALES
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
  if (window.matchMedia("(max-width: 768px)").matches) {
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
  document.getElementById("trendingGIFOS").classList.toggle("backgroundOscuroNocturno");
  document.getElementById("facebook").classList.toggle("iconoFBNocturno");
  document.getElementById("twitter").classList.toggle("iconoTWNocturno");
  document.getElementById("instagram").classList.toggle("iconoIGNocturno");
  document.getElementById("cerrarModal").classList.toggle("textoNocturno");
  document.getElementById("barraBusqueda").classList.toggle("barraNocturna");
  document.getElementById("formulario").classList.toggle("formNocturno");
  document.getElementById("iconoBusqueda").classList.toggle("iconoBusquedaNocturno");
  document.getElementById("logo").classList.toggle("logoNocturno")
  
  let burger = document.getElementById("abrirMenu"); let burgeraux = burger.getAttribute("src")
  burgeraux === "./images/burger.svg" ? burger.setAttribute("src", "./images/burger_noct.svg") : burger.setAttribute("src", "./images/burger.svg")

  let cerrar = document.getElementById("cerrarMenu"); let cerraraux = cerrar.getAttribute("src")
  cerraraux === "./images/close.svg" ? cerrar.setAttribute("src", "./images/close_noct.svg") : cerrar.setAttribute("src", "./images/close.svg")

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
}

/*********************************
2-BARRA BÚSQUEDA (SUGERENCIAS Y RESULTADOS)
*********************************/
{
document.getElementById("barraBusqueda").addEventListener("keyup", sugerencias);

function sugerencias() {
  let sugerencia = document.getElementById("barraBusqueda").value; 
  let cantidadMaximaSugerencias = 5;

  // if (sugerencia.length > 2) {}

    document.getElementById("busquedasSugeridas").innerHTML = "";
    document.getElementById("busquedasSugeridas").style.display = "initial";

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

function buscarSugerencias() {
  let busqueda = this.innerText;
  Buscar(busqueda, 12);
  document.getElementById("busquedasSugeridas").innerHTML = ""; 
  }


document.getElementById("iconoBusqueda").addEventListener("click", buscarBarra);
let formulario = document.getElementsByName("formulario");
formulario[0].addEventListener("submit", buscarBarra);

function buscarBarra(e) {
  e.preventDefault() //Para prevenir reload
  let busqueda = document.getElementById("barraBusqueda").value;
  localStorage.setItem("busqueda", busqueda) 
  Buscar(busqueda, 12)
  localStorage.setItem("limite", 12)
  }

  
document.getElementById("verMasGif").addEventListener("click", ExpandirLimite);
  function ExpandirLimite(e) {
    let limite = +localStorage.getItem("limite");
    limite += 12;
    localStorage.setItem("limite", limite);
    e.preventDefault() //Para prevenir reload
    busqueda = localStorage.getItem("busqueda") 
    Buscar(busqueda, limite)
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
  Buscar(busqueda, 12);
  localStorage.setItem("limite", 12)
  }


let urlGIFTrending = "https://api.giphy.com/v1/gifs/trending?" 
+"api_key=uTnjhcYC0B52sTn6MzoPXGkdJ6yxZgYQ"
+"&limit=12"

fetch(urlGIFTrending)
  .then(res => res.json())
  //.then(({ data }) => console.log(data))
  .then(({ data }) => data.map(mostrarTrending))

function mostrarTrending (gif) {
  let imagen = document.createElement("IMG");
  imagen.src = gif.images.fixed_height.webp;
  imagen.data_url = gif.images.original.url;
  imagen.data_titulo = gif.title;
  imagen.data_usuario = gif.username;
  imagen.className = "gifChico";
  imagen.append(document.createElement("SPAN"))
  imagen.id = gif.id
  document.getElementById("contenedorTrending").appendChild(imagen);
  activarModales()
}

}
/*********************************
4-CALESITA y MODAL
*********************************/

let contenedor = document.getElementById('contenedorTrending');
let corredor = 0;
let calesitaGirando = setInterval(clicDerecho, 2000);

document.getElementById("flechaIzquierda").addEventListener("click", clicIzquierdo);

let corredor2;

function clicIzquierdo(){
    corredor += 164;
    corredor2 = corredor + "px"
    contenedor.style.marginLeft = corredor2;
}

document.getElementById("flechaDerecha").addEventListener("click", clicDerecho);

function clicDerecho(){
    corredor -= 164;
    corredor >= -1804 ? corredor2 = corredor + "px" : corredor2 = corredor = 0;
    contenedor.style.marginLeft = corredor2;
}


// setTimeout(activarModales, 1000)

let idActivo = "";
let urlActivo = "";
let enlaceActivo = "";
let tituloActivo = "";
let usuarioActivo = "";


function activarModales() {
  const gifs = document.querySelectorAll(".gifChico")
  for (let gif of gifs) { gif.addEventListener("click", modalGif) };
 }
  
function modalGif() {
  idActivo = this.id;
  urlActivo = this.src;
  enlaceActivo = this.data_url;
  usuarioActivo = this.data_usuario;
  tituloActivo = this.data_titulo;
  console.log(tituloActivo)

  let imagenModal = document.createElement("IMG");
  imagenModal.src = urlActivo;
  imagenModal.className = "modalGifImagen";
  imagenModal.id = "modalAbierto"
  let titulo = document.createElement("P");
  titulo.append(document.createTextNode(usuarioActivo))
  titulo.className = "epigrafeModal"
  let usuario = document.createElement("P");
  usuario.append(document.createTextNode(tituloActivo))
  usuario.className = "epigrafeModal"

  
  let contenedorModal = document.getElementById("modal");
  let textoViejo = contenedorModal.getElementsByTagName("p")
    for (let i = textoViejo.length - 1 ; i >= 0; i--) {
      contenedorModal.removeChild(textoViejo[i]); }
    console.log(contenedorModal, textoViejo)
  contenedorModal.classList.add("modalGifContenedor");
  contenedorModal.append(imagenModal, usuario, titulo);
  document.getElementById("cerrarModal").style.display = "initial";
  document.getElementById("guardarGif").style.display = "initial";
  document.getElementById("descargarGif").style.display = "initial";

  clearInterval(calesitaGirando)
}

document.getElementById("cerrarModal").addEventListener("click", cerrarModalGif);

function cerrarModalGif() {
  document.getElementById("modalAbierto").remove();
  document.getElementById("modal").classList.remove("modalGifContenedor");
  let cerrador = document.getElementById("cerrarModal");
  cerrador.style.display = "none";
  calesitaGirando = setInterval(clicDerecho, 2000)
}

document.getElementById("guardarGif").addEventListener("click", GuardarGif);
function GuardarGif() {
  localStorage.setItem("gifFavorito"+Id(), urlActivo)
}


const Id = GenerarId()

function GenerarId() {
    let i = 0; 
    return function GenerarIdAux(){ return i++}
}

document.getElementById("descargarGif").addEventListener("click", DescargarGif);

function DescargarGif() {
  fetch(urlActivo)
  .then((response) => response.blob())
  .then((blob) => {
    const urlAux = window.URL.createObjectURL(new Blob([blob]));
    const AAux = document.createElement("A");
    AAux.href = urlAux;
    AAux.setAttribute('download', `GifBajado.gif`);
    document.body.appendChild(AAux);
    AAux.click();
    AAux.parentNode.removeChild(AAux);
  })
}



/*********************************
5- ENLACES A SECCIONES
*********************************/
{


document.getElementById("enlaceFavoritos").addEventListener("click", mostrarFavoritos)

function mostrarFavoritos() {
  cerrarNav()
  document.getElementById("contenedorFavoritos").innerHTML = "";
  document.getElementById("favoritos").style.display = "initial";
  document.getElementById("misGifos").style.display = "none";
  document.getElementById("captura").style.display = "none";
  document.getElementById("busqueda").style.display = "none";
  document.getElementById("resultadosBusqueda").style.display = "none";
  document.getElementById("trendingGIFOS").style.display = "none";


  let cantidadFavoritos = 0
  for (let i = 0; i < localStorage.length; i++) {
    let llave = localStorage.key(i);
    if (llave.match(/gifFavorito/)) {
    let src = localStorage.getItem(llave)
    mostrarGiphyNoBusqueda(src, "contenedorFavoritos")
    cantidadFavoritos++
    }
  }
  cantidadFavoritos === 0 ? sinFavoritos() : null;
 }

document.getElementById("enlaceMisGifos").addEventListener("click", mostrarMisGifos)

function mostrarMisGifos() {
  cerrarNav()
  document.getElementById("contenedorMisGifos").innerHTML = "";
  document.getElementById("favoritos").style.display = "none";
  document.getElementById("misGifos").style.display = "initial";
  document.getElementById("captura").style.display = "none";
  document.getElementById("busqueda").style.display = "none";
  document.getElementById("resultadosBusqueda").style.display = "none";
  document.getElementById("trendingGIFOS").style.display = "none";

  let cantidadMisGifos = 0 
  for (let i = 0; i < localStorage.length; i++) {
    let llave = localStorage.key(i);
    if (llave.match(/gifSubido/)) {
    let src = localStorage.getItem(llave)
    mostrarGiphyNoBusqueda(src, "contenedorMisGifos")
    cantidadMisGifos++
    }
  }
  cantidadMisGifos === 0 ? sinMisGifos() : null;
}

document.getElementById("enlaceCaptura").addEventListener("click", mostrarCaptura)

function mostrarCaptura() {
  cerrarNav()
  document.getElementById("contenedorFavoritos").innerHTML = "";
  document.getElementById("favoritos").style.display = "none";
  document.getElementById("misGifos").style.display = "none";
  document.getElementById("captura").style.display = "initial";
  document.getElementById("busqueda").style.display = "none";
  document.getElementById("resultadosBusqueda").style.display = "none";
  document.getElementById("trendingGIFOS").style.display = "none";
  }



document.getElementById("logo").addEventListener("click", mostrarInicio)

function mostrarInicio() {
  cerrarNav()
  document.getElementById("busqueda").style.display = "initial";
  document.getElementById("trendingGIFOS").style.display = "initial";
  document.getElementById("favoritos").style.display = "none";
  document.getElementById("misGifos").style.display = "none";
  document.getElementById("resultadosBusqueda").style.display = "none";
  document.getElementById("captura").style.display = "none";

}

function cerrarNav() {
  if (window.matchMedia("(max-width: 768px)").matches) {
  document.getElementById("menu").style.width = "0%";
  document.getElementById("abrirMenu").style.display = "inline";
  document.getElementById("cerrarMenu").style.display = "none";
}
}

}
/********************
6-CAPTURAR GIF
*******************/
{
let video = document.getElementById("video")

document.getElementById("comenzarCaptura").addEventListener("click", mostrarVideo)


  function mostrarVideo () {
    document.getElementById("comenzarCaptura").style.display = "none";
    document.getElementById("iniciarCaptura").style.display = "initial";
    document.getElementById("video").style.display = "initial";
    document.getElementById("textoCaptura").style.display = "none";

 
 
    navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
       height: { max: 480 }
    }
    })
  .then(function(stream) {
      video.srcObject = stream;
      video.play()
 })
}

function captureCamera(callback) {
  navigator.mediaDevices.getUserMedia({ video: true }).then(function(camera) {
      callback(camera);
  }).catch(function(error) {
      alert('Unable to capture your camera. Please check console logs.');
      console.error(error);
  });
}

function stopRecordingCallback() {
  video.src = URL.createObjectURL(recorder.getBlob());
  recorder.camera.stop();
  let blob = recorder.getBlob()
  subirGif(blob)
  // recorder.destroy();
  // recorder = null;
}

let recorder;

document.getElementById("iniciarCaptura").addEventListener("click", aGrabar)

function aGrabar() {
  this.disabled = true;
  captureCamera(function(camera) {
    recorder = RecordRTC(camera, {
    type: 'gif',
    frameRate: 1,
    quality: 10,
    width: 360,
    hidden: 240,
    onGifRecordingStarted: function() {
      console.log('started')
    }
  });

  recorder.startRecording();
  recorder.camera = camera;
});
};

document.getElementById("finalizarCaptura").addEventListener("click", function() {
  this.disabled = true;
  recorder.stopRecording(stopRecordingCallback);
})


function subirGif(captura) {

let archivo = new FormData();
archivo.append('file', recorder.getBlob(), 'gifParaSubir.gif');

let urlSubir = "https://upload.giphy.com/v1/gifs" 
+"?api_key=uTnjhcYC0B52sTn6MzoPXGkdJ6yxZgYQ"

fetch(urlSubir, {
  method: "POST",
  mode: "no-cors",
  body: archivo,
  json: true
})
  .then(result => console.log(result))
  .catch(error => console.log(error))

}



}
/********************
7-FUNCIONES AUXILIARES Y GENERALES
*******************/

function mayusculizar(palabras) {
  palabras = palabras.split(" ");
  palabras = palabras.map((word, index) => word[0].toUpperCase() + word.slice(1));
  palabras = palabras.join(" ")
  return palabras 
}

function Buscar (busqueda, limiteBusqueda) {
  let hayMas = false;
  let limite = limiteBusqueda;
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
      console.log(pagination.total_count, limiteBusqueda, pagination.total_count >= limiteBusqueda);
      pagination.total_count >= limiteBusqueda ? hayMas = true : hayMas = false;
      hayMas ? document.getElementById("verMasGif").style.display = "initial" : document.getElementById("verMasGif").style.display = "none";
    }
    });
    
  }

function mostrarGiphyBusqueda (gif) {
  let imagen = document.createElement("IMG");
  imagen.src = gif.images.fixed_height.webp;
  imagen.className = "gifChico";
  document.getElementById("contenedorBusqueda").appendChild(imagen);
  activarModales()

  }

function mostrarGiphyNoBusqueda (gif, puntoInsercion) {
  let imagen = document.createElement("IMG");
  imagen.src = gif;
  imagen.className = "gifChico";
  document.getElementById(puntoInsercion).appendChild(imagen);
  activarModales()

  }
  
function sinResultados() {
  let imagen = document.createElement("IMG");
  imagen.src = "./images/icon_busqueda_sin_resultados.svg";
  imagen.className = "mensajeResultadosGrid";
  let texto = document.createElement("P");
  texto.innerText = "Intenta con otra búsqueda.";
  texto.className = "mensajeResultadosGrid";
  texto.classList.add("textoVerdeResultados");
  document.getElementById("contenedorBusqueda").append(imagen, texto);

}


function sinFavoritos() {
  let imagen = document.createElement("IMG");
  imagen.src = "./images/icon_favoritos_sin_contenido.svg";
  let texto = document.createElement("P");
  texto.innerText = "¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!";
  texto.className = "mensajeResultadosSinGrid";
  texto.classList.add("textoVerdeResultados");
  document.getElementById("contenedorFavoritos").append(imagen, texto);

}

function sinMisGifos() {
  let imagen = document.createElement("IMG");
  imagen.src = "./images/icon_mis_gifos_sin_contenido.svg";
  let texto = document.createElement("P");
  texto.innerText = "¡Anímate a crear tu primer GIFO!";
  texto.className = "mensajeResultadosSinGrid";
  texto.classList.add("textoVerdeResultados");
  document.getElementById("contenedorMisGifos").append(imagen, texto);

}