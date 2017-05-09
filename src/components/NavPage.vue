<template>
  <div>
    <grid></grid>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'

import Grid from './Grid'

export default {
  components: {
    Group,
    Cell,
    Grid
  },
  data () {
    return {
      msg: 'Hello World!'
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
