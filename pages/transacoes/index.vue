<template>
  <div>
    <pageHeader>
    </pageHeader>
    <div class="section">
      <newTransaction v-if="modal" :accounts="accounts"/>

    </div>
  </div>
</template>

<script>
import pageHeader from '~/components/page-header'
const newTransaction = () => import('~/components/new-transaction')

export default {
    components: {
        newTransaction, pageHeader
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
