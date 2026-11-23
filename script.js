const API_URL = "https://jsonplaceholder.typicode.com/posts?_limit=6";

let publicacoes = [];

const botao = document.querySelector("#btn-carregar");
const filtro = document.querySelector("#filtro");
const mensagem = document.querySelector("#mensagem");
const painel = document.querySelector("#lista-posts");

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = tipo || "";
}

function renderizarPublicacoes(lista) {
  painel.replaceChildren();

  lista.forEach((publicacao) => {
    const cartao = document.createElement("article");
    cartao.classList.add("cartao");

    const id = document.createElement("span");
    id.classList.add("cartao-id");
    id.textContent = "Publicação #" + publicacao.id;

    const titulo = document.createElement("h2");
    titulo.textContent = publicacao.title;

    const conteudo = document.createElement("p");
    conteudo.textContent = publicacao.body;

    cartao.append(id, titulo, conteudo);
    painel.append(cartao);
  });
}

function carregarPublicacoes() {
  mostrarMensagem("Carregando publicações...", "carregando");
  botao.disabled = true;

  fetch(API_URL)
    .then((resposta) => {
      if (!resposta.ok) {
        throw new Error("Erro HTTP: " + resposta.status);
      }
      return resposta.json();
    })
    .then((dados) => {
      publicacoes = dados;
      filtro.value = "";
      mostrarMensagem("", "");
      renderizarPublicacoes(publicacoes);
    })
    .catch((erro) => {
      console.error(erro);
      publicacoes = [];
      renderizarPublicacoes(publicacoes);
      mostrarMensagem(
        "Não deu pra carregar as publicações. Tenta de novo daqui a pouco.",
        "erro"
      );
    })
    .finally(() => {
      botao.disabled = false;
    });
}

botao.addEventListener("click", carregarPublicacoes);

filtro.addEventListener("input", () => {

  if (botao.disabled) {
    return;
  }

  const termo = filtro.value.trim().toLowerCase();

  const encontradas = publicacoes.filter((item) => {
    return item.title.toLowerCase().includes(termo);
  });

  renderizarPublicacoes(encontradas);

  if (publicacoes.length > 0 && encontradas.length === 0) {
    mostrarMensagem("Nenhuma publicação encontrada com esse termo.", "aviso");
  } else {
    mostrarMensagem("", "");
  }
});