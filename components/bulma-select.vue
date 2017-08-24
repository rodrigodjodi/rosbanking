<template>
  <div class="field">
        <div class="control">
            <div class="select">
                <select v-model="selected">
                    <option disabled value="">{{placeholder}}</option>
                    <slot></slot>
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
            type: String
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
