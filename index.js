// parte de servidor e rotas
const express = require('express');
const { listarPets, adicionarPet } = require('./petshop');
const { uuid } = require('uuidv4')
const petshop = require('./petshop');
const app = express();

app.use(express.json()); // tem que usar isso daqui para puder receber no arq JSON

app.post('/pets', (req,res) => {
    //console.log(req.body);
    //petshop.adicionarPet(req.body)

    //return res.send(req.body); //retorna project porque ele eh o recém criado e nunca se retona a lista completa
    const {tutor, contato, nome, tipo, idade, raca, peso, vacinado, servicos} = req.body;    
    const pet = {nome, tipo, idade, raca, peso, tutor, contato, vacinado, servicos} 

    petshop.adicionarPet(pet);

    return res.send(pet);
});

app.get('/pets/:nome',(req,res) => {
    const { nome } = req.params;

    const encontrado = petshop.buscarPet(nome);
    return res.send(encontrado);
});

console.log(petshop.listarPets());

app.listen(3000, () => {
    console.log('Servidor rodando!');
});
