localStorage.getItem('modoEscuro')
// Lista com várias matérias
const coresMat = {
    biologia: '#61DB70', //Verde
    física: '#5FBADB', // Azul
    quimica: '#F5E753', // Amarelo
    história: '#E68241', // Laranja
    geografia: '#C247AC' // Púrpura
};
const matPer = [
    {
        biologia: {
            fauna: {
                pergunta: "Qual é o principal órgão respiratório dos mamíferos?", valor: "Pulmões"
            },
            Flora: {
                pergunta: "O que as plantas produzem durante a fotossíntese?", valor: 'Glicose'
            },
            Genética: {
                pergunta: "Qual é o principal material genético dos seres vivos?", valor: 'DNA'
            }
        },
        física: {
            Mecânica: {
                pergunta: "Qual é a unidade de medida de força no Sistema Internacional?", valor: "Newton"
            },
            Óptica: {
                pergunta: "Qual é o fenômeno que ocorre quando a luz muda de direção ao passar de um meio para outro?", valor: 'Refração'
            },
            Eletricidade: {
                pergunta: "Qual é a unidade de medida de resistência elétrica?", valor: 'Ohm'
            }
        },
        quimica: {
            Atômo: {
                pergunta: "Qual partícula subatômica tem carga negativa?", valor: "Elétron"
            },
            Reações: {
                pergunta: "Como é chamada a substância que acelera uma reação química?", valor: 'Catalisador'
            },
            Ácidos: {
                pergunta: "Qual é a substância que tem pH abaixo de 7?", valor: 'Ácido'
            }
        },
        história: {
            idade_antiga: {
                pergunta: "Qual civilização construiu as pirâmides no Egito?", valor: "Egípcios"
            },
            Idade_Média: {
                pergunta: "Como é chamado o sistema de organização social medieval?", valor: 'Feudalismo'
            },
            EraModerna: {
                pergunta: "Quem foi o líder militar francês durante a Revolução Francesa?", valor: 'Napoleão'
            }
        },
        geografia: {
            Climatologia: {
                pergunta: "Qual gás é o principal responsável pelo efeito estufa?", valor: "Dióxido de carbono"
            },
            Geopolítica: {
                pergunta: "Qual país tem o maior território do mundo?", valor: 'Rússia'
            },
            Eletricidade: {
                pergunta: "Qual instrumento é usado para medir distâncias em um mapa?", valor: 'Escalímetro'
            }
        },
    }
];

var somAcertou = new Audio('sounds/win.mp3');
var somErrou = new Audio('sounds/error.mp3');
var somClique = new Audio('sounds/click.mp3');
var somNoti = new Audio('sounds/notification.mp3');
var resposta = document.createElement('input');
resposta.placeholder = 'Digite sua resposta Aqui...';
const modoEscuro = false;

// Alternar entre modo de cores
function mudarModo() {
    let corpo = document.querySelector('body');
    let icone = document.querySelector('#spanModo');
    if (corpo.classList.contains('modoEscuro')) {
        corpo.classList.remove('modoEscuro');
        icone.textContent = "dark_mode";

        localStorage.setItem('modoEscuro', mo);
    } else {
        corpo.classList.add('modoEscuro');
        icone.textContent = "light_mode";
    }
}

// Criar Elementos e variáveis
var contador = document.createElement('p');
var contr = document.createElement('div');
var botaoSair = document.createElement('button');
var botaoPular = document.createElement('button');
var iconeSair = document.createElement('span');
var iconePular = document.createElement('span')
var cartao = document.createElement('div');
var titCartao = document.createElement('h1');
var tipCartao = document.createElement('h2');
var parCartao = document.createElement('p');
var pontos = 0;
var placarFinal;
var categorias;
var categoriaAleatoria;
var palavraCerta;
var materiaAleatoria;
const controlesPrincipais = document.querySelector('.secao-de-controles');
const container = document.createElement('div');

// Começar jogo
function cmc() {
    pontos = 0;
    botaoSair.id = 'sair';
    botaoPular.id = 'pular';
    iconeSair.classList.add('material-symbols-rounded');
    iconeSair.textContent = 'logout';
    iconePular.classList.add('material-symbols-rounded');
    iconePular.textContent = 'arrow_forward'
    contr.id = 'contr';
    contador = 'Pontuação: ' + pontos;

    // Escolher uma matéria aleatória
    materiaAleatoria = Object.keys(matPer[0])[Math.floor(Math.random() * Object.keys(matPer[0]).length)];
    
    // Escolher uma categoria aleatória dentro da matéria
    categorias = Object.keys(matPer[0][materiaAleatoria]);
    categoriaAleatoria = categorias[Math.floor(Math.random() * categorias.length)];

    const principal = document.querySelector('main');

    cartao.style.transform = 'rotateY(-360deg)';
    controlesPrincipais.style.display = 'none';
    container.classList.add('container');
    cartao.classList.add('cartao');
    resposta.classList.add('resp');
    resposta.type = 'text';
    
    // Define titulo, matéria e também deixa a primeira em maiúscula caso precise.
    titCartao.textContent = categoriaAleatoria.charAt(0).toUpperCase() + categoriaAleatoria.slice(1);
    tipCartao.textContent = materiaAleatoria.charAt(0).toUpperCase() + materiaAleatoria.slice(1);
    parCartao.textContent = matPer[0][materiaAleatoria][categoriaAleatoria].pergunta;
    palavraCerta = matPer[0][materiaAleatoria][categoriaAleatoria].valor;

    // Estilo
    document.documentElement.style.setProperty('--corCartao', coresMat[materiaAleatoria]);

    // Lincar Objetos
    principal.appendChild(container);
    container.appendChild(contr);
    contr.appendChild(botaoSair);
    contr.appendChild(botaoPular);
    container.appendChild(cartao);
    container.appendChild(resposta);
    botaoSair.appendChild(iconeSair);
    botaoPular.appendChild(iconePular);
    cartao.appendChild(tipCartao);
    cartao.appendChild(titCartao);
    cartao.appendChild(parCartao);
};

// Alterar cor da resposta do usuário
resposta.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        if (resposta.value.toLowerCase() === palavraCerta.toLowerCase()) {
            resposta.style.color = 'var(--corBase)';
            mostrarResposta();
            somAcertou.play();
            pontos++
            
        } else {
            somErrou.play();
            resposta.style.color = 'var(--erro)';
            if (pontos > 0) {
                pontos--
            }
        }
    }
});

// Resetar a cor
resposta.addEventListener('focus', function () {
    resposta.style.color = 'var(--corTextoAlternativo)';
});
resposta.addEventListener('input', function () {
    resposta.style.color = 'var(--corTextoAlternativo)';
});

// Virar Cartão
function mostrarResposta () {
    cartao.style.transform = 'rotateY(360deg)';
    titCartao.textContent = 'Resposta';

    // Atualizar o conteúdo do parágrafo com a palavra correta
    parCartao.textContent = palavraCerta;
    parCartao.style.textAlign = 'center';

    setTimeout(cmc, 3000);
};

botaoPular.addEventListener('click', function (){
    cmc();
});
botaoSair.addEventListener('click', function (){
    container.remove();
    controlesPrincipais.style.display = 'flex';
});

document.querySelectorAll('button').forEach(function (botao) {
    // Adiciona o evento de click a cada botão
    botao.addEventListener('click', function () {
        somClique.play();
    });
});
document.querySelector('#sair').addEventListener('click', function (){
    somNoti.play();
});