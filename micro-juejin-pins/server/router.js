const express = require('express')
const axios = require('axios')
const router = express.Router()

router.post('/recommend_topic_list', (req, res) => {
  axios.post('https://apinew.juejin.im/recommend_api/v1/tag/recommend_topic_list', {
    cursor: "0",
    id_type: 11,
    limit: 7,
    sort_type: 0,
  }).then(({ data }) => {
    res.json({
      ...data,
      code: data.err_no,
      msg: data.err_msg,
      data: data.data,
    })
  }).catch(() => {
    res.json({
      code: 1,
    })
  })
})

router.post('/recommend', (req, res) => {
  axios.post('https://apinew.juejin.im/recommend_api/v1/short_msg/recommend', req.body)
    .then(({ data }) => {
      res.json({
        ...data,
        code: data.err_no,
        msg: data.err_msg,
        data: data.data,
      })
    }).catch(() => {
      res.json({
        code: 1,
      })
    })
})

router.post('/hot', (req, res) => {
  axios.post('https://apinew.juejin.im/recommend_api/v1/short_msg/hot', req.body)
    .then(({ data }) => {
      res.json({
        ...data,
        code: data.err_no,
        msg: data.err_msg,
        data: data.data,
      })
    }).catch(() => {
      res.json({
        code: 1,
      })
    })
})

router.post('/topic', (req, res) => {
  axios.post('https://apinew.juejin.im/recommend_api/v1/short_msg/topic', req.body)
  .then(({ data }) => {
      res.json({
        ...data,
        code: data.err_no,
        msg: data.err_msg,
        data: data.data,
      })
    }).catch(() => {
      res.json({
        code: 1,
      })
    })
})

router.get('/image', (req, res) => {
  axios.get(req.query.origin, {
    responseType: 'arraybuffer',
  })
    .then((result) => {
      res.setHeader('Content-Type', result.headers['content-type']);
      res.send(result.data)
    })
    .catch(() => {
      res.send()
    })
})

module.exports = router
