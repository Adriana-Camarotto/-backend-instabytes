// Importa o framework Express para criar a aplicação web.
import express from 'express';

// Importa a função que estabelece a conexão com o banco de dados.
// A função está localizada no arquivo dbConfig.js.
import conectarAoBanco from './src/config/dbConfig.js';
// console.log(process.env.STRING_CONNECTION);


// **Conecta ao banco de dados usando a string de conexão obtida do ambiente.**
// A função conectarAoBanco retorna uma promessa que é resolvida quando a conexão é estabelecida.
// O resultado da promessa é armazenado na variável 'conexao'.
try {
  const conexao = await conectarAoBanco(process.env.STRING_CONNECTION);
  console.log('Conectado ao banco de dados com sucesso!');
} catch (error) {
  console.error('Erro ao conectar ao banco de dados:', error);
  process.exit(1); // Encerra a aplicação com código de saída 1 indicando erro
}

// Cria uma instância do Express e armazena na variável 'app'.
const app = express(); // cria variavel app que é uma instancia do express
app.use(express.json()); // habilita o uso do json no express


// cria um servidor que escuta a porta 3000 e exibe a mensagem no console
app.listen(3000, () => {
  console.log('Server started on port 3000!');
});

async function getTodosPosts() {
  const db = conexao.db("Alura-instabyte") //nome do banco de dados no MongoDB
  const colecao = db.collection("posts") //nome da coleção no MongoDB
  return colecao.find().toArray()
}

// cria uma rota que retorna todos os posts
app.get('/posts', async (req, res) => {
  const posts = await getTodosPosts()
  res.status(200).json(posts);
});

