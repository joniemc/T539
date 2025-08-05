const readline = require('readline');
const {promisify} = require('util'); 

async function suma() {

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('#2');

  const question = promisify(rl.question).bind(rl);

  const numero1 = await question('Ingrese el numero 1: ');
  const numero2 = await question('Ingrese el numero 2: ');

  rl.close();

  console.log('#3');
  return Number(numero1) + Number(numero2);

}

console.log("#1 Exactamente antes de llamar a la función");
//console.log(suma());
suma()
  .then(resultado => {
    console.log(resultado);

    console.log('#4 FIN');
  })
  .catch(err => {
    console.log('ocurrio un error');
  })


