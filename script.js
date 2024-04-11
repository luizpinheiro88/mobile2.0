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

// Função para consultar o CEP na página de denúncia
async function consultarCEPDenuncia() {
    const inputCEP = document.getElementById("input-cep-denuncia").value;

    try {
        const data = await consultarCEP(inputCEP);
        // Exibir o endereço buscado pelo site
        const endereco = document.getElementById("endereco-buscado");
        endereco.textContent = `Endereço buscado: ${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
        // Aqui você pode manipular os dados do CEP, como preencher campos de endereço na página de denúncia
        console.log(data);
    } catch (error) {
        // Trate o erro, como exibir uma mensagem para o usuário
        console.error(error.message);
    }
}

// Evento de clique para o botão "Consultar CEP" na página de denúncia
const btnConsultarCEPDenuncia = document.getElementById("btn-consultar-cep-denuncia");

btnConsultarCEPDenuncia.addEventListener("click", consultarCEPDenuncia);
