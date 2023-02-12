const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

const data = require('./data/db.json')

// setting template engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: data.results })
  // past the movie data into 'index' partial template
  // res.render('index', { movies: movieList })
  // res.render('index');
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = data.results.find(
    (restaurant) => restaurant.id.toString() === req.params.restaurant_id
  )

  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = data.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })

  res.render('index', { restaurants, keyword })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
