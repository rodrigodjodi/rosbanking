<template>
<div>
  <input-money v-model="doc.amount"/>
    <p class="control">
      <vue-google-autocomplete
        v-model="doc.who"
        id="map"
        classname="input"
        placeholder="Quem / Onde..."
        :enable-geolocation="true"
      >
      </vue-google-autocomplete>
    </p>
</div>
</template>

<script>
import inputmoney from '~/components/input-money'
import numeral from 'numeral'
import numeralpt from 'numeral/locales/pt-br'
numeral.locale('pt-br')
import VueGoogleAutocomplete from '~/components/vuegoogleautocomplete'
export default {
  components: {'input-money': inputmoney,
               VueGoogleAutocomplete
  },
  data () {
    return {
      doc: {
            amount: 0,
            who: '',
            account: '',
            due: '',
            when:''
        },
    }
  }
}
</script>
