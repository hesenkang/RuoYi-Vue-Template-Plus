<template>
  <article class="container">
    <section class="app">
      <!-- 搜索表单区域 -->
      <el-form ref="form" :model="modal.form" v-bind="{ ...props }">
        <!-- 搜索区域 -->
        <!-- <el-form-item
          v-for="(item, colunmIndex) in formItems"
          :key="colunmIndex + ':' + item.field"
          :label-width="item.label ? props['label-width'] : '0px'"
          :prop="item.field"
          :label="item.label"
          :rules="item._rule">
          <component
            :is="item.type"
            v-model="modal.form[item.field]"
            :modal="modal"
            :options="item.options"
            v-bind="{ ...item.props }">
          </component>
        </el-form-item> -->
        <el-row :gutter="20" v-for="(row, rowIndex) in rowLayouts" :key="`row-${rowIndex}`">
          <el-col :span="item.span" v-for="(item, colIndex) in row" :key="`col-${rowIndex}-${colIndex}`">
            <el-form-item
              :label-width="item.label ? props['label-width'] : '0px'"
              :prop="item.field"
              :label="item.label"
              :rules="item._rule">
              <component
                :is="item.type"
                v-model="modal.form[item.field]"
                :extendsData="extendsData"
                :modal="modal"
                :options="item.options"
                v-bind="{ ...item.props }">
              </component>
            </el-form-item>
            <el-form-item v-if="hasControl && rowIndex === rowLayouts.length - 1">
              <el-button type="primary" @click="submitForm">{{ submitText }}</el-button>
              <el-button type="primary" @click="resetForm">{{ resetText }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 提交按钮 -->
        <!-- <el-form-item v-if="hasControl">
          <el-button type="primary" @click="submitForm">{{ submitText }}</el-button>
          <el-button type="primary" @click="resetForm">{{ resetText }}</el-button>
        </el-form-item> -->
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
    // 业务组件
    HeWorkLinkageVueTree: () => import('./components/HeWorkLinkageVueTree.vue'),
    HeTimePrice: () => import('./components/HeTimePrice.vue'),
    HeJFPGTimePrice: () => import('./components/HeJFPGTimePrice.vue'),
  },
  props: {
    extendsData: {
      type: Object,
      default: null,
    },
    modal: {
      type: Object,
      default: () => ({}),
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
      // form: this.initForm()
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
  watch: {
    'modal.isShow'(val) {
      if (val && this.isApiConfig) {
        this.fetchData(this.apiCfg)
      }
    }
  },
  computed: {
    rowLayouts() {
      const layouts = [];
      let currentRow = [];
      let totalSpan = 0;

      this.formItems.forEach((item) => {
        currentRow.push(item);
        totalSpan += item.span || 24;

        // 如果当前行的总 span 达到或超过 24，则推入 layouts 并重置
        if (totalSpan >= 24) {
          layouts.push(currentRow);
          currentRow = [];
          totalSpan = 0;
        }
      });

      // 处理最后一行，如果有的话
      if (currentRow.length > 0) {
        layouts.push(currentRow);
      }

      return layouts;
    },
    // 计算展示的搜索项视图
    formItems() {
      if (!Array.isArray(this.fields)) return [];
      return this.fields.map(item => computeFormItem(this.vm, item, this.modal.form)).filter(item => item._isShow);
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
      this.$emit('submit', this.modal.form);
    },
    // 重置搜索表单
    resetForm() {
      this.modal.form = this.initForm()
      // this.$set(this.modal, 'form', this.initForm())
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