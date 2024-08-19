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
          label: '名称',
          field: 'name',
          type: 'input',
          props: {},
          // defaultValue: '',
          // isRequired: true,
        },
        // {
        //   label: '报警等级',
        //   field: 'level',
        //   type: 'select',
        //   options: 'ALARM_LEVEL_ENUM',
        //   props: {}
        // },
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
// 表单项配置
const formFields = () => {
  return [
    {
      label: '能源类型',
      field: 'meterType',
      type: 'input',
      // defaultValue: '1',
      // options: 'ChargeType',
      props: {},
      isRequired: true,
    },
    {
      label: '编码',
      field: 'code',
      type: 'input',
      props: {},
      isRequired: true,
    },
    {
      label: '能源名称',
      field: 'energyName',
      type: 'input',
      props: {},
      isRequired: true,
    },
    {
      label: '单位',
      field: 'unit',
      type: 'input',
      props: {},
      isRequired: true,
    },
    {
      label: '备注',
      field: 'remark',
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
            props: {
              type: 'primary'
            },
            // Api配置
            apiCfg: {
              config: {
                url: '/energy/type',
                method: 'post',
                data: {}
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
            // 弹窗配置
            modal: {
              isShow: false,
              title: '添加能源类型',
              // 控制弹窗按钮显示隐藏
              hasControl: true,
              submitText: '确 定',
              closeText: '取 消',
              // 表单配置
              formCfg: {
                // 硬编码数据配置
                fields: formFields(),
                // 控制表单按钮显示隐藏
                hasControl: false,
                // 组件配置
                props: {
                  inline: false,
                  'label-width': '100px',
                  // 'label-position': 'left'
                  // 'label-suffix': '：',
                  
                }
              },
              form: {}
            }
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
                url: '/energy/type',
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
            showMode: 'row',
            props: {
              type: 'text'
            },
            // 查询详情接口
            detailApiCfg: {
              config: {
                url: '/energy/type',
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
                url: '/energy/type',
                method: 'put',
                data: {}
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
            // 表单弹窗配置
            modal: {
              isShow: false,
              title: '编辑能源类型',
              // 控制弹窗按钮显示隐藏
              hasControl: true,
              submitText: '确 定',
              closeText: '取 消',
              // 表单配置
              formCfg: {
                // 硬编码数据配置
                fields: formFields(),
                // 控制表单按钮显示隐藏
                hasControl: false,
                // 组件配置
                props: {
                  inline: false,
                  'label-width': '100px',
                  // 'label-position': 'left'
                  // 'label-suffix': '：',
                  
                }
              },
              form: {}
            }
          },
        ]
      },
      // 表头配置
      columnsCfg: {
        data: [
          {
            label: '编码',
            field: 'code',
            align: 'center',
          },
          {
            label: '能源名称',
            field: 'energyName',
            align: 'center',
          },
          {
            label: '单位',
            field: 'unit',
            align: 'center',
          },
          {
            label: '能源类型',
            field: 'meterType',
            align: 'center',
            // options: 'ChargeType'
          },
          // {
          //   label: '状态',
          //   field: 'status',
          //   align: 'center',
          //   options: 'ChargeStatus'
          // },
          {
            label: '备注',
            field: 'remark',
            align: 'center',
          },
          {
            label: '创建人',
            field: 'createBy',
            align: 'center',
          },
          {
            label: '创建时间',
            field: 'createTime',
            align: 'center',
          },
          {
            label: '更新时间',
            field: 'updateTime',
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
        data: [],
        // Api配置
        apiCfg: {
          config: {
            url: '/energy/type/list',
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
          'page-sizes': [15, 30, 40, 50, 100]
        }
      },
      // 组件配置
      props: {
        checkable: true
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