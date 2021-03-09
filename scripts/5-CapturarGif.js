"use strict";

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
      document.getElementById("video").style.height = "1px";
      empezarCaptura()
          
      function empezarCaptura() {
        navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            height: { max: 480 }
          }
        })
        .then(function(stream) {
          video.style.height = "initial"
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