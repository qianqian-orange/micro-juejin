const path = require('path')
const fs = require('fs')
const express = require('express')
const router = require('./router')
const compression = require('compression')
const favicon = require('express-favicon')
const app = express()

app.use(compression())
app.use(favicon(path.join(__dirname, './public/favicon.ico')))
app.use('/juejin/micro-juejin-home/dll/', express.static(path.join(__dirname, './public/dll')))
app.use('/juejin/micro-juejin-home/static/', express.static(path.join(__dirname, './public/static')))

/* application/x-www-form-urlencoded */
app.use(express.urlencoded({ extended: false }))
/* application/json */
app.use(express.json())

app.use('/juejin/micro-juejin-home/api', router)

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
