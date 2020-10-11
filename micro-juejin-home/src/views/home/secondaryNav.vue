<template>
  <ul
    v-if="navList.length"
    class="nav-list"
  >
    <router-link
      v-for="item in list"
      :key="item.tag_id"
      :to="`/${primaryTag}/${item.tag_name}`"
    >
      <li class="nav-list-item">
        <elm-tag
          :font-size="28"
          :color="item.tag_id === '-1' && !secondaryTag ?
            variable.themeColor : (item.tag_name === secondaryTag ? variable.themeColor : '#909090')"
        >
          {{ item.tag_name }}
        </elm-tag>
      </li>
    </router-link>
    <li
      v-if="expand"
      class="nav-list-item"
      @click="expanded"
    >
      <elm-tag
        :font-size="28"
        color="#909090"
      >
        展开
        <elm-icon
          name="solid-arrow"
          color="#909090"
          :font-size="32"
          :rotate="180"
        />
      </elm-tag>
    </li>
  </ul>
</template>

<script>
import axios from 'axios'
import variable from '@/less/var.less'

export default {
  name: 'SecondaryNav',
  data() {
    return {
      navList: [],
      max: 10,
      expand: false,
      cateId: '-1',
    }
  },
  computed: {
    list() {
      return this.expand ? this.navList.slice(0, this.max) : this.navList
    },
    primaryTag() {
      return this.$route.params.primaryTag
    },
    secondaryTag() {
      return this.$route.params.secondaryTag
    },
    variable() {
      return variable
    },
  },
  watch: {
    secondaryTag(val) {
      if (!val) return
      this.load()
    },
  },
  methods: {
    getData(id) {
      this.cateId = id
      axios.post('/api/recommend_tag_list', {
        cate_id: id,
      }).then(({ data }) => {
        if (data.code !== 0) return this.$notify({ type: 'danger', message: '获取数据失败' })
        this.navList = [{
          tag_id: '-1',
          tag_name: '全部',
        }].concat(data.data)
        this.expand = this.navList.length > this.max
        this.load()
      })
    },
    expanded() {
      this.expand = false
      this.$emit('expand')
    },
    clear() {
      this.cateId = '-1'
      this.navList = []
    },
    load() {
      const item = this.navList.find(item => item.tag_name === this.secondaryTag) || this.navList[0]
      this.$emit('load', {
        url: item.tag_id === '-1' ? '/api/recommend_cate_feed' : '/api/recommend_cate_tag_feed',
        tag_id: item.tag_id,
        cursor: '0',
      })
    },
  },
}
</script>

<style lang="less" scoped>
  .nav-list {
    display: flex;
    flex-wrap: wrap;
    .padding-top(20);
    .padding-left(48);
    .margin-bottom(12);
    background-color: #f4f5f5;
  }

  .nav-list-item {
    .height(48);
    .line-height(48);
    .margin(0, 20, 18, 0);
  }

  .elm-tag {
    .padding(4, 20, 4, 20);
    border-width: 0;
    background-color: #fff;
    .px2rem(border-radius, 28);
  }

  .elm-icon {
    .margin-top(-4);
    vertical-align: middle;
  }
</style>
