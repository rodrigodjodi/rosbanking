<template>
    <div class="field">
        <div class="control">
            <input class="input is-large" type="text" :value="valuetxt" inputmode="numeric"
                @keyup="updateValue($event.target.value)">
        </div>
    </div>
</template>

<script>
import numeral from 'numeral'
import numeralpt from 'numeral/locales/pt-br'
numeral.locale('pt-br')
export default {
  props: {
      value: {
          type: Number,
          default: 0
      }
  },
  computed: {
      valuetxt: {
           get () { // converts the value from number to string
               return numeral(this.value/100).format('0,0.00')
           },
           set(val) {
               return val
           }
          },
  },
  methods: {
      updateValue(val) { // $emits the amount up back as a number
        var converted =  val.replace(/([.,a-bA-B]+)/g, '')*1
        var int
        if (isNaN(converted)) {
            int = val.replace(/([^0-9]+)/g, '')*(-1)

        } else {
            int = converted
        }

        this.$emit('input', int)
        },
  }
}
</script>
