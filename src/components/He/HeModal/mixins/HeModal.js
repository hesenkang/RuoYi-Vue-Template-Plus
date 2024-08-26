export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      visible: this.isShow
    }
  },
  watch: {
    isShow(newVal) {
      // 优化：单向数据流更新visible，减少性能开销
      if (newVal !== this.visible) {
        this.visible = newVal;
      }

      if (newVal === false) {
        this.$refs.baseForm && this.$refs.baseForm.resetForm();
      }

      this.$refs.baseForm && this.$refs.baseForm.clearValidate();
    }
  },
  computed: {

  },
  methods: {
    handleOk() {
      this.$emit('handleOk', this.modal);
    },
    handleCancel() {
      // 同步更新isShow的值并关闭对话框
      this.$emit('update:isShow', false);
      this.$emit('handleCancel');
    },
    handleClose() {
      // 同步更新isShow的值并关闭对话框
      this.$emit('update:isShow', false);
      this.$emit('handleClose');
    }
  }
}