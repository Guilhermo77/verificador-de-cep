const inputCep = document.getElementById('cep');
const btnCep = document.getElementById('btnCep');
const resultado = document.querySelector('.resultadoCep');
const listItens = document.querySelectorAll('.resultadoCep-ul-item-p');

const handleClick = (event) => {
  event.preventDefault();
  const data = inputCep.value;
  if (!data) {
    return;
  } else {
    inputCep.value = '';
    buscarCep(data);
  }
};

function cleanData() {
  listItens.forEach((e) => (e.innerHTML = ''));
  document.querySelector('.error').innerHTML = '';
  return;
}

function buscarCep(cep) {
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((r) => r.json())
    .then((json) => {
      fillData(json);
    })
    .catch(
      console.log('why?'),
      cleanData(),
      (document.querySelector('.error').innerHTML = '*Informe um CEP válido')
    );
}

function fillData(data) {
  cleanData();
  let i = 0;
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      listItens[i].innerHTML += data[key];
      i++;
    }
  }
}

btnCep.addEventListener('click', handleClick);
