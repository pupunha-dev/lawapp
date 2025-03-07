// Responsabilidade: Processar as requisições HTTP e coordenar a interação entre o frontend e as camadas inferiores(Services).
// Os Controllers são responsáveis por lidar diretamente com request e response.
// Eles delegam tarefas para os Services e tratam erros antes de retornar uma resposta.

//Aqui que lida com as respostas que são passadas para o frontend.

// PERGUNTAS SOBRE A CAMADA DE CONTROLLERS:
// 1. O que é então o NextResponse e quais suas responsabilidades ?
//   2. Ele é utilizado da mesma forma em qualquer projeto que utilize NextJS ?
//     3. Explique melhor essa estrutura de retorno dentro do bloco try/catch. Não entendi a parte em que o NextResponse retorna uma function com 2 objetos dentro. A estrutura sempre vai seguir esse padrão?
// 4. Percebi que os parâmetros da função principal sempre são apenas request: Request.Esse segundo Request é o type em typescript? Me explique a finalidade logica dele na estrutura da função.
// 5. o parametro error do bloco catch deu a seguinte mensagem de erro: 'error' is defined but never used.eslint.Seria necessário corrigir com TS ?

import { NextResponse } from 'next/server';
import { createUser as createUserService } from '@/services/userService';

export async function createUser(request: Request) {
  try {
    const body = await request.json();
    const newUser = await createUserService(body);
    return NextResponse.json({ message: 'User criado com sucesso!', data: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'ERRO AO CADASTRAR USER!' }, { status: 500 });
  }
}