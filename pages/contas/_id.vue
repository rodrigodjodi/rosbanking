<template>
  <div>
    <h1 class="title">Conta específica: {{account._id}}</h1>
    <h2 class="subtitle">Se não encontrar a conta no banco emitir aviso</h2>
    <div>
      DIV transações
    </div>
    <div>
      <newTransaction v-if="modal" :accounts="accounts"/>
    </div>
  </div>
</template>

<script>
const newTransaction = () => import('~/components/new-transaction')
console.log(this.account)
export default {
  components: {newTransaction},
  data () {
    return {
      modal: true,
    }
  },
  pouch: {
    accounts: {},
    account: function () {
      return {
        database:'accounts',
        selector: {_id: 'itau'}
      }
    }
  },
}
</script>
