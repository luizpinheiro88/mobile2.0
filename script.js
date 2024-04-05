// Evento de clique para o botão "Voltar para o Início"
document.getElementById("btn-voltar").addEventListener("click", function() {
    window.location.href = "index.html";
});

// Evento de clique para o botão "Visualização de Denúncias"
document.getElementById("btn-visualizacao").addEventListener("click", function() {
    window.location.href = "visualizacao.html";
});

// Selecionando o botão "Abrir Câmera"
const btnAbrirCamera = document.getElementById("btn-camera");

// Selecionando o botão "Tirar Foto"
const btnTirarFoto = document.getElementById("btn-tirar-foto");

// Variável para armazenar a stream da câmera
let cameraStream;

// Evento de clique para o botão "Abrir Câmera"
btnAbrirCamera.addEventListener("click", function() {
    // Verifique se a funcionalidade ImageCapture é suportada no navegador
    if (!('ImageCapture' in window)) {
        alert('ImageCapture is not available');
        return;
    }

    // Verifique se há permissão para acessar a câmera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            // Armazene a stream da câmera na variável cameraStream
            cameraStream = stream;

            // Obtenha o track de vídeo do stream
            const videoTrack = stream.getVideoTracks()[0];

            // Crie um ImageCapture object usando o track de vídeo
            const imageCapturer = new ImageCapture(videoTrack);

            // Exiba o elemento de vídeo para visualização da câmera
            const cameraPreview = document.getElementById("camera-preview");
            cameraPreview.style.display = "block";
            cameraPreview.srcObject = stream;

            // Exiba o botão "Tirar Foto"
            btnTirarFoto.style.display = "inline";

            // Oculte o botão "Abrir Câmera"
            btnAbrirCamera.style.display = "none";

            console.log("Câmera aberta com sucesso!");
        })
        .catch(function(error) {
            console.error('Error accessing camera:', error);
        });
});

// Evento de clique para o botão "Tirar Foto"
btnTirarFoto.addEventListener("click", function() {
    // Verifique se a stream da câmera está definida
    if (!cameraStream) {
        alert("A câmera não foi aberta ainda!");
        return;
    }

    // Crie um ImageCapture object usando o track de vídeo da stream da câmera
    const imageCapturer = new ImageCapture(cameraStream.getVideoTracks()[0]);

    // Tire a foto
    imageCapturer.takePhoto()
        .then(function(blob) {
            // Converta a foto em uma URL de objeto
            const imageUrl = URL.createObjectURL(blob);

            // Exiba a foto em uma nova janela ou janela modal
            window.open(imageUrl); // Abre em uma nova janela
        })
        .catch(function(error) {
            console.error('Error taking photo:', error);
        });
});
