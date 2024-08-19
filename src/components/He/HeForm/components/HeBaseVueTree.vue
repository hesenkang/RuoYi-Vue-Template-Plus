<template>
  <section class="container">
    <treeselect 
      :value="value" 
      :defaultExpandLevel="Infinity"
      :options="treeOptions" 
      :normalizer="normalizer" 
      :show-count="true"
      :placeholder="placeholder"
      noOptionsText="暂无数据"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </section>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import request from "@/utils/request"

export default {
  components: {
    Treeselect
  },
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    options: {
      type: Array,
      default: () => []
    },
    // 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
    nodeKey: {
      type: String,
      default: 'id',
    },
    defaultProps: {
      type: Object,
      default: () => ({
        children: 'children',
        label: 'label'
      })
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    // 配置接口
    apiCfg: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      treeOptions: this.options
    }
  },
  watch: {
    // value(val) {
    //   this.$emit("input", val);
    // }
    'apiCfg.config.params'() {
      this.getTreeselect()
    }
  },
  created() {
    this.getTreeselect();
  },
  methods: {
    /** 转换能耗项目分类树数据结构 */
    normalizer(node) {
      if (node.children === '' || node.children === undefined || node.children === null || node.children.length === 0) {
        delete node.children;
      }
      const id = this.nodeKey
      const label = this.defaultProps.label
      const children = this.defaultProps.children
      return {
        id: node[id],
        label: node[label],
        children: node[children]
      };
    },
    /** 查询能耗项目分类树下拉树结构 */
    getTreeselect() {
      if (!this.apiCfg) return
      const { config, handleFixRequestData, handleFixResponseData } = this.apiCfg
      if (!config) return
      let newConfig = { ...config }
      // 修复请求数据
      if (this.$HE.isFunction(handleFixRequestData)) {
        newConfig = handleFixRequestData(newConfig, this)
      }
      request(newConfig).then(res => {
        // 修复返回数据
        if (this.$HE.isFunction(handleFixResponseData)) {
            res = handleFixResponseData(res)
        }
        const { data } = res;
        // const root = data[0];
        // this.treeOptions = [];
        // const treeData = { id: 0, name: '顶级节点', children: [] };
        // treeData.children = this.handleTree(data, "id", "parentId", "children");
        // this.treeOptions.push(treeData);
        if (this.value !== null) {
          this.treeOptions = [{ id: '0', name: '顶级节点', children: data }];
        } else {
          this.treeOptions = data;
        }
        // this.$emit("input", root.devModelId);
      });
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>