# FRONTEND

// src/app/page.tsx
export default function Home() {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)

        const formData = new FormData(event.currentTarget); // Captura os dados do formulário
        const userData = {
            name: formData.get('name'), // Obtém o valor do campo 'name'
            email: formData.get('email'), // Obtém o valor do campo 'email'
            password: formData.get('password'), // Obtém o valor do campo 'password'
        };

        // Envia os dados para o backend via POST
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, // Define o tipo de conteúdo como JSON
            body: JSON.stringify(userData), // Converte os dados em JSON
        });

        const result = await response.json(); // Lê a resposta do backend
        alert(result.message || result.error); // Exibe uma mensagem de sucesso ou erro
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Nome" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Senha" required />
            <button type="submit">Enviar</button>
        </form>
    );
}
# API ROUTE
// src/app/api/users/route.ts
import { createUserController } from '@/controllers/userController';

// Função POST para lidar com requisições HTTP POST
export async function POST(request: Request) {
    return createUserController(request); // Chama o Controller para processar a requisição
}

# CONTROLLER
// src/controllers/userController.ts
import { NextResponse } from 'next/server'; // Importa a classe NextResponse para construir respostas HTTP
import { createUser } from '@/services/userService'; // Importa a função createUser do Service

// Função do Controller que recebe a requisição HTTP
export async function createUserController(request: Request) {
    try {
        const body = await request.json(); // Extrai o corpo da requisição (os dados enviados pelo frontend)
        const newUser = await createUser(body); // Chama o Service para processar os dados
        return NextResponse.json(
            { message: 'Usuário criado com sucesso!', data: newUser },
            { status: 201 } // Retorna uma resposta HTTP com status 201 (Created)
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao criar usuário' },
            { status: 500 } // Retorna uma resposta HTTP com status 500 (Internal Server Error)
        );
    }
}

# SERVICE
// src/services/userService.ts
import { saveUser } from '@/repositories/userRepository'; // Importa a função saveUser do Repository

// Função do Service que valida os dados e interage com o Repository
export async function createUser(userData: any) {
    if (!userData.email) throw new Error('Email é obrigatório'); // Valida se o email foi enviado
    if (userData.email.length < 5) throw new Error('Email inválido'); // Valida o formato do email
    if (!userData.password) throw new Error('Senha é obrigatória'); // Valida se a senha foi enviada

    // Verifica se o email já está cadastrado (lógica de negócios)
    const existingUser = await findUserByEmail(userData.email);
    if (existingUser) throw new Error('Email já cadastrado');

    return await saveUser(userData); // Chama o Repository para salvar os dados no banco de dados
}

// Função auxiliar para buscar um usuário pelo email
async function findUserByEmail(email: string) {
    // Simula uma busca no banco de dados
    return null; // Retorna null se o usuário não existir
}

# REPOSITORY
// src/repositories/userRepository.ts
import { createClient } from '@supabase/supabase-js'; // Importa o cliente Supabase

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!); // Cria uma instância do Supabase

// Função do Repository que salva os dados no banco de dados
export async function saveUser(userData: any) {
    const { data, error } = await supabase.from('users').insert([userData]).single(); // Insere os dados na tabela 'users'
    if (error) throw error; // Lança um erro se houver problemas no banco de dados
    return data; // Retorna os dados salvos
}

// Função do Repository que busca um usuário pelo email
export async function findUserByEmail(email: string) {
    const { data, error } = await supabase.from('users').select('*').eq('email', email).single(); // Busca um usuário com o email especificado
    if (error) throw error; // Lança um erro se houver problemas no banco de dados
    return data; // Retorna os dados do usuário encontrado
}



# Resumo do Fluxo com Explicações
### Frontend :
O usuário preenche o formulário e clica em "Enviar".
O frontend envia os dados para o backend via fetch.

### API Route (route.ts) :
A rota /api/users recebe a requisição HTTP POST.
Ela chama o createUserController do Controller.

### Controller (userController.ts) :
O Controller extrai os dados do corpo da requisição (request.json()).
Ele chama o createUser do Service para processar os dados.
Retorna uma resposta HTTP usando NextResponse.

### Service (userService.ts) :
O Service valida os dados (ex.: verifica se o email é válido).
Ele chama o saveUser do Repository para salvar os dados no banco de dados.

### Repository (userRepository.ts) :
O Repository interage diretamente com o banco de dados (Supabase).
Ele insere ou busca dados na tabela users.

Controller
Receber requisições HTTP e delegar tarefas para as camadas inferiores.
Service
Implementar a lógica de negócios e regras específicas da aplicação.
Repository
Interagir diretamente com o banco de dados ou outras fontes de dados.
Models
Definir a estrutura dos dados (interfaces TypeScript).
Utils
Armazenar funções auxiliares reutilizáveis.

