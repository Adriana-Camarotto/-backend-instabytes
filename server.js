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

//passei esse json para o banco de dados do MongoDB
// const posts = [ //json posts
//   {
//     id: 1,
//     description: 'uma foto teste',
//     title: 'Hello World!',
//     imagem: 'https://placecats.com/millie/300/150',
//   },
//   {
//     id: 2,
//     description: 'Um lindo pôr do sol na praia',
//     title: 'Pôr do Sol Magnífico',
//     imagem: 'https://placecats.com/millie/300/150',
//   },
//   {
//     id: 3,
//     description: 'Meu gato fazendo pose para a câmera',
//     title: 'Meu Felino Favorito',
//     imagem: 'https://placecats.com/millie/300/150',
//   },
//   {
//     id: 4,
//     description: 'Uma deliciosa receita de bolo de chocolate',
//     title: 'Bolo de Chocolate Irresistível',
//     imagem: 'https://placecats.com/millie/300/150',
//   },
//   {
//     id: 5,
//     description: 'Montanhas nevadas em um dia ensolarado',
//     title: 'Paisagem Alpina',
//     imagem: 'https://placecats.com/millie/300/150',
//   },
//   {
//     id: 6,
//     description: 'Um buquê de flores coloridas',
//     title: 'Um Presente Especial',
//     imagem: 'https://placecats.com/millie/300/150',
//   },
//   {
//     id: 7,
//     description: 'Um buquê de flores coloridas',
//     title: 'Um Presente Especial',
//     imagem: 'https://placecats.com/millie/300/150',
//   }
// ];

// Função para gerar um ID único



// console.log(posts);

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

// function buscarPorID(id) {
//   return posts.findIndex((post) => {
//     return post.id === Number(id);
//   })
// }

// cria uma rota que retorna um post específico
// app.get('/posts/:id', (req, res) => {
//   const index = buscarPorID(req.params.id);
//   res.status(200).json(posts[index]);
// }); 