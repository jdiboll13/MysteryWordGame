const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const session = require('express-session')
const fs = require('fs')
const words = fs.readFileSync('/usr/share/dict/words', 'utf-8').toLowerCase().split('\n')

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// const placeholder = '_'
// const hangman = (word, guesses) => {
//   let output = ''
//   for (let i = 0; i < word.length; i++) {
//     const letter = word[i]
//     if (guesses.include(letter)) {
//       output += letter
//     } else {
//       output += placeholder
//     }
//   }
//   return output
//   //   This is the advanced version of the above code
//   //   I'm not at this level yet, but i kind of understand it.
//   //   return word
//   //     .split('')
//   //     .map(letter => {
//   //       return guesses.include(letter) ? letter : placeholder
//   //     })
//   //     .join('')
// }
const guesses = ''

app.get('/', (req, res) => {
  const word = words[Math.floor(Math.random(words) * words.length)]
  console.log(word)
  //then display the right amount of spaces for the word

  //let the player know that they have 8 guesses to start
  res.render('index')
})

app.post('/guess', (req, res) => {
  const hangman = (word, guesses) => {
    let output = ''
    for (let i = 0; i < word.length; i++) {
      const letter = word[i]
      if (guesses.include(letter)) {
        output += letter
      } else {
        output += placeholder
      }
    }
    return output
  }
  //once you submit a guess it will add that guess to the Letters Guessed
  //it will also check the word to see if that letter is in the word
  //then it will return the word with the chosen letters revealed
  //it will also tell you how many guesses you have left
  res.redirect('/', output)
})

app.listen(3000, () => {
  console.log("Let's do this!")
})
