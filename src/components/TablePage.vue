<template>
  <div>
    <confirm v-model="showCusTH" title="选择希望显示的表头" 
    @on-cancel="onCancel"
    @on-confirm="onConfirm"
    @on-show="onShow"
    @on-hide="onHide"
    >
      <checklist label-position="left" :options="titles" v-model="columnToShow"></checklist>
    </confirm>  
    <div id = "table-wrapper">
      <x-table :cell-bordered="false">
      <thead> 
        <tr>
        <th v-for="title in columnToShowIndex">{{titles[title]}}</th>
        </tr>
      </thead>
      <tbody>        
        <tr v-for="r in tData">
        <td v-for="c in columnToShowIndex">{{r[c]}}</td>
        </tr>
      </tbody>        
      </x-table>
    </div>
    <div v-transfer-dom>
      <actionsheet @on-click-menu="menuMoreClick" :menus="menus" v-model="showMenus" show-cancel ></actionsheet>
    </div>    
  </div>
</template>

<script>
import { Checklist, Confirm, XTable, Actionsheet, TransferDom } from 'vux'
import Bus from './Bus'

export default {
  directives: {
    TransferDom
  },
  components: {
    XTable,
    Confirm,
    Checklist,
    Actionsheet
  },

  data () {
    return {
      menus: {
        menu1: '自定义表头',
        menu2: '条件查询'
      },
      showMenus: false,
      showCusTH: false,
      columnToShow: [
      ],
      columnToShowIndex: [
      ],
      titles: [
        '月份',
        '客户经理BOSS工号',
        '归属分公司',
        '客户经理群体',
        '团队名称',
        '是否团队队长',
        '客户经理姓名',
        '集团客户新增扣减奖金',
        '集团彩铃扣减奖金'
      ],
      tData: [
        [
          '201703',
          'AGZHSK000120',
          '花都分公司',
          '普通集团客户经理',
          '花都分公司政企客户花都东网格团队',
          '是',
          '文素群',
          '1900.5',
          '1900.5'
        ],
        [
          '201703',
          'AGZHSK000013',
          '花都分公司',
          '普通集团客户经理',
          '花都分公司政企客户花都东网格团队',
          '是',
          '陈欣燕',
          '1900.5',
          '1900.5'
        ],
        [
          '201703',
          'AGZPA0030012',
          '花都分公司',
          '普通集团客户经理',
          '花都分公司政企客户花都东网格团队',
          '是',
          '刘转芬',
          '1900.5',
          '1900.5'
        ],
        [
          '201703',
          'AGZPA0010163',
          '番禺分公司',
          '普通集团客户经理',
          '番禺分公司南沙客户部大岗网格团队',
          '是',
          '郭松生',
          '1900.5',
          '1900.5'
        ],
        [
          '201703',
          'AGZPA0010244',
          '番禺分公司',
          '普通集团客户经理',
          '番禺分公司南沙客户部大岗网格团队',
          '是',
          '郭健',
          '1900.5',
          '1900.5'
        ],
        [
          '201703',
          'AGZHSK000120',
          '花都分公司',
          '普通集团客户经理',
          '花都分公司政企客户花都东网格团队',
          '是',
          '文素群',
          '1900.5',
          '1900.5'
        ],
        [
          '201703',
          'AGZHSK000013',
          '花都分公司',
          '普通集团客户经理',
          '花都分公司政企客户花都东网格团队',
          '是',
          '陈欣燕',
          '1900.5',
          '1900.5'
        ],
        [
          '201703',
          'AGZPA0030012',
          '花都分公司',
          '普通集团客户经理',
          '花都分公司政企客户花都东网格团队',
          '是',
          '刘转芬',
          '1900.5',
          '1900.5'
        ],
        [
          '201703',
          'AGZPA0010163',
          '番禺分公司',
          '普通集团客户经理',
          '番禺分公司南沙客户部大岗网格团队',
          '是',
          '郭松生',
          '1900.5',
          '1900.5'
        ],
        [
          '201703',
          'AGZPA0010244',
          '番禺分公司',
          '普通集团客户经理',
          '番禺分公司南沙客户部大岗网格团队',
          '是',
          '郭健',
          '1900.5',
          '1900.5'
        ],
        [
          '201703',
          'AGZHSK000120',
          '花都分公司',
          '普通集团客户经理',
          '花都分公司政企客户花都东网格团队',
          '是',
          '文素群',
          '1900.5',
          '1900.5'
        ],
        [
          '201703',
          'AGZHSK000013',
          '花都分公司',
          '普通集团客户经理',
          '花都分公司政企客户花都东网格团队',
          '是',
          '陈欣燕',
          '1900.5',
          '1900.5'
        ],
        [
          '201703',
          'AGZPA0030012',
          '花都分公司',
          '普通集团客户经理',
          '花都分公司政企客户花都东网格团队',
          '是',
          '刘转芬',
          '1900.5',
          '1900.5'
        ],
        [
          '201703',
          'AGZPA0010163',
          '番禺分公司',
          '普通集团客户经理',
          '番禺分公司南沙客户部大岗网格团队',
          '是',
          '郭松生',
          '1900.5',
          '1900.5'
        ],
        [
          '201703',
          'AGZPA0010244',
          '番禺分公司',
          '普通集团客户经理',
          '番禺分公司南沙客户部大岗网格团队',
          '是',
          '郭健',
          '1900.5',
          '1900.5'
        ],
        [
          '201703',
          'AGZGTZE00119',
          '番禺分公司',
          '普通集团客户经理',
          '番禺分公司南沙客户部大岗网格团队',
          '是',
          '陈锡东',
          '1900.5',
          '1900.5'
        ]
      ]
    }
  },
  methods: {
    onCancel: function () {
    },
    onConfirm: function () {
      this.columnToShowIndex = []
      for (let i = 0; i < this.columnToShow.length; i++) {
        this.columnToShowIndex.push(this.titles.indexOf(this.columnToShow[i]))
      }
      this.columnToShowIndex.sort()
    },
    onHide: function () {
    },
    onShow: function () {
    }, // 四个回调函数用于自定义表头的confirm输入框
    menuMoreClick: function (key) {
      if (key === 'menu1') {
        this.showCusTH = true
      }
      if (key === 'menu2') {
        this.$router.push('/queryPage')
      }
    }// more菜单的点击回调
  },
  mounted: function () {
    let length = this.titles.length
    for (let i = 0; i < length; i++) {
      this.columnToShowIndex[i] = i
    }// 初始化需要展示的表头为all
    Bus.$on('menu-more-click', () => {
      this.showMenus = true
    })// 注册监听HeaderBar组件发出的more菜单的点击事件
  }
}
</script>


<style scoped>
#table-wrapper {
  overflow: scroll;
  margin-bottom: 60px;
}

#table-wrapper table{
}

#table-wrapper table thead {
  background-color: gray;
  color:white;
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

</style>
