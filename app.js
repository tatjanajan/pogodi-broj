/*
PRAVILA IGRE:
- igrač mora pogoditi broj između min i max
- igrač ima određen broj pokušaja
- igrača se obavještava o broju pokušaja koji su mu ostali
- igrača se obavještava je li pogodio točno ili pogrešno
- igrač može izabrati ponavljanje igre
*/

// Vrijednosti u igri
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elementi
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessInput = document.querySelector('#guess-input'),
      guessBtn = document.querySelector('#guess-btn'),
      message = document.querySelector('.message');

// Dodjeljujem UI elementima (spanovima) min i max
minNum.textContent = min;
maxNum.textContent = max;

// event listener na gumbić submit kad ima klasu play-again
// budući da klasu play-again dodajemo dinamički, moramo ciljati na parenta (event delegation)
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
});

// event listener na gumbić submit
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    // Provjeravam je li unesena vrijednost u input uopće broj (metoda isNaN) i je li manja od minimuma ili veća od maksimuma
    if(isNaN(guess) || guess < min || guess > max) {
      setMessage(`Molimo unesite broj između ${min} i ${max}!`, 'red');
    }

    else {
        // Ako je uneseni broj ispravan
        if(guess === winningNum) {
            // igra je završila - pogodak
            gameOver(true, `Broj ${winningNum} je točan, POGODAK!`);
        }
        // Ako je uneseni broj pogrešan
        else {
            guessesLeft -= 1;

            if(guessesLeft === 0) {
                // igra je završila - bez pogotka
            gameOver(false, `Igra je završila, niste pogodili. Točan broj je ${winningNum}.`);
            }
            else {
                // igra se nastavlja - pogrešan odgovor
                // obrub input polja postaje crven 
                guessInput.style.borderColor = 'red';
                // očisti input polje
                guessInput.value = '';
                // poruka da je broj pogrešan
                setMessage(`Broj ${guess} nije traženi broj. Možete pokušati još ${guessesLeft} puta.`, 'red');
            }
        }   
    }
});

// funkcija Game Over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

     // onemogućavam daljnji unos brojeva
     guessInput.disabled = true;
     // obrub input polja postaje crven ili zelen 
     guessInput.style.borderColor = color;
     // poruka da je igra završila
     setMessage(msg, color);

     // submit gumbić mijenja tekst u "zaigraj ponovo"
     guessBtn.value = 'Zaigraj ponovo!';
     guessBtn.className += 'play-again';
}

// Get Winning Number
function getRandomNum(min, max) {
    return Math.floor(Math.random()*(max-min+1) + min);
}

// funkcija kojom se kreira poruka
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}



