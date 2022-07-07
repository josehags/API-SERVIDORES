function VerificaCPF(cpf) {
  let soma = 0;
  let resto;

  const validateCpf = cpf.toString();

  if (validateCpf.length !== 11) return false;

  if (!validarRepetido(cpf)) return false;

  function validarRepetido(cpf) {
    const primeiro = cpf[0];
    let diferente = false;
    for (let i = 0; i < cpf.length; i++) {
      if (cpf[i] != primeiro) diferente = true;
    }
    return diferente;
  }

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(validateCpf.substring(i - 1, i)) * (11 - i);
  }

  resto = soma % 11;

  if (resto == 10 || resto == 11 || resto < 2) {
    resto = 0;
  } else {
    resto = 11 - resto;
  }

  if (resto != parseInt(validateCpf.substring(9, 10))) {
    return false;
  }

  soma = 0;

  for (let i = 1; i <= 10; i++) {
    soma += parseInt(validateCpf.substring(i - 1, i)) * (12 - i);
  }
  resto = soma % 11;

  if (resto == 10 || resto == 11 || resto < 2) {
    resto = 0;
  } else {
    resto = 11 - resto;
  }

  if (resto != parseInt(validateCpf.substring(10, 11))) {
    return false;
  }

  return true;
}
const validateCpf = cpf => {
  const result = VerificaCPF(cpf);
  return result;
};

//   VALIDAÇÃO DE TELEFONE

const validationPhone = phone => {
  const regex = /^[0-9]{10,11}$/; // [0-9] o número pode ir de 0 a 9
  // eslint-disable-next-line prettier/prettier
                                  //{10,11} é um quantificador, quantifica um número mínino é um número máximo
  return regex.test(phone);
};

// function validationPhone(phone) {
//   //retira todos os caracteres menos os numerosi
//   phone = phone.replace(/\D/g, '');

//   //verifica se tem a qtde de numero correto
//   if (validationPhone.length !== 11) return false;

//   //Se tiver 11 caracteres, verificar se começa com 9 o celular
//   if (phone.length == 11 && parseInt(phone.substring(2.3)) != 9) return false;

//   return true;
// }

const validate = (cpf, phone) => {
  const err = [];
  if (!validateCpf(cpf)) err.push('invalid cpf');
  if (!validationPhone(phone)) err.push('invalid phone');
  return err;
};

export { validate };

// eslint-disable-next-line prettier/prettier

// outra forma de validação de cpf
// function validarPrimeiroDigito(cpf) {
//   let sum = 0;
//   for (let i = 0; i < 9; i++) sum += cpf[i] * (10 - i);

//   const resto = (sum * 10) % 11;
//   if (resto < 10) {
//     return cpf[9] == resto;
//   }
//   return cpf[9] == 0;
// }

// function validarSegundoDigito(cpf) {
//   let sum = 0;
//   for (let i = 0; i < 10; i++) sum += cpf[i] * (11 - i);

//   const resto = (sum * 10) % 11;

//   if (resto < 10) return cpf[10] == resto;
//   return cpf[10] == 0;
// }

// function validarRepetido(cpf) {
//   const primeiro = cpf[0];
//   let diferente = false;
//   for (let i = 0; i < cpf.length; i++) {
//     if (cpf[i] != primeiro) diferente = true;
//   }
//   return diferente;
// }

// function validarCpf(cpf) {
//   if (cpf.length !== 11) return false;

//   if (!validarRepetido(cpf)) return false;

//   if (!validarPrimeiroDigito(cpf)) return false;

//   if (!validarSegundoDigito(cpf)) return false;

//   return true;
// }

// const cpf = '52998224725'.split('').map(e => parseInt(e));

// const cpfValido = validarCpf(cpf);
