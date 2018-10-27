const NUMERO_DE_ALUNOS = 31;
const divNaoSorteados = document.getElementById('naoSorteados');
const divSorteados = document.getElementById('sorteados');
const btnSortear = document.getElementById('btnSortear');
const btnResetar = document.getElementById('btnResetar');
const imgSorteado = document.getElementById('imgSorteado');
const numeroSorteio = document.getElementById('numeroSorteio');

let sorteados = [], naoSorteados = [], desabilitados = [];

btnSortear.addEventListener('click', () => animacao(sortear(1, NUMERO_DE_ALUNOS)));
btnResetar.addEventListener('click', resetar);

function sortear(min, max) {
  let sorteado;
  do {
    sorteado = Math.round(Math.random() * (max - min) + min);
  } while (!naoSorteados.includes(sorteado) && desabilitados.includes(sorteado));
  return sorteado;
}

function animacao(sorteado) {
  for (let i = 1; i <= naoSorteados.length; i++) {
    setTimeout(() => {
      if (i === naoSorteados.length) {
        moverAluno(sorteado);
        imgSorteado.src = `alunos/${sorteado}.jpg`;
      } else {
        imgSorteado.src = `alunos/${naoSorteados[i]}.jpg`;
      }
    }, Number(i / naoSorteados.length * 1500));
  }
};

function moverAluno(aluno) {
  naoSorteados.splice(naoSorteados.indexOf(aluno), 1);
  buildNaoSorteados();
  sorteados.push(aluno);
  buildSorteados();
  atualizarSorteio();
}

function buildNaoSorteados() {
  divNaoSorteados.innerHTML = naoSorteados.map(aluno => `
      <img class="avatar ${validarDesabilitado(aluno)}" src="alunos/${aluno}.jpg" onclick="toggleImage(this)"></label>
  `).join('');
}

function validarDesabilitado(aluno) {
  let disabled = desabilitados.includes(aluno) ? 'disabled' : '';
  return disabled;
}

function buildSorteados() {
  divSorteados.innerHTML = sorteados.map(aluno => `
      <img class="avatar" src="alunos/${aluno}.jpg"></label>
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