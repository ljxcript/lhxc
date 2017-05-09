<template>
  <div id="app">
    <head-bar></head-bar>
    <router-view></router-view>
    <tool-bar></tool-bar> 
  </div>
</template>

<script>
import ToolBar from './components/ToolBar'
import HeadBar from './components/HeadBar'
export default {
  name: 'app',
  components: {
    ToolBar,
    HeadBar
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
