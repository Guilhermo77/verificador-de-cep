const inputCep = document.getElementById('cep');
const btnCep = document.getElementById('btnCep');
const listItens = document.querySelectorAll('.resultadoCep-ul-item-p');

const handleClick = () => {
  const data = inputCep.value;
  if (!data) {
    return;
  } else {
    inputCep.value = '';
    getCep(data);
  }
};

function cleanData() {
  listItens.forEach((e) => (e.innerHTML = ''));
  document.querySelector('.error-message').innerHTML = '';
  return;
}

async function getCep(cep) {
  try {
    await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((r) => r.json())
      .then((json) => {
        if (json.erro === true) {
          handleError();
        } else {
          setData(json);
        }
      });
  } catch (error) {
    handleError();
  }
}

function handleError() {
  cleanData(),
    (document.querySelector('.error-message').innerHTML =
      '*Informe um CEP válido');
}

function setData(data) {
  cleanData();
  let i = 0;
  for (const key in data) {
    if (data[key] === 'true') {
      handleError();
    }
    if (data.hasOwnProperty(key)) {
      listItens[i].innerHTML += data[key];
      i++;
    }
  }
}

btnCep.addEventListener('click', handleClick);
