<template>
  <ul class="mainapp-menu mobile">
    <li
      class="mainapp-menu-header active"
      @click="toggle"
    >
      {{ activeIndex === -1 ? '' : menu[activeIndex].text }}
      <elm-icon
        name="solid-arrow"
        :color="variable.themeColor"
        :font-size="36"
        :rotate="180"
      />
    </li>
    <li v-show="!collapse">
      <ul class="mainapp-menu-list">
        <li
          v-for="({ text }, index) in menu"
          :key="text"
          class="mainapp-menu-item"
          :class="index === activeIndex ? 'active' : ''"
          @click="jump(index)"
        >
          {{ text }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import variable from '@/less/var.less'

export default {
  name: 'MainMenu',
  data() {
    return {
      menu: [
        {
          text: '首页',
          url: '/home',
        },
        {
          text: '沸点',
          url: '/pins',
        },
        {
          text: '话题',
          url: '/topics',
        },
        {
          text: '小册',
          url: '/books',
        },
        {
          text: '活动',
          url: '/events',
        },
      ],
      activeIndex: -1,
      collapse: true,
    }
  },
  computed: {
    variable() {
      return variable
    },
  },
  mounted() {
    const { path } = this.$route
    this.activeIndex = this.menu.findIndex(item => path.includes(item.url))
  },
  methods: {
    toggle() {
      this.collapse = !this.collapse
    },
    jump(index) {
      this.collapse = true
      if (this.activeIndex === index) return
      if (index >= 2) {
        this.$notify({ type: 'primary', message: '功能正在开发中' })
        return
      }
      this.activeIndex = index
      this.$router.push(this.menu[index].url)
    },
  },
}
</script>

<style lang="less" scoped>
  .mainapp-menu {
    display: flex;
    flex-wrap: wrap;
    height: 100%;

    &-header,
    &-item {
      display: flex;
      justify-content: center;
      align-items: center;
      .width(136);
      .height(120);
      .font-size(32);
      color: #71777c;

      &.active {
        color: @themeColor;
      }
    }

    &.mobile {
      .width(138);

      .mainapp-menu-list {
        border: 1px solid rgba(177, 180, 185, .45);
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
      }

      .mainapp-menu-item {
        .height(96);
      }
    }
  }

  .elm-icon {
    .margin-left(4);
  }
</style>
