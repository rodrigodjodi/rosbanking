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
    <account-form v-if="modal" class="is-active" @close="modal=false"/>
  </div>
</template>

<script>
import PageHeader from '~/components/page-header'
import AccountCard from '~/components/account-card'
const accountForm = () => import('~/components/account-form')
import {accountsLocal, accountsRemote} from '~/assets/database'
export default {
  components: {AccountCard, accountForm, PageHeader},
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
