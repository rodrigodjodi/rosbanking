<template>
  <div>
    <pageHeader>
    </pageHeader>
    <div class="section">
      <transaction-form v-if="modal" :accounts="accounts"/>

    </div>
  </div>
</template>

<script>
import pageHeader from '~/components/page-header'
const transactionForm = () => import('~/components/transaction-form')

export default {
    components: {
        transactionForm, pageHeader
    },
  data () {
    return {
        modal:true
    }
  },
  pouch: {
    accounts: {}
  }


}
</script>
