<template>
  <div>
    <pageHeader :title="title">
        <!--slot:icons here will be pulled to the right -->
        <span class="icon is-pulled-right">
          <i class="fa fa-times"></i>
        </span>

    </pageHeader>

    <div>
        <div class="field">
            <div class="control">
                <div class="select">
                    <select v-model="account.type" 
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
                <input v-model="account.name"
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
        <input-money v-model="account.balance"/>
        <compact-picker v-model="account.color" />
      </div>

      <footer>
          <button class="button" @click="clearFields">Limpar</button>
          <button class="button is-success" @click="submit">Criar conta</button>
      </footer>
    </div>
    
</template>

<script>
import pageHeader from '~/components/page-header'
import Vue from 'vue'
import inputMoney from '~/components/input-money'
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
        inputMoney, pageHeader
    },
    data () {
        return {
        account: null
        }
    },
    asyncData ({params, error}) {
        if (params.id) {
            return accountsLocal.get(params.id)
            .then((doc) => {
                return {
                    account: doc
                }
            }).catch((err) => {
                error({ statusCode: 404, message: 'Nenhuma conta com esse nome foi encontrada' })
            })
        } else {
            return {
                account: {
                    name: '',
                    type: '',
                    balance: 0,
                    color: ''
                }
            }
        }
    },
    computed: {
        accountTypes () {
            return this.$store.state.accountTypes
        },
        id () {
            return toID(this.account.name)
        },
        title () {
            return this.$route.params.id ? this.account.name : "Nova conta"
        }
    },
    methods: {
        submit () {
            this.$validator.validateAll()
            .then((valid) => {
                if (!valid) throw new Error('Erros de validação encontrados')
                return accountsLocal.put({
                    _id: this.id, //computed
                    type: this.account.type,
                    balance: this.account.balance,
                    name: this.account.name,
                    color: this.account.colors.hex})
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

<style lang="sass">
 @import "bulma/sass/utilities/_all";
 @import "bulma/sass/base/_all";
 @import "bulma/sass/elements/button";
 @import "bulma/sass/elements/form";
</style>

