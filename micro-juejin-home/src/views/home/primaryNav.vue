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
          :key="item.category_url"
          :to="`/${item.category_url}`"
        >
          <li
            class="nav-list-item"
            :class="primaryTag === item.category_url ? 'active' : ''"
          >
            {{ item.category_name }}
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
        category_id: '-1',
        category_name: '推荐',
        category_url: 'recommended',
      }],
    }
  },
  computed: {
    primaryTag() {
      return this.$route.params.primaryTag
    },
  },
  watch: {
    primaryTag() {
      this.load()
    },
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      axios.get('/api/query_category_briefs')
        .then(({ data }) => {
          if (data.code !== 0) return this.$notify({ type: 'danger', message: '获取数据失败' })
          this.navList = this.navList.concat(data.data)
          this.$refs.scroll.reset()
          this.load()
        })
    },
    load() {
      const item = this.navList.find(item => item.category_url === this.primaryTag) || this.navList[0]
      this.$emit('load', {
        url: item.category_id === '-1' ? '/api/recommend_all_feed' : '/api/recommend_cate_feed',
        cate_id: item.category_id,
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
