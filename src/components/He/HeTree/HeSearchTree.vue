<template>
  <div class="search">
    <!-- 搜索 -->
    <div class="search-input">
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
    </div>
    <!-- 辅助选择 -->
    <div class="search-options">
      <slot name="search-options"></slot>
    </div>
    <!-- 树 -->
    <div class="search-tree">
      <HeBaseTree
        ref="baseTree"
        :filter-node-method="filterNode"
        v-bind="$attrs"
        v-on="$listeners"
      >
      </HeBaseTree>
    </div>
  </div>
</template>

<script>
import HeBaseTree from '@/components/He/HeTree/HeBaseTree.vue'
export default {
  components: {
    HeBaseTree
  },
  props: {

  },
  data () {
    return {
      // 过滤文本
      filterText: '',
    }
  },
  watch: {
    filterText (val) {
      this.getBaseTree().filter(val)
    }
  },
  computed: {
    // 获取树数据
    treeData () {
      return this.$attrs.data
    },
  },
  methods: {
    // 过滤节点
    filterNode (value, data) {
      if (!value) return true;
      return data?.name.indexOf(value) !== -1
    },
    // 获取原始树ref
    getBaseTree () {
      return this.$refs.baseTree.getTree()
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  height: 100%;
  .search-input {
    margin-bottom: 10px;
  }
  .search-options {
    margin-bottom: 10px;
  }
  .search-tree {
    overflow: auto;
    height: calc(100% - 96px);
  }
}
</style>