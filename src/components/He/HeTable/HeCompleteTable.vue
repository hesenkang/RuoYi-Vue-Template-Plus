<template>
  <div class="container">
      <div class="app">
        <section v-if="buttonTopsItems.length > 0" class="buttons_top">
            <el-button v-for="item in buttonTopsItems" :key="item.field" v-bind="{ ...item.props }" @click="handelTopButtonClick(item)">{{ item.label }}</el-button>
        </section>
        <HeBaseTable 
            :style="{ height: `calc(100% - ${buttonTopsItems.length ? '45.25px' : '0px'} - ${pagination.isShow ? ' 42px' : '0px'} - 7px)`}"
            :columns="columns" 
            :tableData="tableDataCpt" 
            v-bind="{ ...props }"
            v-loading="loading"
            element-loading-text="加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            @select="handleSelect"
            @select-all="handleSelectAll"
            @selection-change="handleSelectionChange"
        >
            <template v-slot="{ item, data }">
                <component
                    v-if="item.components"
                    :is="item.components"
                    v-model="data.row[item.field]"
                    :data="data"
                    v-bind="{ ...item.props }">
                    {{ data.row[item.field] }}
                </component>
                <section v-if="item.isOperate">
                    <el-button v-for="item in buttonRowsItems" :key="item.field" :disabled="handelRowButtonDisabled(item, data)" v-bind="{ ...item.props }" @click="handelRowButtonClick(item, data)">{{ item.label }}</el-button>
                </section>
            </template>
        </HeBaseTable>
        <section class="pagination" v-if="pagination.isShow">
            <pagination
                v-show="total > 0"
                :total="total"
                :page.sync="pagination.pageNum"
                :limit.sync="pagination.pageSize"
                v-bind="{ ...pagination.props }"
                @pagination="getTableData"
            />
        </section>

        <!-- 弹窗 -->
        <HeEditModal v-if="modal" v-show="modal.isShow" v-bind="{ extendsData, modal, ...modal }" :isShow.sync="modal.isShow" @submit="submitEditForm"></HeEditModal>
      </div>
  </div>
</template>

<script>
import request from "@/utils/request"
import { parseData } from './hooks/core.js'
import HeBaseTable from './HeBaseTable.vue';
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
        HeEditModal: () => import('../HeModal/HeEditModal.vue'),
        HeBaseSwitch: () => import('../HeForm/components/HeBaseSwitch.vue'),
    },
    props: {
        tabUUKey: {
            type: [String],
            default: ''
        },
        extendsData: {
            type: Object,
            default: null
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
        // 表格数据配置
        dataCfg: {
            type: Object,
            require: true,
            default: () => ({}),
        },
        // 表格分页配置
        pagination: {
            type: Object,
            default: () => ({
                isShow: true,
                pageNum: 1,
                pageSize: 15,
            })
        },
        // 表格组件配置
        props: {
            type: Object,
            default: () => ({})
        }
    },
    data () {
        return {
            // 表格加载中
            loading: true,
            // 表格按钮
            buttons: this.buttonsCfg.data || [],
            // 表格列
            columns: [],
            // 表格数据
            tableData: [],
            // 表格选中的行数据
            selectedRows: [],
            // 表格页码
            // pageNum: this.pagination.pageNum || 1,
            // 表格页容量
            // pageSize: this.pagination.pageSize || 15,
            // 表格总条数
            total: 0,
            // 弹窗配置
            modal: null
        }
    },
    computed: {
        // 计算表格行按钮配置
        buttonRowsItems() {
            return this.buttonItems.filter(item => item.showMode === 'row')
        },
        // 计算表格头按钮配置
        buttonTopsItems() {
            return this.buttonItems.filter(item => item.showMode === 'top').map(item => {
                // 删除按钮根据是否选中行是否禁用
                if (item.type === 'Delete') {
                    return {
                        ...item,
                        props: {
                            ...item.props,
                            disabled: item.props?.disabled || this.selectedRows.length === 0
                        }
                    }
                }
                return item
            })
        },
        // 按钮集合
        buttonItems() {
            return this.buttons
        },
        tableDataCpt() {
            const { isShow, pageNum, pageSize } = this.pagination
            if (!isShow) {
                return this.tableData
            } else if (this.isTableApi) {
                return this.tableData
            } else if (this.isTableData) {
                const startPage = (pageNum - 1) * pageSize
                let beginPage = startPage + pageSize
                const maxBeginPage = Math.floor(this.tableData.length / pageSize)
                if (beginPage > maxBeginPage) {
                    beginPage = this.tableData.length
                }
                return this.tableData.slice(startPage, beginPage)
            } else {
                return this.tableData
            }
        },
        isTableData() {
            return this.dataCfg?.data && Array.isArray(this.dataCfg.data)
        },
        isTableApi() {
            return Boolean(this.dataCfg?.apiCfg?.config?.url) || false
        }
    },
    created() {
        this.onEventBus()
        this.getTableColumns()
        this.getTableData()
        this.getTableButtons()
    },
    methods: {
        /**
         * 监听事件总线的方法
         * 此方法用于接收和处理从事件总线发送过来的事件
         * 在这里可以进行事件的响应和处理，例如更新数据或触发其他逻辑
         */
        onEventBus() {
            // 监听事件-节点被点击
            this.$eventBus.on('onNodeClick' + this.tabUUKey, ({ form }) => {
                this.treeForm = form
                this.getTableData()
            }, this)
            // 监听事件-搜索按钮被点击
            this.$eventBus.on('onSearchButtonClick' + this.tabUUKey, (form = {}) => {
                this.searchForm = form
                this.getTableData()
            }, this)
        },
        handleSelectionChange(selection) {
            // console.log(selection)
            this.selectedRows = selection
        },
        handleSelectAll(selection) {
            // console.log(selection)
        },
        handleSelect(selection, row) {
            // console.log(selection, row)
        },
        // 提交新增/编辑表单
        submitEditForm({ button, form }) {
            const { type, apiCfg } = button
            const { config, handleFixRequestData, handleFixResponseData } = apiCfg
            let newConfig = { ...config }
            let newForm = { ...form }
            // 如果是url拼接
            if (newConfig.isUrlSplice) {
                newConfig.url += `/${newForm.ids}`
            } else {
                if (newConfig.params) {
                    newConfig.params = newForm
                } else {
                    newConfig.data = newForm
                }
            }
            // 修复请求数据
            if (this.$HE.isFunction(handleFixRequestData)) {
                newConfig = handleFixRequestData(newConfig, this)
            }
            request(newConfig).then(res => {
                // 修复返回数据
                if (this.$HE.isFunction(handleFixResponseData)) {
                    res = handleFixResponseData(res)
                }
                const { code } = res || {}
                if (code === 200) {
                    this.$message({
                        type: 'success',
                        message: `${ type === 'Add' ? '新增' : '编辑'}成功!`
                    });
                    this.modal.isShow = false
                    this.getTableData()
                    this.$eventBus.emit('onSearchTree' + this.tabUUKey)
                }
            })
        },
        // 新增功能
        handleAdd(button) {
            const { modal } = button
            this.modal = { ...modal, button }
            this.modal.isShow = true
        },
        // 删除功能
        handleDelete(button) {
            this.$confirm(`此操作将删除已选中的 ${this.selectedRows.length} 条数据, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const { apiCfg } = button
                const { config, handleFixRequestData, handleFixResponseData } = apiCfg
                let newForm = { ids: this.selectedRows.map(item => item.id).join() }
                let newConfig = { ...config }
                // 如果是url拼接
                if (newConfig.isUrlSplice) {
                    newConfig.url += `/${newForm.ids}`
                } else {
                    if (newConfig.params) {
                        newConfig.params = newForm
                    } else {
                        newConfig.data = newForm
                    }
                }
                // 修复请求数据
                if (this.$HE.isFunction(handleFixRequestData)) {
                    newConfig = handleFixRequestData(newConfig, this.selectedRows)
                }
                request(newConfig).then(res => {
                    // 修复返回数据
                    if (this.$HE.isFunction(handleFixResponseData)) {
                        res = handleFixResponseData(res)
                    }
                    const { code } = res || {}
                    if (code === 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getTableData()
                        this.$eventBus.emit('onSearchTree' + this.tabUUKey)
                    }
                })
            }).catch(() => {
                
            })
        },
        // 编辑功能
        handleEdit(button, { row }) {
            const { detailApiCfg, apiCfg, modal } = button 
            this.modal = { ...modal, button }
            if (!detailApiCfg) return
            if (typeof detailApiCfg === 'function') {
                setTimeout(() => {
                    this.modal.form = detailApiCfg(this.modal.form, row, this)
                }, 100);
                this.modal.isShow = true
                return
            }
            this.modal.isShow = true
            // 获取详情
            const { config, handleFixRequestData, handleFixResponseData } = detailApiCfg
            let newConfig = { ...config }
            // 如果是url拼接
            if (newConfig.isUrlSplice) {
                newConfig.url += `/${row.id || ''}`
            } else {
                if (newConfig.params) {
                    newConfig.params = newForm
                } else {
                    newConfig.data = newForm
                }
            }
            // 修复请求数据
            if (this.$HE.isFunction(handleFixRequestData)) {
                newConfig = handleFixRequestData(newConfig, row)
            }
            request(newConfig).then(res => {
                // 修复返回数据
                if (this.$HE.isFunction(handleFixResponseData)) {
                    res = handleFixResponseData(res)
                }
                const { code, data } = res || {}
                if (code === 200) {
                    if (!data) return
                    this.modal.form = data
                }
            })
            // 如果 apiCfg 不
            // this.$message({
            //     type: 'success',
            //     message: '编辑成功!'
            // });
        },
        // 查看功能
        handleView(row) {
            this.$message({
                type: 'success',
                message: '查看成功!'
            });
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
            } else if (type === 'Delete') {
                this.handleDelete(button)
            }
            
            
        },
        // 表格Row按钮辅助禁用函数
        handelRowButtonDisabled(button, data) {
            return typeof(button.disabled) === 'function' ? button.disabled(data) : !!button.disabled
        },
        // 表格Row按钮辅助函数
        handelRowButtonClick(button, data) {
            const { type } = button
            if (type === 'Edit') {
                this.handleEdit(button, data)
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

            if (this.buttonRowsItems.length > 0 && this.columns.every(item => item.field !== '$operate$')) {
                this.columns.push({
                    field: '$operate$',
                    label: '操作',
                    isOperate: true,
                })
            }
        },
        // 获取表格数据
        getTableData() {
            if (!this.isTableApi && !this.isTableData) {
                throw new Error('表格未正确配置，缺少请求Api 或 硬编码数据！')
            }
            let form = {}
            if (this.treeForm) {
                form = Object.assign({}, form, this.treeForm)
            }
            if (this.searchForm) {
                form = Object.assign({}, form, this.searchForm)
            }
            
            // 如果是接口请求数据
            if (this.isTableApi) {
                let config = this.dataCfg.apiCfg.config
                const { pageNum, pageSize } = this.pagination
                let newConfig = { ...config }
                let newForm = Object.assign({}, newConfig.data || newConfig.params, form)
                
                if (newConfig.method === 'get') {
                    newConfig.params = {
                        ...newForm,
                        pageNum,
                        pageSize
                    }
                } else if (newConfig.method === 'post') {
                    newConfig.data = {
                        ...newForm,
                        pageNum,
                        pageSize
                    }
                }

                // 如果存在辅助修复接口请求数据函数
                const handleFixRequestData = this.dataCfg.apiCfg.handleFixRequestData
                if (handleFixRequestData && this.$HE.isFunction(handleFixRequestData)) {
                    newConfig = handleFixRequestData(newConfig)
                }
                this.loading = true
                // 请求数据
                request(newConfig).then(async data => {
                    const { code, total } = data
                    let fixData = fixApiData(data)
                    // 如果存在辅助修复接口请求数据函数
                    const handleFixResponseData = this.dataCfg.apiCfg.handleFixResponseData
                    if (handleFixResponseData && this.$HE.isFunction(handleFixResponseData)) {
                        fixData = handleFixResponseData(fixData)
                    }
                    // 如果存在枚举字段
                    if (this.columns.length > 0) {
                        const isParse = this.columns.some(item => item.options)
                        if (isParse) {
                            fixData = await parseData(this.columns, fixData)
                        }
                    }
                    this.tableData = fixData
                    this.total = total
                }).finally(() => this.loading = false)
            // 如果是硬编码数据
            } else if (this.isTableData) {
                this.tableData = this.dataCfg.data
                this.total = this.tableData.length
            }
        },
        // 获取表格按钮数据
        getTableButtons() {
            const { data, apiCfg } = this.buttonsCfg
            const isApi = Boolean(apiCfg?.config?.url)
            const isData = data && Array.isArray(data)
            if (isApi) {
                const { config, handleFixRequestData, handleFixResponseData, handelFixButtonsData } = apiCfg
                let newConfig = { ...config }
                // 修复请求数据
                if (this.$HE.isFunction(handleFixRequestData)) {
                    newConfig = handleFixRequestData(newConfig, this.selectedRows, this)
                }
                request(this.buttonsCfg.apiCfg.config).then(res => {
                    // 修复返回数据
                    if (this.$HE.isFunction(handleFixResponseData)) {
                        res = handleFixResponseData(res)
                    }
                    const { code, rows } = res
                    if (code === 200) {
                        let buttonsData = rows || res.list || res.data || []
                        let newButtons = []
                        if (this.$HE.isFunction(handelFixButtonsData)) {
                            newButtons = handelFixButtonsData(data, buttonsData)
                        }
                        this.buttons = newButtons
                    }

                })
            } else if (isData) {
                this.buttons = this.buttonsCfg.data
            }
        },
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
}
.app {
    height: 100%;
}
.buttons_top {
    /* height: 38px; */
    margin-bottom: 10px;
}
/* .pagination {
    height: 35px;
} */
</style>