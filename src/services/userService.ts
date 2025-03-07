// 1. Responsabilidade: Implementar a lógica de negócios da aplicação.
// 2. Fluxo:
//   Valida os dados recebidos dos Controllers.
//   Executa regras específicas da aplicação(ex.: verificar se um email já existe).
//   Chama os Repositories para interagir com o banco de dados.
// 3. Ponto-chave :
//   Os Services centralizam a lógica de negócios.
//   Eles não devem interagir diretamente com o banco de dados; isso é responsabilidade dos
//   Repositories.

// PERGUNTAS SOBRE A CAMADA DE SERVICES:
// 1. No parâmetro userData:any ele deu erro em any. Qual seria o tipo correto para utilizar com TS?
// 2. Nessa function não é necessário mais o parametro request? porque o parametro aqui é userData? 
// 3. Nessa camada são feitas apenas validações? Que outros tipos de implementações pdoeriam ser feitas aqui nessa camada também?


import { IUser } from '@/models/user';
import { saveUser, findUserByEmail } from '@/repositories';

export async function createUser(userData: IUser) {
  if (!userData.email) throw new Error('Email obrigatório!');
  if (!userData.password) throw new Error('Senha obrigatória!');

  const existingUser = await findUserByEmail(userData.email);
  if (existingUser) throw new Error('Email já cadastrado!');

  return await saveUser(userData);
}