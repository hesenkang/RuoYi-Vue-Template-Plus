<template>
  <section class="container">
    <el-dialog custom-class="dialog" :title="title" :visible.sync="visible" append-to-body v-bind="{ ...props}" @close="handleClose">
      <slot :extendsData="extendsData" :modal="modal" :formCfg="formCfg"></slot>
      <div slot="footer" class="dialog-footer" v-if="hasControl">
        <el-button @click="handleOk">{{ submitText }}</el-button>
        <el-button type="primary" @click="handleCancel">{{ closeText }}</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import HeModalMixin from './mixins/HeModal.js';

export default {
  mixins: [HeModalMixin],
  props: {
    extendsData: {
      type: Object,
      default: null
    },
    modal: {
      type: Object,
      default: () => ({}),
    },
    title: {
      type: String,
      default: ''
    },
    hasControl: {
      type: Boolean,
      default: true
    },
    submitText: {
      type: String,
      default: '确 定'
    },
    closeText: {
      type: String,
      default: '取 消'
    },
    formCfg: {
      type: Object,
      default: () => ({})
    },
    props: {
      type: Object,
      default: () => ({})
    }
  },
}
</script>

<style scoped>
  .dialog {
    min-width: 600px;
  }
</style>