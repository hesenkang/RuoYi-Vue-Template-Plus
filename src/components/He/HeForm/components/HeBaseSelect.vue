<template>
  <article class="container">
    <section class="app">
      <el-select
        style="width: 100%;"
        :value="value"
        v-bind="$attrs"
        @change="$emit('input', $event)">
      <el-option
        v-for="item in myOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    </section>
  </article>
</template>

<script>
import request from "@/utils/request"
export default {
  props: {
    value: {
      type: [Array, String, Number, Boolean],
      default: () => []
    },
    extendsData: {
      type: Object,
      default: null,
    },
    modal: {
      type: Object,
      default: () => ({}),
    },
    options: {
      type: [Array, Object],
      default: () => []
    }
  },
  data() {
    return {
      myOptions: Array.isArray(this.options) ? this.options : []
    }
  },
  created() {
    if (typeof this.options === 'object' && !this.options.listenKey) {
      this.getOptions()
    }
  },
  watch: {
    listenValue(val) {
      if (this.modal.isShow && val) {
        this.getOptions()
      }
    },
  },
  computed: {
    // 监听Key
    listenKey() {
      return this.options.listenKey
    },
    // 监听Value
    listenValue() {
      return this.modal.form[this.listenKey]
    },
  },
  methods: {
    // 远程获取下拉框数据
    getOptions() {
      const { config, handleFixRequestData, handleFixResponseData } = this.options
      if (!config) return
      let newConfig = { ...config }
      // 修复请求数据
      if (this.$HE.isFunction(handleFixRequestData)) {
        newConfig = handleFixRequestData(newConfig, this.modal.form, this)
      }
      request(newConfig).then(res => {
        // 修复返回数据
        if (this.$HE.isFunction(handleFixResponseData)) {
          res = handleFixResponseData(res, this.modal.form)
        }
        const { data } = res
        this.myOptions = data
      })
    }
  }
}
</script>

<style scoped>
  .container {
    width: 100%;
    height: 100%;
  }
</style>