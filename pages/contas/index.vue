<template>
  <div>
    <p class="title is-4">Rosbank-Contas</p>
    <div class="section">
      <account v-for="account in accounts" :key="account.id" :account="account"/>
      <account-form />
      <div :class="['network',online ? 'online' : 'offline']">
        <div class="circle"></div>
        {{ online ? 'online' : 'offline' }}
      </div>
    </div>
  </div>
</template>

<script>
import Account from '~/components/account-card'
import accountForm from '~/components/account-form'

  export default {
    components: {Account, accountForm},
    data () {
      return {
        online: true
      }
    },
    pouch: {
      accounts: {}
    },
    computed: {

    },
    created: function() {
      // Send all documents to the remote database, and stream changes in real-time
      this.$pouch.sync('accounts', 'https://ed356ce5-932a-4357-91b9-452718aa46ba-bluemix:8d670900cec398689ee8f258e4e83161c389595fd4753d9f468013fbd529c466@ed356ce5-932a-4357-91b9-452718aa46ba-bluemix.cloudant.com/accounts');
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
