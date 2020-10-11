<template>
  <div class="home-container">
    <primary-nav
      @load="primaryNavLoad"
    />
    <div class="scroll-wrapper">
      <list-scroll-view
        ref="scroll"
        :loading="loading"
        :finish="finish"
        :data-source="articleList"
        @loadmore="loadmore"
      >
        <div class="block" />
        <secondary-nav
          ref="secondaryTag"
          @expand="expand"
          @load="secondaryNavLoad"
        />
        <ul class="sort-list">
          <li
            v-for="item in navList"
            :key="item.sortType"
            class="sort-list-item"
            :class="item.sortType === params.sort_type ? 'active' : ''"
            @click="sort(item)"
          >
            {{ item.text }}
          </li>
        </ul>
        <ul class="article-list">
          <li
            v-for="item in articleList"
            :key="item.article_info.article_id"
            class="article-list-item"
          >
            <p class="article-info">
              <span>{{ item.author_user_info.user_name }}</span>
              <span>{{ item.article_info.mtime | time }}</span>
              <span>{{ item.tags.map(item => item.tag_name).join('/') }}</span>
            </p>
            <p class="article-title">
              {{ item.article_info.title }}
            </p>
            <div class="article-evaluate">
              <span class="good">{{ item.article_info.digg_count || '' }}</span>
              <span class="comment">{{ item.article_info.comment_count || '' }}</span>
            </div>
          </li>
        </ul>
      </list-scroll-view>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import PrimaryNav from './primaryNav.vue'
import SecondaryNav from './secondaryNav.vue'
import ListScrollView from 'material/components/listScrollView'

export default {
  name: 'Home',
  components: {
    PrimaryNav,
    SecondaryNav,
    ListScrollView,
  },
  filters: {
    time(val) {
      val = Math.floor(Date.now() / 1000) - val
      if (val < 60) return `${val}秒前`
      val = Math.floor(val / 60)
      if (val < 60) return `${val}分钟前`
      val = Math.floor(val / 60)
      if (val < 24) return `${val}小时前`
      val = Math.floor(val / 24)
      return `${val}天前`
    },
  },
  data() {
    return {
      navList: [
        {
          text: '热门',
          sort: 'popular',
          sortType: 200,
        },
        {
          text: '最新',
          sort: 'newest',
          sortType: 300,
        },
        {
          text: '热榜',
          sort: 'three_days_hottest',
          sortType: 3,
        },
      ],
      articleList: [],
      loading: false,
      finish: false,
      params: {
        url: '',
        sort_type: 200, // 300 3
        client_type: 2608,
        cursor: '0',
        id_type: 2,
        limit: 20,
        cate_id: '-1',
        tag_id: '-1',
      },
    }
  },
  methods: {
    updateParam(params) {
      this.articleList = []
      this.finish = false
      Object.keys(params).forEach((key) => {
        if (this.params.hasOwnProperty(key)) {
          this.params[key] = params[key]
        }
      })
      const { sort } = this.$route.query
      if (!sort) {
        this.params.sort_type = 200
        return
      }
      const item = this.navList.find(item => item.sort === sort)
      if (!item) {
        this.params.sort_type = 200
        return
      }
      this.params.sort_type = item.sortType
    },
    getData() {
      this.loading = true
      axios.post(this.params.url, this.params)
        .then(({ data }) => {
          if (data.code !== 0) return this.$notify({ type: 'danger', message: '获取数据失败' })
          this.params.cursor = data.cursor
          this.articleList = this.articleList.concat(data.data)
          if (data.data.length < this.params.limit) this.finish = true
        })
        .finally(() => {
          this.loading = false
        })
    },
    primaryNavLoad(params) {
      this.updateParam(params)
      if (params.cate_id === '-1') {
        this.params.tag_id = '-1'
        this.$refs.secondaryTag.clear()
        this.getData()
        return
      }
      this.$refs.secondaryTag.getData(params.cate_id)
    },
    secondaryNavLoad(params) {
      this.updateParam(params)
      this.getData()
    },
    sort(data) {
      if (this.params.sort_type === data.sortType) return
      this.$router.push(`${this.$route.path}?sort=${data.sort}`)
      this.params.sort_type = data.sortType
      this.params.cursor = '0'
      this.articleList = []
      this.finish = false
      this.getData()
    },
    loadmore() {
      this.getData()
    },
    expand() {
      this.$refs.scroll.reset()
    },
  },
}
</script>

<style lang="less" scoped>
  .home-container {
    box-sizing: border-box;
    position: relative;
    height: 100%;
    .padding-top(92);
  }

  .scroll-wrapper {
    overflow: hidden;
    height: 100%;
    // height: calc(~"100% - @{sortListHeight}");
    background-color: #fff;
  }

  .sort-list {
    box-sizing: border-box;
    display: flex;
    .height(92);
    .padding(30, 24, 30, 24);
    border-bottom: 1px solid hsla(0, 0%, 59.2%, .1);
    .font-size(28);
    color: @secondaryText;
  }

  .sort-list-item {
    position: relative;
    .width(116);
    text-align: center;

    &.active {
      color: @themeColor;
    }

    &:not(:last-child)::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 1px;
      height: 100%;
      background-color: @secondaryText;
    }
  }

  .article-list-item {
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
    .padding(36, 48, 36, 48);

    &:not(:last-child) {
      border-bottom: 1px solid rgba(178, 186, 194, .15);
    }
  }

  .article-info {
    .single-line-overflow;
    .margin-bottom(12);
    .font-size(24);
    .line-height(34);
    color: #b2bac2;

    span:not(:last-child)::after {
      content: "·";
      .margin-left(8);
    }
  }

  .article-title {
    .single-line-overflow;
    .margin-bottom(24);
    color: #333;
    .font-size(32);
    font-weight: 600;
  }

  .article-evaluate {
    color: #b2bac2;
    font-size: 0;
    .height(42);

    .good,
    .comment {
      .padding(0, 20, 0, 20);
      border: 1px solid #edeeef;
      .font-size(24);

      &::before {
        content: "";
        display: inline-block;
        .margin-right(4);
        vertical-align: text-top;
      }
    }

    .comment {
      border-left-width: 0;
    }

    .good::before {
      .width(32);
      .height(32);
      .bg("~@/assets/image/good.svg");
    }

    .comment::before {
      .width(40);
      .height(40);
      .bg("~@/assets/image/comment.svg");
    }
  }

  .block {
    .height(20);
    background-color: #f4f5f5;
  }
</style>
