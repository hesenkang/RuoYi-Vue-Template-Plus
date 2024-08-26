<template>
  <div class="container">
    <div class="app">
      <component v-if="asyncComponent" :is="asyncComponent" :extendsData="extendsData" :tabUUKey="tabUUKey" v-bind="{ ...viewData.componentCfg }" v-on="$listeners"></component>
    </div>
  </div>
</template>

<script>

const HeCompleteTable = () => import('@/components/He/HeTable/HeCompleteTable.vue')

export default {
  props: {
    config: {
      type: Object,
      require: true,
      default: () => ({})
    },
  },
  data() {
    return {

    }
  },
  computed: {
    asyncComponent() {
      return this.viewData?.asyncComponent || HeCompleteTable
    },
    viewData() {
      return this.config?.viewData
    },
    extendsData() {
      return this.config?.extendsData
    },
    tabUUKey() {
      return this.config?.tabUUKey
    }
  },
}
</script>

<style scoped>
  .container, .app {
    width: 100%;
    height: 100%;
  }
</style>