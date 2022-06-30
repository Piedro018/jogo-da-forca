const startScreen       = document.querySelector('.secao-inicio')
const gameScreen        = document.querySelector('.secao-game')

const countLetter       = document.getElementById('countLetter')
const wordEl            = document.getElementById('hangmanWord')
const sortWord          = document.getElementById('sortWord')
const tip               = document.getElementById('hangmanTip')
const tipEl             = document.querySelector('.tip')
const btnStartEl        = document.querySelector('.btn-comecar')
const hangmanWord       = document.querySelector('.hangman-word')
const playedLettersEl   = document.querySelector('.played-letters')
const heart             = Array.from(document.querySelectorAll("[class*='lifeHeart']")).sort((a,b) => b.classList[0].localeCompare(a.classList[0]))

const ccountEl          = document.querySelector('.ccount')
const ecountEl          = document.querySelector('.ecount')

const winModalEl        = document.getElementById('myModal')
const winModal          = new bootstrap.Modal(winModalEl, {})

const wordList          = ['BANANA', 'GOIABA', 'MOCHILA', 'CARTEIRA', 'ENERGIA', 'GELO', 'GUITARRA', 'CHUMBO', 'COCAINA', 'FAVELA', 'BOLA', 'HIPOCRESIA', 'ETIMOLOGIA', 'XAROPE', 'ZADREZ', 'XAVECO', 'EMBAIXADOR', 'LUXUOSO', 'XEROX', 'URUBU', 'CARRO', 'CADEIA', 'PALAVRA', 'COMPUTADOR', 'CARRO', 'ONIBUS', 'ARVORE', 'PEIXE', 'MACONHA', 'NOTEBOOK', 'LIVRO', 'MAÇA', 'ALFACE', 'CEBOLA', 'MOUSE', 'MONITOR', 'TELEVISAO', 'CADEIRA', 'MESA', 'ESCOLA', 'CAPACETE', 'TIGRE', 'LEAO', 'ANIMAL', 'NAVIO', 'CHUPETA', 'BALEIA', 'PIRANHA', 'ELEFANTE', 'OCEANO', 'PONTE', 'PASSARINHO','ABELHA', 'ABOBORA']
const randomWord        = () => Math.floor(Math.random() * (53 - 0)) + 0


let word            = []
let playedLetters   = []
let gameStarted     = false
let ccount          = 0
let ecount          = 0
let modalOpen       = false


gameScreen.classList.add('d-none')

wordEl.addEventListener('keyup', e => {
    countLetter.textContent = wordEl.value.length
})

sortWord.addEventListener('click', () => {
    wordEl.disabled =sortWord.checked
    tip.disabled = sortWord.checked
})

let startGame = () => {

    if(wordEl.value.length > 0 || sortWord.checked){
        
        if(sortWord.checked){
            wordEl.value = wordList[randomWord()]
        }

        word = wordEl.value.toUpperCase().match(/[\w]/g)

        word.forEach(letter => {
            hangmanWord.innerHTML += `<div class="hangman-word-letter">
                                        <span class="hangman-word-letter-letter"></span>
                                    </div>`
        })

        tipEl.textContent = tip.value

        startScreen.classList.add('d-none')
        gameScreen.classList.remove('d-none')

        gameStarted = true

    }

}

btnStartEl.addEventListener('click', startGame)

let verifyLetter = letter => {

    let haveInWord          = word.filter(letra => letra == letter).length
    let havePlayedLetter    = playedLetters.filter(l => l.letra == letter).length

    if(havePlayedLetter == 0){

        let objLetter = {"letra": letter, "tem": false}

        if(haveInWord > 0){

            objLetter.tem = true

            word.forEach((l, i) => {
                if(letter == l){
                    document.querySelectorAll('.hangman-word-letter-letter')[i].textContent = l
                    ccount++
                }
            })

        }else{

        heart[ecount].classList.remove("bi-heart-fill")
        heart[ecount].classList.add("bi-heart")

            ecount++
        }

        playedLetters.push(objLetter)
        
        playedLettersEl.innerHTML = ''
        playedLetters.forEach(l => {
            if(l.tem){
                playedLettersEl.innerHTML += `<span class="mx-1 text-success">${l.letra}</span>`
            }else{
                playedLettersEl.innerHTML += `<span class="mx-1 text-danger">${l.letra}</span>`
            }
        })

        ccountEl.textContent = ccount
        ecountEl.textContent = ecount

        if(ccount == word.length){
            
            winModalEl.querySelector('.modal-body').innerHTML = `<p>Você acertou a palavra era:'${wordEl.value}'.</p>
            <p class="fw-bold mb-0">Acertos: <span class="win-rights text-success">${ccount}</span></p>
            <p class="fw-bold m-0">Erros: <span class="win-wrongs text-danger">${ccount}</span></p>`

            gameStarted = false

            winModal.show()

        }else if(ecount >= 7){

            winModalEl.querySelector('.modal-body').innerHTML = `<p>Você errou a palavra era:'${wordEl.value}'.</p>
            <p class="fw-bold mb-0">Acertos: <span class="win-rights text-success">${ccount}</span></p>
            <p class="fw-bold m-0">Erros: <span class="win-wrongs text-danger">${ecount}</span></p>`
            
            gameStarted = false

            winModal.show()
        }
    }
    
}

document.addEventListener('keypress', e => {
    let key = e.key.toUpperCase()

    if(gameStarted){
        verifyLetter(key)
    }else if(key == 'ENTER' && !modalOpen ){
        startGame()
    }
})


winModalEl.addEventListener('show.bs.modal', () => {

        modalOpen = true

        

})

winModalEl.addEventListener('hide.bs.modal', () => {

    wordEl.value = ''
    tipEl.value = ''

    startScreen.classList.remove('d-none')
    gameScreen.classList.add('d-none')
    
   heart.forEach(h => {
        h.classList.remove('bi-heart')
        h.classList.add('bi-heart-fill')
   })        



    word            = []
    playedLetters   = []
    ccount          = 0
    ecount          = 0
    hangmanWord.innerHTML = ''
    playedLettersEl.innerHTML = ''
    ccountEl.textContent = 0
    ecountEl.textContent = 0 
    tipEl.textContent    = ''

    modalOpen = false 



})
