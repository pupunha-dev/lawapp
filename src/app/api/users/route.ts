// Responsabilidade : Receber requisições HTTP (GET, POST, PUT, DELETE) e delegar o processamento para os Controllers.
// As API Routes são responsáveis apenas por receber as requisições e chamar os Controllers. Elas não devem conter lógica de negócios ou interação com o banco de dados.

// PERGUNTAS SOBRE A CAMADA DE API/USERS:
// 1. Essa camada simplesmente serve para dar um return na function do controller?
// 2. Posso nesse código criar uma function para cada requisição: GET, PUT, PATCH, DELETE?
// 3. Que outros tipos de funcionalidade poderiam ser criadas nessa camada da arquitetura?

import { createUser } from '@/controllers/userController';

export async function POST(request: Request) {
  return createUser(request);
}