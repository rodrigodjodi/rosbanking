<template>
  <div>
    <pageHeader :title="account.name" :back-button="true" :titleEdit="editingTitle"
      @close="editingTitle=false">
        <AccountDropdownMenu @edit="editingTitle = true"
          class="is-pulled-right"
        >
        </AccountDropdownMenu>
        <span class="icon is-pulled-right" @click="modalVisible = true">
          <i class="fa fa-plus"></i>
        </span>
    </pageHeader>
    
    <div>
      DIV transações
    </div>
    <div>
      <newTransaction v-if="modalVisible" :accounts="accounts"/>
    </div>
  </div>
</template>

<script>
import PageHeader from '~/components/page-header'
import AccountDropdownMenu from '~/components/account-dropdown-menu'
const newTransaction = () => import('~/components/new-transaction')
import PouchDB from 'pouchdb'
const db = new PouchDB('accounts')
const remote = new PouchDB('https://ed356ce5-932a-4357-91b9-452718aa46ba-bluemix:8d670900cec398689ee8f258e4e83161c389595fd4753d9f468013fbd529c466@ed356ce5-932a-4357-91b9-452718aa46ba-bluemix.cloudant.com/accounts')
export default {
  components: {newTransaction, PageHeader, AccountDropdownMenu},
  data () {
    return {
      modalVisible: false,
      account: null,
      editingTitle: false
    }
  },
  asyncData ({params, error}) {
    return db.get(params.id)
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
