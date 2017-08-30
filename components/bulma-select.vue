<template>
  <div class="field">
        <div class="control">
            <div class="select">
                <select v-model="selected" :disabled="isDisabled">
                    <option disabled value="">{{placeholder}}</option>
                    <option v-for="option in options" :key="option._id" :value="option._id">{{option.name}}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'bulmaselect',
  props: {
        placeholder: {
            type: String,
            default: 'Selecione...'
        },
        value: {
            type: String,
            required: true
        },
        options: {
          type: Array,
          required: true
        },
        isDisabled: {
          type: Boolean,
          default: false
        }
    },
    computed: {
        selected: {
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
