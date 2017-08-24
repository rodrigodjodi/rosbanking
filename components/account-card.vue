<template>
    <div class="card" :class="{expanded:isExpanded}" @click="isExpanded = !isExpanded">
        <div class="card-content">
            <span class="icon">
              <i class="fa" :class="icon"></i>
            </span>
            <div class="account-name">{{account.name}}</div>
            <div class="is-pulled-right" :class="classObject">{{account.balance}}</div>
            <div v-if="isExpanded">
                Botões 
            </div>
        </div>
    </div>
</template>

<script>

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
                case 'cash': return {'account_balance_wallet':true}
                case 'checking': return {'account_balance':true}
                case 'savings': return {'monetization_on':true}
                case 'creditcard': return {'credit_card':true}
                default: return 'help'
                    
            }      
        },
        
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
</style>
