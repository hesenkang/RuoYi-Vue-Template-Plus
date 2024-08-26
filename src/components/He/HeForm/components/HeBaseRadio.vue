<template>
  <article class="container">
    <section class="app">
      <el-radio-group :value="value" v-bind="$attrs" @input="$emit('input', $event)">
        <el-radio
          v-for="item in myOptions"
          :key="item.value"
          :label="item.value">
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </section>
  </article>
</template>

<script>
import request from "@/utils/request"
export default {
  props: {
    value: {
      type: [Number, String],
      default: '1'
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
  methods: {
    // 远程获取数据
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

<style>

</style>