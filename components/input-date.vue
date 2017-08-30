<template>
  <div class="field">
    <div class="control">
      <input type="date" v-model="dateTxt" class="input">
    </div>
  </div>
</template>

<script>

export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    dateTxt: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
