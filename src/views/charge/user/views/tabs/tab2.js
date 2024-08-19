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

// mainHeader配置
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
      // submitText: '提交',
      // 重置按钮配置
      // resetText: '重置',
      // 组件配置
      props: {
        inline: true
      }
    }
  }
}
// 编辑表单项配置-子表单配置
const editMeterFormFields = () => {
  return [
    {
      label: '房间号',
      field: 'id',
      type: 'select',
      isRequired: true,
      options: {
        // Api配置
        config: {
          url: '/energy/meter/notUserMeterList',
          method: 'get',
          params: {
            pageNum: 1,
            pageSize: 9999,
          }
        },
        // 辅助修复接口请求数据
        handleFixRequestData: (config) => {
          let newConfig = { ...config }
          return newConfig
        },
        // 辅助修复接口返回数据
       handleFixResponseData: (res, form) => {
        const newRes = { ...res }
        if (newRes && Array.isArray(newRes.data)) {
          newRes.data = newRes.data.map(item => {
            return {
              label: item.roomName,
              value: item.id
            }
          })
        } else {
          newRes.data = []
        }
        return newRes
       }
      },
      props: {
        multiple: false
      },
    },
    // {
    //   label: '告警金额A(¥)',
    //   field: '告警金额A',
    //   type: 'input',
    //   defaultValue: 100,
    //   props: {},
    // },
    // {
    //   label: '告警金额B(¥)',
    //   field: '告警金额B',
    //   type: 'input',
    //   defaultValue: 0,
    //   props: {},
    // },
    {
      label: '价格方案',
      field: 'expenseOptionId',
      type: 'select',
      isRequired: true,
      options: {
        // Api配置
        config: {
          url: '/energy/program/list',
          method: 'get',
          params: {
            pageNum: 1,
            pageSize: 9999,
          }
        },
        // 辅助修复接口请求数据
        handleFixRequestData: (config) => {
          let newConfig = { ...config }
          return newConfig
        },
        // 辅助修复接口返回数据
       handleFixResponseData: (res) => {
        const newRes = { ...res }
        if (newRes && Array.isArray(newRes.rows)) {
          newRes.data = newRes.rows.map(item => {
            return {
              label: item.programName,
              value: item.id
            }
          })
        } else {
          newRes.data = []
        }
        return newRes
       }
      },
      props: {
        multiple: false
      },
    },
  ]
}

// 编辑表单项配置
const editFormFields = () => {
  return [
    {
      label: '用户名',
      field: 'userName',
      type: 'input',
      isRequired: true,
      span: 12,
      props: {},
    },
    // {
    //   label: '查询密码',
    //   field: 'password',
    //   type: 'input',
    //   isRequired: true,
    //   span: 12,
    //   props: {},
    // },
    {
      label: '联系电话',
      field: 'tel',
      type: 'input',
      span: 12,
      props: {},
    },
    {
      label: '联系地址',
      field: 'address',
      type: 'input',
      span: 24,
      props: {
        style: {
          width: '89%'
        }
      },
    },
    {
      label: '备注',
      field: 'remark',
      type: 'textarea',
      span: 24,
      props: {
        style: {
          width: '89%'
        }
      },
    },
    // {
    //   label: '合并计量',
    //   field: 'mergeSum',
    //   type: 'radio',
    //   props: {},
    //   defaultValue: '0',
    //   options: [
    //     {
    //       label: '是',
    //       value: '1'
    //     },
    //     {
    //       label: '否',
    //       value: '0'
    //     }
    //   ],
    // },
    // 自定义组件
    {
      label: '',
      field: 'meterList',
      type: () => import('../../components/UserFormCustomTable.vue'),
      props: {
        // 按钮配置
        buttonsCfg: {
          data: [
            {
              label: '新增电表',
              type: 'Add',
              showMode: 'top',
              props: {
                type: 'primary'
              },
              // Api配置
              apiCfg: {
                config: {
                  url: '/energy/meter',
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
                title: '新增电表',
                // 控制弹窗按钮显示隐藏
                hasControl: true,
                submitText: '确 定',
                closeText: '取 消',
                // 表单配置
                formCfg: {
                  // 硬编码数据配置
                  fields: editMeterFormFields(),
                  // 控制表单按钮显示隐藏
                  hasControl: false,
                  // 组件配置
                  props: {
                    inline: false,
                    'label-width': '120px',
                  }
                },
                form: {},
                props: {
                  // 'destroy-on-close': true
                }
              }
            },
            {
              label: '删除',
              type: 'Delete',
              showMode: 'row',
              props: {
                type: 'danger'
              },
              // Api配置
              apiCfg: {
                config: {
                  url: '/energy/meter',
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
              label: '新增水表',
              type: 'Add',
              showMode: 'top',
              props: {
                type: 'primary'
              },
              // Api配置
              apiCfg: {
                config: {
                  url: '/energy/meter',
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
              // 弹窗配置
              modal: {
                isShow: false,
                title: '新增水表',
                // 控制弹窗按钮显示隐藏
                hasControl: true,
                submitText: '确 定',
                closeText: '取 消',
                // 表单配置
                formCfg: {
                  // 硬编码数据配置
                  fields: editMeterFormFields(),
                  // 控制表单按钮显示隐藏
                  hasControl: false,
                  // 组件配置
                  props: {
                    inline: false,
                    'label-width': '120px',
                  }
                },
                form: {}
              }
            },
          ],
          // Api配置
          apiCfg: {
            config: {
              url: '/energy/type/list',
              method: 'get',
              params: {
                pageNum: 1,
                pageSize: 9999,
              }
            },
            // 辅助修复接口返回数据
            handleFixResponseData: (res) => {
              return res
            }
          },
        },
        // 表头配置
        columnsCfg: {
          data: [
            {
              label: '房间号',
              field: 'roomName',
              align: 'center',
            },
            {
              label: '仪表名称',
              field: 'name',
              align: 'center',
            },
            {
              label: '单位',
              field: 'unit',
              align: 'center',
            },
            {
              label: '仪表类型',
              field: 'meterType',
              align: 'center',
              options: 'ChargeType'
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
        props: {
          height: '200px',
          // style: {
          //   'max-height': '600px'
          // }
        },
      },
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
                url: '/energy/user',
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
              title: '用户开户',
              // 控制弹窗按钮显示隐藏
              hasControl: true,
              submitText: '确 定',
              closeText: '取 消',
              // 表单配置
              formCfg: {
                // 硬编码数据配置
                fields: editFormFields(),
                // 控制表单按钮显示隐藏
                hasControl: false,
                // 组件配置
                props: {
                  inline: false,
                  'label-width': '120px',
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
                url: '/energy/user',
                method: 'delete',
                params: {},
                isUrlSplice: true
              },
              // 辅助修复接口请求数据
              handleFixRequestData: (config, selectedRows) => {
                let newConfig = { ...config }
                let newForm = { ids: selectedRows.map(item => item.userId).join() }
                newConfig.url += `${newForm.ids}`
                return newConfig
              },
              // 辅助修复接口返回数据
              handleFixResponseData: (res) => {
                return res
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
                url: '/energy/user',
                method: 'get',
                params: {},
                isUrlSplice: true
              },
              // 辅助修复接口请求数据
              handleFixRequestData: (config, row) => {
                let newConfig = { ...config }
                newConfig.url += row.userId
                return newConfig
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
                url: '/energy/user',
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
                hasControl: false,
                // 组件配置
                props: {
                  inline: false,
                  'label-width': '120px',
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
            label: '用户名',
            field: 'userName',
            align: 'center',
          },
          {
            label: '房间号',
            field: 'roomName',
            align: 'center',
          },
          {
            label: '创建人',
            field: 'createBy',
            align: 'center',
          },
          {
            label: '修改人',
            field: 'updateBy',
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
            url: '/energy/user/list',
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