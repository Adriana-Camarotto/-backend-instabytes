import express from 'express';

const posts = [
  {
    description: 'uma foto teste',
    title: 'Hello World!',
   imagem: 'https://placecats.com/millie/300/150',
  }
]

const app = express(); // cria variavel app que é uma instancia do express

app.listen(3000, () => {
  console.log('Server started on port 3000!');
}); // cria um servidor que escuta a porta 3000 e exibe a mensagem no console

app.get('/api', (req, res) => {
  res.status(200).send('Hello World!');
}); // cria uma rota que responde com a mensagem 'Hello World!' quando acessada