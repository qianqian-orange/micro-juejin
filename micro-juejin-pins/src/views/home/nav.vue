<template>
  <div class="primary-nav-container">
    <scroll-view
      ref="scroll"
      :scroll-x="true"
      :scroll-y="false"
    >
      <ul class="nav-list">
        <router-link
          v-for="item in navList"
          :key="item.topic_url"
          :to="item.topic_url"
        >
          <li
            class="nav-list-item"
            :class="$route.path.includes(item.topic_url) ? 'active' : ''"
          >
            {{ item.title }}
          </li>
        </router-link>
      </ul>
    </scroll-view>
  </div>
</template>

<script>
import axios from 'axios'
import ScrollView from 'material/components/scrollView/index.vue'

export default {
  name: 'PrimaryNav',
  components: {
    ScrollView,
  },
  data() {
    return {
      navList: [{
        topic_id: '-1',
        title: '推荐',
        topic_url: '/recommended',
        url: '/api/recommend',
        sort_type: 300,
      }, {
        topic_id: '-1',
        title: '热门',
        topic_url: '/hot',
        url: '/api/hot',
        sort_type: 200,
      }],
    }
  },
  watch: {
    $route() {
      this.load()
    },
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      axios.post('/api/recommend_topic_list')
        .then(({ data }) => {
          if (data.code !== 0) return this.$notify({ type: 'danger', message: '获取数据失败' })
          this.navList = this.navList.concat(data.data.map(item => ({
            ...item,
            topic_url: `/topic/${item.topic_id}`,
            sort_type: 200,
            url: '/api/topic',
          })))
          this.$refs.scroll.reset()
          this.load()
        })
    },
    load() {
      const { path } = this.$route
      const item = this.navList.find(item => path.includes(item.topic_url)) || this.navList[0]
      this.$emit('load', {
        url: item.url,
        sort_type: item.sort_type,
        topic_id: item.topic_id,
        cursor: '0',
      })
    },
  },
}
</script>

<style lang="less" scoped>
  .primary-nav-container {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    background-color: #fff;
  }

  .nav-list {
    display: flex;
    flex-wrap: nowrap;
    .px2rem(height, 92);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);

    .nav-list-item {
      height: 100%;
      .padding(0, 24, 0, 24);
      color: #71777c;
      .font-size(28);
      .line-height(92);
      white-space: nowrap;

      &.active {
        color: @themeColor;
      }
    }

    a:first-child {
      .nav-list-item {
        .padding(0, 36, 0, 48);
      }
    }
  }
</style>
