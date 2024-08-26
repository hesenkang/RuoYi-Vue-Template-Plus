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

// MainHeader配置
const mainHeader = {
  name: '头部',
  isShow: false,
  props: {
    height: 'none'
  },
  // 视图配置
  viewData: {
    // 自定义加载组件（非必填）
    asyncComponent: '',
    componentCfg: {
      // Api配置
      apiCfg: {
        config: {
          url: '',
          method: '',
          data: {}
        },
        // 辅助修复接口请求数据
        handleFixRequestData: (config) => {
          return config
        },
        // 辅助修复接口返回数据
        handleFixResponseData: (data) => {
          return data
        }
      },
      // 硬编码数据配置
      fields: [
        {
          label: '名称',
          field: 'name',
          type: 'input',
          props: {},
          // defaultValue: '',
          // isRequired: true,
        },
        {
          label: '报警等级',
          field: 'level',
          type: 'select',
          options: 'ALARM_LEVEL_ENUM',
          props: {}
        },
      ],
      // 控制表单按钮显示隐藏
      hasControl: true,
      // 搜索按钮配置
      submitText: '提交',
      // 重置按钮配置
      resetText: '重置',
      // 组件配置
      props: {
        inline: true
      }
    }
  }
}

// 编辑表单项配置
const editFormFields = () => {
  return [
    {
      label: '上级区域',
      field: 'parentId',
      type: 'HeBaseVueTree',
      defaultValue: '0',
      props: {
        nodeKey: 'id',
        defaultProps: {
          children: "children",
          label: "name"
        },
        placeholder: '请选择',
        style: {
          width: '220px',
          display: 'inline-block'
        },
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
          handleFixResponseData: (res) => {
            const newRes = { ...res }
            const { data } = newRes
            if (!data) return newRes
            newRes.data = $HE.convertToTree(data)
            return newRes
          }
        },
      },
      // isRequired: true,
      // isIgnore: true,
    },
    {
      label: '节点名称',
      field: 'name',
      type: 'input',
      props: {},
      isRequired: true,
    },
    {
      label: '能源类型',
      field: 'type',
      type: 'radio',
      props: {},
      defaultValue: '1',
      // options: 'ChargeType',
      options: {
        // Api配置
        config: {
          url: '/energy/type/list',
          method: 'get',
          params: {
            pageNum: 1,
            pageSize: 9999,
          }
        },
        // 辅助修复接口请求数据
        handleFixRequestData: (config, form) => {
          let newConfig = { ...config }
          return newConfig
        },
        // 辅助修复接口返回数据
       handleFixResponseData: (res) => {
        const newRes = { ...res }
        if (newRes && Array.isArray(newRes.rows)) {
          newRes.data = newRes.rows.map(item => {
            return {
              label: item.energyName,
              value: item.meterType
            }
          })
        } else {
          newRes.data = []
        }
        return newRes
       }
      },
      // isRequired: true,
    },
    {
      label: '节点编号',
      field: 'id',
      type: 'input',
      props: {},
      // isRequired: true,
    },
    {
      label: '排序',
      field: 'level',
      type: 'input',
      props: {},
      // isRequired: true,
    },
  ]
}
// Main配置
const main = {
  name: '主体',
  props: {

  },
  // 视图配置
  viewData: {
    // 自定义加载组件（非必填）
    asyncComponent: () => import('../../components/HeWorkForm.vue'),
    // 组件配置
    componentCfg: {
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
                url: '/energy/tree',
                method: 'post',
                data: {}
              },
              // 辅助修复接口请求数据
              handleFixRequestData: (config) => {
                let newConfig = { ...config }
                return newConfig
              },
              // 辅助修复接口返回数据
              handleFixResponseData: (res) => {
                return res
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
                fields: editFormFields(),
                // 控制表单按钮显示隐藏
                hasControl: true,
                submitText: '新 增',
                resetText: '清 空',
                // 组件配置
                props: {
                  inline: false,
                  'label-width': '100px',
                }
              },
              form: {}
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
                url: '/energy/tree',
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
                url: '/energy/tree',
                method: 'put',
                data: {}
              },
              // 辅助修复接口请求数据
              handleFixRequestData: (config) => {
                let newConfig = { ...config }
                return newConfig
              },
              // 辅助修复接口返回数据
              handleFixResponseData: (res) => {
                return res
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
                fields: editFormFields(),
                // 控制表单按钮显示隐藏
                hasControl: true,
                submitText: '保 存',
                resetText: '清 空',
                // 组件配置
                props: {
                  inline: false,
                  'label-width': '100px',
                }
              },
              form: {}
            },
          },
        ]
      },
      // 组件配置
      props: {
        
      }
    },
  }
}

const layoutView = {
  aside,
  mainHeader,
  main,
  footer: {
    name: '底部',
    isShow: false
  }
}

export default layoutView