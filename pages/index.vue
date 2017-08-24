<template>
  <div class="container is-widescreen">
    <h1 class="title">Rosbank</h1>
    <account v-for="account in accounts" :key="account.id" />
    
    <newAccount />
    <div :class="['network',online ? 'online' : 'offline']">
      <div class="circle"></div>
      {{ online ? 'online' : 'offline' }}
    </div>
  </div>
</template>

<script>
import Account from '~/components/account-card'
import newAccount from '~/components/new-account-card'
  export default {
    components: {Account, newAccount},
    data () {
      return {
        online: true
      }
    },
    pouch: {
      accounts: {}
    },
    created: function() {
      // Send all documents to the remote database, and stream changes in real-time
      this.$pouch.sync('accounts', 'http://localhost:5984/accounts');
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
