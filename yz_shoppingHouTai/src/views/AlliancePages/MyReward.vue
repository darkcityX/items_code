<template>
  <div id="myReward">
    <!-- 奖励记录 -->
  </div>
</template>

<script>
export default {
  name: "myReward",
  data() {
    return {};
  },
  created() {
    this.$axios.post("/api/awardRecord/queryUserAwardRecord",{

    }).then(res => {
      console.log(res);
    }).catch(err => {

    });
  }
};
</script>

<style lang="less" scoped>
#myReward {
}
</style>