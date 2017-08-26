<template>
    <div>
        <p class="title is-4">{{editing ? 'Editar transação' : 'Nova transação'}}</p>
            <div class="section">

            </div>
  

        <div>Conta: {{ $route.params.account }}</div>
        <div>transacao: {{ $route.params.id }}</div>
    </div>
</template>

<script>
export default {
  computed: {
      editing () {
          return this.$route.params.id ? true : false
      }
  }
}
</script>
