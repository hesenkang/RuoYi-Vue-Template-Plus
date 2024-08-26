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
      label: '用户名',
      field: 'userName',
      type: 'input',
      isRequired: true,
      span: 12,
      props: {
        style: {
          width: '100%'
        }
      },
    },
    {
      label: '联系电话',
      field: 'tel',
      type: 'input',
      span: 12,
      props: {
        style: {
          width: '100%'
        }
      },
    },
    {
      label: '联系地址',
      field: 'address',
      type: 'input',
      span: 24,
      props: {
        style: {
          width: '100%'
        }
      },
    },
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
        handleFixRequestData: (config, form, { extendsData }) => {
          let newConfig = { ...config }
          const { meterType = null } = extendsData || {}
          newConfig.params.chargeType = meterType
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
    {
      label: '备注',
      field: 'remark',
      type: 'textarea',
      span: 24,
      props: {
        style: {
          width: '100%'
        }
      },
    },
    // 自定义组件
    {
      label: '',
      field: 'meterList',
      type: () => import('../../components/UserFormCustomTable.vue'),
      props: {
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
const main = (tabData) => {
  return {
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
            // {
            //   label: '批量开户',
            //   type: 'Add',
            //   showMode: 'top',
            //   props: {
            //     type: 'primary'
            //   },
            //   // Api配置
            //   apiCfg: {
            //     config: {
            //       url: '/energy/info',
            //       method: 'post',
            //       data: {}
            //     },
            //     // 辅助修复接口请求数据
            //     handleFixRequestData: (config, { $route }) => {
            //       let newConfig = { ...config }
            //       return newConfig
            //     },
            //     // 辅助修复接口返回数据
            //     handleFixResponseData: (res) => {
            //       return res
            //     }
            //   },
            //   // 弹窗配置
            //   modal: {
            //     isShow: false,
            //     title: '添加',
            //     // 控制弹窗按钮显示隐藏
            //     hasControl: true,
            //     submitText: '确 定',
            //     closeText: '取 消',
            //     // 表单配置
            //     formCfg: {
            //       // 接口加载数据配置
            //       apiCfg: {
            //         config: {
            //           url: '/energy/type/list',
            //           method: 'get',
            //           params: { 
            //             pageNum: 1,
            //             pageSize: 9999,
            //             // 0:正常 1:停用
            //             status: "0"
            //           }
            //         },
            //         // 辅助修复接口请求数据
            //         handleFixRequestData: (config) => {
            //           let newConfig = { ...config }
            //           return newConfig
            //         },
            //         // 辅助修复接口返回数据
            //         handleFixResponseData: (res, vm) => {
            //           const newRes = { ...res }
            //           const { rows } = newRes || {}
            //           if (!Array.isArray(rows)) return newRes
            //           const fields = [ ...vm.fields ]
            //           const newFields = rows.reverse().map((item, index) => {
            //             return {
            //               label: item.energyName + '表',
            //               field: `$id${index}$`,
            //               type: 'select',
            //               props: {
            //                 multiple: false,
            //                 // 'allow-create': true,
            //                 // 'default-first-option': true
            //               },
            //               options: {
            //                 // Api配置
            //                 config: {
            //                   url: '/energy/meter/notRoomMeterList',
            //                   method: 'get',
            //                   params: {
            //                     pageNum: 1,
            //                     pageSize: 9999,
            //                     meterType: item.meterType,
            //                   }
            //                 },
            //                 // 辅助修复接口请求数据
            //                 handleFixRequestData: (config) => {
            //                   let newConfig = { ...config }
            //                   return newConfig
            //                 },
            //                 // 辅助修复接口返回数据
            //                handleFixResponseData: (res) => {
            //                 const newRes = { ...res }
            //                 if (newRes && Array.isArray(newRes.data)) {
            //                   newRes.data = newRes.data.map(item => {
            //                     return {
            //                       label: item.name,
            //                       value: item.id
            //                     }
            //                   })
            //                 } else {
            //                   newRes.data = []
            //                 }
            //                 return newRes
            //                }
            //               },
            //               // isRequired: true,
            //               // defaultValue: 1,
            //             }
            //           })
            //           // 插入异步数据到表单
            //           newFields.forEach(newItem => {
            //             const field = fields.find(item => item.field === newItem.field)
            //             if (!field) {
            //               const index = fields.findIndex(item => item.isStart)
            //               vm.fields.splice(index, 0, newItem)
            //             }
            //           })
            //           return newRes
            //         }
            //       },
            //       // 硬编码数据配置
            //       fields: editFormFields(),
            //       // 控制表单按钮显示隐藏
            //       hasControl: false,
            //       // 组件配置
            //       props: {
            //         inline: false,
            //         'label-width': '120px',
            //       }
            //     },
            //     form: {}
            //   }
            // },
            // {
            //   label: '删除',
            //   type: 'Delete',
            //   showMode: 'top',
            //   props: {
            //     type: 'danger'
            //   },
            //   // Api配置
            //   apiCfg: {
            //     config: {
            //       url: '/energy/info',
            //       method: 'delete',
            //       params: {},
            //       isUrlSplice: true
            //     },
            //     // 辅助修复接口请求数据
            //     handleFixRequestData: (config, selectedRows) => {
            //       let newConfig = { ...config }
            //       let newForm = { ids: selectedRows.map(item => item.roomId).join() }
            //       newConfig.url += `${newForm.ids}`
            //       return newConfig
            //     },
            //     // 辅助修复接口返回数据
            //     handleFixResponseData: (data) => {
            //       return data
            //     }
            //   },
            // },
            {
              label: '开户',
              type: 'Edit',
              showMode: 'row',
              disabled: ({ row }) => {
                return row.userStatus === '1' || row.userStatus === '已开户' 
              },
              props: {
                type: 'text'
              },
              // 查询详情接口
              detailApiCfg: (data, row) => {
                const newData = { ...data }
                newData.id = row.id
                newData.meterList = [
                  {
                    roomName: row.roomName,
                    name: row.name,
                    unit: row.unit,
                    meterType: row.meterType,
                  }
                ]
                return newData
              },
              // Api配置
              apiCfg: {
                config: {
                  url: '/energy/user',
                  method: 'post',
                  data: {}
                },
                // 辅助修复接口请求数据
                handleFixRequestData: (config) => {
                  let newConfig = { ...config }
                  let data = newConfig.data
                  let meterList = [
                    { expenseOptionId: data.expenseOptionId, id: data.id }
                  ]
                  data.meterList = meterList
                  delete data.id
                  delete data.expenseOptionId
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
                title: '开户',
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
                    'label-width': '80px',
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
              label: '开户状态',
              field: 'userStatus',
              align: 'center',
              options: 'UserStatus'
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
          // apiCfg: {
          //   config: {
          //     url: '',
          //     method: '',
          //     data: {}
          //   },
          //   // 辅助修复接口返回数据
          //   handleFixResponseData: (data) => {
          //     return data
          //   }
          // },
        },
        // 数据配置
        dataCfg: {
          data: [],
          // Api配置
          apiCfg: {
            config: {
              url: '/energy/meter/roomEnergyMeterList',
              method: 'get',
              params: {
                meterType: tabData.meterType
              }
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
}

const getAsyncTabView = (tabData) => {
  return {
    aside,
    mainHeader,
    main: main(tabData),
    footer: {
      name: '底部',
      isShow: false
    }
  }
}

export default getAsyncTabView