document.addEventListener("DOMContentLoaded", () => {

    //carregar elementos 
    const board = document.querySelector('.board');
    const resultView1 = document.querySelector('#result1');
    const resultView2 = document.querySelector('#result2');
    const resultView3 = document.querySelector('#result3');
    let cards = []; // Lista de cartas será carregada do JSON
    let cardsChosen = []; //cartas escolhidas
    let cardsChosenId = []; //id das cartas escolhidas
    let cardsWon = []; //cartas combinadas
    let errorCards = [] //Escolhas erradas
   

    //lista de cartas
/*
    const cards = [
        {
            name: 'InosukeHashibira',
            img: 'image/InosukeHashibira.jpg'
        },
        {
            name: 'MitsuriKanroji',
            img: 'image/MitsuriKanroji.jpg'
        },
        {
            name: 'NezukoKamado',
            img: 'image/NezukoKamado.jpg'
        },
        {
            name: 'InosukeHashibira',
            img: 'image/InosukeHashibira.jpg'
        },
        {
            name: 'MitsuriKanroji',
            img: 'image/MitsuriKanroji.jpg'
        },
        {
            name: 'NezukoKamado',
            img: 'image/NezukoKamado.jpg'
        }
    ]
*/

    function loadCards() {
        fetch("cartas.json")
            .then(response => response.json())
            .then(data => {
                cards = data.cartas;
                cards.sort(() => 0.5 - Math.random()); // Embaralhar as cartas
                createBoard();
            })
            .catch(error => console.error("Erro ao carregar o JSON:", error));
    }

    //embaralhar todas as cartas
    //cards.sort(() => 0.5 - Math.random());

    // Criar o quadro de cartas
    function createBoard(){
        board.innerHTML = ""; // Limpa o tabuleiro antes de criar as cartas
        for(let i = 0; i < cards.length; i++){
            const card = document.createElement('img');
            card.setAttribute('src', 'image/board.jpg');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            board.appendChild(card);
        } 
    }

    //Checagem de combinações
    function checkForMatch(){
        const cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        //Verificar clique na mesma imagem
        if(optionOneId == optionTwoId){
            cards[optionOneId].setAttribute('src', 'image/board.jpg');
            cards[optionTwoId].setAttribute('src', 'image/board.jpg');
            alert('Você clicou na mesma imagem');
        }
        //verificar combinação se click em imagens diferentes
        else if (cardsChosen[0] === cardsChosen[1]) {
            alert('Você encontrou uma combinação')
            cards[optionOneId].setAttribute('src', 'image/check.png')
            cards[optionTwoId].setAttribute('src', 'image/check.png')
            cards[optionOneId].removeEventListener('click', flipCard)
            cards[optionTwoId].removeEventListener('click', flipCard)
            cardsWon.push(cardsChosen)
        } else {
            cards[optionOneId].setAttribute('src', 'image/board.jpg')
            cards[optionTwoId].setAttribute('src', 'image/board.jpg')
            alert('Errou, tente novamente');
            errorCards.push(cardsChosen)
        }
        cardsChosen = []
        cardsChosenId = []

        //mostrar placar
        resultView1.textContent = 'Pares Encontrados: '+cardsWon.length
        resultView2.textContent = 'Tentativas Erradas: '+errorCards.length
        if  (cardsWon.length === cards.length/2) {
            
            let acertos = cardsWon.length;
            let naoAcertos = errorCards.length;
            let tentativas = acertos + naoAcertos;
            let pontuacao = (acertos/tentativas)*1000;
            pontuacao = Math. trunc(pontuacao)

            resultView3.textContent = 'Parabéns! Você conseguiu encontrar todas as cartas.\n'+ '\nSeu Score é: '+pontuacao
        }


    }
    
    function flipCard(){
        let cardId = this.getAttribute('data-id');
        if(!cardsChosenId.includes(cardId)){
            cardsChosen.push(cards[cardId].name);
            cardsChosenId.push(cardId);
            this.setAttribute('src', cards[cardId].img);
        }
        
        if(cardsChosen.length === 2){
            setTimeout(checkForMatch(), 500);
        }
    } 

    // Carregar cartas do JSON e iniciar o jogo
    loadCards();
});

