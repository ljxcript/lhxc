<template>
    <tabbar id="cus-toolbar">
      <tabbar-item>
        <router-link to="/" slot="label">      
           目录
        </router-link>        
      </tabbar-item>
      <tabbar-item>
        <router-link to="/collections" slot="label">
          收藏夹
        </router-link>
      </tabbar-item>    
    </tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
  components: {
    Tabbar,
    TabbarItem
  },
  data () {
    return {
      msg: 'Hello World!'
    }
  }
}
</script>


<style>
#cus-toolbar {
  position: fixed;
}
</style>
