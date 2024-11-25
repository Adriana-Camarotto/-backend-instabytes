// Importa o framework Express para criar a aplicação web.
import express from 'express';
import routes from './src/routes/postsRoutes.js'; // Importa o arquivo de rotas.;

// Cria uma instância do Express e armazena na variável 'app'.
const app = express(); // cria variavel app que é uma instancia do express
app.use(express.static("uploads")); // habilita o uso de arquivos estáticos. tudo que estiver dentro da pasta "uploads" será acessível via navegador
routes(app); // chama a função routes passando a variável app como parâmetro
// cria um servidor que escuta a porta 3000 e exibe a mensagem no console

app.listen(3000, () => {
  console.log('Server started on port 3000!');
});


