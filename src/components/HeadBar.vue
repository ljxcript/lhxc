<template>
	<div id = 'head-bar'>
        <x-header :right-options="{showMore: showMore}" @on-click-more="emit" >{{this.title}}</x-header>
	</div>
</template>

<script>
import { XHeader } from 'vux'
import Bus from './Bus'

export default {
  components: {
    XHeader
  },
  data () {
    return {
      title: '量化薪酬',
      showMore: true,
      showMenus: false
    }
  },
  methods: {
    emit: function () {
      Bus.$emit('menu-more-click')
    }
  },
  beforeCreate: function () {
    var that = this
    Bus.$on('page-switch', function (info) {
      that.title = info
    })// 注册监听页面跳转事件，接受页面名称作为title
  }
}

</script>



<style>
  #head-bar .vux-header{
    background : #00B1DD;
  }
  #head-bar .vux-header .vux-header-left,
  #head-bar .vux-header .vux-header-right .vux-header-more,
  #head-bar .vux-header .vux-header-title,
  #head-bar .vux-header .vux-header-back{
    color: #000000;
  }
  #head-bar .vux-header .vux-header-left .left-arrow::before{
    border-color: #000000;
  }
</style>
