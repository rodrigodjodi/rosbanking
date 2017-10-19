<template>
    <div>
        <pageHeader :title="title">
            <!--slot:icons here will be pulled to the right -->
            <span class="icon is-pulled-right">
            <i class="fa fa-times"></i>
            </span>
        </pageHeader>
        <div>
            <bulmaselect v-model="doc.account" :options="accounts" :isDisabled="lockAccount"></bulmaselect>
            <input-money v-model="doc.amount"/>
            <vue-google-autocomplete
                v-model="doc.who"
                id="map"
                classname="input"
                placeholder="Quem / Onde..."
                :enable-geolocation="true"
            />
            <div class="field">
                <div class="control">
                <input type="text" v-model="doc.description" class="input" placeholder="Descrição...">
                </div>
            </div>
            <inputdate v-model="doc.when"/>
            <inputdate v-model="doc.due"/>
        </div>
    </div>
</template>

<script>
Date.prototype.toDateInputValue = function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};
import {
  accountsLocal,
  accountsRemote,
  transactionsLocal,
  transactionsRemote
} from "~/assets/database";
import inputMoney from "~/components/input-money";
import inputDate from "~/components/input-date";
import bulmaSelect from "~/components/bulma-select";
import numeral from "numeral";
import numeralpt from "numeral/locales/pt-br";
numeral.locale("pt-br");
import VueGoogleAutocomplete from "~/components/vuegoogleautocomplete";
export default {
  components: {
    inputMoney,
    VueGoogleAutocomplete,
    inputDate,
    bulmaSelect
  },
  data() {
    return {
      transaction: null
    };
  },
  asyncData({ params, error }) {
    if (params.id) {
      return transactionssLocal
        .get(params.id)
        .then(doc => {
          return {
            transaction: doc
          };
        })
        .catch(err => {
          error({
            statusCode: 404,
            message: "Nenhuma transação com esse id foi encontrada"
          });
        });
    } else {
      return {
        doc: {
          amount: 0,
          who: "",
          account: this.$route.params.id || "",
          due: "",
          when: new Date().toDateInputValue(),
          description: ""
        },
        lockAccount: this.$route.params.id ? true : false
      };
    }
  },
  computed: {
    accountTypes() {
      return this.$store.state.accountTypes;
    },
    title() {
      return this.$route.params.id ? this.account.name : "Nova conta";
    }
  },
  methods: {
    submit() {},

    clearFields() {
      this.type = "";
      this.name = "";
      this.balance = 0;
      this.balanceTxt = "";
    }
  },
  head () {
      return {
          script: [
            { src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBwH-VO2mJrTH1ztauPOzeXDVEJEREvaP4&libraries=places' }
            ],
        }
  }
};
</script>

<style lang="sass">
 @import "bulma/sass/utilities/_all";
 @import "bulma/sass/base/_all";
 @import "bulma/sass/elements/button";
 @import "bulma/sass/elements/form";
</style>