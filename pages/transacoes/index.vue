<template>
  <div>
    <pageHeader>
    </pageHeader>
    <div class="section">
      <newTransaction v-if="modal" />

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
}
</script>
