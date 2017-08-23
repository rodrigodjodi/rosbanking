<template>
  <div class="field">
        <div class="control">
            <div class="select">
                <select @input.prevent="$emit('input', $event.target.value)">
                    <option value="">{{placeholder}}</option>
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
    }
}
</script>
