<template>
  <article class="container">
    <section v-if="buttonTopsItems.length > 0" class="buttons_top">
      <el-button v-for="item in buttonTopsItems" :key="item.field" v-bind="{ ...item.props }" @click="handelTopButtonClick(item)">{{ item.label }}</el-button>
    </section>
    <HeBaseTable 
      :columns="columns" 
      :tableData="tableData" 
      v-bind="{ ...props }"
    >
    </HeBaseTable>
    <!-- 弹窗 -->
    <HeEditModal v-if="modal.isShow" v-show="modal.isShow" v-bind="{ modal, ...modal }" :isShow.sync="modal.isShow" @submit="submitEditForm"></HeEditModal>
  </article>
</template>

<script>
import request from "@/utils/request"
import { parseData } from '@/components/He/HeTable/hooks/core.js'
import HeBaseTable from '@/components/He/HeTable/HeBaseTable.vue';

// 解析Api返回值，防止数据不规范带来的问题
const fixApiData = (data) => {
    if (!data) {
        console.error('getTableColumns 返回数据为: ', data)
        return []
    }

    const isObject = (obj) => 
    obj !== null 
    && typeof obj === 'object' 
    && Object.prototype.toString.call(obj) === '[object Object]' 
    && !Array.isArray(obj)

    if (!isObject(data)) {
        console.error('getTableColumns 返回数据为: ', data)
        return []
    }

    const list = data.list || data.rows || data.rawData || data

    if (!list || !Array.isArray(list)) {
        console.error('getTableColumns 解析列表数据为: ', list)
        return []
    }

    return list
}

export default {
  components: {
    HeBaseTable,
    HeEditModal: () => import('@/components/He/HeModal/HeEditModal.vue')
  },
  props: {
    // modal: {
    //     type: Object,
    //     default: null,
    // },
    value: {
        type: Array,
        default: () => []
    },
    // 表格按钮配置
    buttonsCfg: {
        type: Object,
        default: () => ({}),
    },
    // 表格表头配置
    columnsCfg: {
        type: Object,
        require: true,
        default: () => ({}),
    },
    // 表格组件配置
    props: {
        type: Object,
        default: () => ({})
    }
  },
  data() {
    return {
      // 表格按钮配置
      buttons: [],
      // 表格列
      columns: [],
      // 表格数据
      tableData: [],
      // 弹窗
      modal: {
          isShow: false
      },
    }
  },
  watch: {
    value(val) {
        let fixData = val
        // 如果存在枚举字段
        if (this.columns.length > 0) {
            const isParse = this.columns.some(item => item.options)
            if (isParse) {
                fixData = parseData(this.columns, fixData)
            }
        }
        this.tableData = fixData
    }
  },
  computed: {
    // 计算表格头按钮配置
    buttonTopsItems() {
        return this.buttonItems.filter(item => item.showMode === 'top')
    },
    // 按钮集合
    buttonItems() {
        const buttons = this.buttons || null
        if (!Array.isArray(buttons)) return []
        return buttons
    },
  },
  created() {
      this.getTableButtons()
      this.getTableColumns()
      this.tableData = this.value
  },
  methods: {
    // 提交新增/编辑表单
    submitEditForm({ button, form }) {
        const hasTable = this.tableData.find(item => item.id === form.id)
        if (hasTable) {
            this.$message({
                type: 'warning',
                message: '该条数据已存在!'
            });
            return
        }
        // 本地提交数据操作
        let newForm = { ...form }
        const config = {
          url: '/energy/meter/notUserMeterList',
          method: 'get',
          params: {
            id: newForm.id,
            meterType: button.meterType,
            pageNum: 1,
            pageSize: 9999,
          }
        }
        request(config).then(res => {
            const { code, data } = res || {}
            const obj = data[0]
            if (code === 200) {
                this.tableData.push({
                    roomName: obj.roomName,
                    name: obj.name,
                    unit: obj.unit,
                    meterType: obj.meterType,
                    ...newForm
                })
                this.$emit('input', this.tableData)
                this.modal.isShow = false
            }
        })
        // 远程提价数据操作
        // const { type, apiCfg } = button
        // const { config, handleFixRequestData, handleFixResponseData } = apiCfg
        // let newConfig = { ...config }
        // 如果是url拼接
        // if (newConfig.isUrlSplice) {
        //     newConfig.url += `/${newForm.ids}`
        // } else {
        //     if (newConfig.params) {
        //         newConfig.params = newForm
        //     } else {
        //         newConfig.data = newForm
        //     }
        // }
        // // 修复请求数据
        // if (this.$HE.isFunction(handleFixRequestData)) {
        //     newConfig = handleFixRequestData(newConfig, this)
        // }
        // request(newConfig).then(res => {
        //     // 修复返回数据
        //     if (this.$HE.isFunction(handleFixResponseData)) {
        //         res = handleFixResponseData(res)
        //     }
        //     const { code } = res || {}
        //     if (code === 200) {
        //         this.$message({
        //             type: 'success',
        //             message: `${ type === 'Add' ? '新增' : '编辑'}成功!`
        //         });
        //         this.modal.isShow = false
        //         this.getTableData()
        //     }
        // })
    },
    // 新增功能
    handleAdd(button) {
        const { modal } = button
        this.modal = { ...modal, button }
        this.modal.isShow = true
    },
    // 表格Top按钮辅助函数
    handelTopButtonClick(button) {
        const { label, type, apiCfg, modal } = button
        const isApi = Boolean(apiCfg?.config?.url)
        if (!isApi) {
            throw new Error(`按钮[ ${label}: ${type} ]未正确配置, 缺少请求Api!`)
        }
        if (type === 'Add') {
            if (!modal) {
                throw new Error(`按钮[ ${label}: ${type} ]未正确配置, 缺少弹窗配置！`)
            }
            this.handleAdd(button)
        } else {
            throw new Error(`按钮[ ${label}: ${type} ]未开发的功能！`)
        }
    },
    // 获取表格按钮数据
    getTableButtons() {
        const isApi = Boolean(this.buttonsCfg?.apiCfg?.config?.url)
        const isData = this.buttonsCfg?.data && Array.isArray(this.buttonsCfg.data)
        // if (!isApi && !isData) {
        //     throw new Error('表格按钮未正确配置，缺少请求Api 或 硬编码数据！')
        // }
        if (isApi) {
            request(this.buttonsCfg.apiCfg.config).then(data => {
                const { code, rows } = data
                if (code === 200) {
                    let buttonsData = rows || data.list || data.data || []
                    let newButtons = buttonsData.map(item => {
                        let newItem = $HE.deepClone(this.buttonsCfg.data[0])
                        newItem.label = `新增${item.energyName}表`
                        newItem.modal.title = `新增${item.energyName}表`
                        if (Array.isArray(newItem.modal.formCfg.fields)) {
                            newItem.modal.formCfg.fields.forEach(formItem => {
                                if (formItem.field === 'id') {
                                    formItem.options.config.params.meterType = item.meterType
                                } else if (formItem.field === 'expenseOptionId') {
                                    formItem.options.config.params.chargeType = item.meterType
                                }
                            })
                            newItem.meterType = item.meterType
                        }
                        return newItem
                    })
                    this.buttons = newButtons
                }

            })
        } else if (isData) {
            this.buttons = this.buttonsCfg.data
        }
    },
    // 获取表格列数据
    getTableColumns() {
        const isApi = Boolean(this.columnsCfg?.apiCfg?.config?.url)
        const isData = this.columnsCfg?.data && Array.isArray(this.columnsCfg.data)
        if (!isApi && !isData) {
            throw new Error('表头未正确配置，缺少请求Api 或 硬编码数据！')
        }
        if (isApi) {
            request(this.columnsCfg.apiCfg.config).then(data => this.columns = fixApiData(data))
        } else if (isData) {
            this.columns = this.columnsCfg.data
        }
    },
  }
}
</script>

<style scoped>
.buttons_top {
    margin-bottom: 10px;
}
</style>