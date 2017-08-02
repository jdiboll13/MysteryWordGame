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

const guess = []
const word = words[Math.floor(Math.random(words) * words.length)]
console.log(word)
const wordLength = word.split('')
const placeholder = wordLength.map(x => {
  return '_'
})
let count = 8

app.get('/', (req, res) => {
  res.render('index', { placeholder: placeholder, guess: guess, count: count })
})
app.get('/win', (req, res) => {
  res.render('win', { guess: guess, count: count, word: word })
})
app.get('/lose', (req, res) => {
  res.render('lose', { guess: guess, count: count, word: word })
})

app.post('/guess', (req, res) => {
  guess.push(req.body.guess)
  if (wordLength.includes(req.body.guess)) {
    wordLength.forEach((letter, index) => {
      if (letter === req.body.guess) {
        placeholder[index] = letter
      }
    })
  } else {
    count -= 1
    if (placeholder.join(',') != wordLength.join(',') && count <= 0) {
      message = 'You lose!'
      console.log(message)
      res.redirect('/lose')
    }
  }
  if (placeholder.join(',') === wordLength.join(',') && count >= 0) {
    message = 'You win!'
    console.log(message)
    res.redirect('/win')
  }
  res.redirect('/')
})
app.post('/win', (req, res) => {
  res.render('/index')
})
app.post('/lose', (req, res) => {
  res.render('/index')
})

app.listen(3000, () => {
  console.log("Let's do this!")
})
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
//   This is the advanced version of the above code
//   I'm not at this level yet, but i kind of understand it.
//   return word
//     .split('')
//     .map(letter => {
//       return guesses.include(letter) ? letter : placeholder
//     })
//     .join('')
// }
