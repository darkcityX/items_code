<template>
  <div class="cont_box">
    <Header titleheader="我的" :isshowback="false"></Header>
    <Footers></Footers>
  </div>
</template>

<script>
  import Header from "../components/Header.vue";
  import Footers from "../components/Footers.vue";
  import { Toast , MessageBox } from "mint-ui";
  export default {
    name: "my",
    data(){
      return {

      }
    },
    methods: {

    },
    components: { Footers , Header },
    mounted () {

    }
  }
</script>

<style lang="scss" scoped>
  @import "src/common/css/mixin";
  .cont_box{
    width:100%;
    background:#FAFAFA;
  }
</style>
