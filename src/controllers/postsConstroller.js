import { getTodosPosts, criarPost, atualizarPost } from '../models/postsModels.js';
import fs from 'fs';
import gerarDescricaoComGemini from '../services/geminiService.js';

export async function listarPosts(req, res) {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.jpg`;
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "Erro": "Erro ao criar novo post" });
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.path,
        alt: ""
    };
    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "Erro": "Erro ao criar novo post" });
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);
        
        const post = { //siga o modelo do objeto no MongoDB
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, post); //passa dois argumentos id e post

        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Erro ao criar novo post" });
    }
}

