<template>
  <Layout :layoutView="layoutView">
    <template v-slot:aside="viewData">
      <HeAside ref="aside" :config="viewData" v-bind="{ ...viewData.props }" @check="onCheck" v-on="$listeners"></HeAside>
    </template>
    <template v-slot:header="viewData">
      <HeHeader ref="header" :config="viewData" v-bind="{ ...viewData.props }" @onSubmit="onSubmit" v-on="$listeners"></HeHeader>
    </template>
    <template v-slot:main-header="viewData">
      <HeHeader ref="mainHeader" :config="viewData" v-bind="{ ...viewData.props }" @onSubmit="onSubmit" v-on="$listeners"></HeHeader>
    </template>
    <template v-slot:main-body="viewData">
      <HeMain ref="mainBody" :config="viewData" v-bind="{ ...viewData.props }" v-on="$listeners"></HeMain>
    </template>
  </Layout>
</template>

<script>
import Layout from '@/components/He/Layout.vue'
import HeAside from '@/components/He/HeAside.vue'
import HeHeader from '@/components/He/HeHeader.vue'
import HeMain from '@/components/He/HeMain.vue'

export default {
  components: {
    HeMain,
    HeHeader,
    HeAside,
    Layout
  },
  props: {
    layoutView: {
      type: Object,
      require: true,
      default: null
    }
  },
  data () {
    return {
      
    }
  },
  computed: {
    // 侧栏视图配置
    // asideViewData () {
    //   return this.layoutView.aside.viewData
    // },
    // // 主体视图配置
    // headerViewData () {
    //   return this.layoutView.header
    // },
    // 主体视图配置
    // mainViewData () {
    //   return this.layoutView.main
    // },
    // tabsViewData () {
    //   return this.layoutView.tabs
    // }
  },
  methods: {
    // 搜索表单提交
    onSubmit(form) {
      console.log(form)
    },
    // 当复选框被点击的时候触发
    onCheck (node, data) {
      console.log(node, data)
    },
  }
}
</script>

<style>

</style>