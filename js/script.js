const NUMERO_DE_ALUNOS = 31;
let sorteados = [], naoSorteados = [], desabilitados = [];

function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function animacao(sorteado) {
  let divSorteado = document.querySelector('#sorteado');
  for (let i = 1; i <= NUMERO_DE_ALUNOS; i++) {
    setTimeout(() => {
      if (i === NUMERO_DE_ALUNOS) {
        moverAluno(sorteado);
        divSorteado.innerHTML = `<img src="alunos/${sorteado}.jpg" alt="Sorteado">`;
      } else {
        divSorteado.innerHTML = `<img src="alunos/${randomNumber(1, NUMERO_DE_ALUNOS)}.jpg" alt="Sorteado">`;
      }
    }, Math.pow(i, 2.6));
  }
};

function sortear() {
  if (naoSorteados.length === desabilitados.length) return;
  let sorteado;
  do {
    sorteado = randomNumber(1, NUMERO_DE_ALUNOS).toString();
  } while (!naoSorteados.includes(sorteado) || desabilitados.includes(sorteado));
  animacao(sorteado);
}

function toggleImage(element) {
  let disabled = element.classList.toggle('disabled');
  let aluno = element.src.split('/').pop().split('.')[0];
  (disabled) ? desabilitados.push(aluno) : desabilitados.splice(desabilitados.indexOf(aluno), 1);
}

function renderizarNaoSorteados() {
  let disabled = (aluno) => desabilitados.includes(aluno) ? 'disabled' : '';
  document.querySelector('#naoSorteados').innerHTML = naoSorteados.map(aluno => `
    <img class="${disabled(aluno)}" src="alunos/${aluno}.jpg" onclick="toggleImage(this)">
  `).join('');
}

function renderizarSorteados() {
  document.querySelector('#sorteados').innerHTML = sorteados.map(aluno => `
    <img class="avatar" src="alunos/${aluno}.jpg">
  `).join('');
}

function moverAluno(aluno) {
  naoSorteados.splice(naoSorteados.indexOf(aluno), 1);
  sorteados.push(aluno);
  renderizarNaoSorteados();
  renderizarSorteados();
  document.querySelector('#sorteio').innerHTML = sorteados.length;
}

function reset() {
  sorteados = [], naoSorteados = [], desabilitados = [];
  for (let i = 1; i <= NUMERO_DE_ALUNOS; i++) naoSorteados.push(i.toString());
  renderizarNaoSorteados();
  renderizarSorteados();
  document.querySelector('#sorteado').innerHTML = `<img src="alunos/0.jpg" alt="Sorteado">`;
  document.querySelector('#sorteio').innerHTML = '0';
};

reset();