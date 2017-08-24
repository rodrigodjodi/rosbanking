<template>
    <div class="card">
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
                    
                    <bulmaselect placeholder='Tipo...' v-model="type">
                        <option v-for="accountType in accountTypes" :value="accountType.value" :key="accountType.value">{{accountType.name}}</option>
                    </bulmaselect>
                    <div class="field">
                        <div class="control">
                            <input v-model="name" class="input" type="text" placeholder="Nome da conta..." required>
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <input class="input" type="tel" v-model="balanceTxt" placeholder="0,00"
                                @keyup="updateValue($event.target.value)">
                        </div>
                    </div>
                    
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
import bulmaselect from '~/components/bulma-select'
import toID from '~/assets/toid'
import numeral from 'numeral'
import numeralpt from 'numeral/locales/pt-br'
numeral.locale('pt-br')
export default {
    components: {bulmaselect},

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
            isExpanded: false
        }
    },
    methods: {
        submit () {
            this.$pouch.post('accounts', {'_id': this.id, type:this.type, balance:this.balance, name:this.name})
            .then(this.clearFields)

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
</style>
