<!-- 业务组件-动态新增时段价格 -->
<template>
  <section class="container">
    <el-row v-for="(item, index) in value" :key="index" :gutter="10" class="time_price_row">
      <el-form-item :label="`时段${index + 1}`" label-width="65px">
        <el-col :span="10">
          <el-form-item
            label="时间"
            label-width="60px"
            :prop="`timePriceList.${index}.startEndTime`"
            :rules="startEndTimeRule">
            <el-time-picker
              style="width: 240px;"
              is-range
              v-model="item.startEndTime"
              format="HH:mm:ss"
              value-format="HH:mm:ss"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围">
            </el-time-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="单价"
            label-width="60px"
            :prop="`timePriceList.${index}.price`"
            :rules="priceRules">
            <el-input-number v-model.trim.number="item.price" :precision="2" :step="0.1" style="width: 160px;"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button v-if="value.length > 1" @click="removeItem(index)">删除</el-button>
            <el-button v-if="index === 0" @click="addItem">新增</el-button>
          </el-form-item>
        </el-col>
      </el-form-item>
    </el-row>
  </section>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    // 时间段校验规则
    startEndTimeRule: {
      type: Array,
      default: () =>
      [
        { 
          required: true,
          validator: (rule, value, callback) => {
            if (!value || !Array.isArray(value) || value.length !== 2) {
              callback(new Error('请选择时间范围'));
            } else {
              callback();
            }
          },
          trigger: ['change', 'blur']
        },
        {
          required: true,
          validator: (rule, value, callback) => {
            if (value[0] && value[1] && value[0] >= value[1]) {
              callback(new Error('结束时间必须晚于开始时间'));
            } else {
              callback();
            }
          },
          trigger: ['change', 'blur']
        }
      ]
    },
    // 单价校验规则
    priceRules: {
      type: Array,
      default: () => 
      [
        {
          required: true,
          message: '请输入价格',
          trigger: 'blur'
        }
      ]
    }
  },
  methods: {
    // 新增时段
    addItem() {
      const newItems = [
        ...this.value, 
        { 
          name: `时段`, 
          code: 'Date', 
          startEndTime: null, 
          price: '' 
        }
      ];
      newItems.forEach((item, index) => item.name = `时段${index + 1}`);
      this.$emit('input', newItems);
    },
    // 删除时段
    removeItem(index) {
      const newValue = [...this.value];
      newValue.splice(index, 1);
      newValue.forEach((item, index) => item.name = `时段${index + 1}`);
      this.$emit('input', newValue);
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-height: 300px;
  overflow: auto;
  padding: 20px 20px 30px 20px;
  box-shadow: inset 0 2px 12px 0 rgba(0, 0, 0, .1);
}
.time_price_row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>