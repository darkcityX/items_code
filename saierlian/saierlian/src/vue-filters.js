
import Vue from 'vue'

Vue.filter('substring', function (value, length) {
  if (value.length > length) {
    return value.substr(0, length) + '...'
  } else {
    return value
  }
})

