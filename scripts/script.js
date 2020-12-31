
  // Menú desplegable

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


// Barra búsqueda

// function buscar() {
//   document.getElementById("iconoBusqueda").style.background = "none";
//   document.getElementById("barraBusqueda").style.paddingLeft = "15%";
//   document.getElementById("iconoBusqueda").style.background = "#FFF url(/images/close.svg) 0 0 no-repeat";
// }



// function getUserInput() { 
//     var inputValue = document 
//       .querySelector(".busqueda").value; 
//     return inputValue; 
//   }

//   document.querySelector(".buscar").addEventListener("click", function () { 
//     var inputValue = document 
//       .querySelector(".busqueda").value; 
//     var userInput = getUserInput(); 
//     searchGiphy(userInput); 
//   });


//   function searchGiphy(searchQuery) { 
//     var url = 
//   "https://api.giphy.com/v1/gifs/search?api_key=uTnjhcYC0B52sTn6MzoPXGkdJ6yxZgYQ&q="
//     + searchQuery +"&limit=5&lang=es"; 
        
//     // AJAX Request 
      
//     var GiphyAJAXCall = new XMLHttpRequest(); 
//     GiphyAJAXCall.open("GET", url); 
//     GiphyAJAXCall.send(); 
    
//     GiphyAJAXCall.addEventListener("load", function (data) { 
//       var actualData = data.target.response; 
//       pushToDOM(actualData); 
//       console.log(actualData); 
        
//     }); 
//   } 


//  function pushToDOM(response) { 
  
//     // Turn response into real JavaScript object 
//     response = JSON.parse(response); 
      
//     // Drill down to the data array 
//     var images = response.data; 
    
//     // Find the container to hold the response in DOM 
//     var container = document.querySelector(".display"); 
      
//     // Clear the old content since this function  
//     // will be used on every search that we want 
//     // to reset the div 
//     container.innerHTML = ""; 
    
//     // Loop through data array and add IMG html 
//     images.forEach(function (image) { 
    
//       // Find image src 
//       var src = image.images.fixed_height.url; 
    
//       // Concatenate a new IMG tag 
//       container.innerHTML += "<img src='" 
//         + src + "' class='container-image' />"; 
//     }); 
//   }



