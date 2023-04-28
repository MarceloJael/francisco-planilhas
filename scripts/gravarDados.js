let TOKEN_PIPEFY;
let ID_PIPE;

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDEwNDgzNjQsImVtYWlsIjoibmF5YXJhQGZyYW5jaXNjb2ltb3ZlaXMuY29tLmJyIiwiYXBwbGljYXRpb24iOjMwMDI0NDAwNX19.u9NuQ6lJNit3E7KmY3MO1SYblekWKLhigxI78gpIJOugE3Mrgd08GrHuoJjRgOUmsUHSWT27Wa2AHYL_c6-JSw";
document.getElementById("tokenPipefy").value = token;
const id = "301370946";
document.getElementById("idPipe").value = id;


function gravarDados() {

    var logExecucao = document.getElementById("resultadoDados");

    var divMensagem = document.createElement("h3");
    divMensagem.classList.add('verde');
    divMensagem.innerText = 'Dados gravados com sucesso!';
    logExecucao.appendChild(divMensagem);
}

function setDados(){

    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDEwNDgzNjQsImVtYWlsIjoibmF5YXJhQGZyYW5jaXNjb2ltb3ZlaXMuY29tLmJyIiwiYXBwbGljYXRpb24iOjMwMDI0NDAwNX19.u9NuQ6lJNit3E7KmY3MO1SYblekWKLhigxI78gpIJOugE3Mrgd08GrHuoJjRgOUmsUHSWT27Wa2AHYL_c6-JSw";
    const id = "301370946";

    if (tokenPipefy.value !== token) {
        TOKEN_PIPEFY = tokenPipefy.value;
    } else {
        TOKEN_PIPEFY = token;
    }

    if (idPipe.value !== id) {
        ID_PIPE = idPipe.value;
    } else {
        ID_PIPE = id;
    }

    tokenPipefy.value = TOKEN_PIPEFY;
    idPipe.value = ID_PIPE;

}

setDados();