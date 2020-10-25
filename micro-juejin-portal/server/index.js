const path = require('path')
const fs = require('fs')
const express = require('express')
const compression = require('compression')
const favicon = require('express-favicon')

const app = express()

app.use(compression())
app.use(favicon(path.join(__dirname, './public/favicon.ico')))
app.use('/juejin/dll/', express.static(path.join(__dirname, './public/dll')))
app.use('/juejin/static/', express.static(path.join(__dirname, './public/static')))

app.use((req, res) => {
  fs.readFile(path.join(__dirname, './public/index.html'), 'utf-8', (err, data) => {
    if (err) return res.json({ code: 1 })
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.send(data)
  })
})

const port = process.env.PORT
app.listen(port, () => {
  console.log(`server started at port ${port}!`)
})
