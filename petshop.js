// módulo próprio
const moment = require('moment'); // require
const fs = require('fs');

let bancoDados = fs.readFileSync('./bancoDados.json');
bancoDados = JSON.parse(bancoDados);

const petshop = { //add os métodos
    atualizarBanco: () => {
        let petsAtualizado = JSON.stringify(bancoDados);
        fs.writeFileSync('dadosPet.json', petsAtualizado, 'utf-8');
    },
    listarPets: () => {
        let textoListaPets = "PETSHOP\n";
        bancoDados.pets.forEach((pet) => {
            
            textoListaPets += (`\n${pet.nome}, ${pet.idade}, ${pet.tipo}, ${pet.raca} \n`);
           // (pet.vacinado) ? textoListaPets += ("vacinado.\n") : textoListaPets += ("não vacinado.\n");
           
            pet.servicos.forEach((servico) => {
                textoListaPets += (`${servico.data} : ${servico.tipoServ}\n`);
            })
        })
        return textoListaPets;
    },
    adicionarPet: (...novosPets) => {
        novosPets.forEach((novoPet) => {
            bancoDados.pets.push(novoPet);
        })
    
        petshop.atualizarBanco();
        novosPets.forEach((novoPet) => {
            console.log(`${novoPet.nome} foi adicionado com sucesso!`); //TA DANDO UNDEFINED!
        })
    },
    buscarPet: (nomepet) => {
        let petEncontrado = bancoDados.pets.find((pet) => {
            return pet.nome == nomepet;
        });
        return petEncontrado ? petEncontrado : `Não tem pet com o nome ${pet} no sistema`;
    },
    filtrarTipoPet: (tipoPet) => {
        let petsEncontrados = bancoDados.pets.filter((pet) => {
            return pet.tipo == tipoPet;
        });
        return petsEncontrados;
    },
    darBanho: (pet) => {
        pet.servicos.push({ 
            tipoServ: 'banho',
            data: moment().format('DD-MM-YYYY')
        });
        
        atualizarBanco();
        console.log(`${pet.servicos.data} : dando banho no pet...`);
    },
    tosarPet: (pet) => {
        pet.servicos.push({ 
            tipoServ: 'tosar',
            data: moment().format('DD-MM-YYYY')
        });
         
        atualizarBanco();
        console.log(`${pet.servicos.data} : ${pet.nome} está com o cabelinho na régua!`);
    },
    apararUnhasPet: (pet) => {
        let dataHoje = moment().format('DD-MM-YYYY');
        pet.servicos.push({ 
            tipoServ: 'corte de unhas',
            data: dataHoje    
        });
        atualizarBanco();  
        console.log(`${dataHoje} : ${pet.nome} está de unhas aparadas!`);
    },
    atenderCliente: (pet, funcao) => {
        console.log(`\nAtendendo ${pet.nome}`)
        funcao(pet);
        console.log("Fim do atendimento");
    },
    clientePremium: (pet) => {
        let {nome} = pet;
        let nServ = pet.servicos.length;
    
        if(nServ > 3)
            console.log(`Olá, ${nome}! Você ganhou um descontão!`);
        else
            console.log(`Olá, ${nome}, você ainda não tem descontos disponíveis!`);
    },
    contatoTutor: (pet) => {
        let {nome, tutor, contato} = pet;
    
        return `Tutor: ${tutor}
                Contato: ${contato}
                Pet: ${nome}`;
    },
    filtrarTutor: (nomeTutor) => {
        let petsTutor = bancoDados.pets.filter((pet) => {
            return pet.tutor == nomeTutor;
        });
        console.log(`Pets do Tutor ${nomeTutor}:`)
        petsTutor.forEach((pet) => {
            console.log(`${pet.nome} - ${pet.tipo}`);
        })
    },
    vacinarPets: (pet) => {
    
        if(!pet.vacinado)
        {
            pet.vacinado = true;
            atualizarBanco();
            console.log(`\n${pet.nome} foi vacinado com sucesso!`);
        }
        else
            console.log(`\nOpa, ${pet.nome} já foi Vacinado`);
    },
    campanhaVacina: () => {
        console.log("Campanha de vacina 2021");
        console.log("vacinando...");
    
        let i = 0;
        bancoDados.pets = bancoDados.pets.map((pet) => {
        
            if(!pet.vacinado) 
            {
                vacinarPets(pet);
               i++;         
            }
            return pet;
        });
        atualizarBanco();
        console.log(`\n${i} pets foram vacinados nessa campanha!`);
    },

}

module.exports = petshop; //para a aplicação entender que isso eh um modulo, pode ser reutilizado