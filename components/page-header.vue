<template>
  <header class="columns is-mobile">
    <div class="column is-three-quarters">
      <p class="title is-6">Rosbank-Contas</p>
    </div>
    <div class="column">
      <slot></slot>
    </div>
  </header>
</template>

<style scoped>
header {
  background-color: #229922;
  padding: 1.0rem 1.5rem 0.25rem
}
</style>
