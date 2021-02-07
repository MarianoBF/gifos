
"use strict";
const APIKEY = "uTnjhcYC0B52sTn6MzoPXGkdJ6yxZgYQ"
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
}

/*********************************
2-BARRA BÚSQUEDA (SUGERENCIAS Y RESULTADOS)
*********************************/
{
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
}
/*********************************
3- TRENDING (TEXTO Y GIFS)
*********************************/
{
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

let urlGifTrending = "https://api.giphy.com/v1/gifs/trending?" 
+"api_key="
+APIKEY
+"&limit=12"

fetch(urlGifTrending)
  .then(res => res.json())
  .then(({ data }) => data.map(mostrarTrending))

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

}
/*********************************
4-CALESITA y MODAL
*********************************/

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

  idActivo = this.firstChild.id;
  urlActivo = this.firstChild.src;
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

function borrarGifFavorito() {
  localStorage.removeItem("gifFavorito"+idActivo);
  this.parentNode.remove();
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
  idActivo = this.id;
  urlActivo = this.src;
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
  titulo.append(document.createTextNode(tituloActivo))
  titulo.className = "epigrafeModal"

  let usuario = document.createElement("P");
  usuario.append(document.createTextNode(usuarioActivo))
  usuario.className = "epigrafeModal"
  
  let contenedorModal = document.getElementById("modal");

  let textoViejo = contenedorModal.getElementsByTagName("p");
    for (let i = textoViejo.length - 1 ; i >= 0; i--) {
      contenedorModal.removeChild(textoViejo[i]); }
  
  contenedorModal.classList.add("modalGifContenedor");
  contenedorModal.append(imagenModal, titulo, usuario);
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
  calesitaGirando = setInterval(clicDerecho, 3000)
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
  
  let limiteFavoritos = 12;
  let totalFavoritos = 0;
  let favoritosMostrados = 0;

  for (let i = 0; i < localStorage.length; i++) {
    let llave = localStorage.key(i);
    if (llave.match(/gifFavorito/)) {
      totalFavoritos++} 
    }

  totalFavoritos === 0 ? sinFavoritos() : null;

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

  let limiteMisGifos = 12;
  let totalMisGifos = 0;
  let misGifosMostrados = 0;

  for (let i = 0; i < localStorage.length; i++) {
    let llave = localStorage.key(i);
    if (llave.match(/gifSubido/)) {
      totalMisGifos++} 
    }

    totalMisGifos === 0 ? sinMisGifos() : null;

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
let localStream;

document.getElementById("comenzarCaptura").addEventListener("click", mostrarVideo)

function mostrarVideo () {
  document.getElementById("comenzarCaptura").style.display = "none";
  document.getElementById("paso1").setAttribute("src", "./images/captura/paso_1_active.svg")
  document.getElementById("iniciarCaptura").style.display = "none";
  document.getElementById("textoCaptura").style.display = "none";
  document.getElementById("permisoCaptura").style.display = "initial";
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
      localStream = stream;
      video.play()
      document.getElementById("iniciarCaptura").style.display = "block";
      document.getElementById("permisoCaptura").style.display = "none";
    })

    document.getElementById("video").style.display = "initial";
    document.getElementById("paso1").setAttribute("src", "./images/captura/paso_1.svg")
    document.getElementById("paso2").setAttribute("src", "./images/captura/paso_2_active.svg")
  }
}
    
function captureCamera(callback) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(camera) {callback(camera);})
    .catch(function(error) {
      alert("Hubo un problema al acceder a la cámara");
      console.error(error);
    });
}

function stopRecordingCallback() {
  recorder.camera.stop();
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
  video.pause()

  document.getElementById("repetirCaptura").style.display = "none";
  document.getElementById("contenedorVideo").style.background = "rgba(87, 46, 229, 0.8)";
  document.getElementById("textoSubida").style.display = "initial";
  document.getElementById("video").style.opacity = "0.5";
  document.getElementById("subirCaptura").style.display = "none";
  document.getElementById("paso2").setAttribute("src", "./images/captura/paso_2.svg")
  document.getElementById("paso3").setAttribute("src", "./images/captura/paso_3_active.svg")
  document.getElementById("statusSubida").style.display = "initial";
  document.getElementById("cintaCaptura").style.animationName = "moverCinta"


  blobGrabado = recorder.getBlob()
  archivo = new FormData();
  archivo.append("file", recorder.getBlob(), "gifParaSubir.gif");

  let urlSubir = "https://upload.giphy.com/v1/gifs" 
  +"?api_key="
  +APIKEY

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
 
  recorder.reset();
  recorder.destroy();
  recorder = null;

  document.getElementById("contenedorVideo").addEventListener("mouseenter", mostrarIconosSubida) 
  document.getElementById("descargarGifSubido").addEventListener("click", descargarGifSubido) 
  document.getElementById("enlazarGifSubido").addEventListener("click", enlazarGifSubido) 

  document.getElementById("cerrarCaptura").style.display = "block";
  document.getElementById("cerrarCaptura").addEventListener("click", cerrarVideo)  

  function mostrarIconosSubida() {
    document.getElementById("iconosSubida").style.display = "initial";
  }

  function descargarGifSubido() {
    invokeSaveAsDialog(blobGrabado, "MiGifo.gif");
  }

  function enlazarGifSubido() {
    alert(`El enlace al GIFO subido es el siguiente: http://www.giphy.com/gifs/${data.id}`)
  }
}

function cerrarVideo() {
  document.getElementById("contenedorVideo").style.height = "320px";
  document.getElementById("contenedorVideo").style.width = "480px";
  video.pause();
  video.src = "";
  video.srcObject = null;
  if (localStream)
      localStream.getTracks().forEach(track => track.stop()); 

  setTimeout(function () { location.reload() }, 500);
}
}

/********************
7-FUNCIONES AUXILIARES Y OTROS
*******************/

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
  let contenedorImagen = document.createElement("DIV");
  contenedorImagen.className = "contenedorImagen"

  let imagen = document.createElement("IMG");
  imagen.src = gif.images.original.url;
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

    let contenedorImagen = document.createElement("DIV");
    contenedorImagen.className = "contenedorImagen"

    let imagen = document.createElement("IMG");
    imagen.src = gif2.images.original.url;
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