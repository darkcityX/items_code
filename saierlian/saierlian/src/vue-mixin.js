import Vue from 'vue'

Vue.mixin({
  methods: {
    urlHistoryBack: function () {
      history.back();
    }
  }
})

