import tab1ViewData from './tabs/tab1.js'
// Aside配置
const aside = {
  name: '侧栏',
  isShow: false,
  props: {
    width: '320px'
  },
  // 视图配置
  viewData: {
    name: 'sideTree',
    // Api配置
    apiCfg: {
      config: {
        url: '/paramodelset/getTree',
        method: 'post',
        data: {}
      },
      // 辅助修复接口返回数据
      // handleFixData: (data) => {
      //   return data
      // },
    },
    // 数据 配置
    data: () => [] || [],
    // el-tree 配置
    props: {
      nodeKey: 'id',
      defaultProps: {
        children: "children",
        label: "devModelName"
      },
    }
  }
}

const tab1 = {
  name: 'tab1',
  label: '项目管理',
  tab: tab1ViewData
}

const layoutView = {
  aside,
  activeIndex: 0,
  tabs: [tab1],
}

export default layoutView