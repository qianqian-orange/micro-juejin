const express = require('express')
const router = require('./router')
const app = express()

/* application/x-www-form-urlencoded */
app.use(express.urlencoded({ extended: false }))
/* application/json */
app.use(express.json())

app.use('/juejin/micro-juejin-home/api', router)

app.listen(3001, () => {
  console.log('server start at port 3001')
})
