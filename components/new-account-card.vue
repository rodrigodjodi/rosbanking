<template>
    <div class="card card-active">
        <form>
        <header class="card-header" @click="isExpanded = !isExpanded">
            <p class="card-header-title">
            Nova conta
            </p>
            <a class="card-header-icon">
                <span class="icon">
                    <i class="fa fa-angle-down"></i>
                </span>
            </a>
        </header>
        <template v-if="isExpanded">
            <div class="card-content">
                <div class="field">
                    <div class="control">
                        <div class="select">
                            <select v-model="type" :class="{'is-danger': errors.has('accounttype')}" name="accounttype" v-validate="'required'">    
                                <option disabled value="">Tipo...</option>
                                <option v-for="accountType in accountTypes" :value="accountType.value" :key="accountType.value">{{accountType.name}}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <div class="control">
                        <input v-model="name" :class="{'input':true, 'is-danger': errors.has('accountname')}"
                        type="text" placeholder="Nome da conta..." v-validate="'required'" name="accountname">
                    </div>
                    <span v-show="errors.has('accountname')" class="help is-danger">{{ errors.first('accountname') }}</span>
                </div>

                <div class="field">
                    <div class="control">
                        <input class="input" type="tel" v-model="balanceTxt" placeholder="0,00"
                            @keyup="updateValue($event.target.value)">
                    </div>
                </div>
                <compact-picker v-model="colors" />
            </div>
            <footer class="card-footer">
                <a class="card-footer-item" @click="clearFields">Limpar</a>
                <a class="card-footer-item is-primary" @click="submit">Criar conta</a>
            </footer>
        </template>
        </form>
    </div>
</template>

<script>
import Vue from 'vue'

import toID from '~/assets/toid'
import numeral from 'numeral'
import numeralpt from 'numeral/locales/pt-br'
import {Compact} from 'vue-color'
import validate from 'vee-validate'
Vue.use(validate)
numeral.locale('pt-br')
export default {
    components:{'compact-picker': Compact},
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
            balanceTxt: '',
            isExpanded: false,
            colors: {}
        }
    },
    methods: {
        submit () {
            this.$validator.validateAll()
            .then((valid) => {
                if (!valid) throw new Error('Erros de validação encontrados')
                return this.$pouch.post('accounts', {'_id': this.id, type:this.type, balance:this.balance, name:this.name, color:this.colors.hex})
            })
            .then(this.clearFields)
            .then(() => this.isExpanded = false)
            .catch((err) => {console.error(err)})

        },
        updateValue(value) {
            var num
            var int = value.replace(/([^0-9-]+)/g, '')
            if (isNaN(value.replace(/([^0-9-]+)/g, '')/100)){
                num = '-'
                int = null
            } else {
                num = numeral(int/100).format('0,0.00')
            }
            this.balanceTxt = num
            this.balance = int
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
