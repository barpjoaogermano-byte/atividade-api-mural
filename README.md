# Meu Mural de Publicações

Projeto feito com HTML, CSS e JavaScript puro (sem React nem biblioteca).
Quando clica no botão, a página busca publicações na API JSONPlaceholder e mostra 6 cartões com ID, título e texto.
Tem também um campo pra filtrar os cartões pelo título.

## Como abrir

1. Deixar o `index.html`, o `style.css` e o `script.js` na mesma pasta.
2. Abrir o `index.html` no navegador (eu usei o Live Server do VS Code).
3. Clicar em "Carregar publicações".

## Perguntas

### 1. O que é uma API e por que usamos `fetch()`?

API é um jeito de um programa conversar com outro. No projeto, a gente manda um pedido pro endereço da JSONPlaceholder e ela responde com os dados das publicações. A gente não precisa saber como ela guarda os dados lá dentro, só pede e recebe.

A gente usa o `fetch()` porque é com ele que o JavaScript faz esse pedido pela internet sem recarregar a página. Como a internet demora um pouquinho, o `fetch()` não entrega os dados na hora. Ele devolve uma Promise, que é tipo uma promessa de que a resposta vai chegar depois. Por isso o código que usa os dados fica dentro do `.then()`.

### 2. Qual é o papel de `resposta.json()`?

A resposta que chega da API ainda não dá pra usar direto no código, porque o corpo dela é só texto no formato JSON. O `resposta.json()` pega esse texto e transforma em algo do JavaScript. No nosso caso vira um array de objetos, e cada objeto tem `userId`, `id`, `title` e `body`.

Ele também demora um pouco (devolve outra Promise), por isso tem um segundo `.then()` pra receber os dados já prontos.

### 3. Qual a diferença entre filtrar o array localmente e fazer uma nova requisição?

Filtrar localmente é procurar nos dados que já foram baixados e estão guardados no array `publicacoes`. É rápido, não usa internet e é feito com `filter()` e `includes()`. No projeto, é o que acontece quando a gente digita no campo de busca. Dá pra ver na aba Network do navegador que nenhum pedido novo aparece enquanto digita.

Fazer uma nova requisição é perguntar de novo pro servidor com o `fetch()`. É mais devagar, precisa de internet, mas serve quando a gente precisa de dados que ainda não tem ou que podem ter mudado. No projeto isso acontece quando clica em "Carregar publicações" outra vez.

## Como os dados andam no projeto

clique → fetch → resposta → json → array → tela (DOM)

## Arquivos

- `index.html`: a estrutura da página
- `style.css`: o visual
- `script.js`: o clique, a requisição, o filtro, as mensagens e os cartões