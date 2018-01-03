<template>
  <div>
    <page-header :title="title">
    </page-header>
    <div class="section">
      <p>Lista geral de transações com filtros</p>

    </div>
  </div>
</template>

<script>
import pageHeader from "~/components/page-header";
import { accountsLocal, accountsRemote } from "~/assets/database";

export default {
  components: {
    pageHeader
  },
  data() {
    return {
      account: null
    };
  },
  asyncData({ params, error }) {
    if (params.id) {
      return accountsLocal
        .get(params.id)
        .then(doc => {
          return {
            account: doc
          };
        })
        .catch(err => {
          if(err.status === 404){
            err.message = "Nenhuma conta com esse nome foi encontrada"
          }
          error({
            statusCode: err.status,
            message: err.message
          });
        });
    } else {
      return {
        account: {
          name: "",
          type: "",
          balance: 0,
          color: ""
        }
      };
    }
  },
  computed: {
    title() {
      return this.$route.params.id
        ? this.account.name
        : "Últimos lançamentos";
    }
  }
};
</script>
