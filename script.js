// Selecionando o botão "Abrir Câmera"
const btnAbrirCamera = document.getElementById("btn-abrir-camera");

// Selecionando o botão "Tirar Foto" dentro do modal
const btnTirarFoto = document.getElementById("btn-tirar-foto");

// Selecionando o modal
const modal = document.getElementById("modal-camera");

// Selecionando o elemento de vídeo para visualização da câmera
const cameraPreview = document.getElementById("camera-preview");

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
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }) // Aqui definimos facingMode como "environment" para tentar acessar a câmera traseira
        .then(function(stream) {
            // Armazene a stream da câmera na variável cameraStream
            cameraStream = stream;

            // Exiba o modal
            modal.style.display = "block";

            // Exiba o elemento de vídeo para visualização da câmera
            cameraPreview.srcObject = stream;

            console.log("Câmera aberta com sucesso!");
        })
        .catch(function(error) {
            console.error('Error accessing camera:', error);
        });
});

// Evento de clique para o botão "Tirar Foto" dentro do modal
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
            // Feche o modal
            modal.style.display = "none";

            // Exiba a mensagem "Foto arquivada" por 3 segundos
            const mensagemArquivada = document.createElement("div");
            mensagemArquivada.textContent = "Foto arquivada";
            mensagemArquivada.classList.add("mensagem-arquivada");
            document.body.appendChild(mensagemArquivada);
            setTimeout(function() {
                mensagemArquivada.remove();
            }, 3000);
        })
        .catch(function(error) {
            console.error('Error taking photo:', error);
        });
});
