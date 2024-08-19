<template>
  <article class="container">
    <section class="app">
      <el-radio-group :value="value" v-bind="$attrs" @input="$emit('input', $event)">
        <el-radio
          v-for="item in options"
          :key="item.value"
          :label="item.value">
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </section>
  </article>
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String],
      default: '1'
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    }
  },
}
</script>

<style>

</style>