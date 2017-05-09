<template>
  <div>
    <group v-for="i in collectionN" :key="i">
	  <div style="padding: 10px;">
      这是第{{i}}条收藏
	  </div>
    </group>
  </div>  
</template>

<script>
import { Group } from 'vux'
export default {
  components: {
    Group
  },
  data () {
    return {
      i: 0,
      collectionN: 5
    }
  }
}
</script>

<style></style>
