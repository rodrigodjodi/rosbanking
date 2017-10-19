<template>
  <div>
    <page-header>
    </page-header>
    <div class="section">
      <p>Lista geral de transações com filtros</p>

    </div>
  </div>
</template>

<script>
import pageHeader from '~/components/page-header'


export default {
    components: {
        pageHeader
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
