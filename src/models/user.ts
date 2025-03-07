// Responsabilidade: Definir a estrutura dos dados usados na aplicação.
//   Fluxo :
// Cria interfaces TypeScript que representam os dados(ex.: User, Product).
// Centraliza a definição de tipos para garantir consistência.
// Ponto-chave :
// Os Models são usados em várias camadas (Controllers, Services, Repositories) para tipar os dados.
// Eles não contêm lógica, apenas definem a estrutura.

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password?: string;
  avatar?: string;
}