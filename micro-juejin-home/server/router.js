const express = require('express')
const axios = require('axios')
const router = express.Router()

router.get('/query_category_briefs', (req, res) => {
  axios.get('https://apinew.juejin.im/tag_api/v1/query_category_briefs', {
    params: {
      show_type: 0,
    },
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

router.post('/recommend_tag_list', (req, res) => {
  axios.post('https://apinew.juejin.im/recommend_api/v1/tag/recommend_tag_list', req.body)
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

router.post('/recommend_all_feed', (req, res) => {
  axios.post('https://apinew.juejin.im/recommend_api/v1/article/recommend_all_feed', req.body)
    .then(({ data }) => {
      res.json({
        ...data,
        code: data.err_no,
        msg: data.err_msg,
        data: data.data.filter(item => item.item_type === 2).map(item => item.item_info),
      })
    }).catch(() => {
      res.json({
        code: 1,
      })
    })
})

router.post('/recommend_cate_feed', (req, res) => {
  axios.post('https://apinew.juejin.im/recommend_api/v1/article/recommend_cate_feed', req.body)
    .then(({ data }) => {
      res.json({
        ...data,
        code: data.err_no,
        msg: data.err_msg,
      })
    }).catch(() => {
      res.json({
        code: 1,
      })
    })
})

router.post('/recommend_cate_tag_feed', (req, res) => {
  axios.post('https://apinew.juejin.im/recommend_api/v1/article/recommend_cate_tag_feed', req.body)
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

module.exports = router
