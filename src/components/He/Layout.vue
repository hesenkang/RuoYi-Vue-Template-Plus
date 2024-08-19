<template>
  <el-container class="layout-container">
    <el-header
      class="layout-header" 
      v-if="layoutView.header && layoutView.header.isShow" 
      v-bind="{ ...layoutView.header.props }"
    >
      <slot name="header" :viewData="layoutView.header.viewData"></slot>
    </el-header>
    <el-container>
      <el-aside 
        class="layout-aside" 
        v-if="asideIsShow" 
        v-bind="{ ...layoutView.aside.props }"
      >
        <slot name="aside" :viewData="layoutView.aside.viewData"></slot>
      </el-aside>
      <article :style="{ width: `calc(100% - ${asideIsShow ? layoutView.aside.props.width : '0px'})`, height: '100%' }">
        <!-- Tab区域 -->
        <el-tabs v-if="tabs.length > 1" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for="item in tabs" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
        </el-tabs>
        <!-- 加载区域 -->
        <template v-for="(item, index) in tabs">
          <section :key="item.name" v-if="states[index].inited" v-show="acIndex === index" style="width: 100%; height: 100%;">
            <el-header v-if="item.tab.mainHeader && item.tab.mainHeader.isShow" v-bind="{ ...item.tab.mainHeader.props }" class="layout-main-header">
              <slot name="main-header" :viewData="item.tab.mainHeader.viewData"></slot>
            </el-header>
            <el-main v-bind="{ ...item.tab.main.props }">
              <slot name="main-body" :viewData="item.tab.main.viewData" :tabIndex="acIndex" :extendsData="item.extendsData"></slot>
            </el-main>
            <el-footer v-if="item.tab.footer && item.tab.footer.isShow" v-bind="{ ...item.tab.footer.props }">
              <slot name="main-footer" :viewData="item.tab.footer.viewData"></slot>
            </el-footer>
          </section>
        </template>
      </article>
    </el-container>
  </el-container>
</template>

<script>
export default {
  props: {
    layoutView: {
      type: Object,
      default () {
        return {
          aside: {
            isShow: false
          },
          header: {
            isShow: false
          },
          footer: {
            isShow: false
          }
        }
      }
    }
  },
  data() {
    return {
      activeName: this.layoutView.tabs[this.layoutView.activeIndex].name || 'tab1',
      acIndex: this.layoutView.activeIndex || 0,
      states: [],
    }
  },
  created() {
    this.initTabsState()
  },
  watch: {
    tabs() {
      this.initTabsState()
    }
  },
  computed: {
    asideIsShow() {
      return this.layoutView.aside && this.layoutView.aside.isShow
    },
    tabs() {
      return this.layoutView.tabs
    }
  },
  methods: {
    handleClick({ index }, event) {
      this.states[index].inited = true
      this.acIndex = Number(index)
      this.layoutView.activeIndex = Number(index)
    },
    initTabsState() {
      this.states = this.layoutView.tabs.map((item, index) => {
				return { inited: false, badge: 0, viewLoading: false, table: null, tabLoading: false, error: null, tableReady: false, scrollTop: 0 }
			})
      this.states[this.acIndex].inited = true
    }
  }
}
</script>

<style scoped>
.layout-container {
  width: 100%;
  height: calc(100vh - 84px);
}
.layout-header {
  padding-top: 20px;
  padding-bottom: 20px;
}
.layout-aside {
  padding: 20px;
}
.layout-main-header {
  padding-top: 20px;
}
</style>