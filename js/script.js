const NUMERO_DE_ALUNOS = 31;
const divNaoSorteados = document.getElementById('naoSorteados');
const divSorteados = document.getElementById('sorteados');
const btnSortear = document.getElementById('btnSortear');
const btnResetar = document.getElementById('btnResetar');
const imgSorteado = document.getElementById('imgSorteado');
const numeroSorteio = document.getElementById('numeroSorteio');

let sorteados = [], naoSorteados = [], desabilitados = [];

btnSortear.addEventListener('click', (event) => {
  if (naoSorteados.length != desabilitados.length) {
    event.target.disabled = true;
    sortear();
  };
});

btnResetar.addEventListener('click', resetar);

function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function sortear() {
  let sorteado;
  do {
    sorteado = randomNumber(1, NUMERO_DE_ALUNOS).toString();
  } while (!naoSorteados.includes(sorteado) || desabilitados.includes(sorteado));
  animacao(sorteado);
}

function animacao(sorteado) {
  for (let i = 1; i <= NUMERO_DE_ALUNOS; i++) {
    setTimeout(() => {
      if (i === NUMERO_DE_ALUNOS) {
        moverAluno(sorteado);
        imgSorteado.src = `alunos/${sorteado}.jpg`;
      } else {
        imgSorteado.src = `alunos/${randomNumber(1, NUMERO_DE_ALUNOS)}.jpg`;
      }
    }, Math.pow(i, 3) / 5);
  }
};

function moverAluno(aluno) {
  naoSorteados.splice(naoSorteados.indexOf(aluno), 1);
  buildNaoSorteados();
  sorteados.push(aluno);
  buildSorteados();
  atualizarSorteio();
  btnSortear.disabled = false;
}

function buildNaoSorteados() {
  divNaoSorteados.innerHTML = naoSorteados.map(aluno => `
      <img class="avatar ${validarDesabilitado(aluno)}" src="alunos/${aluno}.jpg" onclick="toggleImage(this)">
  `).join('');
}

function validarDesabilitado(aluno) {
  let disabled = desabilitados.includes(aluno) ? 'disabled' : '';
  return disabled;
}

function buildSorteados() {
  divSorteados.innerHTML = sorteados.map(aluno => `
      <img class="avatar" src="alunos/${aluno}.jpg">
  `).join('');
}

function toggleImage(element) {
  let disabled = element.classList.toggle('disabled');
  let aluno = element.src.split('/').pop().split('.')[0];
  (disabled) ? desabilitados.push(aluno) : desabilitados.splice(desabilitados.indexOf(aluno), 1);
}

function atualizarSorteio() {
  numeroSorteio.innerHTML = `Sorteio #${sorteados.length}`;
}

function resetar() {
  sorteados = [];
  naoSorteados = [];
  desabilitados = [];
  for (let i = 1; i <= NUMERO_DE_ALUNOS; i++) naoSorteados.push(i.toString());
  buildNaoSorteados();
  imgSorteado.src = `alunos/0.jpg`;
  divSorteados.innerHTML = '';
  atualizarSorteio();
}

resetar();