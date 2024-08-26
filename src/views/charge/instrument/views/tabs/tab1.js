// Aside配置
const aside = {
  name: '侧栏',
  isShow: false,
  props: {
    width: '320px'
  },
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
          label: '房间号',
          field: 'roomName',
          type: 'input',
          props: {},
        },
        {
          label: '用户名',
          field: 'userName',
          type: 'input',
          props: {},
        },
        {
          label: '仪表名称',
          field: 'name',
          type: 'input',
          props: {},
        },
        {
          label: '仪表类型',
          field: 'meterType',
          type: 'select',
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
          props: {
            multiple: false,
          },
        },
      ],
      // 控制表单按钮显示隐藏
      // hasControl: true,
      // 搜索按钮配置
      // submitText: '查询',
      // 重置按钮配置
      // resetText: '重置',
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
      label: '设备模型',
      field: '$deviceModel$',
      type: 'HeBaseVueTree',
      props: {
        nodeKey: 'devModelId',
        defaultProps: {
          children: "children",
          label: "devModelName"
        },
        placeholder: '辅助选择',
        style: {
          width: '220px',
          display: 'inline-block'
        },
        // Api配置
        apiCfg: {
          config: {
            url: '/devicemodelset/getTreeOfDeviceModel',
            method: 'post',
            data: { ifDel: 0 }
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
      // isRequired: true,
      isIgnore: true,
    },
    {
      label: '仪表类型',
      field: 'meterType',
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
      isRequired: true,
    },
    {
      label: '用能值模型编码',
      field: 'usageModelCode',
      type: 'select',
      props: {
        multiple: false,
        'allow-create': true,
        'default-first-option': true
      },
      options: {
        // 监听Key
        listenKey: '$deviceModel$',
        // Api配置
        config: {
          url: '/paramodelset/list',
          method: 'get',
          params: {
            pageNum: 1,
            pageSize: 9999,
            // 是否启用 禁用：0 启用：1
            ifEnable: '1',
            // 设备模型ID
            deviceModelId: ''
          }
        },
        // 辅助修复接口请求数据
        handleFixRequestData: (config, form) => {
          let newConfig = { ...config }
          const params = newConfig.params
          params.deviceModelId = form.$deviceModel$
          return newConfig
        },
        // 辅助修复接口返回数据
       handleFixResponseData: (res) => {
        const newRes = { ...res }
        if (newRes && Array.isArray(newRes.rows)) {
          newRes.data = newRes.rows.map(item => {
            return {
              label: `${item.paraModelName} : （ ${item.paraModelCode} ）`,
              value: item.paraModelCode
            }
          })
        } else {
          newRes.data = []
        }
        return newRes
       }
      },
      isRequired: true,
      // defaultValue: 1,
    },
    {
      label: '抄表时间模型编码',
      field: 'dtModelCode',
      type: 'select',
      props: {
        multiple: false,
        'allow-create': true,
        'default-first-option': true
      },
      options: {
        // 监听Key
        listenKey: '$deviceModel$',
        // Api配置
        config: {
          url: '/paramodelset/list',
          method: 'get',
          params: {
            pageNum: 1,
            pageSize: 9999,
            // 是否启用 禁用：0 启用：1
            ifEnable: '1',
            // 设备模型ID
            deviceModelId: ''
          }
        },
        // 辅助修复接口请求数据
        handleFixRequestData: (config, form) => {
          let newConfig = { ...config }
          const params = newConfig.params
          params.deviceModelId = form.$deviceModel$
          return newConfig
        },
        // 辅助修复接口返回数据
       handleFixResponseData: (res) => {
        const newRes = { ...res }
        if (newRes && Array.isArray(newRes.rows)) {
          newRes.data = newRes.rows.map(item => {
            return {
              label: `${item.paraModelName} : （ ${item.paraModelCode} ）`,
              value: item.paraModelCode
            }
          })
        } else {
          newRes.data = []
        }
        return newRes
       }
      },
      isRequired: true,
      // defaultValue: 1,
    },
    {
      label: '单位',
      field: 'unit',
      type: 'input',
      props: {},
      isRequired: true,
      // defaultValue: 1,
    },
    // {
    //   label: '房间号',
    //   field: 'roomName',
    //   type: 'input',
    //   props: {},
    //   isRequired: true,
    // },
    // {
    //   label: '用户名',
    //   field: 'userName',
    //   type: 'input',
    //   props: {},
    //   isRequired: true,
    // },
    {
      label: '仪表名称',
      field: 'name',
      type: 'input',
      props: {},
      isRequired: true,
    },
    {
      label: '仪表编码',
      field: 'deviceCode',
      type: 'input',
      props: {},
      isRequired: true,
    },
    {
      label: '仪表型号',
      field: 'modelName',
      type: 'select',
      options: {
        // Api配置
        config: {
          url: '/devicemodelset/getTreeOfDeviceModel',
          method: 'post',
          data: { ifDel: 0 }
        },
        // 辅助修复接口请求数据
        handleFixRequestData: (form) => {
          let newForm = { ...form }
          return newForm
        },
        // 辅助修复接口返回数据
        handleFixResponseData: (res) => {
          function flattenTree(data, idKey = 'id', parentIdKey = 'parentId', childrenKey = 'children') {
            return data.reduce((acc, item) => {
              // 添加当前项到累积器数组中
              acc.push({
                id: item.id,
                label: item.devModelName,
                value: item.devModelName
              });
              // 如果当前项有子节点，则递归调用 flattenTree 函数处理子节点
              if (item[childrenKey] && Array.isArray(item[childrenKey])) {
                // 递归处理子节点并将结果添加到累积器数组中
                const flattenedChildren = flattenTree(item[childrenKey], idKey, parentIdKey, childrenKey);
                acc.push(...flattenedChildren);
              }
              return acc;
            }, []);
          }
          const newRes = { ...res }
          newRes.data = flattenTree(newRes.data)
          return newRes
        }
      },
      props: {
        multiple: false,
        'allow-create': true,
        'default-first-option': true,
      },
      isRequired: true,
    },
  ]
}
// 导入表单项配置
const importFormFields = () => {
  return [
    {
      label: '设备模型',
      field: '$deviceModel$',
      type: 'HeBaseVueTree',
      props: {
        nodeKey: 'devModelId',
        defaultProps: {
          children: "children",
          label: "devModelName"
        },
        placeholder: '辅助选择',
        style: {
          width: '220px',
          display: 'inline-block'
        },
        // Api配置
        apiCfg: {
          config: {
            url: '/devicemodelset/getTreeOfDeviceModel',
            method: 'post',
            data: { ifDel: 0 }
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
      // isRequired: true,
      isIgnore: true,
    },
    {
      label: '仪表类型',
      field: 'meterType',
      type: 'radio',
      props: {},
      defaultValue: '1',
      options: 'ChargeType',
      isRequired: true,
    },
    {
      label: '用能值模型编码',
      field: 'usageModelCode',
      type: 'select',
      props: {
        multiple: false,
        'allow-create': true,
        'default-first-option': true
      },
      options: {
        // 监听Key
        listenKey: '$deviceModel$',
        // Api配置
        config: {
          url: '/paramodelset/list',
          method: 'get',
          params: {
            pageNum: 1,
            pageSize: 9999,
            // 是否启用 禁用：0 启用：1
            ifEnable: '1',
            // 设备模型ID
            deviceModelId: ''
          }
        },
        // 辅助修复接口请求数据
        handleFixRequestData: (config, form) => {
          let newConfig = { ...config }
          const params = newConfig.params
          params.deviceModelId = form.$deviceModel$
          return newConfig
        },
        // 辅助修复接口返回数据
       handleFixResponseData: (res) => {
        const newRes = { ...res }
        if (newRes && Array.isArray(newRes.rows)) {
          newRes.data = newRes.rows.map(item => {
            return {
              label: `${item.paraModelName} : （ ${item.paraModelCode} ）`,
              value: item.paraModelCode
            }
          })
        } else {
          newRes.data = []
        }
        return newRes
       }
      },
      isRequired: true,
      // defaultValue: 1,
    },
    {
      label: '抄表时间模型编码',
      field: 'dtModelCode',
      type: 'select',
      props: {
        multiple: false,
        'allow-create': true,
        'default-first-option': true
      },
      options: {
        // 监听Key
        listenKey: '$deviceModel$',
        // Api配置
        config: {
          url: '/paramodelset/list',
          method: 'get',
          params: {
            pageNum: 1,
            pageSize: 9999,
            // 是否启用 禁用：0 启用：1
            ifEnable: '1',
            // 设备模型ID
            deviceModelId: ''
          }
        },
        // 辅助修复接口请求数据
        handleFixRequestData: (config, form) => {
          let newConfig = { ...config }
          const params = newConfig.params
          params.deviceModelId = form.$deviceModel$
          return newConfig
        },
        // 辅助修复接口返回数据
       handleFixResponseData: (res) => {
        const newRes = { ...res }
        if (newRes && Array.isArray(newRes.rows)) {
          newRes.data = newRes.rows.map(item => {
            return {
              label: `${item.paraModelName} : （ ${item.paraModelCode} ）`,
              value: item.paraModelCode
            }
          })
        } else {
          newRes.data = []
        }
        return newRes
       }
      },
      isRequired: true,
      // defaultValue: 1,
    },
    {
      label: '单位',
      field: 'unit',
      type: 'input',
      props: {},
      isRequired: true,
      // defaultValue: 1,
    },
    {
      label: '仪表型号',
      field: 'modelName',
      type: 'select',
      options: {
        // Api配置
        config: {
          url: '/devicemodelset/getTreeOfDeviceModel',
          method: 'post',
          data: { ifDel: 0 }
        },
        // 辅助修复接口请求数据
        handleFixRequestData: (form) => {
          let newForm = { ...form }
          return newForm
        },
        // 辅助修复接口返回数据
        handleFixResponseData: (res) => {
          function flattenTree(data, idKey = 'id', parentIdKey = 'parentId', childrenKey = 'children') {
            return data.reduce((acc, item) => {
              // 添加当前项到累积器数组中
              acc.push({
                id: item.id,
                label: item.devModelName,
                value: item.devModelName
              });
              // 如果当前项有子节点，则递归调用 flattenTree 函数处理子节点
              if (item[childrenKey] && Array.isArray(item[childrenKey])) {
                // 递归处理子节点并将结果添加到累积器数组中
                const flattenedChildren = flattenTree(item[childrenKey], idKey, parentIdKey, childrenKey);
                acc.push(...flattenedChildren);
              }
              return acc;
            }, []);
          }
          const newRes = { ...res }
          newRes.data = flattenTree(newRes.data)
          return newRes
        }
      },
      props: {
        multiple: false,
        'allow-create': true,
        'default-first-option': true,
      },
      isRequired: true,
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
              title: '添加',
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
                  'label-width': '160px',
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
            label: '编辑',
            type: 'Edit',
            showMode: 'row',
            props: {
              type: 'text'
            },
            // 查询详情接口
            detailApiCfg: {
              config: {
                url: '/energy/meter',
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
                  'label-width': '160px',
                }
              },
              form: {}
            }
          },
          {
            label: '导入',
            type: 'Add',
            showMode: 'top',
            props: {
              type: 'primary'
            },
            // Api配置
            apiCfg: {
              config: {
                url: '/energy/meter/importTableData',
                method: 'get',
                params: {}
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
              title: '导入',
              // 控制弹窗按钮显示隐藏
              hasControl: true,
              submitText: '确 定',
              closeText: '取 消',
              // 表单配置
              formCfg: {
                // 硬编码数据配置
                fields: importFormFields(),
                // 控制表单按钮显示隐藏
                hasControl: false,
                // 组件配置
                props: {
                  inline: false,
                  'label-width': '160px',
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
            label: '房间号',
            field: 'roomName',
            align: 'center',
          },
          {
            label: '用户名',
            field: 'userName',
            align: 'center',
          },
          {
            label: '仪表名称',
            field: 'name',
            align: 'center',
          },
          {
            label: '仪表编码',
            field: 'deviceCode',
            align: 'center',
          },
          {
            label: '仪表类型',
            field: 'meterType',
            align: 'center',
            options: 'meterType',
            isAsync: true
          },
          {
            label: '仪表型号',
            field: 'modelName',
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
            url: '/energy/meter/list',
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