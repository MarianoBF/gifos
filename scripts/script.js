/*********************************
MENÚ DESPLEGABLE
*********************************/

  function openNav() {
    document.getElementById("menu").style.width = "100%";
    document.getElementById("abrirmenu").style.display = "none";
    document.getElementById("cerrarmenu").style.display = "inline";
  }
 
  function closeNav() {
    document.getElementById("menu").style.width = "0%";
    document.getElementById("abrirmenu").style.display = "inline";
    document.getElementById("cerrarmenu").style.display = "none";
  }


/*********************************
BARRA BÚSQUEDA
*********************************/
function buscar() {

event.preventDefault();

var busqueda = document.querySelector(".busqueda").value; 

document.getElementById("resultadosBusqueda").style.display = "block";
document.getElementById("tituloBusqueda").innerHTML = busqueda

let vaciar = document.getElementById("contenedorBusqueda");
vaciar.textContent = "";

function mostrarGiphy (gif) {
  const imagen = document.createElement('IMG')
  imagen.src = gif.images.downsized.url
  document.getElementById("contenedorBusqueda").appendChild(imagen);
}

const urlbusqueda = "https://api.giphy.com/v1/gifs/search?" 
+"api_key=uTnjhcYC0B52sTn6MzoPXGkdJ6yxZgYQ"
+"&q="
+busqueda
+"&lang=es"
+"&limit=3"

fetch(urlbusqueda)
  .then(resultado => resultado.json())
  .then(({ data }) =>  data.map(mostrarGiphy));
}

/*********************************
TRENDING
*********************************/

const urltrending = "https://api.giphy.com/v1/gifs/trending?" 
+"api_key=uTnjhcYC0B52sTn6MzoPXGkdJ6yxZgYQ"
+"&limit=12"

fetch(urltrending)
  .then(res => res.json())
  .then(({ data }) => data.map(mostrarTrending))

function mostrarTrending (gif) {
  const imagen = document.createElement('IMG')
  imagen.src = gif.images.original.url
  document.getElementById("contenedorTrending").appendChild(imagen);
}

/*********************************
CALESITA
*********************************/

var firstval = 0;
var runSlider;

function Carousel() {
clearTimeout(runSlider);
    firstval += 2;
    parent = document.getElementById('contenedorTrending');
    parent.style.left = "-" + firstval + "px";
    if (!(firstval % 180)) {
        setTimeout(Carousel, 3000);
        firstval = 0;
        var firstChild = parent.firstElementChild;
        parent.appendChild(firstChild);
        parent.style.left= 0;
        return;
    }
    runCarousel = setTimeout(Carousel, 10);
}
Carousel();

//OPCIÓN BOTONES
// function leftClick(){
// firstval += 2;
//     parent = document.getElementById('imagenesCalesita');
//     parent.style.left = "-" + firstval + "px";
    
//     if (!(firstval % 130)) {
        
//         firstval = 0;
//         var firstChild = parent.firstElementChild;
//         parent.appendChild(firstChild);
//         parent.style.left= 0;
//         return;
//     }
//     runSlider = setTimeout(leftClick, 10);
// }

// function rightClick(){
// firstval += 2;
//     parent = document.getElementById('imagenesCalesita');
//     parent.style.left =  firstval + "px";
    
//     if (!(firstval % 130)) {
        
//         firstval = 0;
//         var firstChild = parent.firstElementChild;
//         parent.appendChild(firstChild);
//         parent.style.left= 0;
//         return;
//     }
//     runSlider = setTimeout(rightClick, 10);
// }