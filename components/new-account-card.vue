<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
            Nova conta
            </p>
        </header>
        <div class="card-content">
            <form>
                
                <bulmaselect placeholder='Tipo...' v-model="type">
                    <option v-for="accountType in accountTypes" :value="accountType.value" :key="accountType.value">{{accountType.name}}</option>
                </bulmaselect>

                <div class="control">
                    <input v-model="name" class="input" type="text" placeholder="Nome da conta...">
                </div>
                <div class="control">
                    <input class="input" type="tel" v-model="balanceTxt"
                 @keyup="updateValue($event.target.value)">
                </div>
                <p>{{type}}</p>
            </form>
                
        </div>
        <footer class="card-footer">
            <a class="card-footer-item">Limpar</a>
            <a class="card-footer-item" @click="submit">Criar conta</a>
        </footer>
    </div>
</template>

<script>
import bulmaselect from '~/components/bulma-select'
import toID from '~/assets/toid'
import numeral from 'numeral'
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
            balanceTxt: ''
        }
    },
    methods: {
        submit () {

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
