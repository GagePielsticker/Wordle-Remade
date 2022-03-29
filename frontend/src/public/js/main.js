let entered = 0
let currentLine = 1
let attemptWord = ''
let finished = false

/* Handles Keyboard Events */
document.onkeypress = function (evt) {
  // Get our keypress event
  evt = evt || window.event
  const charCode = evt.keyCode || evt.which
  const charStr = String.fromCharCode(charCode)

  if (!(/^[A-Za-z]+$/).test(charStr)) return // Check if is letter

  addLetter(charStr)
}

/* Handles backspace event */
document.addEventListener('keydown', function (event) {
  const key = event.key

  if (event.keyCode === 13) {
    submitWord()
  }

  if (key === 'Backspace' || key === 'Delete') {
    if (entered == 0 || entered == ((5 * currentLine) - 5)) return
    attemptWord = attemptWord.slice(0, -1) // remove last letter
    document.getElementById(`row${entered}`).classList.remove('animate__pulse')
    document.getElementById(`row${entered}`).innerHTML = ''
    entered--
  }
})

/* Adding letters to the tile */
function addLetter (char) {
  if(finished) return
  console.log(`Appending character ${char} in ${entered} tile, row ${currentLine}`)
  //Stop people from typing into the next line
  if (entered == (5 * currentLine)) {
    return console.log('Attempting to continue to next row before submitting.')
  }

  document.getElementById(`row${entered + 1}`).classList.add('animate__pulse')
  document.getElementById(`row${entered + 1}`).innerHTML = char.toUpperCase()
  attemptWord += char.toLowerCase()
  entered++
}

function cannon () {

  setInterval(() => {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    })

    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    })
  }, 50)

}
/* Handles word submission */
async function submitWord () {

  if(finished) {
    return alertDanger('Congrats! You already won.')
  }

  //Used all attempts
  if(currentLine == 7) {
    return alertDanger('You have used all your attempts.')
  }

  //Attempts to submit before line is full
  if(entered % (5*currentLine) !== 0 || entered == 0) {
    return alertDanger('You must enter a character in each block before submitting.')
  }

  //Call frontend service to call api
  let res = await fetch('/check', {
    method: 'post',
    body: JSON.stringify({
      attempt: attemptWord
    }),
    headers: { "Content-Type": "application/json" }
  })

  let dataParsed = await res.json()

  //If api did not respond to frontend service
  if(dataParsed.error) {
    return alertDanger(`SERVER ERROR: ${dataParsed.error}`) 
  }

  if(dataParsed.attempt) {
    dataParsed.attempt.map((entry, index) => {
      document.getElementById(`row${(index + (5*currentLine) - 4)}`).classList.add('animate__flipInX')
      if(entry == 0) {
        myKeyboard.buttonElements[attemptWord[index]][0].classList.add('wrong')
        return document.getElementById(`row${(index + (5*currentLine) - 4)}`).classList.add('no')
      }
      if(entry == 1) {
        myKeyboard.buttonElements[attemptWord[index]][0].classList.add('possibly')
        return document.getElementById(`row${(index + (5*currentLine) - 4)}`).classList.add('maybe')
      }
      if(entry == 2) {
        myKeyboard.buttonElements[attemptWord[index]][0].classList.add('correct')
        return document.getElementById(`row${(index + (5*currentLine) - 4)}`).classList.add('yes')
      }
    })
    if(dataParsed.attempt.every(e => e == 2)) {
      cannon()
      finished = true
    }
  }
  

  //reset and move to next line
  attemptWord = ''
  entered = (5 * currentLine)
  currentLine++
}

const Keyboard = window.SimpleKeyboard.default

const myKeyboard = new Keyboard({
  onKeyPress: button => onKeyPress(button),

  layout: {
    'default': [
      'q w e r t y u i o p',
      'a s d f g h j k l',
      '{enter} z x c v b n m {bksp}'
    ]
  }
})

function onKeyPress(button) {
  if(button == '{enter}') return submitWord()
  if(button == '{bksp}') {
    if (entered == 0 || entered == ((5 * currentLine) - 5)) return
    attemptWord = attemptWord.slice(0, -1) // remove last letter
    document.getElementById(`row${entered}`).classList.remove('animate__pulse')
    document.getElementById(`row${entered}`).innerHTML = ''
    entered--
    return
  }
  if (!(/^[A-Za-z]+$/).test(button)) return
  addLetter(button)
}

function alertDanger(text) {
  document.getElementById('alert').innerHTML = text
  document.getElementById('alert').style.display = 'block'
  setTimeout(() => {
    document.getElementById('alert').classList.add('animate__fadeOut')
    setTimeout(() => {
      document.getElementById('alert').style.display = 'none'
      document.getElementById('alert').classList.remove('animate__fadeOut')
    }, 2000)
  }, 5000)
}