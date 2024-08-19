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
      label: '房间号',
      field: 'name',
      type: 'input',
      props: {},
      isRequired: true,
    },
    {
      label: '所属组织',
      field: 'topId',
      type: 'HeBaseVueTree',
      props: {
        nodeKey: 'id',
        defaultProps: {
          children: "children",
          label: "name"
        },
        style: {
          width: '220px',
          display: 'inline-block'
        },
        // Api配置
        apiCfg: {
          config: {
            url: '/energy/tree/list',
            method: 'get',
            params: {
              // 隐藏具体房间
              type: '0'
            },
          },
          // 辅助修复接口请求数据
          handleFixRequestData: (config, { $route }) => {
            const newConfig = { ...config }
            const { query } = $route
            newConfig.params.classId = query.classId || ''
            return newConfig
          },
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
      isRequired: true,
      isStart: true,
    },
    {
      label: '房间面积',
      field: 'rentRoom',
      type: 'input',
      props: {},
    },
    {
      label: '备注',
      field: 'remark',
      type: 'textarea',
      props: {},
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
                url: '/energy/info',
                method: 'post',
                data: {}
              },
              // 辅助修复接口请求数据
              handleFixRequestData: (config, { $route }) => {
                let newConfig = { ...config }
                const { data } = newConfig
                let { query } = $route
                data.classId = query.classId
                let newArr = []
                Object.keys(data).forEach(key => {
                  if (key.startsWith('$id')) {
                    newArr.push({
                      id: data[key]
                    })
                    delete data[key]
                  }
                })
                if (newArr.length > 0) {
                  data.energyPrepaidMeterList = newArr
                }
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
              title: '添加',
              // 控制弹窗按钮显示隐藏
              hasControl: true,
              submitText: '确 定',
              closeText: '取 消',
              // 表单配置
              formCfg: {
                // 接口加载数据配置
                apiCfg: {
                  config: {
                    url: '/energy/type/list',
                    method: 'get',
                    params: { 
                      pageNum: 1,
                      pageSize: 9999,
                      // 0:正常 1:停用
                      status: "0"
                    }
                  },
                  // 辅助修复接口请求数据
                  handleFixRequestData: (config) => {
                    let newConfig = { ...config }
                    return newConfig
                  },
                  // 辅助修复接口返回数据
                  handleFixResponseData: (res, vm) => {
                    const newRes = { ...res }
                    const { rows } = newRes || {}
                    if (!Array.isArray(rows)) return newRes
                    const fields = [ ...vm.fields ]
                    const newFields = rows.reverse().map((item, index) => {
                      return {
                        label: item.energyName + '表',
                        field: `$id${index}$`,
                        type: 'select',
                        props: {
                          multiple: false,
                          // 'allow-create': true,
                          // 'default-first-option': true
                        },
                        options: {
                          // Api配置
                          config: {
                            url: '/energy/meter/notRoomMeterList',
                            method: 'get',
                            params: {
                              pageNum: 1,
                              pageSize: 9999,
                              meterType: item.meterType,
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
                          if (newRes && Array.isArray(newRes.data)) {
                            newRes.data = newRes.data.map(item => {
                              return {
                                label: item.name,
                                value: item.id
                              }
                            })
                          } else {
                            newRes.data = []
                          }
                          return newRes
                         }
                        },
                        // isRequired: true,
                        // defaultValue: 1,
                      }
                    })
                    // 插入异步数据到表单
                    newFields.forEach(newItem => {
                      const field = fields.find(item => item.field === newItem.field)
                      if (!field) {
                        const index = fields.findIndex(item => item.isStart)
                        vm.fields.splice(index, 0, newItem)
                      }
                    })
                    return newRes
                  }
                },
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
                url: '/energy/info',
                method: 'delete',
                params: {},
                isUrlSplice: true
              },
              // 辅助修复接口请求数据
              handleFixRequestData: (config, selectedRows) => {
                let newConfig = { ...config }
                let newForm = { ids: selectedRows.map(item => item.roomId).join() }
                newConfig.url += `${newForm.ids}`
                return newConfig
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
                url: '/energy/info',
                method: 'get',
                params: {},
                isUrlSplice: true
              },
              // 辅助修复接口请求数据
              handleFixRequestData: (config, row) => {
                let newConfig = { ...config }
                newConfig.url += row.roomId
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
                url: '/energy/info',
                method: 'put',
                data: {}
              },
              // 辅助修复接口请求数据
              handleFixRequestData: (config, { $route }) => {
                let newConfig = { ...config }
                const { data } = newConfig
                let { query } = $route
                data.classId = query.classId
                // 新的数组
                let newArr = []
                // 表单keys集合
                const keysArr = Object.keys(data)
                // 表单集合是否存在以$id开始的key
                const has$id = keysArr.some(key => key.startsWith('$id'))
                if (has$id) {
                  keysArr.forEach(key => {
                    if (key.startsWith('$id')) {
                      newArr.push({ id: data[key] })
                      delete data[key]
                    }
                  })
                  if (newArr.length > 0) {
                    data.energyPrepaidMeterList = newArr
                  }
                } else {
                  data.energyPrepaidMeterList = []
                  // delete data.energyPrepaidMeterList
                }
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
                // 接口加载数据配置
                apiCfg: {
                  config: {
                    url: '/energy/type/list',
                    method: 'get',
                    params: { 
                      pageNum: 1,
                      pageSize: 9999,
                      // 0:正常 1:停用
                      status: "0"
                    }
                  },
                  // 辅助修复接口请求数据
                  handleFixRequestData: (config) => {
                    let newConfig = { ...config }
                    return newConfig
                  },
                  // 辅助修复接口返回数据
                  handleFixResponseData: (res, vm) => {
                    const newRes = { ...res }
                    const { rows } = newRes || {}
                    if (!Array.isArray(rows)) return newRes
                    const fields = [ ...vm.fields ]
                    const newFields = rows.reverse().map((row, index) => {
                      return {
                        label: row.energyName + '表',
                        field: `$id${row.meterType}$`,
                        type: 'select',
                        props: {
                          multiple: false,
                          // 'allow-create': true,
                          // 'default-first-option': true
                        },
                        options: {
                          // Api配置
                          config: {
                            url: '/energy/meter/notRoomMeterList',
                            method: 'get',
                            params: {
                              pageNum: 1,
                              pageSize: 9999,
                              meterType: row.meterType,
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
                          if (newRes && Array.isArray(newRes.data)) {
                            newRes.data = newRes.data.map(item => {
                              return {
                                label: item.name,
                                value: item.id
                              }
                            })
                          } else {
                            newRes.data = []
                          }
                          return newRes
                         }
                        },
                        isShow: (form) => {
                          const meterList = form.energyPrepaidMeterList || []
                          if (meterList.length === 0) return true
                          const isShow = meterList.every(item => item.meterType !== row.meterType)
                          return isShow
                        }
                      }
                    })
                    // 插入异步数据到表单
                    newFields.forEach(newItem => {
                      const field = fields.find(item => item.field === newItem.field)
                      if (!field) {
                        const index = fields.findIndex(item => item.isStart)
                        vm.fields.splice(index, 0, newItem)
                      }
                    })
                    return newRes
                  }
                },
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
            label: '房间号',
            field: 'name',
            align: 'center',
          },
          {
            label: '用户名',
            field: 'userName',
            align: 'center',
          },
          {
            label: '面积',
            field: 'rentRoom',
            align: 'center',
          },
          {
            label: '备注',
            field: 'remark',
            align: 'center',
          },
          {
            label: '创建时间',
            field: 'createTime',
            align: 'center',
          },
          {
            label: '修改时间',
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
            url: '/energy/info/list',
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