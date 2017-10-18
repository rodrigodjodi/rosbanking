<template>
  <div>
    <pageHeader :title="account.name" 
      :back-button="true" >
      <!-- This is the slot area
      |icons here will be pulled to the right -->
        <span class="icon is-pulled-right" @click="AccountFormVisible = true">
          <i class="fa fa-pencil"></i>
        </span>
        <span class="icon is-pulled-right" @click="transactionFormVisible = true">
          <i class="fa fa-plus"></i>
        </span>
      <!--end of slot-->
    </pageHeader>
    
    <div>
      DIV transações
    </div>
    <div>
      <transaction-form 
        v-if="transactionFormVisible" 
        @close="transactionFormVisible=false" />
      <account-form v-if="AccountFormVisible" 
        class="is-active"
         @close="AccountFormVisible=false"
         :account="account"/>
    </div>
  </div>
</template>

<script>
import PageHeader from '~/components/page-header'
import AccountDropdownMenu from '~/components/account-dropdown-menu'
const transactionForm = () => import('~/components/transaction-form')
const accountForm = () => import('~/components/account-form')
import {accountsLocal, accountsRemote} from '~/assets/database'
export default {
  components: {accountForm, transactionForm, PageHeader, AccountDropdownMenu},
  data () {
    return {
      transactionFormVisible: false,
      AccountFormVisible:false,
      account: null
    }
  },
  asyncData ({params, error}) {
    return accountsLocal.get(params.id)
    .then((doc) => {
      return {
        account: doc
      }
    }).catch((err) => {
      error({ statusCode: 404, message: 'Nenhuma conta com esse nome foi encontrada' })
    })
  },
}
</script>
