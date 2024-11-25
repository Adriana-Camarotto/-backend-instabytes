
// Importa a função que estabelece a conexão com o banco de dados.
// A função está localizada no arquivo dbConfig.js.
import { ObjectId } from 'mongodb';
import conectarAoBanco from '../config/dbConfig.js';
// console.log(process.env.STRING_CONNECTION);

//conecta ao banco de dados utilizando a string de conexão obtida do ambiente
// try {
const conexao = await conectarAoBanco(process.env.STRING_CONNECTION);
//     console.log('Conectado ao banco de dados com sucesso!');
//   } catch (error) {
//     console.error('Erro ao conectar ao banco de dados:', error);
//     process.exit(1); // Encerra a aplicação com código de saída 1 indicando erro
//   }

//funcao assincrona para buscar todos os posts do banco de dados
export async function getTodosPosts() {
    const db = conexao.db("Alura-instabyte"); //nome do banco de dados no MongoDB
    const colecao = db.collection("posts"); //nome da coleção no MongoDB
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("Alura-instabyte"); //nome do banco de dados no MongoDB
    const colecao = db.collection("posts"); //nome da coleção no MongoDB
    return colecao.insertOne(novoPost); //insere o novo post na coleção
}


export async function atualizarPost(id, novoPost) {
    const db = conexao.db("Alura-instabyte"); //nome do banco de dados no MongoDB
    const colecao = db.collection("posts"); //nome da coleção no MongoDB
    const objID = ObjectId.createFromHexString(id); //cria um objeto ID a partir da string passada
    return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: novoPost }); //atualiza o post com o ID correspondente
}