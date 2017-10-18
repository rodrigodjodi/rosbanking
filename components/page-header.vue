<template>
  <header class="columns is-mobile">
    <div class="column is-one-quarter">
      <nuxt-link to="/" v-if="backButton">
        <span class="icon">
          <i class="fa fa-arrow-left fa-lg"></i>
        </span>
      </nuxt-link>
    </div>
    <div class="column is-half has-text-centered">
      <p class="title is-4">{{title}}</p>
    </div>
    <div class="column is-one-quarter">
      <slot></slot>
    </div>
  </header>
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

<style scoped>
header {
  background-color: #229922;
  padding: 1.0rem 1.5rem 0.25rem
}
</style>
