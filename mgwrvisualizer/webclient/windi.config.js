const { transform } = require('windicss/helpers')

  module.exports = {
    attributify: true,
    plugins: [
      transform('daisyui'),
    ],

  }