// Selecionando o botão "Voltar ao Início"
const btnVoltarInicio = document.getElementById("btn-voltar");

// Selecionando o botão "Visualizar Denúncia"
const btnVisualizarDenuncia = document.getElementById("btn-visualizacao");

// Evento de clique para o botão "Voltar ao Início"
btnVoltarInicio.addEventListener("click", function() {
    window.location.href = "index.html"; // Redireciona para a página inicial (index.html)
});

// Evento de clique para o botão "Visualizar Denúncia"
btnVisualizarDenuncia.addEventListener("click", function() {
    window.location.href = "visualizacao.html"; // Redireciona para a página de visualização de denúncias
});

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

    
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }) 
        .then(function(stream) {
           
            cameraStream = stream;

           
            modal.style.display = "block";

           
            cameraPreview.srcObject = stream;

            console.log("Câmera aberta com sucesso!");
        })
        .catch(function(error) {
            console.error('Error accessing camera:', error);
        });
});


btnTirarFoto.addEventListener("click", function() {
    
    if (!cameraStream) {
        alert("A câmera não foi aberta ainda!");
        return;
    }

    
    const imageCapturer = new ImageCapture(cameraStream.getVideoTracks()[0]);

   
    imageCapturer.takePhoto()
        .then(function(blob) {
           
            modal.style.display = "none";

            
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


async function consultarCEPDenuncia() {
    const inputCEP = document.getElementById("input-cep-denuncia").value;

    try {
        const data = await consultarCEP(inputCEP);
        
        const endereco = document.getElementById("endereco-buscado");
        endereco.textContent = `Endereço buscado: ${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
        
        console.log(data);
    } catch (error) {
        
        console.error(error.message);
    }
}


const btnConsultarCEPDenuncia = document.getElementById("btn-consultar-cep-denuncia");

btnConsultarCEPDenuncia.addEventListener("click", consultarCEPDenuncia);
