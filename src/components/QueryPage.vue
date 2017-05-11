<template>
  <div>
    <div>
      <group>
        <datetime v-model="value1" title="月份查询" format="YYYY-MM" confirm-text="确定" cancel-text="取消"></datetime>
      </group>
      <!--<group>
        <x-input title="工号查询" type="number" placeholder="请输入员工号" v-model="value"></x-input>
      </group>-->
      <search :autoFixed="false" placeholder="请输入员工号"></search>
      <x-button class="query-btn" type="primary" action-type="button" @click.native="success()">查询</x-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Group, Datetime, XButton, XInput, Search} from 'vux'
  export default {
    components: {
      Group,
      Datetime,
      XButton,
      XInput,
      Search
    },
    data () {
      return {
        value: '',
        value1: ''
      }
    },
    methods: {
      success () {
        alert('查到结果了！')
      }
    }
  }
</script>

<style scoped>
  .query-btn {
    width: 90%;
    margin: 0 auto;
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translate(-50%);

  }
</style>
