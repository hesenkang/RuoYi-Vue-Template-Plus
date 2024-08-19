<!-- 业务组件-联动树 -->
<template>
  <section class="container">
    <HeBaseVueTreeVue :value="value" v-bind="$attrs" @select="select"></HeBaseVueTreeVue>
  </section>
</template>

<script>
import request from "@/utils/request"
import HeBaseVueTreeVue from './HeBaseVueTree.vue'

export default {
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    modal: {
      type: Object,
      default: () => ({}),
    },
    // 指定联动修改Form的key值
    linkageFormKey: {
      type: String,
      default: ''
    },
    // 指定联动需要的数据支持配置
    linkageApiCfg: {
      type: Object,
      default: null
    }
  },
  components: {
    HeBaseVueTreeVue
  },
  methods: {
    select({ devModelId }, instanceId) {
      // const linkageFormKeyValue = this.modal.form[this.linkageFormKey];
      // this.modal.form[this.linkageFormKey] = devModelId
      // this.$emit("input", devModelId);

      if (!this.linkageApiCfg) return
      const { config } = this.linkageApiCfg
      if (!config) return
      if (config.method === 'get') {
        config.params['deviceModelId'] = devModelId
      } else {
        config.data['deviceModelId'] = devModelId
      }
      request(config).then(data => {
        console.log(data)
      });
    }
  }
}
</script>

<style>

</style>