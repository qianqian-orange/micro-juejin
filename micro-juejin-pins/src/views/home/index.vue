<template>
  <div class="pins-container">
    <custom-nav
      @load="load"
    />
    <div class="scroll-wrapper">
      <list-scroll-view
        ref="scroll"
        :loading="loading"
        :finish="finish"
        :data-source="pins"
        @loadmore="loadmore"
      >
        <div class="block" />
        <ul
          v-show="params.topic_id !== '-1'"
          class="sort-list"
        >
          <router-link
            v-for="item in sortList"
            :key="item.sort_type"
            :to="`${$route.path}?sort=${item.sort}`"
          >
            <li
              class="sort-list-item"
              :class="item.sortType === params.sort_type ? 'active' : ''"
            >
              {{ item.text }}
            </li>
          </router-link>
        </ul>
        <ul class="pin-list">
          <card
            v-for="pin in pins"
            :key="pin.msg_Info.msg_id"
            :pin="pin"
            @preview="open"
          />
        </ul>
      </list-scroll-view>
    </div>
    <picture-preview
      v-show="preview"
      ref="preview"
      :data-source="picList"
      :active="active"
      @close="close"
    />
  </div>
</template>

<script>
import axios from 'axios'
import { BASE_URL } from '@/config/const'
import ListScrollView from 'material/components/listScrollView/index.vue'
import CustomNav from './nav.vue'
import Card from './card.vue'
import PicturePreview from 'material/components/picturePreview/index.vue'

export default {
  name: 'Pins',
  components: {
    ListScrollView,
    CustomNav,
    Card,
    PicturePreview,
  },
  data() {
    return {
      sortList: [
        {
          text: '热门',
          sort: 'popular',
          sortType: 200,
        },
        {
          text: '最新',
          sort: 'newest',
          sortType: 500,
        },
      ],
      pins: [],
      loading: false,
      finish: false,
      params: {
        url: '',
        sort_type: 300, // 300 200 500
        cursor: '0',
        id_type: 4,
        limit: 20,
        topic_id: '-1',
      },
      preview: false,
      picList: [],
      active: 0,
    }
  },
  methods: {
    load(params) {
      this.updateParam(params)
      this.getData()
    },
    updateParam(params) {
      this.pins = []
      this.finish = false
      Object.keys(params).forEach((key) => {
        if (this.params.hasOwnProperty(key)) {
          this.params[key] = params[key]
        }
      })
      const { sort } = this.$route.query
      if (!sort) return
      const item = this.sortList.find(item => item.sort === sort)
      if (!item) return
      this.params.sort_type = item.sortType
    },
    getData() {
      this.loading = true
      axios.post(this.params.url, this.params)
        .then(({ data }) => {
          if (data.code !== 0) return this.$notify({ type: 'danger', message: '获取数据失败' })
          this.params.cursor = data.cursor
          data.data.forEach((item) => {
            item.author_user_info.avatar_large = `${BASE_URL}/api/image?origin=${item.author_user_info.avatar_large}`
          })
          this.pins = this.pins.concat(data.data)
          if (data.data.length < this.params.limit) this.finish = true
        })
        .finally(() => {
          this.loading = false
        })
    },
    loadmore() {
      this.getData()
    },
    open({ picList, index }) {
      this.preview = true
      this.active = index
      if (this.picList === picList) this.$refs.preview.jump(index)
      else this.picList = picList
    },
    close() {
      this.preview = false
      // 这里需要把active重置，否则下次open如果index相同，那么就不会触发picturePreview的watch方法
      this.active = 0
      this.$refs.preview.jump(0)
    },
  },
}
</script>

<style lang="less" scoped>
  .pins-container {
    box-sizing: border-box;
    position: relative;
    height: 100%;
    .padding-top(92);
  }

  .scroll-wrapper {
    overflow: hidden;
    height: 100%;
  }

  .sort-list {
    display: flex;
    justify-content: center;
    align-items: center;
    .height(84);
    color: @secondaryText;
    .font-size(28);
    background-color: #fff;
  }

  .sort-list-item {
    position: relative;
    .width(180);
    .height(54);
    text-align: center;
    .line-height(54);

    &.active {
      color: @themeColor;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        .width(72);
        .height(6);
        background-color: @themeColor;
      }
    }
  }

  .block {
    .height(20);
    background-color: #f4f5f5;
  }
</style>
