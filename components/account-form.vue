<template>
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">

      <header class="modal-card-head">
          <p class="modal-card-title">
          Nova conta
          </p>
          <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>

      <div class="modal-card-body">
        <div class="field">
            <div class="control">
                <div class="select">
                    <select v-model="type" 
                        :class="{'is-danger': errors.has('accounttype')}"
                        name="accounttype"
                        v-validate="'required'">
                        <option disabled value="">Tipo...</option>
                        <option v-for="accountType in accountTypes" :value="accountType.value" :key="accountType.value">{{accountType.name}}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <input v-model="name"
                    :class="{'input':true, 'is-danger': errors.has('accountname')}"
                    type="text"
                    placeholder="Nome da conta..."
                    v-validate="'required'"
                    name="accountname" />
            </div>
            <span v-show="errors.has('accountname')" 
                class="help is-danger">
                {{ errors.first('accountname') }}
             </span>
        </div>
        <input-money v-model="balance"/>
        <compact-picker v-model="colors" />
      </div>

      <footer class="modal-card-foot">
          <button class="button" @click="clearFields">Limpar</button>
          <button class="button is-success" @click="submit">Criar conta</button>
      </footer>
    </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import inputmoney from '~/components/input-money'
import toID from '~/assets/toid'
import {accountsLocal, accountsRemote} from '~/assets/database'
import {Compact} from 'vue-color'
import validate from 'vee-validate'
import numeral from 'numeral'
import numeralpt from 'numeral/locales/pt-br'
numeral.locale('pt-br')
Vue.use(validate)
export default {
    components:{
        'compact-picker': Compact,
        'input-money': inputmoney
        },

    computed: {
        accountTypes () {
            return this.$store.state.accountTypes
        },
        id () {
            return toID(this.name)
        }
    },
    data () {
        return {
            type:'',
            name:'',
            balance: 0,
            colors: {}
        }
    },
    methods: {
        submit () {
            this.$validator.validateAll()
            .then((valid) => {
                if (!valid) throw new Error('Erros de validação encontrados')
                return accountsLocal.put({
                    _id: this.id,
                    type: this.type,
                    balance: this.balance,
                    name: this.name,
                    color: this.colors.hex})
            })
            .then(this.clearFields)
            .then(() => this.$emit('close'))
            .catch((err) => {console.error(err)})

        },

        clearFields () {
            this.type=''
            this.name=''
            this.balance= 0
            this.balanceTxt= ''
        }

    }
}
</script>

<style>
    .card-active {
        margin-top: 8px;
        margin-bottom: 8px;
    }
    .account-name {
        display: inline-flex;
        margin-left: 16px;
    }
    select.is-danger {
        border-color: #ff3860;
    }
</style>
