import express from 'express';
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from '../controllers/postsConstroller.js';
import multer from 'multer';

// Configura o armazenamento do Multer para uploads de imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Especifica o diretório para armazenar as imagens enviadas
        cb(null, 'uploads/'); // Substitua por seu caminho de upload desejado
    },
    filename: function (req, file, cb) {
        // Mantém o nome original do arquivo por simplicidade
        cb(null, file.originalname); // Considere usar uma estratégia de geração de nomes únicos para produção
    }
});

// Cria uma instância do middleware Multer
const upload = multer({ storage: storage });
//linux ou mac
//const upload = multer({dest: './uploads'});

const routes = (app) => {
    app.use(express.json()); // habilita o uso do json no express
    // cria uma rota que retorna todos os posts
    app.get('/posts', listarPosts);
    // cria uma rota que cria um novo post
    app.post('/posts', postarNovoPost);
    app.post('/upload', upload.single('imagem'), uploadImagem);
    app.put('/upload/:id', atualizarNovoPost);
    

}

export default routes;