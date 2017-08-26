import Vuex from 'vuex'

const state = {
    accountTypes: [
        {value:'checking', name:'Conta Corrente'},
        {value:'savings', name:'Poupança'},
        {value:'creditcard', name:'Cartão'},
        {value:'cash', name:'Dinheiro'},
    ],
    defaultProps: {
        hex: '#194d33',
        hsl: {
          h: 150,
          s: 0.5,
          l: 0.2,
          a: 1
        },
        hsv: {
          h: 150,
          s: 0.66,
          v: 0.30,
          a: 1
        },
        rgba: {
          r: 25,
          g: 77,
          b: 51,
          a: 1
        },
        a: 1
    }
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