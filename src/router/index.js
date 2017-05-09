import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/NavPage'
// import DatePick from '../components/SearchForm'
import Collections from '../components/Collections'
import TablePage from '../components/TablePage'
import QueryPage from '../components/QueryPage'

Vue.use(Router)

const routes = [{
  path: '/',
  name: '量化薪酬',
  component: Home
}, {
  path: '/showTable',
  name: '报表展示',
  component: TablePage
}, {
  path: '/collections',
  name: '收藏',
  component: Collections
}, {
  path: '/queryPage',
  name: '条件查询',
  component: QueryPage
}]

export default new Router({
  routes
})
