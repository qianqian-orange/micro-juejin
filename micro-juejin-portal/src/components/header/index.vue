<template>
  <header class="mainapp-header-outer">
    <div class="mainapp-header-inner">
      <img
        class="logo"
        :src="require('@/assets/image/logo-mobile.svg')"
        alt="logo"
      >
      <main-menu />
      <div class="search-container">
        <elm-search
          v-model="search"
          placeholder="搜索文字/标签/用户"
        />
      </div>
    </div>
  </header>
</template>

<script>
import MainMenu from '@/components/menu/index.vue'

export default {
  name: 'MainHeader',
  components: {
    MainMenu,
  },
  data() {
    return {
      search: '',
    }
  },
}
</script>

<style lang="less" scoped>
  .mainapp-header {
    &-outer {
      position: relative;
      z-index: 100;
      width: 100%;
      .height(120);
      border-bottom: 1px solid #f1f1f1;
      background-color: #fff;
    }

    &-inner {
      display: flex;
      align-items: center;
      width: 96%;
      height: 100%;
      margin: 0 auto;
    }
  }

  .logo {
    .width(90);
    .margin-left(16);
  }

  .search-container {
    flex: 1;
    .height(62);
    .margin-left(122);

    ::v-deep .elm-search-input {
      border: 1px solid hsla(0, 0%, 59.2%, .2);
      background-color: rgba(227, 231, 236, .2);
    }

    ::v-deep .elm-search-input:focus {
      border-color: @themeColor;
      background-color: #fff;
    }
  }
</style>
