<template>
  <div class="myMessage">
    <!-- 1-1、我的消息页面 -->
    <Row>
      <Col span="22" offset="1">
        <div class="yesList" v-if="this.messageList.length>0">
          <ul class="list">
            <li
              v-for="(list,index) in this.messageList"
              :key="index"
              :data-noticeId="list.noticeId"
            >
              <p class="timer">{{list.addTimeStamp | timerFilter}}</p>
              <p class="news">系统消息：{{list.noticeContent}}</p>
            </li>
          </ul>
          <div class="pages">
            <Page :total="this.messageList.length" :current="1" show-sizer show-elevator/>
          </div>
        </div>
        <div class="noList" v-if="!(this.messageList.length>0)">
          <p>暂无数据!</p>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
// 导入时间过滤器
import toTime from "@/common/js/TimeStamp";

export default {
  name: "myMessage",
  data() {
    return {
      // 消息列表
      messageList: []
    };
  },
  created: function() {
    // 1、获取当前session中的user对象中的uid
    // console.log( JSON.parse(sessionStorage.getItem("userInfo")) );
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    // console.log( "---------------- 2019.2.25 ----------------------" );
    // console.log( userInfo );
    if (userInfo != null) {
      let userId = userInfo.user.userId;

      this.$axios
        .post("api/systemNotice/listUserNotice", {})
        .then(res => {
        //   console.log("-------------- 我的消息接口 ----------------------");
        //   console.log(res);
          if (res.systemNoticeList.length > 0) {
            this.messageList = res.systemNoticeList;
          }
        })
        .catch(err => {
          console.log(err);
          this.$Message.error("网络不通,请检查!");
        });
    }
  },
  filters: {
    // 时间过滤器
    timerFilter(timeStamp) {
      return toTime(timeStamp);
    }
  }
};
</script>

<style lang="less">
.myMessage {
  padding: 20px 0;
  min-height: 760px;
  .list {
    margin-bottom: 40px;
    text-align: left;
    list-style-type: none;
    li {
      padding: 10px 0;
      border-bottom: 2px dashed #eee;
      .timer {
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
      .news {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }
    .pages {
    }
  }
}
</style>