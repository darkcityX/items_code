<template>
  <div class="header_cont">
    <div class="cont_head">
      <img @click="$router.go(-1)" v-show="isshowback" class="fanhui" src="/static/img/fh.png">
      <div class="title">{{titleheader}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Header",
    props:{
      titleheader:{type:String},
      isshowback:{type:Boolean}
    },
    data() {
      return {

      };
    },
    methods: {

    },
    components: {  },
    mounted () {

    }
  }
</script>

<style lang="scss" scoped>
  @import "src/common/css/mixin";
  $background: #0C1941;
  .header_cont{
    width:100%;
    height: Rem(43);
    background: $background;
    position: fixed;
    top:0;
    z-index: 1000;
    .cont_head{
      width:Rem(375);
      height: Rem(43);
      margin:0 auto;
      position: relative;
      img.fanhui{
        width:Rem(7);
        height:Rem(12);
        position:absolute;
        top:Rem(15);
        left:Rem(11);
      }
      .title{
        width:100%;
        height: Rem(43);
        line-height: Rem(43);
        text-align: center;
        font-size:Rem(15);
        color:#FFFFFF;
      }
    }
  }
</style>
