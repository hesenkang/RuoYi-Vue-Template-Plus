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
  isShow: true,
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
          label: '项目名称',
          field: 'name',
          type: 'input',
          props: {},
          // defaultValue: '',
          // isRequired: true,
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

// Main配置
const main = {
  name: '主体',
  props: {

  },
  // 视图配置
  viewData: {
    // 自定义加载组件（非必填）
    asyncComponent: () => import('@/components/He/HeTable/HeCompleteTable.vue'),
    // 组件配置
    componentCfg: {
      // 按钮配置
      buttonsCfg: {
        data: [
          {
            label: '添加',
            type: 'Add',
            showMode: 'top',
            url: '',
            props: {
              type: 'primary'
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
                    label: '方案名称',
                    field: 'programName',
                    type: 'input',
                    props: {},
                    isRequired: true,
                  },
                  {
                    label: '收费方式',
                    field: 'chargeMethod',
                    type: 'radio',
                    props: {},
                    defaultValue: 1,
                    options: 'ChargeMethod'
                  },
                  {
                    label: '单价(¥/kW·h)',
                    field: 'price',
                    type: 'input',
                    props: {},
                    isRequired: true,
                    isShow: (form) => {
                      console.log(form)
                      return form.chargeMethod === 1
                    }
                  },
                  {
                    label: '尖电价(¥/kW·h)',
                    field: 'J',
                    type: 'JFPGTimeInput',
                    props: {},
                    isRequired: true,
                    isShow: (form) => {
                      return form.chargeMethod === 3
                    }
                  },
                  {
                    label: '峰电价(¥/kW·h)',
                    field: 'F',
                    type: 'JFPGTimeInput',
                    props: {},
                    isRequired: true,
                    isShow: (form) => {
                      return form.chargeMethod === 3
                    }
                  },
                  {
                    label: '平电价(¥/kW·h)',
                    field: 'P',
                    type: 'JFPGTimeInput',
                    props: {},
                    isRequired: true,
                    isShow: (form) => {
                      return form.chargeMethod === 3
                    }
                  },
                  {
                    label: '谷电价(¥/kW·h)',
                    field: 'G',
                    type: 'JFPGTimeInput',
                    props: {},
                    isRequired: true,
                    isShow: (form) => {
                      return form.chargeMethod === 3
                    }
                  },
                  {
                    label: '深谷电价(¥/kW·h)',
                    field: 'SG',
                    type: 'JFPGTimeInput',
                    props: {},
                    isRequired: true,
                    isShow: (form) => {
                      return form.chargeMethod === 3
                    }
                  },
                ],
                // 控制表单按钮显示隐藏
                hasControl: false,
                // 组件配置
                props: {
                  inline: true
                }
              },
              form: {}
            }
          },
          {
            label: '删除',
            type: 'Delete',
            showMode: 'top',
            url: '',
            props: {
              type: 'danger'
            }
          },
          {
            label: '编辑',
            type: 'Edit',
            showMode: 'row',
            detailUrl: '',
            url: '',
            props: {
              type: 'text'
            }
          },
        ]
      },
      // 表头配置
      columnsCfg: {
        data: [
          {
            label: '项目名称',
            field: 'programName',
            align: 'center',
            // width: 120,
          },
          {
            label: '客户名称',
            field: 'chargeType',
            align: 'center',
            options: 'ChargeType'
            // width: 120,
            // comType: 'el-components',

            // components: 'el-button',
            // props: {
            //   type: 'primary',
            //   underline: false
            // }
          },
          {
            label: '详细地址',
            field: 'status',
            align: 'center',
            options: 'ChargeStatus'
            // width: 120,
            // comType: 'custom-components',

            // components: 'Enums',
            // props: {
              
            // },
            // enumsData: 'ALARM_LEVEL_ENUM'
          },
          {
            label: '负责人',
            field: 'createBy',
            align: 'center',
          },
          {
            label: '联系电话',
            field: 'createTime',
            align: 'center',
          },
        ],
        // Api配置
        apiCfg: {
          config: {
            url: '',
            method: '',
            data: {}
          },
          // 辅助修复接口返回数据
          handleFixResponseData: (data) => {
            return data
          }
        },
      },
      // 数据配置
      dataCfg: {
        data: [
          { name: '小明', deviceName: '新风机AHU', level: 1 },
          { name: '小明', deviceName: '新风机AHU', level: 2 },
          { name: '小明', deviceName: '新风机AHU', level: 3 },
          { name: '小明', deviceName: '新风机AHU', level: 4 },
          { name: '小明', deviceName: '新风机AHU', level: 5 },
          { name: '小明', deviceName: '新风机AHU', level: 1 },
          { name: '小明', deviceName: '新风机AHU', level: 2 },
          { name: '小明', deviceName: '新风机AHU', level: 3 },
          { name: '小明', deviceName: '新风机AHU', level: 4 },
          { name: '小明', deviceName: '新风机AHU', level: 5 },
          { name: '小明', deviceName: '新风机AHU', level: 1 },
          { name: '小明', deviceName: '新风机AHU', level: 2 },
          { name: '小明', deviceName: '新风机AHU', level: 3 },
          { name: '小明', deviceName: '新风机AHU', level: 4 },
          { name: '小明', deviceName: '新风机AHU', level: 5 },
          { name: '小明', deviceName: '新风机AHU', level: 1 },
          { name: '小明', deviceName: '新风机AHU', level: 2 },
          { name: '小明', deviceName: '新风机AHU', level: 3 },
          { name: '小明', deviceName: '新风机AHU', level: 4 },
          { name: '小明', deviceName: '新风机AHU', level: 5 },
        ],
        // Api配置
        apiCfg: {
          config: {
            url: '',
            method: 'get',
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
      },
      // 分页配置
      pagination: {
        isShow: true,
        pageNum: 1,
        pageSize: 15,
        props: {
          'page-sizes': [1, 15, 30, 40, 50, 100]
        }
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