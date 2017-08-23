<template>
    <div class="card" :class="{expanded:isExpanded}" @click="isExpanded = !isExpanded">
        <div class="card-content">
            <span class="icon">
              <i class="fa fa-home"></i>
            </span>
            <div class="account-name">Nome da conta</div>
            <div class="is-pulled-right">54,00</div>
            <div v-if="isExpanded">
                Botões 
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
      return {
          isExpanded: false
      }
  }
}
</script>

<style>
    .expanded {
        margin-top: 8px;
        margin-bottom: 8px;
    }
    .account-name {
        display: inline-flex;
        margin-left: 16px;
    }
</style>
