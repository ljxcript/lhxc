<template>
	<div class="nav-wrapper">

		<grid :rows="3"  :key="j">
			<router-link v-for="i in 9" :key="i" v-bind:to="`/${subPage[i-1]}`">
			  <grid-item :label="labelName[i-1]">
			  </grid-item>
			</router-link>
		</grid>
	</div>	
</template>


<script>
import { Grid, GridItem } from 'vux'

export default {
  components: {
    Grid,
    GridItem
  },
  data () {
    return {
      i: 0,
      j: 0,
      labelName: ['报表展示', '未开发', '未开发', '未开发', '未开发', '未开发', '未开发', '未开发', '未开发'],
      subPage: ['showTable', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
    }
  }
}

</script>
	

<style>
	.nav-wrapper {
		margin-left: 5%;
		margin-right: 5%;
	}
</style>
