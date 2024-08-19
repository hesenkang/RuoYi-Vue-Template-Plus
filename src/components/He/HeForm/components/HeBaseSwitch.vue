<template>
  <article class="container">
    <section class="app">
      <el-switch
        :value="value"
        :active-color="activeColor"
        :inactive-color="inactiveColor"
        :active-value="activeValue"
        :inactive-value="inactiveValue"
        :disabled="isDisabled"
        v-bind="$attrs"
        @change="change">
      </el-switch>
    </section>
  </article>
</template>

<script>
import request from "@/utils/request"
export default {
  props: {
    value: {
      type: [Number, String],
      default: '0'
    },
    data: {
      type: Object,
      default: null
    },
    apiCfg: {
      type: Object,
      default: null
    },
    activeColor: {
      type: String,
      default: '#13ce66'
    },
    inactiveColor: {
      type: String,
      default: '#ff4949'
    },
    activeValue: {
      type: [Number, String],
      default: '1'
    },
    inactiveValue: {
      type: [Number, String],
      default: '0'
    },
  },
  data() {
    return {
      isDisabled: false
    }
  },
  methods: {
    change(val) {
      const { config, handleFixRequestData, handleFixResponseData } = this.apiCfg || {}
      if (!config) return
      let newConfig = { ...config }
      if (this.$HE.isFunction(handleFixRequestData)) {
        newConfig = handleFixRequestData(newConfig, this.data, this)
      }
      this.isDisabled = true
      request(newConfig)
      .then(res => {
        if (this.$HE.isFunction(handleFixResponseData)) {
          res = handleFixResponseData(res, this.data, this)
        }
        const { code, data } = res
        if (code === 200) {
          this.$message({ type: 'success', message: `操作成功` })
          this.$emit('input', val)
        }
      })
      .finally(() => {
        this.isDisabled = false
      })
    }
  }
}
</script>

<style>

</style>