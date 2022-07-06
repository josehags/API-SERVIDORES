function validarPrimeiroDigito(cpf) {
  return false;
}

const cpf = '52998224725'.split('').map(parseInt);

const primeiroDigito = validarPrimeiroDigito(cpf);

console.log(primeiroDigito);
