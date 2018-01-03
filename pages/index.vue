<template>
  <div>
    <pageHeader title="Contas">
        <a class="button is-pulled-right" @click="modal = true">
          Nova conta
        </a>
    </pageHeader>
    <account-card v-for="account in accounts" :key="account.key" :account="account.doc"/>
  </div>
</template>

<script>
import PageHeader from '~/components/page-header'
import AccountCard from '~/components/account-card'
import {accountsLocal, accountsRemote} from '~/assets/database'
export default {
  components: {AccountCard, PageHeader},
  data () {
    return {
      online: true,
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
    var opts = { live: true, retry: true };
    accountsLocal.replicate.from(accountsRemote)
    .on('complete', (info) => {
      this.getAccounts()
      accountsLocal.sync(accountsRemote, opts)
      .on('change',  (info) => {
          this.getAccounts()
      }).on('paused', function (err) {
        // replication paused (e.g. replication up to date, user went offline)
      }).on('active', function () {
        // replicate resumed (e.g. new changes replicating, user went back online)
      }).on('denied', function (err) {
        // a document failed to replicate (e.g. due to permissions)
      }).on('complete', function (info) {
        // handle complete
      }).on('error', function (err) {
          // handle error
      });
    }).on('error', function (err) {
    
    })
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
    },
    getAccounts() {
      return accountsLocal.allDocs({include_docs:true})
    .then((docs) => {
        this.accounts = docs.rows
    }).catch((err) => {
      error({ statusCode: 404, message: 'Accounts not found' })
    })
    }
  },
  destroyed () {
    window.removeEventListener('offline', this._toggleNetworkStatus)
    window.removeEventListener('online', this._toggleNetworkStatus)
  }
}
</script>

<style lang="sass">
 @import "bulma/sass/utilities/_all";
 @import "bulma/sass/base/_all";
 @import "bulma/sass/elements/button.sass"
</style>
