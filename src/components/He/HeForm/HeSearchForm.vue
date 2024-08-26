<template>
  <article class="container">
    <section class="app">
      <!-- 搜索表单区域 -->
      <el-form ref="form" :model="form" v-bind="{ ...props }">
        <!-- 搜索区域 -->
        <el-form-item
          v-for="(item, colunmIndex) in formItems"
          :key="colunmIndex + ':' + item.field"
          :label-width="item.label ? props['label-width'] : '0px'"
          :prop="item.field"
          :label="item.label"
          :rules="item._rule">
          <component
            :is="item.type"
            v-model="form[item.field]"
            :extendsData="extendsData"
            :options="item.options"
            @change="submitForm"
            v-bind="{ ...item.props }">
          </component>
        </el-form-item>
        <!-- 提交按钮 -->
        <el-form-item v-if="hasControl">
          <el-button type="primary" @click="submitForm">{{ submitText }}</el-button>
          <el-button @click="resetForm">{{ resetText }}</el-button>
        </el-form-item>
      </el-form>
    </section>
  </article>
</template>

<script>
import request from "@/utils/request"
import { computeFormItem } from './hooks/core.js'
export default {
  components: {
    // 基础组件
    HeBaseSelect: () => import('./components/HeBaseSelect.vue'),
    HeBaseRadio: () => import('./components/HeBaseRadio.vue'),
    HeBaseVueTree: () => import('./components/HeBaseVueTree.vue'),
  },
  props: {
    tabUUKey: {
      type: [String],
      default: ''
    },
    extendsData: {
      type: Object,
      default: null,
    },
    // 接口配置
    apiCfg: {
      type: Object,
      default: () => null,
    },
    // 搜索表单字段配置
    fields: {
      type: Array,
      default: () => [],
    },
    // 控制表单按钮显示隐藏
    hasControl: {
      type: Boolean,
      default: true
    },
    // 搜索按钮配置
    submitText: {
      type: String,
      default: '查询'
    },
    // 重置按钮配置
    resetText: {
      type: String,
      default: '重置'
    },
    props: {
      type: Object,
      default: () => ({}),
    }
  },
  data() {
    return {
      vm: this,
      // 搜索表单对象
      form: null
    }
  },
  created() {
    // 如果配置了API
    if (this.isApiConfig) {
      this.fetchData(this.apiCfg)
    }
    this.resetForm()
  },
  mounted() {
    // this.resetForm()
  },
  watch: {},
  computed: {
    // 计算展示的搜索项视图
    formItems() {
      if (!Array.isArray(this.fields)) return [];
      return this.fields.map(item => computeFormItem(this.vm, item, this.form)).filter(item => item._isShow);
    },
    isApiConfig() {
      const { config } = this.apiCfg || {}
      if (this.$HE.isObject(config) && config.url) {
        return true
      }
      return false
    },
  },
  methods: {
    // 前置加载远程数据
    fetchData(apiCfg) {
      const { config, handleFixRequestData, handleFixResponseData } = apiCfg
      let newConfig = { ...config }
      // 修复请求数据
      if (this.$HE.isFunction(handleFixRequestData)) {
          newConfig = handleFixRequestData(newConfig)
      }
      request(newConfig).then(res => {
          // 修复返回数据
          if (this.$HE.isFunction(handleFixResponseData)) {
              res = handleFixResponseData(res, this.vm)
          }
          const { code, rows } = res || {}
          if (code === 200) {}
      })
    },
    validate() {
      return this.$refs['form'].validate()
    },
    // 提交搜索表单
    submitForm() {
      let form = {}
      for (const key in this.form) {
        const value = this.form[key]
        if (value) {
          form[key] = value
        }
      }
      this.search(form)
      this.$emit('submit', form);
    },
    // 重置搜索表单
    resetForm() {
      this.form = this.initForm()
      this.search()
    },
    // 搜索
    search(form = {}) {
      this.$eventBus.emit('onSearchButtonClick' + this.tabUUKey, form)
    },
    // 初始化搜索表单
    initForm() {
      const form = {};
      for (const item of this.formItems) {
        form[item.field] = item.defaultValue;
      }
      return form
    },
  }
}
</script>

<style scoped>
.container, .app {
  width: 100%;
  height: 100%;
}
</style>