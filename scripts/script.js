
/*
1-MENÚ DESPLEGABLE
2-BARRA BÚSQUEDA (SUGERENCIAS Y RESULTADOS)
3-TRENDING (TEXTO Y GIFS)
4-CALESITA
5-ENLACES INICIO FAVORITOS y MIS GIFOS
6-MODAL
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
  e.preventDefault() //Para prevenir reload
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
  .catch(error => console.log("Hubo un problema al cargar los temas trending: " + error))

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
  imagen.src = gif.images.fixed_height.webp;
  imagen.data = gif.images.original.url;
  imagen.className = "gifChico";
  imagen.id = gif.id
  document.getElementById("contenedorTrending").appendChild(imagen);
}

}
/*********************************
4-CALESITA y MODAL
*********************************/
{
let contenedor = document.getElementById('contenedorTrending');
let corredor = 0;
let calesitaGirando = setInterval(clicDerecho, 2000);

document.getElementById("flechaIzquierda").addEventListener("click", clicIzquierdo);

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


setTimeout(activarModales, 1000)

let idActivo = "";
let urlActivo = "";

function activarModales() {
  const gifs = document.querySelectorAll(".gifChico")
  for (let gif of gifs) { gif.addEventListener("click", modalGif) };
 }
  
function modalGif() {
  idActivo = this.id;
  urlActivo = this.src;
  enlaceActivo = this.data;
  let imagenModal = document.createElement("IMG");
  imagenModal.src = urlActivo;
  imagenModal.className = "modalGifImagen";
  imagenModal.id = "modalAbierto"
  let contenedorModal = document.getElementById("modal");
  contenedorModal.classList.add("modalGifContenedor");
  contenedorModal.appendChild(imagenModal);
  document.getElementById("cerrarModal").style.display = "initial";
  document.getElementById("guardarGif").style.display = "initial";
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
  alert("Gif guardado!")
}


const Id = GenerarId()

function GenerarId() {
    let i = 0; 
    return function GenerarIdAux(){ return i++}
}

document.getElementById("descargarGif").addEventListener("click", DescargarGif);

function DescargarGif() {
console.log(this)
let enlace = document.createElement('A');
enlace.href = enlaceActivo;
enlace.setAttribute("download", "download");
// enlace.download = "MiGif.gif";
document.body.appendChild(enlace);
enlace.click();
document.body.removeChild(enlace);
}



}

/*********************************
5- ENLACES INICIO FAVORITOS, MIS GIFOS y CAPTURA
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
  document.getElementById("trendingGIFOS").style.display = "none";

  for (let i = 0; i < localStorage.length; i++) {
    let llave = localStorage.key(i);
    if (llave < "gifS") {
    let src = localStorage.getItem(llave)
    mostrarGiphyNoBusqueda(src, "contenedorFavoritos")
    }
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
  document.getElementById("trendingGIFOS").style.display = "none";

  for (let i = 0; i < localStorage.length; i++) {
    let llave = localStorage.key(i);
    if (llave >= "gifS") {
    let src = localStorage.getItem(llave)
    mostrarGiphyNoBusqueda(src, "contenedorMisGifos")
    }
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
  document.getElementById("trendingGIFOS").style.display = "none";
  }



document.getElementById("enlaceInicio").addEventListener("click", mostrarInicio)
document.getElementById("logo").addEventListener("click", mostrarInicio)

function mostrarInicio() {
  cerrarNav()
  document.getElementById("busqueda").style.display = "initial";
  document.getElementById("trendingGIFOS").style.display = "initial";
  document.getElementById("favoritos").style.display = "none";
  document.getElementById("misGifos").style.display = "none";

}
}


/********************
6-MODAL /// CAPTURAR GIF
*******************/
{ // prueba moderlo a calesita ****************************
  

//   function getStreamAndRecord () { 
//     navigator.mediaDevices.getUserMedia({
//     audio: false,
//     video: {
//        height: { max: 480 }
//     }
//  })
//  .then(function(stream) {
//     video.srcObject = stream;
//     video.play()
//  })
// }

// document.getElementById("iniciarCaptura").addEventListener("click", capturarGif)

let video = document.getElementById("video")

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
  invokeSaveAsDialog(blob);
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
    .then(resultado => {
      if (resultado.status === 200) {
        return resultado.json(); 
      }else {
        console.log("Hubo un problema con la búsqueda")
      }
      })
    .then(({ data }) => {

    console.log(data)
    if (data.length === 0) {sinResultados()
    } else { data.map(mostrarGiphyBusqueda) }
    });
  }

function mostrarGiphyBusqueda (gif) {
  let imagen = document.createElement('IMG');
  imagen.src = gif.images.fixed_height.webp;
  imagen.className = "gifChico";
  document.getElementById("contenedorBusqueda").appendChild(imagen);
  }

function mostrarGiphyNoBusqueda (gif, puntoInsercion) {
  let imagen = document.createElement('IMG');
  imagen.src = gif;
  imagen.className = "gifChico";
  document.getElementById(puntoInsercion).appendChild(imagen);
  }
  
function sinResultados() {
  let mensaje = document.createElement('P');
  mensaje.innerText = "No se encontraron resultados"
  document.getElementById("contenedorBusqueda").appendChild(mensaje);

}