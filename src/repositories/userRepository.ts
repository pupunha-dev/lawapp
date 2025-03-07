// Responsabilidade: Interagir diretamente com o banco de dados ou outras fontes de dados.
// Fluxo :
//   Executa operações CRUD(Create, Read, Update, Delete) no banco de dados.
//   Usa bibliotecas como Supabase, Prisma ou consultas SQL para acessar os dados.
// Ponto-chave :
//   Os Repositories encapsulam toda a lógica de acesso ao banco de dados.
//   Eles são chamados pelos Services e retornam os dados necessários.

// PERGUNTAS SOBRE A CAMADA DE REPOSITORIES:
// 1. Obtive o mesmo erro de type any no parametro userData.
// 2. Me explique detalhadamente cada parte da lógica utilizada nas linhas de código:   const { data, error } = await supabase.from("users").insert([userData]).single();
//  e   const { data, error } = supabase.from('users').select('*').eq('email', email).single();
// 3. Aqui foram inseridos apenas o saveUser. Nessa camada também entrariam as outras lógicas do CRUD no banco?
// 4. O que siginifica o ! no final dos parametros do supabase env.?


import { IUser } from '@/models/user';
import { createClient } from '@supabase/supabase.js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export async function saveUser(userData: IUser) {
  const { data, error } = await supabase.from("users").insert([userData]).single();
  if (error) throw error;
  return data;
}

export async function findUserByEmail(email: string) {
  const { data, error } = supabase.from('users').select('*').eq('email', email).single();
  if (error) throw error;
  return data;
}