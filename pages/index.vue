<template>
  <div>
    <pageHeader title="Contas">
        <a class="button is-pulled-right" @click="modal = true">
          Nova conta
        </a>
    </pageHeader>

    <div>
      <account-card v-for="account in accounts" :key="account.key" :account="account.doc"/>
      <div :class="['network',online ? 'online' : 'offline']">
        <div class="circle"></div>
        {{ online ? 'online' : 'offline' }}
      </div>
    </div>
    <new-account v-if="modal" class="is-active" @close="modal=false"/>
  </div>
</template>

<script>
import PageHeader from '~/components/page-header'
import AccountCard from '~/components/account-card'
const NewAccount = () => import('~/components/account-new')
import {accountsLocal, accountsRemote} from '~/assets/database'
export default {
  components: {AccountCard, NewAccount, PageHeader},
  data () {
    return {
      online: true,
      modal: false,
      accounts:[]
    }
  },
  asyncData ({params, error}) {
    return accountsLocal.allDocs({include_docs:true})
    .then((docs) => {
      return {
        accounts: docs.rows
      }
    }).catch((err) => {
      error({ statusCode: 404, message: 'Accounts not found' })
    })
  },
  computed: {

  },
  created: function() {
    // Send all documents to the remote database, and stream changes in real-time
    accountsLocal.sync(accountsRemote);
  },
  mounted () {
    if (!window.navigator) {
      this.online = false
      return
    }
    this.online = Boolean(window.navigator.onLine)
    window.addEventListener('offline', this._toggleNetworkStatus)
    window.addEventListener('online', this._toggleNetworkStatus)
  },
  methods: {
    _toggleNetworkStatus ({ type }) {
      this.online = type === 'online'
    }
  },
  destroyed () {
    window.removeEventListener('offline', this._toggleNetworkStatus)
    window.removeEventListener('online', this._toggleNetworkStatus)
  }
}
</script>

<style>
  .network {
    font-weight: 400;
    font-size: 1rem;
  }

  .network .circle {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background: green;
    padding: .1rem .5rem;
    border-radius: 1rem;
  }

  .network.offline .circle {
    background: red;
  }
</style>
