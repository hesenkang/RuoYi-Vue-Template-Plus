export default {
  // 默认输入类型
  input: {
    // 对应到 Element 组件的 tag
    component: 'el-input',
    // 组件默认值
    defaultValue: '',
    // 传递给 Element 组件的默认 props
    props: {
      placeholder: '请输入',
      clearable: true,
      style: {
        width: '220px'
      }
    }
  },
  // 数字输入框
  inputNumber: {
    component: 'el-input-number',
    defaultValue: 0,
    props: {
      clearable: true,
      style: {
        width: '220px'
      }
    }
  },
  // 多行文本框
  textarea: {
    component: 'el-input',
    defaultValue: '',
    props: {
      placeholder: '请输入',
      type: 'textarea',
      rows: 3,
      style: {
        width: '440px'
      }
    }
  },
  select: {
    component: 'HeBaseSelect',
    defaultValue: () => [],
    props: {
      clearable: true,
      multiple: true,
      filterable: true,
      style: {
        width: '220px'
      }
    }
  },
  // 单选框
  radio: {
    component: 'HeBaseRadio',
    defaultValue: '',
    props: {

    }
  },
  // 多选框
  checkbox: {
    component: 'el-checkbox',
    defaultValue: () => [],
    props: {
      clearable: true
    }
  }
  // 日期

  // 时间

  // 日期时间
}