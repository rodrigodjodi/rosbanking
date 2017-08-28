<template>
    <div class="card" :class="{expanded:isExpanded}">
        <div class="card-content" @click="isExpanded = !isExpanded">
            <span class="icon" :style="{color: accountcolor}">
              <i class="fa" :class="icon"></i>
            </span>
            <div class="account-name">{{account.name}}</div>
            <div class="is-pulled-right" :class="balanceColor">{{balance}}</div>
        </div>
        <footer v-show="isExpanded" class="card-footer">
                <div class="card-footer-item">
                    <nuxt-link :to="account._id+'/transaction'">Transação</nuxt-link>
                </div>
                <div class="card-footer-item">
                    <nuxt-link :to="account._id">Extrato</nuxt-link>
                </div>
                
        </footer>
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
        balanceColor () {
            return this.account.balance >= 0 ? {'positive':true, 'negative':false} : {'positive':false, 'negative':true}
        },
        icon () {
            switch (this.account.type) {
                case 'cash': return {'fa-money':true}
                case 'checking': return {'fa-university':true}
                case 'savings': return {'fa-dollars':true}
                case 'creditcard': return {'fa-credit-card':true}
                default: return {'fa-question':true}
                    
            }      
        },
        balance () {
            var balance = 'Erro'
            if(!isNaN(this.account.balance)){
                balance = numeral(this.account.balance/100).format('0,0.00')
            }
            return balance
        },
        accountcolor () {
            return this.account.color ? this.account.color : 'black'
        }
    },
  data () {
      return {
          isExpanded: false,
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
        font-weight: 500 
    }
    .positive {
        color:royalblue;
    }
    .negative {
        color:red;
    }
    .action {
        width:6rem;
    }
</style>
