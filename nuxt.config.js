module.exports = {
  mode: 'spa',
  /*
  ** Build configuration
  */
  build: {
    vendor: ['pouchdb'],
  },
  /*
  ** Headers
  ** Common headers are already provided by @nuxtjs/pwa preset
  */
  head: {
    script: [
      { src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBwH-VO2mJrTH1ztauPOzeXDVEJEREvaP4&libraries=places' }
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Customize app manifest
  */
  manifest: {
    theme_color: '#3B8070'
  },
  /*
  ** Modules
  */
  modules: [
    '@nuxtjs/pwa'
  ],
  css: [
    { src: 'bulma/bulma.sass', lang: 'sass' },
    { src: 'font-awesome/scss/font-awesome.scss', lang: 'scss' }
  ]
}
