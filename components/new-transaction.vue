<template>
<div>
  <bulmaselect v-model="doc.account" :options="accounts" :isDisabled="lockAccount"></bulmaselect>
  <input-money v-model="doc.amount"/>
  <vue-google-autocomplete
    v-model="doc.who"
    id="map"
    classname="input"
    placeholder="Quem / Onde..."
    :enable-geolocation="true"
  />
  <div class="field">
    <div class="control">
      <input type="text" v-model="doc.description" class="input" placeholder="Descrição...">
    </div>
  </div>
  <inputdate v-model="doc.when"/>
  <inputdate v-model="doc.due"/>


</div>
</template>

<script>
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});
import inputmoney from '~/components/input-money'
import inputdate from '~/components/input-date'
import bulmaselect from '~/components/bulma-select'
import numeral from 'numeral'
import numeralpt from 'numeral/locales/pt-br'
numeral.locale('pt-br')
import VueGoogleAutocomplete from '~/components/vuegoogleautocomplete'
export default {
  props: {
    accounts: {
      type: Array,
      required:true
    }
  },
  components: {'input-money': inputmoney,
               VueGoogleAutocomplete, inputdate, bulmaselect
  },
  data () {
    return {
      doc: {
            amount: 0,
            who: '',
            account: this.$route.params.id || '',
            due: '',
            when: new Date().toDateInputValue(),
            description:''
        },
        lockAccount: this.$route.params.id ? true : false
    }
  }
}
</script>
