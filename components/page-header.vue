<template>
  <div class="hero is-primary">
    <header class="columns is-mobile">
      <div class="column is-one-quarter">
        <nuxt-link to="/" v-if="backButton">
          <span class="icon">
            <i class="fa fa-arrow-left fa-lg"></i>
          </span>
        </nuxt-link>
      </div>
      <div class="column is-half has-text-centered">
        <p class="title is-4 is-info">{{title}}</p>
      </div>
      <div class="column is-one-quarter">
        <slot></slot>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      validator: function maxSize (value) {
        return value.length < 16
      }
    },
    backButton: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    
  },
  data: function () {
    return {
      
    }
  }
}
</script>

<style lang="sass">
 @import "bulma/sass/utilities/_all";
 @import "bulma/sass/base/_all";
 @import "bulma/sass/grid/columns";
 @import "bulma/sass/elements/title";
 @import "bulma/sass/layout/hero";
</style>
