<template>
  <div id="table-page">
    <confirm v-model="showCusTH" title="选择希望显示的表头"
             @on-confirm="onConfirm"
    >
      <checklist label-position="left" :options="titles" v-model="columnToShow"></checklist>
    </confirm>
    <div id="table-wrapper">
      <x-table :cell-bordered="false">
        <thead>
        <tr>
          <th v-for="title in columnToShowIndex">{{titles[title]}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="r in tDataThisPage">
          <td v-for="c in columnToShowIndex">{{r[c]}}</td>
        </tr>
        </tbody>
      </x-table>
    </div>
    <div class="pRanger-Container">
      <div class="first" @click="firstPage">首页</div>
      <div class="pre" @click="prePage">上一页</div>
      <div v-for="i in indexRange" :class="pageIndex === i ? 'acIndex' : 'normIndex'" @click="toPage(i)">{{i+1}}</div>
      <div class="next" @click="nextPage">下一页</div>
      <div class="last" @click="lastPage">尾页</div>
    </div>
    <group title="选择每页行数">
      <selector :options="rowNperPageChoices" v-model="rowNperPage" @on-change="updatePageN"></selector>
    </group>
    <div v-transfer-dom>
      <actionsheet @on-click-menu="menuMoreClick" :menus="menus" v-model="showMenus" show-cancel></actionsheet>
    </div>
  </div>
</template>

<script>
  import {Group, Checklist, Confirm, XTable, Actionsheet, TransferDom, Selector} from 'vux'
  import Bus from './Bus'
  import FakeData from '../assets/FakeData'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Group,
      XTable,
      Confirm,
      Checklist,
      Actionsheet,
      Selector
    },

    data () {
      return {
        pageIndex: 0,
        pageN: 0,
        rowNperPage: 10,
        rowNperPageChoices: [4, 8, 10],
        indexRange: [],
        menus: {
          menu1: '自定义表头',
          menu2: '条件查询'
        },
        showMenus: false,
        showCusTH: false,
        columnToShow: [],
        columnToShowIndex: [],
        titles: FakeData.titles,
        tDataThisPage: [],
        tData: FakeData.data
      }
    },
    methods: {
      onConfirm: function () {
        this.columnToShowIndex = []
        for (let i = 0; i < this.columnToShow.length; i++) {
          this.columnToShowIndex.push(this.titles.indexOf(this.columnToShow[i]))
        }
        this.columnToShowIndex.sort()
      },
      menuMoreClick: function (key) {
        if (key === 'menu1') {
          this.showCusTH = true
        }
        if (key === 'menu2') {
          this.$router.push('/queryPage')
        }
      }, // more菜单的点击回调
      updatePage: function () {
        this.updateTable() // 更新table中应该呈现的数据
        this.updateIndexBelow() // 更新下方的分页栏
      },
      updateTable: function () {
        this.tDataThisPage = this.tData.slice(this.pageIndex * this.rowNperPage, (this.pageIndex + 1) * this.rowNperPage)
      },
      updateIndexBelow: function () {
        this.indexRange.length = 0
        // 清空“页面范围”数组
        // 移动端屏幕空间有限，选取前后共5个页面下标比较合适
        if (this.pageN <= 5) {
          for (let i = 0; i < this.pageN; i++) {
            this.indexRange.push(i)
          }// 如果页数小于等于5，则下标数组固定为[1, 5]
        } else {
          // 如果页数大于5，则下标数组需要在[pageIndex-2, pageIndex+2]间动态变化
          if (this.pageIndex >= 2) {
            for (let i = -2; i < 3; i++) {
              if (this.pageIndex + i < this.pageN) {
                this.indexRange.push(this.pageIndex + i)
              } // 避免超出pageN的数出现
            }
            if (this.pageIndex === this.pageN - 1) {
              this.indexRange.unshift(this.pageIndex - 3)
              this.indexRange.unshift(this.pageIndex - 4)
            }
            if (this.pageIndex === this.pageN - 2) {
              this.indexRange.unshift(this.pageIndex - 3)
            } // 上面两个if语句是为了补全5个下标
          } else {
            for (let i = 0; i < 5; i++) {
              this.indexRange.push(i)
            }
          }
        }
      },
      nextPage: function () {
        if (this.pageIndex !== this.pageN - 1) {
          this.toPage(this.pageIndex + 1)
        }
      },
      prePage: function () {
        if (this.pageIndex !== 0) {
          this.toPage(this.pageIndex - 1)
        }
      },
      firstPage: function () {
        this.toPage(0)
      },
      lastPage: function () {
        this.toPage(this.pageN - 1)
      },
      toPage: function (i) {
        this.pageIndex = i
        this.updatePage()
      },
      updatePageN: function () {
        this.pageN = Math.ceil(this.tData.length / this.rowNperPage)
        if (this.pageIndex >= this.pageN) {
          this.pageIndex = this.pageN - 1
        }
        this.updatePage()
      }
    },
    beforeMount: function () {
      let rowN = this.tData.length
      this.pageN = Math.ceil(rowN / this.rowNperPage)
      let length = this.titles.length
      for (let i = 0; i < length; i++) {
        this.columnToShowIndex[i] = i
      }
      // 初始化数据
      Bus.$on('menu-more-click', () => {
        this.showMenus = true
      })
      // 初始化事件监听
      this.updatePage()
      // 初始化视图
    }
  }
</script>


<style scoped>
  #table-page {
    height: 80%;
  }

  #table-wrapper {
    overflow: scroll;
    margin-bottom: 10px;
    height: 75%;
  }

  #table-wrapper table {
  }

  #table-wrapper table thead {
    background-color: gray;
    color: white;
  }

  #table-wrapper table tr:nth-of-type(odd){
     background-color: #B4DCF0
   }

  #table-wrapper table tr:nth-of-type(even){
    background-color: #DFEDF4
  }

  #table-wrapper table th {
    background-color: #808080;
  }

  #table-wrapper table td, th {
    padding-left: 10px;
    padding-right: 10px;
    line-height: 30px;
    white-space: nowrap;
    word-break: keep-all;
  }

  #table-wrapper table th {
    border-left: 1px solid white;
  }

  .pRanger-Container {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .pRanger-Container > div {
    border: 0.5px solid lightgray;
    padding: 2px 2px;
    border-collapse: collapse;
    flex-grow: 1;
    text-align: center;
  }

  .pRanger-Container .acIndex {
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 2px 10px;
  }

  .pRanger-Container .normIndex {
    padding: 2px 10px;
  }
</style>
