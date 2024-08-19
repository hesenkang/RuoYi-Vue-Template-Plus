<template>
  <section class="container">
    <el-card class="box-card">
      <HeBaseTabs v-model="tabsActiveName" :tabs="list" v-bind="{ ...props }" @edit="handleTabsEdit" @tab-click="handleTabClick" :before-leave="handleBeforeLeave">
        <template v-slot:label="{ item }">
          {{ item.title }}
          <span class="el-icon-edit" @click="handleTabsEdit(item.id, 'edit')"></span>
        </template>
        <template v-slot:default="{ item }">
          <!-- 树 -->
           <div class="tree">
             <HeAsideTree
              :ref="'asideTree' + item.id" 
              style="height: 80vh"
              @check="onCheck" 
              @node-click="onNodeClick" 
              @current-change="onCurrentChange" 
              v-bind="{ ...localTabsCfg }" 
            >
            </HeAsideTree>
           </div>
        </template>
      </HeBaseTabs>
    </el-card>

    <!-- 弹窗 -->
    <HeEditModal v-if="modal" v-show="modal.isShow" v-bind="{ modal, ...modal }" :isShow.sync="modal.isShow" @submit="submitEditForm"></HeEditModal>
  </section>
</template>

<script>
import request from "@/utils/request"
import HeBaseTabs from '@/components/He/components/HeBaseTabs.vue'
import HeAsideTree from '@/components/He/HeTree/HeAsideTree.vue'

// 替换数据默认的
const copyDefaultPropsValue = (data, defaultProps) => {
  const { children, label } = defaultProps
  for (const item of data) {
    item.name = item[label]
    item.label = item[label]
    if (item[children]) {
      item.children = item[children]
      copyDefaultPropsValue(item[children], defaultProps)
    }
  }
  return data
}

export default {
  components: {
    HeEditModal: () => import('@/components/He/HeModal/HeEditModal.vue'),
    HeAsideTree,
    HeBaseTabs
  },
  props: {
    // Api配置
    apiCfg: {
      type: Object,
      default: null
    },
    // 硬编码数据
    data: {
      type: [Array, Function],
      default: null,
    },
    buttonsCfg: {
      type: Object,
      default: null,
    },
    // Tabs配置
    tabsCfg: {
      type: Object,
      default: () => null,
    },
    // 组件配置
    props: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      localTabsCfg: this.tabsCfg,
      // Tab数据集
      list: [],
      // 当前选中的TabName
      tabsActiveName: '',
      // 记录Tabs的第一个name
      tabDefaultName: '',
      // 弹窗配置
      modal: null,
      // 选中节点
      checkedKey: ''
    }
  },
  computed: {
    // 按钮集合
    buttonItems() {
        const buttons = this.buttonsCfg?.data || null
        if (!Array.isArray(buttons)) return []
        return buttons
    },
  },
  created () {
    // 初始化组织树
    this.initTree()
  },
  mounted() {
    this.$eventBus.on('refresh', () => {
      this.$refs['asideTree' + this.tabsActiveName].initTree()
    }, this)
  },
  methods: {
    // 弹窗提交
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
          newConfig = handleFixRequestData(newConfig)
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
              this.initTree()
          }
      })
    },
    onCurrentChange(item, node) {},
    // 普通树节点被点击执行
    onNodeClick(item, node, data) {
      const key = item.id
      if (this.checkedKey === key){
        this.checkedKey = null
        this.$eventBus.emit('onNodeClick', { node, data, classId: this.tabsActiveName })
      } else {
        this.checkedKey = key
        this.$eventBus.emit('onNodeClick', { item, node, data, classId: this.tabsActiveName })
      }
      const ref = this.$refs['asideTree' + this.tabsActiveName].getBaseTree()
      if (ref) {
        ref.setCurrentKey(this.checkedKey);
      }
    },
    // 多选树节点被勾选执行
    onCheck(node, data) {
      // this.$eventBus.emit('onCheck', { node, data })
    },
    // Tab 切换之前执行
    handleBeforeLeave(activeName) {
      const { config } = this.localTabsCfg.apiCfg
      if (config) {
        config.params = { classId: activeName }
      }
      this.$eventBus.emit('initClassId', activeName)
      return true
    },
    // Tab 切换之后执行
    handleTabClick({ name: tabId }){
      // const { config } = this.localTabsCfg.apiCfg
      // if (config) {
      //   config.params = { classId: tabId }
      // }
    },
    // Tabs 操作集合
    handleTabsEdit(targetName, action) {
      if (action === 'add') {
        const button = this.buttonItems.find(item => item.type === 'Add')
        const { modal } = button
        this.modal = { ...modal, button }
        this.modal.isShow = true
        
      }
      if (action === 'edit') {
        const button = this.buttonItems.find(item => item.type === 'Edit')
        this.handleEdit(button, { row: { id: targetName } })
      }
      if (action === 'remove') {
        const button = this.buttonItems.find(item => item.type === 'Delete')
        this.handleDelete(button, { row: { id: targetName } })
      }
    },
    // 编辑功能
    handleEdit(button, { row }) {
        const { detailApiCfg, apiCfg, modal } = button 
        this.modal = { ...modal, button }
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
        request(newConfig).then(res => {
            // 修复返回数据
            if (this.$HE.isFunction(handleFixResponseData)) {
                res = handleFixResponseData(res)
            }
            const { code, data } = res || {}
            if (code === 200) {
                if (!data) return
                this.modal.form = data
                this.initTree()
            }
        })
    },
    // 删除功能
    handleDelete(button, { row }) {
        this.$confirm(`此操作将删除数据, 是否继续?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            const { apiCfg } = button
            const { config, handleFixRequestData, handleFixResponseData } = apiCfg
            let newForm = { ids: row.id }
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
                newForm = handleFixRequestData(newForm)
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
                    // 如果删除的是当前激活的Tab 则切换到默认Tab
                    if (this.tabsActiveName === row.id) {
                      this.tabsActiveName = this.tabDefaultName
                    }
                    this.initTree()
                }
            })
        }).catch(() => {
            
        })
    },
    // 初始化当前树
    initTree () {
      const apiCfg = this.apiCfg
      if (!apiCfg) return
      const { config } = apiCfg || {}
      // 如果有配置接口-接口优先
      if (config?.url) {
        this.getTree(apiCfg)
        return
      }
      // 如果有配置data数据
      if (this.data) {
        this.getTree(this.data)
        return
      }
    },
    // 从接口获取组织树数据
    async getTree (any) {
      if (typeof any === 'object') {
        const apiCfg = any
        const res = await request(apiCfg.config)

        let fixData = res

        // 如果这个时候值还是一个对象取出第一个数组作为树结构数据
        if (fixData && this.$HE.isObject(fixData)) {
          for (const iterator in fixData) {
            if (Array.isArray(fixData[iterator])) {
              fixData = fixData[iterator]
              break
            }
          }
        }

        // 如果最终值为一个对象 或 不是一个数组 那么给一个空数组
        if (fixData && this.$HE.isObject(fixData) || !Array.isArray(fixData)) {
          throw new Error('getTree: 数据解析失败', fixData)
        }

        // 如果配置了el-tree组件的defaultProps会复制该配置的属性到每条数据上
        if (this.defaultProps) {
          fixData = copyDefaultPropsValue(fixData, this.defaultProps)
        }

        // 如果配置了辅助数据修复函数
        if (apiCfg.handleFixResponseData && this.$HE.isFunction(apiCfg.handleFixResponseData)) {
          fixData = apiCfg.handleFixResponseData(fixData)
        }

        this.list = fixData 

        // 给第一个树组织请求参数
        if (Array.isArray(this.list) && this.list.length > 0) {
          const { config } = this.localTabsCfg?.apiCfg || {}
          if (config && config.params) {
            const id = this.list[0] ? this.list[0].id : ''
            if (this.tabDefaultName === '') {
              config.params = { classId: id }
              this.tabsActiveName = id
              this.$eventBus.emit('initClassId', id)
            } else {
              this.tabDefaultName = id
            }
          }
        }
      } else if (typeof any === 'function') {
        const getTreeFnc = any
        const res = await getTreeFnc()
        if (Array.isArray(res)) {
          this.list = res
        } else if (this.$HE.isObject(res)) {
          const { data } = res
          this.list = data
        } else {
          throw new Error('getTree: data: function 数据解析失败', res)
        }
      } else if (Array.isArray(any)) {
        this.list = any
      }
    }
  }
}
</script>

<style scoped>
  /* .tree {
    max-height: 60vh;
    overflow: auto;
  } */
  .el-tabs__item .el-icon-edit::before {
    content: '\e78c';
    transform: scale(.9);
    display: inline-block;
  }
  .el-tabs__item .el-icon-edit:hover {
    background-color: #C0C4CC;
    color: #FFF;
  }
  .el-tabs__item .el-icon-edit {
    border-radius: 50%;
    text-align: center;
    -webkit-transition: all .3s cubic-bezier(.645,.045,.355,1);
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    margin-left: 5px;
  }
</style>