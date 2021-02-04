
"use strict";
/*
1-MENÚ DESPLEGABLE
2-BARRA BÚSQUEDA (SUGERENCIAS Y RESULTADOS)
3-TRENDING (TEXTO Y GIFS)
4-CALESITA y MODAL
5-ENLACES A SECCIONES
6-CAPTURAR GIF
7-FUNCIONES AUXILIARES Y OTROS
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
  b(busqueda, 12)
  localStorage.setItem("limite", 12)
  }

  
document.getElementById("verMasGif").addEventListener("click", ExpandirLimite);
  function ExpandirLimite(e) {
    let limite = +localStorage.getItem("limite");
    limite += 12;
    localStorage.setItem("limite", limite);
    e.preventDefault() //Para prevenir reload
    busqueda = localStorage.getItem("busqueda") 
    buscar(busqueda, limite)
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
  buscar(busqueda, 12);
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
  let contenedorImagen = document.createElement("DIV");
  contenedorImagen.className = "contenedorImagenTrending"

  let imagen = document.createElement("IMG");
  imagen.src = gif.images.fixed_height.webp;
  imagen.data_url = gif.images.original.url;
  imagen.data_titulo = gif.title;
  imagen.data_usuario = gif.username;
  imagen.className = "gifTrending";
  imagen.id = gif.id;
  contenedorImagen.append(imagen);

  document.getElementById("contenedorTrending").appendChild(contenedorImagen);
  activarModalesTrending()
}

}
/*********************************
4-CALESITA y MODAL
*********************************/

let contenedor = document.getElementById("contenedorTrending");
let corredor = 0;
let calesitaGirando = setInterval(clicDerecho, 20000); //***********AJUSTAR*********** */

document.getElementById("flechaIzquierda").addEventListener("click", clicIzquierdo);

let corredor2;

function clicIzquierdo(){
    corredor += 164;
    corredor <= 0 ? corredor2 = corredor + "px" : corredor2 = corredor = 0;
    corredor2 = corredor + "px"
    contenedor.style.marginLeft = corredor2;
}

document.getElementById("flechaDerecha").addEventListener("click", clicDerecho);

function clicDerecho(){
    corredor -= 164;
    corredor >= -1640 ? corredor2 = corredor + "px" : corredor2 = corredor = 0;
    contenedor.style.marginLeft = corredor2;
}


let idActivo = "";
let urlActivo = "";
let enlaceActivo = "";
let tituloActivo = "";
let usuarioActivo = "";


function activarModalesTrending() {
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

 function activarModalesOtros() {
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

  idActivo = this.firstChild.id;
  urlActivo = this.firstChild.src;
  enlaceActivo = this.firstChild.data_url;
  usuarioActivo = this.firstChild.data_usuario;
  tituloActivo = this.firstChild.data_titulo;

  let imagen = document.getElementById(this.firstChild.id)
  imagen.parentNode.style.background = "rgba(87, 46, 229, 0.5)"
  imagen.style.opacity = "0.3"
  
  let contenedorIconosModal = document.createElement("DIV");
  contenedorIconosModal.className = "contenedorIconosModal"

  let descargar = document.createElement("A");
  descargar.setAttribute("href", "javascript:void(0)");
  descargar.className = "iconoEnOverlayDescargar";
  descargar.addEventListener("click", descargarGif) 

  let favorito = document.createElement("A");
  favorito.setAttribute("href", "javascript:void(0)");
  favorito.className = "iconoEnOverlayFavorito";
  favorito.addEventListener("click", guardarGifFavorito) 
  
  let pantallaCompleta = document.createElement("A");
  pantallaCompleta.setAttribute("href", "javascript:void(0)");
  pantallaCompleta.className = "iconoEnOverlayPantallaCompleta";
  pantallaCompleta.addEventListener("click", modalGifMobDisplay) 

  
  imagen.parentNode.append(descargar, favorito, pantallaCompleta);
  imagen.append(contenedorIconosModal)
  
}


function cerrarModalGifDesk() {
  let imagen = document.getElementById(this.firstChild.id)
  let contenedor = (this);
  contenedor.style.background = "none"
  imagen.style.opacity = "1"
  let subcontenedor = document.getElementsByClassName("contenedorIconosModal")
  imagen.firstChild.remove()
  let iconosObsoletos = contenedor.getElementsByTagName("A")
     for (let i = iconosObsoletos.length - 1 ; i >= 0; i--) {
      contenedor.removeChild(iconosObsoletos[i]); }
  } 

function modalGifMob() {
  idActivo = this.id;
  urlActivo = this.src;
  enlaceActivo = this.data_url;
  usuarioActivo = this.data_usuario;
  tituloActivo = this.data_titulo;
  clearInterval(calesitaGirando)
  modalGifMobDisplay()
}

  function modalGifMobDisplay() {
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
  contenedorModal.classList.add("modalGifContenedor");
  contenedorModal.append(imagenModal, usuario, titulo);
  document.getElementById("cerrarModal").style.display = "initial";
  document.getElementById("guardarGif").style.display = "initial";
  document.getElementById("descargarGif").style.display = "initial";
}

document.getElementById("cerrarModal").addEventListener("click", cerrarModalGif);

function cerrarModalGif() {
  document.getElementById("modalAbierto").remove();
  document.getElementById("modal").classList.remove("modalGifContenedor");
  let cerrador = document.getElementById("cerrarModal");
  cerrador.style.display = "none";
  calesitaGirando = setInterval(clicDerecho, 2000)
}

document.getElementById("guardarGif").addEventListener("click", guardarGifFavorito);

function guardarGifFavorito() {
  localStorage.getItem("gifFavorito"+idActivo) ? null : localStorage.setItem("gifFavorito"+idActivo, idActivo)
}


document.getElementById("descargarGif").addEventListener("click", descargarGif);

function descargarGif() {
  fetch(urlActivo)
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
  document.getElementById("trendingGifos").style.display = "none";


  let cantidadFavoritos = 0
  for (let i = 0; i < localStorage.length; i++) {
    let llave = localStorage.key(i);
    if (llave.match(/gifFavorito/)) {
    let gifId = localStorage.getItem(llave)
    mostrarGiphyNoBusqueda(gifId, "contenedorFavoritos")
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
  document.getElementById("trendingGifos").style.display = "none";

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
  document.getElementById("trendingGifos").style.display = "none";
  }



document.getElementById("logo").addEventListener("click", mostrarInicio)

function mostrarInicio() {
  cerrarNav()
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

}
/********************
6-CAPTURAR GIF
*******************/
{
let video = document.getElementById("video")
let archivo;
let recorder;
let blobGrabado;


document.getElementById("comenzarCaptura").addEventListener("click", mostrarVideo)


  function mostrarVideo () {
    document.getElementById("comenzarCaptura").style.display = "none";
    document.getElementById("permisoCaptura").style.display = "initial";
    document.getElementById("paso1").setAttribute("src", "./images/captura/paso_1_active.svg")
    document.getElementById("iniciarCaptura").style.display = "none";
    document.getElementById("textoCaptura").style.display = "none";
    empezarCaptura()
    
      
    function empezarCaptura() {
    
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

     document.getElementById("permisoCaptura").style.display = "none";
     document.getElementById("iniciarCaptura").style.display = "block";
     document.getElementById("video").style.display = "initial";
     document.getElementById("paso1").setAttribute("src", "./images/captura/paso_1.svg")
     document.getElementById("paso2").setAttribute("src", "./images/captura/paso_2_active.svg")
   
    }}



function captureCamera(callback) {
  navigator.mediaDevices.getUserMedia({ video: true }).then(function(camera) {
      callback(camera);
  }).catch(function(error) {
      alert("Unable to capture your camera. Please check console logs.");
      console.error(error);
  });
}

function stopRecordingCallback() {
  //video.src = URL.createObjectURL(recorder.getBlob());
  recorder.camera.stop();
  // blob = new Blob(recorder.getBlob()) //arreglar
}


document.getElementById("iniciarCaptura").addEventListener("click", aGrabar)

function aGrabar() {
  captureCamera(function(camera) {
    recorder = RecordRTC(camera, {
    type: "gif",
    frameRate: 1,
    quality: 10,
    width: 360,
    hidden: 240,
    onGifRecordingStarted: function() {
      console.log("started")
    }
  });

  recorder.startRecording();
  recorder.camera = camera;
});

contador()
document.getElementById("iniciarCaptura").style.display = "none";
document.getElementById("finalizarCaptura").style.display = "block";
document.getElementById("cronometro").style.display = "initial";
document.getElementById("repetirCaptura").style.display = "none";

};



document.getElementById("finalizarCaptura").addEventListener("click", finalizarCaptura)

function finalizarCaptura() {
  clearInterval(contar)
  recorder.stopRecording(stopRecordingCallback);
  document.getElementById("finalizarCaptura").style.display = "none";
  document.getElementById("subirCaptura").style.display = "block";
  document.getElementById("minutos").style.display = "none";
  document.getElementById("segundos").style.display = "none";
  document.getElementById("separadorReloj").style.display = "none";
  document.getElementById("repetirCaptura").style.display = "initial";
}

document.getElementById("repetirCaptura").addEventListener("click", RepetirCaptura)

function RepetirCaptura() {
  document.getElementById("subirCaptura").style.display = "none";
  document.getElementById("minutos").style.display = "initial";
  document.getElementById("separadorReloj").style.display = "initial";
  document.getElementById("segundos").style.display = "initial";
  aGrabar()

}


document.getElementById("subirCaptura").addEventListener("click", subirGif) 



function subirGif() {
document.getElementById("repetirCaptura").style.display = "none";
document.getElementById("contenedorVideo").style.background = "rgba(87, 46, 229, 0.8)";
document.getElementById("textoSubida").style.display = "initial";
document.getElementById("video").style.opacity = "0.5";
document.getElementById("subirCaptura").style.display = "none";
document.getElementById("paso2").setAttribute("src", "./images/captura/paso_2.svg")
document.getElementById("paso3").setAttribute("src", "./images/captura/paso_3_active.svg")
document.getElementById("statusSubida").style.display = "initial";

blobGrabado = recorder.getBlob()
archivo = new FormData();
archivo.append("file", recorder.getBlob(), "gifParaSubir.gif");

let urlSubir = "https://upload.giphy.com/v1/gifs" 
+"?api_key=uTnjhcYC0B52sTn6MzoPXGkdJ6yxZgYQ"

fetch(urlSubir, {
  method: "POST",
  body: archivo,
})
  .then(res => res.json())
  .catch(error => console.log(error))
  .then(({ data }) => guardarGifSubidoYLimpiar(data))



}

function guardarGifSubidoYLimpiar(data) {
  localStorage.getItem("gifSubido"+data.id) ? null : localStorage.setItem("gifSubido"+data.id, data.id)
  document.getElementById("textoSubida").innerText = "GIFO subido con éxito";
  document.getElementById("statusSubida").setAttribute("src", "./images/ok.svg");
  recorder.destroy();
  recorder = null;
  document.getElementById("contenedorVideo").addEventListener("mouseenter", mostrarIconosSubida) 
  document.getElementById("descargarGifSubido").addEventListener("click", descargarGifSubido) 
  document.getElementById("enlazarGifSubido").addEventListener("click", enlazarGifSubido) 
  console.log(data.id)

  function mostrarIconosSubida() {
    document.getElementById("iconosSubida").style.display = "initial"
  }

  function descargarGifSubido() {
    invokeSaveAsDialog(blobGrabado, "MiGifo.gif");
  }

  function enlazarGifSubido() {
    alert(`http://www.giphy.com/gifs/${data.id}`)
  }

  //  fetch(urlActivo)
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       const urlAux = window.URL.createObjectURL(new Blob([blob]));
  //       const AAux = document.createElement("A");
  //       AAux.href = urlAux;
  //       AAux.setAttribute("download", "GifBajado.gif");
  //       document.body.appendChild(AAux);
  //       AAux.click();
  //       AAux.parentNode.removeChild(AAux);
  //     })

  }
}


/********************
7-FUNCIONES AUXILIARES Y OTROS
*******************/

function mayusculizar(palabras) {
  palabras = palabras.split(" ");
  palabras = palabras.map((word, index) => word[0].toUpperCase() + word.slice(1));
  palabras = palabras.join(" ")
  return palabras 
}

function buscar (busqueda, limiteBusqueda) {
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
      pagination.total_count >= limiteBusqueda ? hayMas = true : hayMas = false;
      hayMas ? document.getElementById("verMasGif").style.display = "initial" : document.getElementById("verMasGif").style.display = "none";
    }
    });
    
  }

function mostrarGiphyBusqueda (gif) {
  let contenedorImagen = document.createElement("DIV");
  contenedorImagen.className = "contenedorImagen"

  let imagen = document.createElement("IMG");
  imagen.src = gif.images.fixed_height.webp;
  imagen.data_url = gif.images.original.url;
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
    +"?api_key=uTnjhcYC0B52sTn6MzoPXGkdJ6yxZgYQ"
    +"&ids="
    +gif

    fetch(urlRecuperar)
      .then(res => res.json())
      .then(({ data }) => data.map(mostrarGiphyNoBusquedaAux))

function mostrarGiphyNoBusquedaAux(gif2) {

  let contenedorImagen = document.createElement("DIV");
  contenedorImagen.className = "contenedorImagen"

  let imagen = document.createElement("IMG");
  imagen.src = gif2.images.fixed_height.webp;
  imagen.data_url = gif2.images.original.url;
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
