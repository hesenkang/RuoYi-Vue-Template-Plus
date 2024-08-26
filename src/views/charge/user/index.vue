<template>
  <BasePage ref="basePage" :layoutView="layoutView" @node-click="nodeClick"></BasePage>
</template>

<script>
import request from "@/utils/request"
import BasePage from '@/components/He/BasePage.vue'
import layoutView from './views/layout.view.js'
import getAsyncTabView from './views/tabs/asyncTab.js'
export default {
  name: 'ChargeUser',
  components: {
    BasePage
  },
  data () {
    return {
      layoutView,
      // 记录节点数据
      nodeData: null
    }
  },
  created() {
    this.asyncInitTabs()
  },
  computed: {
    acIndex() {
      return this.layoutView.activeIndex
    },
    // 标签唯一标识 acIndex:tab.name:tab.label
    tabUUKey() {
      const index = this.acIndex || 0
      const name = this.layoutView.tabs[this.acIndex]?.name || ''
      const label = this.layoutView.tabs[this.acIndex]?.label || ''
      return ':' + index + ':' + name + ':' + label
    },
  },
  methods: {
    nodeClick(data, node, nodeVm) {
      if (this.nodeData && this.nodeData.id === data.id) {
        nodeVm.tree.setCurrentKey(null)
        this.nodeData = null
      } else {
        this.nodeData = data
      }
      let form = {}
      if (node.isCurrent) {
        form = {
          topId: data.type === '1' ? null : data.id,
          roomId: data.type === '0' ? null : data.id
        }
      } else {
        form = {}
      }
      
      this.$eventBus.emit('onNodeClick' + this.tabUUKey, { form, data, node })
    },
    asyncInitTabs() {
      const config = {
        url: '/energy/type/list',
        method: 'get',
        params: {
          pageNum: 1,
          pageSize: 9999,
        }
      }
      request(config).then(res => {
        const { code, rows } = res || {}
        if (code === 200) {
          const tabs = rows
          for (const tabData of tabs) {
            const tabView = getAsyncTabView(tabData)
            this.layoutView.tabs.push({
              name: `tab${this.layoutView.tabs.length + 1}`,
              label: `${tabData.energyName}表信息`,
              tab: tabView,
              extendsData: {
                meterType: tabData.meterType
              }
            })
          }
        }
      })
    }
  }
}
</script>

<style>

</style>