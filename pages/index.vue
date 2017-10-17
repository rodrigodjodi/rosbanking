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
    var changes = accountsLocal.changes({
      since: 'now',
      live: true,
      include_docs: true
    }).on('change', (change) => {
      // handle change
      console.log('change detectd', change)
      this.accounts.push({
        doc: change.doc,
        id: change.id,
        key: change.id,
        value: {
          rev: change.doc._rev
        }
      })
    }).on('complete', function(info) {
      // changes() was canceled
    }).on('error', function (err) {
      console.log(err);
    });
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
