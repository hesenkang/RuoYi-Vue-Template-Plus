<template>
  <div class="side-tree-container">
    <!-- 树 -->
    <HeSearchTree
      ref="searchTree"
      :data="treeData"
      :checkStrictly="!strictly"
      v-bind="{ ...$attrs, ...props }"
      v-on="$listeners"
    >
      <template v-slot:search-options>
        <slot name="search-options-top"></slot>
        <el-checkbox v-model="expand" @change="handleCheckedTreeExpand">展开 / 折叠</el-checkbox>
        <el-checkbox v-if="props.showCheckbox" v-model="nodeAll" @change="handleCheckedTreeNodeAll">全选 / 清空</el-checkbox>
        <el-checkbox v-if="props.showCheckbox" v-model="strictly">级联</el-checkbox>
        <slot name="search-options-bottom"></slot>
      </template>
    </HeSearchTree>
  </div>
</template>

<script>
import request from "@/utils/request"
import HeSearchTree from '@/components/He/HeTree/HeSearchTree.vue'

// 替换数据默认的
const copyDefaultPropsValue = (data, defaultProps) => {
  const { children, label } = defaultProps
  for (const item of data) {
    item.name = item[label]
    item.label = item[label]
    if (item[children]) {
      item.children = item[children]
      copyDefaultPropsValue(item[children], defaultProps)
    }
  }
  return data
}

export default {
  components: {
    HeSearchTree
  },
  props: {
    apiCfg: {
      type: Object,
      default: () => ({})
    },
    data: {
      type: [Array, Function],
      default: () => ([])
    },
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      vm: this,
      // 过滤文本
      filterText: '',
      // 辅助配置
      expand: true,
      nodeAll: false,
      strictly: true,
      // 组织树数据
      treeData: [],
    }
  },
  created () {
    // this.getTree()
    this.onEventBus()
    this.initTree()
  },
  watch: {

  },
  computed: {
    baseTree () {
      return this.getSearchTree().getBaseTree()
    },
    defaultProps () {
      return this.props?.defaultProps || null
    }
  },
  methods: {
    /**
     * 监听事件总线的方法
     * 此方法用于接收和处理从事件总线发送过来的事件
     * 在这里可以进行事件的响应和处理，例如更新数据或触发其他逻辑
     */
      onEventBus() {
        // 监听事件-节点被点击
        this.$eventBus.on('onSearchTree', () => {
            this.initTree()
        }, this)
    },
    // 展开 / 折叠
    handleCheckedTreeExpand (value) {
      const nodesMap = this.baseTree.store.nodesMap
      for (const node in nodesMap) {
        nodesMap[node].expanded = value
      }
    },
    // 全选 / 全不选
    handleCheckedTreeNodeAll (value) {
      const treeRef = this.baseTree
      if (!treeRef) return
      treeRef.setCurrentKey(null);
      treeRef.setCheckedNodes(value ? this.treeData : [])
      this.$emit('handleCheckedTreeNodeAll', treeRef.getCheckedKeys())
    },
    // 获取搜索树 ref
    getSearchTree () {
      return this.$refs.searchTree
    },
    // 获取原始树
    getBaseTree () {
      return this.$refs.searchTree.getBaseTree()
    },
    // 初始化当前树
    initTree () {
      const { config } = this.apiCfg || {}
      // 如果有配置接口-接口优先
      if (config && config.url) {
        this.getTree(this.apiCfg)
        return
      }
      // 如果有配置data数据
      if (this.data) {
        this.getTree(this.data)
        return
      }
    },
    // 从接口获取组织树数据
    async getTree (any) {
      if (typeof any === 'object') {
        const apiCfg = any
        let newConfig = apiCfg.config

        // 如果存在辅助修复接口请求数据函数
        const handleFixRequestData = apiCfg.handleFixRequestData
        if (handleFixRequestData && this.$HE.isFunction(handleFixRequestData)) {
            newConfig = handleFixRequestData(newConfig, this.vm)
        }

        const data = await request(newConfig)

        let fixData = data

        // 如果这个时候值还是一个对象取出第一个数组作为树结构数据
        if (fixData && this.$HE.isObject(fixData)) {
          for (const iterator in fixData) {
            if (Array.isArray(fixData[iterator])) {
              fixData = fixData[iterator]
              break
            }
          }
        }

        // 如果最终值为一个对象 或 不是一个数组 那么给一个空数组
        if (fixData && this.$HE.isObject(fixData) || !Array.isArray(fixData)) {
          throw new Error('getTree: 数据解析失败', fixData)
        }

        // 如果配置了el-tree组件的defaultProps会复制该配置的属性到每条数据上
        if (this.defaultProps) {
          fixData = copyDefaultPropsValue(fixData, this.defaultProps)
        }

        // 如果配置了辅助数据修复函数
        const handleFixResponseData = apiCfg.handleFixResponseData
        if (handleFixResponseData && this.$HE.isFunction(handleFixResponseData)) {
          fixData = handleFixResponseData(fixData)
        }
        
        this.treeData = fixData 
      } else if (typeof any === 'function') {
        const getTreeFnc = any
        const { data } = await getTreeFnc()
        this.treeData = data
      } else if (Array.isArray(any)) {
        this.treeData = any
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.side-tree-container {
  width: 100%;
  height: 100%;
}
</style>