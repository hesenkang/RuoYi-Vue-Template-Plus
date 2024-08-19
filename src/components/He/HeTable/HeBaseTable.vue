<template>
  <section class="container">
      <el-table 
        ref="table" 
        :height="$attrs.height ? $attrs.height : '60vh'" 
        v-show="showColumnViews.length > 0" 
        :data="tableData" 
        :border="true"
        tooltip-effect="light" 
        v-bind="$attrs"
        v-on="$listeners"
      >
          <template v-for="(item, colunmIndex) in showColumnViews">
              <el-table-column 
                  v-if="checkable && selectionIndex === colunmIndex" 
                  prop="_selection" 
                  type="selection" 
                  :key="colunmIndex" 
                  :width="selectionWidth"
                  :fixed="item.fixed">
              </el-table-column>
              <el-table-column
                  v-if="item.components || item.isOperate"
                  :key="colunmIndex + ':' + item.field + ':' + item.components"
                  :prop="item.field"
                  :type="item.type"
                  :label="item.label"
                  :align="item.isOperate ? 'center' : item.align"
                  :width="item.width"
                  :fixed="item.fixed">
                  <template slot-scope="scope">
                      <slot :item="item" :colunmIndex="colunmIndex" :data="scope"></slot>
                  </template>
              </el-table-column>
              <el-table-column 
                  v-else
                  :key="colunmIndex + ':' + item.field"
                  :prop="item.field"
                  :type="item.isOperate ? '' : 'default'"
                  :label="item.label"
                  :sortable="item.sortable ? 'custom' : false"
                  :align="item.isOperate ? 'center' : item.align"
                  :width="item.width"
                  :fixed="item.fixed">
              </el-table-column>
          </template>
      </el-table>
  </section>
</template>

<script>
  export default {
      props: {
          // 表格列配置
          columns: {
              type: Array,
              default: () => [],
          },
          // 表格列表数据
          tableData: {
              type: Array,
              default: () => [],
          },
          // 是否可多选
          checkable: {
              type: Boolean,
              default: false
          },
          // 选区列的宽度
          selectionWidth: {
              type: Number,
              default: 40
          },
          // 选区的摆放位置
          selectionIndex: {
              type: Number,
              default: 0
          },
      },
      data: () => ({
          
      }),
      computed: {
          // 计算展示的列视图
          showColumnViews() {
              return this.columns;
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