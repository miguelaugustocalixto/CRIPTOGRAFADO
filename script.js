const symbols = ["✦", "✧", "✶", "✹", "☼", "◈", "⬢", "▣", "✺", "❖", "⟡", "◇", "✷"];

function calcularChave(senha) {
  return senha
    .split("")
    .reduce((total, char, index) => total + char.charCodeAt(0) + index, 0) % 13;
}

function criptografarSenha(senha) {
  const chave = calcularChave(senha);
  const letras = senha.split("");
  const ascii = letras.map((char) => char.charCodeAt(0));
  const transformado = ascii.map((valor, index) => valor + chave + index);
  const simbolos = transformado.map((numero) => symbols[numero % symbols.length]);

  return { chave, letras, ascii, transformado, simbolos };
}

function renderizarPassos(dados) {
  const passos = document.getElementById("passos");

  passos.innerHTML = `
    <li><strong>1.</strong> Senha inserida: <span style="color:#a78bfa; font-weight:700;">${dados.letras.join(" ")}</span></li>
    <li><strong>2.</strong> Códigos ASCII: <span style="color:#6ee7b7; font-weight:700;">${dados.ascii.join(" • ")}</span></li>
    <li><strong>3.</strong> Chave secreta aplicada: <span style="color:#7dd3fc; font-weight:700;">${dados.chave}</span></li>
    <li><strong>4.</strong> Valores após embaralhamento: <span style="color:#fcd34d; font-weight:700;">${dados.transformado.join(" • ")}</span></li>
    <li><strong>5.</strong> Símbolos finais: <span style="color:#6ee7b7; font-weight:700;">${dados.simbolos.join(" ")}</span></li>
  `;
}

function transformar() {
  const input = document.getElementById("senha");
  const resultado = document.getElementById("resultado");

  const senha = input.value.trim();

  if (!senha) {
    resultado.textContent = "Digite uma senha";
    document.getElementById("passos").innerHTML = "<li><strong>1.</strong> Insira uma senha para gerar a criptografia.</li>";
    return;
  }

  const dados = criptografarSenha(senha);
  resultado.textContent = dados.simbolos.join(" ");
  renderizarPassos(dados);
}

function limpar() {
  const input = document.getElementById("senha");
  const resultado = document.getElementById("resultado");

  input.value = "";
  resultado.textContent = "✧ ✧ ✧";
  document.getElementById("passos").innerHTML = `
    <li><strong>1.</strong> A senha é separada letra por letra.</li>
    <li><strong>2.</strong> Cada caractere vira um valor numérico (ASCII).</li>
    <li><strong>3.</strong> Um código secreto é somado para embaralhar.</li>
    <li><strong>4.</strong> Esses números viram símbolos especiais.</li>
    <li><strong>5.</strong> A sequência final aparece no resultado.</li>
  `;
}

document.getElementById("btnCriptografar").addEventListener("click", transformar);
document.getElementById("btnLimpar").addEventListener("click", limpar);
document.getElementById("senha").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    transformar();
  }
});
