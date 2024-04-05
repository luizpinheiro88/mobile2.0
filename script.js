
document.getElementById("btn-voltar").addEventListener("click", function() {
    window.location.href = "index.html";
});


document.getElementById("btn-visualizacao").addEventListener("click", function() {
    window.location.href = "visualizacao.html";
});


document.getElementById("btn-camera").addEventListener("click", function() {
    
    if (!('ImageCapture' in window)) {
        alert('ImageCapture is not available');
        return;
    }

 
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
          
            var videoTrack = stream.getVideoTracks()[0];

            
            var imageCapturer = new ImageCapture(videoTrack);

            
            imageCapturer.takePhoto()
                .then(function(blob) {
                  
                    var imageUrl = URL.createObjectURL(blob);
                    
                    
                    window.open(imageUrl); 
                   
                })
                .catch(function(error) {
                    console.error('Error taking photo:', error);
                });
        })
        .catch(function(error) {
            console.error('Error accessing camera:', error);
        });
});

document.getElementById("btn-localizacao").addEventListener("click", function() {
 
    console.log("Obter localização");
});

document.getElementById("btn-nova-denuncia").addEventListener("click", function() {
    window.location.href = "denuncia.html";
});
