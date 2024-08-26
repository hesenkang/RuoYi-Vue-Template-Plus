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
          label: '方案名称',
          field: 'programName',
          type: 'input',
          props: {},
        },
        {
          label: '仪表类型',
          field: 'chargeType',
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
        {
          label: '状态',
          field: 'status',
          type: 'select',
          options: 'ChargeStatus',
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
// 表单项配置
const formFields = () => {
  return [
    {
      // 隐藏字段
      label: '计费类型',
      field: 'chargeType',
      defaultValue: '1',
      isShow: false,
      isIgnore: false,
    },
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
      defaultValue: '1',
      options: 'ChargeMethod',
      isRequired: true,
    },
    {
      label: '单价(¥)',
      field: 'price',
      type: 'inputNumber',
      props: {
        precision: 2,
        step: 0.1,
      },
      defaultValue: 1,
      isRequired: true,
      isShow: (form) => {
        return form.chargeMethod == '1'
      }
    },
    {
      label: '',
      field: 'timePriceList',
      type: () => import('../../components/HeTimePrice.vue'),
      // 自定义组件属性
      props: {
        startEndTimeRule: [
          { 
            required: true,
            validator: (rule, value, callback) => {
              if (!value || !Array.isArray(value) || value.length !== 2) {
                callback(new Error('请选择时间范围'));
              } else {
                callback();
              }
            },
            trigger: ['change', 'blur']
          },
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value[0] && value[1] && value[0] >= value[1]) {
                callback(new Error('结束时间必须晚于开始时间'));
              } else {
                callback();
              }
            },
            trigger: ['change', 'blur']
          }
        ],
        // startTimeRule: [{ type: 'date', required: true, message: '开始时间是必填项', trigger: 'change' }],
        // endTimeRule: [{ type: 'date', required: true, message: '结束时间是必填项', trigger: 'change' }],
        priceRule: [{ required: true, message: '单价是必填项', trigger: 'blur' }],
      },
      defaultValue: [
        {
          name: '时段1',
          code: 'Date',
          startEndTime: null,
          price: ''
        }
      ],
      // isRequired: false,
      isShow: (form) => {
        return form.chargeMethod == '2'
      }
    },
    {
      label: '',
      field: 'JFPGTimePriceList',
      type: () => import('../../components/HeJFPGTimePrice.vue'),
      props: {},
      defaultValue: [
        {
          name: '尖电价(¥/kW·h)',
          code: 'JD',
          startEndTime: null,
          price: ''
        },
        {
          name: '峰电价(¥/kW·h)',
          code: 'FD',
          startEndTime: null,
          price: ''
        },
        {
          name: '平电价(¥/kW·h)',
          code: 'SD',
          startEndTime: null,
          price: ''
        },
        {
          name: '谷电价(¥/kW·h)',
          code: 'GD',
          startEndTime: null,
          price: ''
        },
        {
          name: '深谷电价(¥/kW·h)',
          code: 'SGD',
          startEndTime: null,
          price: ''
        },
      ],
      // isRequired: false,
      isShow: (form) => {
        return form.chargeMethod == '3'
      },
      isIgnore: true,
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
            label: '添加电价方案',
            type: 'Add',
            showMode: 'top',
            props: {
              type: 'primary'
            },
            // Api配置
            apiCfg: {
              config: {
                url: '/energy/program',
                method: 'post',
                data: {}
              },
              // 辅助修复接口请求数据
              handleFixRequestData: (config) => {
                const newConfig = { ...config }
                let newForm = newConfig.data
                // 收费方式为单价
                if (newForm.chargeMethod == '1') {
                  newForm.timePriceList = [
                    {
                      name: '全天',
                      code: 'ALL',
                      startTime: '00:00:00',
                      endTime: '23:59:59',
                      price: newForm.price,
                    }
                  ]
                  delete newForm.price
                }
                // 根据给定的项，转换其时间格式。
                const timePriceList = (item) => {
                  let newItem = {
                    ...item,
                    startTime: item.startEndTime[0],
                    endTime: item.startEndTime[1],
                  }
                  delete newItem.startEndTime
                  return newItem
                }
                // 收费方式为时间单价
                if (newForm.chargeMethod == '2') {
                  newForm.timePriceList = newForm.timePriceList.map(timePriceList)
                }
                // 收费方式为复费率
                if (newForm.chargeMethod == '3') {
                  newForm.timePriceList = newForm.JFPGTimePriceList.map(timePriceList)
                  delete newForm.JFPGTimePriceList
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
              title: '添加电价方案',
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
                  
                }
              },
              form: {}
            }
          },
          {
            label: '添加水价方案',
            type: 'Add',
            showMode: 'top',
            // Api配置
            apiCfg: {
              config: {
                url: '/energy/program',
                method: 'post',
                data: {}
              },
              // 辅助修复接口请求数据
              handleFixRequestData: (config) => {
                const newConfig = { ...config }
                let newForm = newConfig.data
                // 收费方式为单价
                newForm.timePriceList = [
                  {
                    name: '全天',
                    code: 'ALL',
                    startTime: '00:00:00',
                    endTime: '23:59:59',
                    price: newForm.price,
                  }
                ]
                delete newForm.price
                return newConfig
              },
              // 辅助修复接口返回数据
              handleFixResponseData: (res) => {
                return res
              }
            },
            props: {
              type: 'primary'
            },
            // 弹窗配置
            modal: {
              isShow: false,
              title: '添加水价方案',
              // 控制弹窗按钮显示隐藏
              hasControl: true,
              submitText: '确 定',
              closeText: '取 消',
              // 表单配置
              formCfg: {
                // 硬编码数据配置
                fields: [
                  {
                    // 隐藏字段
                    label: '计费类型',
                    field: 'chargeType',
                    defaultValue: '2',
                    isShow: false,
                    isIgnore: false,
                  },
                  {
                    label: '方案名称',
                    field: 'programName',
                    type: 'input',
                    props: {},
                    isRequired: true,
                  },
                  {
                    label: '单价(¥)',
                    field: 'price',
                    type: 'input',
                    props: {},
                    isRequired: true,
                  },
                ],
                // 控制表单按钮显示隐藏
                hasControl: false,
                // 组件配置
                props: {
                  // inline: false,
                  'label-width': '100px',
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
                url: '/energy/program',
                method: 'delete',
                params: {},
                isUrlSplice: true
              },
              // 辅助修复接口请求数据
              handleFixRequestData: (config) => {
                return config
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
                url: '/energy/program',
                method: 'get',
                params: {},
                isUrlSplice: true
              },
              // 辅助修复接口返回数据
              handleFixResponseData: (res) => {
                const newRes = { ...res }
                const { data: formData } = newRes
                // 表单数据
                let form = {
                  id: formData.id,
                  programName: formData.programName,
                  // chargeType: formData.chargeType,
                  chargeMethod: formData.chargeMethod,
                }
                // 收费方式枚举值
                const TimePriceListMaps = {
                  '2': 'timePriceList',
                  '3': 'JFPGTimePriceList',
                }
                // key
                const key = TimePriceListMaps[formData.chargeMethod]

                if (formData.chargeMethod == '1') {
                  // 收费方式为单价
                  form.price = formData.timePriceList.find(item => item.programId === formData.id).price
                } else if (key) {
                  // 收费方式为时段单价||复费率
                  form[key] = formData.timePriceList
                  .filter(item => item.programId === formData.id)
                  .map(item => {
                    return {
                      programId: item.programId,
                      name: item.name,
                      code: item.code,
                      startEndTime: [item.startTime, item.endTime],
                      price: item.price,
                    }
                  })
                }

                newRes.data = form
                return newRes
              }
            },
            // Api配置
            apiCfg: {
              config: {
                url: '/energy/program',
                method: 'put',
                data: {}
              },
              // 辅助修复接口请求数据
              handleFixRequestData: (config) => {
                const newConfig = { ...config }
                let newForm = newConfig.data
                // 收费方式为单价
                if (newForm.chargeMethod == '1') {
                  newForm.timePriceList = [
                    {
                      name: '全天',
                      code: 'ALL',
                      startTime: '00:00:00',
                      endTime: '23:59:59',
                      price: newForm.price,
                    }
                  ]
                  delete newForm.price
                }
                // 根据给定的项，转换其时间格式。
                const timePriceList = (item) => {
                  let newItem = {
                    ...item,
                    startTime: item.startEndTime[0],
                    endTime: item.startEndTime[1],
                  }
                  delete newItem.startEndTime
                  return newItem
                }
                // 收费方式为时间单价
                if (newForm.chargeMethod == '2') {
                  newForm.timePriceList = newForm.timePriceList.map(timePriceList)
                }
                // 收费方式为复费率
                if (newForm.chargeMethod == '3') {
                  newForm.timePriceList = newForm.JFPGTimePriceList.map(timePriceList)
                  delete newForm.JFPGTimePriceList
                }
                return newConfig
              },
              // 辅助修复接口返回数据
              handleFixResponseData: (res) => {
                return res
              }
            },
            // 表单弹窗配置
            modal: {
              isShow: false,
              title: '编辑方案',
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
                  // 'label-width': '80px',
                  
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
          // 辅助修复按钮数据
          handelFixButtonsData: (data, buttonsData) => {
            // 保存需要的本地按钮数据
            const newData = data.slice(2)
            const newButtons = buttonsData.map(item => {
              let newItem = null
              if (item.energyName.includes('电')) {
                newItem = $HE.deepClone(data[0])
              } else {
                newItem = $HE.deepClone(data[1])
              }
              newItem.label = `添加${item.energyName}价方案`
              newItem.modal.title = `添加${item.energyName}价方案`
              if (Array.isArray(newItem.modal.formCfg.fields)) {
                  newItem.modal.formCfg.fields.forEach(formItem => {
                      if (formItem.field === 'chargeType') {
                          formItem.defaultValue = item.meterType
                      }
                  })
              }
              return newItem
            })
            return [...newButtons, ...newData]
          }
        },
      },
      // 表头配置
      columnsCfg: {
        data: [
          {
            label: '方案名称',
            field: 'programName',
            align: 'center',
          },
          {
            label: '计费类型',
            field: 'chargeType',
            align: 'center',
            options: 'meterType',
            isAsync: true
          },
          {
            label: '状态',
            field: 'status',
            align: 'center',
            // options: 'ChargeStatus',
            components: 'HeBaseSwitch',
            props: {
              // Api配置
              apiCfg: {
                config: {
                  url: '/energy/program/changeStatus',
                  method: 'put',
                  data: {},
                },
                // 辅助修复接口请求数据
                handleFixRequestData: (config, { row }) => {
                  const newConfig = { ...config }
                  newConfig.data = {
                    id: row.id,
                    status: row.status === '1' ? '0' : '1',
                  }
                  return newConfig
                },
                // 辅助修复接口返回数据
                // handleFixResponseData: (res) => {
                //   return res
                // }
              },
            }
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
          handleFixResponseData: (res) => {
            return res
          }
        },
      },
      // 数据配置
      dataCfg: {
        data: [],
        // Api配置
        apiCfg: {
          config: {
            url: '/energy/program/list',
            method: 'get',
            data: {}
          },
          // 辅助修复接口请求数据
          handleFixRequestData: (config) => {
            return config
          },
          // 辅助修复接口返回数据
          handleFixResponseData: (res) => {
            return res
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