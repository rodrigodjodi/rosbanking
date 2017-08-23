<template>
    <div class="card">
        <div class="card-content">
            <form>
                
                <bulmaselect placeholder='Tipo...' v-model="type">
                    <option v-for="accountType in accountTypes" :value="accountType.value" :key="accountType.value">{{accountType.name}}</option>
                </bulmaselect>

                <div class="control">
                    <input class="input" type="text" placeholder="Nome da conta...">
                </div>
                <div class="control">
                    <input class="input" type="number" placeholder="0,00">
                </div>
                <p>{{type}}</p>
            </form>
                
        </div>
    </div>
</template>

<script>
import bulmaselect from '~/components/bulma-select'
export default {
    components: {bulmaselect},
    computed: {
        accountTypes () {
            return this.$store.state.accountTypes
        }
    },
    data () {
        return {
            type:''
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
