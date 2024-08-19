import tab1ViewData from './tabs/tab1.js'

// Header配置
const header = {
  name: '顶栏',
  isShow: false,
  props: {
    height: '80px'
  },
  // 视图配置
  viewData: {
    // 自定义加载组件（非必填）
    asyncComponent: 'el-input',
    componentCfg: {
      
    },
  }
}

// Aside配置
const aside = {
  name: '侧栏',
  isShow: true,
  props: {
    width: '40%'
  },
  // 视图配置
  viewData: {
    // 自定义加载组件（非必填）
    asyncComponent: () => import('../components/HeWorkTree.vue'),
    // 组件配置
    componentCfg: {
      // Api配置
      apiCfg: {
        config: {
          url: '/energy/class/list',
          method: 'get',
          params: {}
        },
        // 辅助修复接口请求数据
        handleFixRequestData: (config) => {
          return config
        },
        // 辅助修复接口返回数据
        handleFixResponseData: (data) => {
          let newData = data;
          if (newData && Array.isArray(newData)) {
            newData = newData.map(item => {
              return {
                ...item,
                title: item.className,
                name: item.classCode,
              }
            })
          } else {
            newData = []
          }
          return newData
        }
      },
      // 数据配置
      data: () => [],
      // 组件配置
      props: {
        // type: "card",
        editable: true,
        'tab-position': 'right'
      },
      // 按钮配置
      buttonsCfg: {
        data: [
          {
            label: '添加',
            type: 'Add',
            showMode: 'top',
            props: {
              type: 'primary'
            },
            // Api配置
            apiCfg: {
              config: {
                url: '/energy/class',
                method: 'post',
                data: {}
              },
              // 辅助修复接口请求数据
              handleFixRequestData: (config) => {
                let newConfig = { ...config }
                return newConfig
              },
              // 辅助修复接口返回数据
              handleFixResponseData: (data) => {
                return data
              }
            },
            // 弹窗配置
            modal: {
              isShow: false,
              title: '新增',
              // 控制弹窗按钮显示隐藏
              hasControl: true,
              submitText: '确 定',
              closeText: '取 消',
              // 表单配置
              formCfg: {
                // 硬编码数据配置
                fields: [
                  {
                    label: '类别名称',
                    field: 'className',
                    type: 'input',
                    props: {},
                    isRequired: true,
                  },
                  {
                    label: '类别编码',
                    field: 'classCode',
                    type: 'input',
                    props: {},
                    isRequired: true,
                  },
                ],
                // 控制表单按钮显示隐藏
                hasControl: false,
                submitText: '确 认',
                resetText: '取 消',
                // 组件配置
                props: {
                  inline: false,
                  'label-width': '120px',
                }
              },
              form: {}
            },
          },
          {
            label: '删除',
            type: 'Delete',
            showMode: 'top',
            props: {
              type: 'danger'
            },
            // Api配置
            apiCfg: {
              config: {
                url: '/energy/class',
                method: 'delete',
                params: {},
                isUrlSplice: true
              },
              // 辅助修复接口请求数据
              handleFixRequestData: (form) => {
                let newForm = { ...form }
                return newForm
              },
              // 辅助修复接口返回数据
              handleFixResponseData: (data) => {
                return data
              }
            },
          },
          {
            label: '编辑',
            type: 'Edit',
            showMode: 'top',
            props: {
              type: 'primary'
            },
            // 查询详情接口
            detailApiCfg: {
              config: {
                url: '/energy/class',
                method: 'get',
                params: {},
                isUrlSplice: true
              },
              // 辅助修复接口返回数据
              handleFixResponseData: (data) => {
                const newData = { ...data }
                return newData
              }
            },
            // Api配置
            apiCfg: {
              config: {
                url: '/energy/class',
                method: 'put',
                data: {}
              },
              // 辅助修复接口请求数据
              handleFixRequestData: (config) => {
                let newConfig = { ...config }
                return newConfig
              },
              // 辅助修复接口返回数据
              handleFixResponseData: (data) => {
                return data
              }
            },
            // 弹窗配置
            modal: {
              isShow: false,
              title: '编辑',
              // 控制弹窗按钮显示隐藏
              hasControl: true,
              submitText: '确 定',
              closeText: '取 消',
              // 表单配置
              formCfg: {
                // 硬编码数据配置
                fields: [
                  {
                    label: '类别名称',
                    field: 'className',
                    type: 'input',
                    props: {},
                    isRequired: true,
                  },
                  {
                    label: '类别编码',
                    field: 'classCode',
                    type: 'input',
                    props: {},
                    isRequired: true,
                  },
                ],
                // 控制表单按钮显示隐藏
                hasControl: false,
                submitText: '确 认',
                resetText: '取 消',
                // 组件配置
                props: {
                  inline: false,
                  'label-width': '120px',
                }
              },
              form: {}
            },
          },
        ]
      },
      // 组件内需要的数据配置
      tabsCfg: {
        // Api配置
        apiCfg: {
          config: {
            url: '/energy/tree/list',
            method: 'get',
            params: {},
          },
          // // 辅助修复接口请求数据
          // handleFixRequestData: (config) => {
          //   return config
          // },
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
    },
  }
}

const tab1 = {
  name: 'tab1',
  label: '组织管理',
  tab: tab1ViewData
}

const layoutView = {
  header,
  aside,
  activeIndex: 0,
  tabs: [tab1],
}

export default layoutView