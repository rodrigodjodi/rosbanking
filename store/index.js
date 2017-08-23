import Vuex from 'vuex'

const state = {
    accountTypes: [
        {value:'checking', name:'Conta Corrente'},
        {value:'savings', name:'Poupança'},
        {value:'creditcard', name:'Cartão'},
        {value:'cash', name:'Carteira'},
    ]
}

const mutations = {
    
}

const actions = {
    
}

const store = () => new Vuex.Store({
    state,
    mutations,
    actions
})

export default store