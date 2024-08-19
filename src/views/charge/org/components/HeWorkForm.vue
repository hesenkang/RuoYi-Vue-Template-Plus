<template>
  <section class="container">
    <el-card class="box-card">
      <HeBaseForm ref="baseForm" v-if="modal" v-bind="{ modal, ...modal.formCfg }" @submit="submitEditForm"></HeBaseForm>
    </el-card>
  </section>
</template>

<script>
import request from "@/utils/request"
import HeBaseForm from '@/components/He/HeForm/HeBaseForm.vue'
export default {
  components: {
    HeBaseForm,
  },
  props: {
    // 按钮配置
    buttonsCfg: {
      type: Object,
      default: null,
    },
    // detailApiCfg: {
    //   type: Object,
    //   default: () => ({}),
    // },
    // modal: {
    //   type: Object,
    //   default: () => ({}),
    // },
    // props: {
    //   type: Object,
    //   default: () => ({}),
    // }
  },
  data() {
    return {
      // 分类ID
      classId: null,
      // 节点数据
      nodeData: null,
      // modal: null
    }
  },
  computed: {
    // 按钮集合
    buttonItems() {
        const buttons = this.buttonsCfg?.data || null
        if (!Array.isArray(buttons)) return []
        return buttons
    },
    button() {
      return this.buttonItems.find(item => this.nodeData ? item.type === 'Edit' : item.type === 'Add')
    },
    modal() {
      return this.button.modal
    }
  },
  mounted() {
    // 监听事件-初始化和切换Tab之前 携带classId
    this.$eventBus.on('initClassId', (classId) => {
      this.classId = classId
      this.modal.formCfg.fields.forEach(item => {
        if (item.field === 'parentId') {
          item.props.apiCfg.config.params = { classId }
        }
      })
      this.$refs.baseForm.resetForm()
    }, this)
    // 监听事件-节点被点击
    this.$eventBus.on('onNodeClick', ({ item = null, classId }) => {
      this.nodeData = item || null
      // this.classId = classId
      if (item) {
        this.handleEdit(this.button, { row: { id: item.id } })
      } else {
        this.$refs.baseForm.resetForm()
      }
    }, this)
  },
  methods: {
    // 编辑功能
    handleEdit(button, { row }) {
      const { detailApiCfg, apiCfg, modal } = button 
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
                modal.form = data
            }
        })
    },
    submitEditForm(form) {
      this.$refs.baseForm.validate().then(valid => {
        if (valid) {
          const { type, apiCfg, modal } = this.button
          const { config, handleFixRequestData, handleFixResponseData } = apiCfg
          let newConfig = { ...config }
          let newForm = { ...form }
          // 如果当前是新增节点就带上classId 否则就是修改
          if (this.nodeData === null) {
            newForm.classId = this.classId
          }
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
                  this.$eventBus.emit('refresh')
              }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .box-card {
    color: #606266;
  }
</style>