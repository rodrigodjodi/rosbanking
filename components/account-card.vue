<template>
    <div class="card" :class="{expanded:isExpanded}" @click="isExpanded = !isExpanded">
        <div class="card-content">
            <span class="icon">
              <i class="fa" :class="icon"></i>
            </span>
            <div class="account-name">{{account.name}}</div>
            <div class="is-pulled-right" :class="classObject">{{balance}}</div>
            <div v-if="isExpanded">
                Botões 
            </div>
        </div>
    </div>
</template>

<script>
import numeral from 'numeral'
import numeralpt from 'numeral/locales/pt-br'
export default {
    props: {
        account: {
            type: Object,
            required: true
        },
    },
    computed:{
        classObject () {
            return this.account.balance >= 0 ? {'positive':true, 'negative':false} : {'positive':false, 'negative':true}
        },
        icon () {
            switch (this.account.type) {
                case 'cash': return {'fa-money':true}
                case 'checking': return {'fa-university':true}
                case 'savings': return {'fa-dollars':true}
                case 'creditcard': return {'fa-credit-card':true}
                default: return 'help'
                    
            }      
        },
        balance () {
            var balance = 'Erro'
            if(!isNaN(this.account.balance)){
                balance = numeral(this.account.balance/100).format('0,0.00')
            }
            return balance
        }
    },
  data () {
      return {
          isExpanded: false
      }
  }
}
</script>

<style>
    .expanded {
        margin-top: 8px;
        margin-bottom: 8px;
    }
    .account-name {
        display: inline-flex;
        margin-left: 16px;
    }
    .positive {
        color:royalblue;
    }
    .negative {
        color:red;
    }
</style>
