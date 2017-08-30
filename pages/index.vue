<template>
  <div>
    <pageHeader>
        <a class="is-primary is-pulled-right" @click="modal = true">
          <span class="icon">
            <i class="fa fa-plus"></i>
          </span>
        </a>
    </pageHeader>

    <div>
      <account v-for="account in accounts" :key="account.id" :account="account"/>
      <div :class="['network',online ? 'online' : 'offline']">
        <div class="circle"></div>
        {{ online ? 'online' : 'offline' }}
      </div>
    </div>
    <newAccount v-if="modal" class="is-active" @close="modal=false"/>
  </div>
</template>

<script>
import pageHeader from '~/components/page-header'
import Account from '~/components/account-card'
const newAccount = () => import('~/components/new-account-card')

export default {
  components: {Account, newAccount, pageHeader},
  data () {
    return {
      online: true,
      modal: false
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
