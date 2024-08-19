import tab1ViewData from './tabs/tab1.js'
import tab2ViewData from './tabs/tab2.js'

// Aside配置
const aside = {
  name: '侧栏',
  isShow: true,
  props: {
    width: '320px'
  },
  // 视图配置
  viewData: {
    name: 'sideTree',
    // 组件配置
    componentCfg: {
      // Api配置
      apiCfg: {
        config: {
          url: '/energy/tree/list',
          method: 'get',
          params: {},
        },
        // 辅助修复接口请求数据
        handleFixRequestData: (config, { $route }) => {
          const newConfig = { ...config }
          const { query } = $route
          newConfig.params = query
          return newConfig
        },
        // 辅助修复接口返回数据
        handleFixResponseData: (data) => {
          data = $HE.convertToTree(data)
          return data
        }
      },
      // 数据配置
      data: () => [],
      // 组件配置
      props: {
        showCheckbox: false,
        nodeKey: 'id',
        defaultProps: {
          children: "children",
          label: "name"
        },
      }
    }
  }
}

const tab1 = {
  name: 'tab1',
  label: '房间信息',
  tab: tab1ViewData
}

const tab2 = {
  name: 'tab2',
  label: '用户信息',
  tab: tab2ViewData
}

const layoutView = {
  aside,
  activeIndex: 0,
  tabs: [tab1, tab2],
}

export default layoutView