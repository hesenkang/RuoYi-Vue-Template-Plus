<template>
  <BasePage :layoutView="layoutView"></BasePage>
</template>

<script>
import BasePage from '@/components/He/BasePage.vue'
import layoutView from './views/layout.view.js'
export default {
  name: 'ChargeProject',
  components: {
    BasePage
  },
  data () {
    return {
      layoutView,
    }
  },
  computed: {
 
  },
  methods: {
    
  }
}
</script>

<style>

</style>