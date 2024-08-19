<template>
  <section class="container">
    <HeBaseModal
        :isShow.sync="visible"
        v-bind="$attrs"
        @handleOk="handleOk"
        v-on="$listeners"
    >
        <template v-slot="{ extendsData, modal, formCfg}">
            <HeBaseForm ref="baseForm" v-bind="{ extendsData, modal, ...formCfg }" @submit="submit"></HeBaseForm>
        </template>
    </HeBaseModal>
  </section>
</template>

<script>
import HeModalMixin from './mixins/HeModal.js';
import HeBaseModal from './HeBaseModal.vue'
import HeBaseForm from '../HeForm/HeBaseForm.vue'
export default {
  mixins: [HeModalMixin],
  components: {
    HeBaseModal,
    HeBaseForm,
  },
  props: {

  },
  methods: {
    handleOk(modal) {
      this.$refs.baseForm.validate().then(valid => {
        if (valid) {
          this.$emit('submit', modal);
        }
      })
    },
    submit() {
      this.$emit('submit', this.$attrs.modal)
    }
  }
}
</script>

<style scoped>

</style>