<template>
  <section class="container">
    <el-tree 
        ref="tree" 
        :node-key="nodeKey" 
        :props="defaultProps" 
        :data="data" 
        :show-checkbox="showCheckbox"
        :check-strictly="checkStrictly"
        :default-checked-keys="defaultCheckedKeys" 
        :default-expand-all="defaultExpandAll"
        :expand-on-click-node="expandOnClickNode"
        highlight-current 
        v-bind="$attrs"
        v-on="$listeners">
        <template v-slot="{ node, data }">
          <slot :node="node" :data="data">
            <span>{{ node.label }}</span>
          </slot>
        </template>
    </el-tree>
  </section>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'HeBaseTree',
  props: {
    // 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
    nodeKey: {
      type: String,
      default: 'id',
    },
    // 配置选项，具体看下表
    // label	指定节点标签为节点对象的某个属性值	string, function(data, node)
    // children	指定子树为节点对象的某个属性值	string
    // disabled	指定节点选择框是否禁用为节点对象的某个属性值	boolean, function(data, node)
    // isLeaf	指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效	boolean, function(data, node)
    defaultProps: {
      type: Object,
      default: () => ({
        children: 'children',
        label: 'label'
      })
    },
    // 展示数据
    data: {
      type: Array,
      default: () => []
    },
    // 节点是否可被选择
    showCheckbox: {
      type: Boolean,
      default: true
    },
    // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
    checkStrictly: {
      type: Boolean,
      default: false
    },
    // 默认勾选的节点的 key 的数组
    defaultCheckedKeys: {
      type: Array,
      default: () => []
    },
    // 是否默认展开所有节点
    defaultExpandAll: {
      type: Boolean,
      default: true
    },
    // 
    expandOnClickNode: {
      type: Boolean,
      default: false
    }
  },
  created() {},
  wathch: {},
  methods: {
    // 获取原始树
    getTree () {
      return this.$refs.tree
    },
  },

}
</script>

<style scoped>
  .container {
    width: 100%;
    height: 100%
  }
</style>