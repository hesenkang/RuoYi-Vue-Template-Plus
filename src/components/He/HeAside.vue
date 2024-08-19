<template>
  <div class="container">
    <div class="app">
      <component v-if="asyncComponent" :is="asyncComponent" v-bind="{ ...viewData.componentCfg }" v-on="$listeners"></component>
    </div>
  </div>
</template>

<script>

const HeAsideTree = () => import('@/components/He/HeTree/HeAsideTree.vue')

export default {
  props: {
    config: {
      type: Object,
      require: true,
      default: () => ({})
    }
  },
  data() {
    return {

    }
  },
  computed: {
    asyncComponent() {
      return this.viewData?.asyncComponent || HeAsideTree
    },
    viewData() {
      return this.config?.viewData
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