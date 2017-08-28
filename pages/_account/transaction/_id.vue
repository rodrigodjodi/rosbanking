<template>
    <div>
        <p class="title is-4">{{editing ? 'Editar transação' : 'Nova transação'}}</p>
            <div class="section">
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
        <div>Conta: {{ $route.params.account }}</div>
        <div>transacao: {{ $route.params.id }}</div>
    </div>
</template>

<script>
import inputmoney from '~/components/input-money'
import numeral from 'numeral'
import numeralpt from 'numeral/locales/pt-br'
numeral.locale('pt-br')
import VueGoogleAutocomplete from '~/components/vuegoogleautocomplete'
export default {
    components: {
        'input-money': inputmoney,
        VueGoogleAutocomplete
    },
  data () {
    return {
        doc: {
            amount: 0,
            who: ''
        },
    }

  },
  computed: {
      editing () {
          return this.$route.params.id ? true : false
      },
     
  },
  created () {
      if (this.$route.params.id) {
          //get the doc
      }
  },
  methods: {
      setPlaceData (apidata, place) {
          console.log(place.name)
          console.log(this)
          this.doc.who = place.name
      }
  }
} 
</script>
