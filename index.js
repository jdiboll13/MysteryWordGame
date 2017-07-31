const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const words = fs.readFileSync('/usr/share/dict/words', 'utf-8').toLowerCase().split('\n')

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(3000, () => {
  console.log("Let's do this!")
})
