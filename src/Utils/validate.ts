import { Phone } from '../models/Phone';

function VerificaCPF(cpf) {
  let soma = 0;
  let resto;

  const validateCpf = cpf.toString(); //automaticamente quando uma Function pode ser representada como um valor de texto.

  if (validateCpf.length !== 11) return false; // o cfp n pode ser diferente de 11 digitos

  if (!validarRepetido(cpf)) return false;

  function validarRepetido(cpf) {
    const primeiro = cpf[0];
    let diferente = false;
    for (let i = 1; i < cpf.length; i++) {
      if (cpf[i] != primeiro) diferente = true;
    }
    return diferente;
  }
  // percorrer os primeiros 9 digitos
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(validateCpf.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;

  if (resto == 10 || resto == 11) resto = 0;

  if (resto != parseInt(validateCpf.substring(9, 10))) return false;

  soma = 0;

  for (let i = 1; i <= 10; i++) {
    soma += parseInt(validateCpf.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;

  if (resto == 10 || resto == 11) resto = 0;

  if (resto != parseInt(validateCpf.substring(10, 11))) return false;

  return true;
}

const validationCPF = cpf => {
  const result = VerificaCPF(cpf);
  return result;
};

//   VALIDAÇÃO DE TELEFONE

const validationPhone = phone => {
  //   // regex expressão relugar
  const ReGex = /^[0-9]{10,11}$/;
  //   //^ representa o começo da linha
  //   // [0-9] o número pode ir de 0 a 9
  //   // eslint-disable-next-line prettier/prettier
  //   //{10,11} é um quantificador, quantifica um número mínino é um número máximo
  //   // $ representa o final da linha
  return ReGex.test(phone);
};

const validate = (cpf, phone) => {
  const error = [];
  if (!validationPhone(phone)) error.push('Informe um telefone valido'); //push() adiciona um ou mais elementos ao final de um array e retorna o novo comprimento desse array.
  if (!validationCPF(cpf)) error.push('Informe um CPF valido'); //push() adiciona um ou mais elementos ao final de um array e retorna o novo comprimento desse array.
  return error;
};

export { validate };
