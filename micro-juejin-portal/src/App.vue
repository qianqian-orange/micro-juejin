<template>
  <div id="mainapp">
    <main-header />
    <div id="subapp-container" />
  </div>
</template>

<script>
import MainHeader from '@/components/header/index.vue'

export default {
  name: 'App',
  components: {
    MainHeader,
  },
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
#mainapp {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

#subapp-container {
  overflow: hidden;
  flex: 1;
}
</style>
