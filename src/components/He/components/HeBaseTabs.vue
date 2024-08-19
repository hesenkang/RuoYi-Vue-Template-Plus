<template>
  <article class="container">
    <el-tabs :value="value" v-bind="$attrs" v-on="$listeners">
      <el-tab-pane
        v-for="item in tabs"
        :key="item.name"
        :label="item.title"
        :name="item.id"
        lazy
      >
        <template v-slot:label>
          <slot :item="item" name="label" ></slot>
        </template>
        <slot :item="item"></slot>
      </el-tab-pane>
    </el-tabs>
  </article>
</template>

<script>
export default {
  props: {
    // 绑定值，选中选项卡的 name
    value: {
      type: String,
      default: ''
    },
    // tabs数据
    tabs: {
      type: Array,
      default: () => [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }]
    }
  },
  data() {
    return {
      editableTabsValue: '2', // 绑定值，选中选项卡的 name
      editableTabs: [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }],
      tabIndex: 1
    }
  },
  methods: {
    
  }
}
</script>

<style>

</style>