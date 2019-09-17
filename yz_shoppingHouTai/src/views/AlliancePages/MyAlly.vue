<template>
  <div id="myAlly">
    <div class="user-avatarList">
      <ul class="tree-data">
        <!-- 一级用户 -->
        <li v-for="(item,index) in mapList" :key="index">
          <span @click="showDetails">
            <i class="icon"></i>
          </span>
          <div class="users" @click="lookDetails(item.directInvitee)">
            <span class="tree-avatar">
              <img :src="item.directInvitee.userHead" alt>
            </span>
            <span class="tree-username">{{item.directInvitee.userName}}</span>
          </div>

          <!-- 二级用户 -->
          <ul>
            <li
              class="children-list"
              v-for="(data,flag) in item.secondInviteeList"
              :key="flag"
              @click="lookDetails(data)"
            >
              <div class="two-user">
                <span class="tree-avatar">
                  <img :src="data.userHead" alt>
                </span>
                <span class="tree-username">{{data.userName}}</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="user-details">
      <!-- 头部 -->
      <div class="user-top clearfix">
        <div class="userDetails">
          <h3 class="names">{{lookDetail.userName}}</h3>
          <p>
            下属级别：
            <span>一级</span>
          </p>
        </div>
        <div class="userAvatar">
          <img :src="lookDetail.userHead" alt>
        </div>
      </div>
      <div class="user-center">
        <p>
          电话号码：
          <span>{{lookDetail.userMobile}}</span>
        </p>
        <p>
          微信号：
          <span>{{lookDetail.wechatId}}</span>
        </p>
      </div>
      <div class="user-bx">
        <h4>TA的表现</h4>
        <!-- 表格 -->
        <Table border width="368" :show-header="showHeader" :columns="columns1" :data="tabelData"></Table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "myAlly",
  data() {
    return {
      mapList: [],
      columns1: [
        {
          title: "名称",
          key: "name",
          align: "center"
        },
        {
          title: "昨日奖励",
          key: "zrjl",
          align: "center"
        },
        {
          title: "今日奖励",
          key: "today",
          align: "center"
        },
        {
          title: "累计奖励",
          key: "ljjl",
          align: "center"
        }
      ],
      showHeader: false,
      tabelData: [
        {
          name: `原子币（ATOS）`,
          zrjl: "昨日奖励  10000",
          today: "今日奖励  10000",
          ljjl: "累计奖励 10000"
        },
        {
          name: `人民币`,
          zrjl: "昨日奖励  10000",
          today: "今日奖励  10000",
          ljjl: "累计奖励 10000"
        },
        {
          name: ``,
          zrjl: "直推奖励  10000",
          today: "团队奖励  10000",
          ljjl: "团队业绩 10000.00"
        }
      ],
      lookDetail: {}
    };
  },
  methods: {
    showDetails({ currentTarget, target }) {
      switch (target.className) {
        case "icon":
          target.className = "icon-active";
          currentTarget.parentNode.style.height = "auto";
          break;

        case "icon-active":
          target.className = "icon";
          currentTarget.parentNode.style.height = "54px";
          break;
      }
    },
    lookDetails(datas) {
      console.log(datas);
      this.lookDetail = datas;
    }
  },
  created() {
    this.$axios.post("/api/user/queryUserTeam").then(res => {
      this.mapList = res.mapList;
      this.lookDetail = res.mapList[0].directInvitee;
    });
  }
};
</script>

<style lang="less">
@import "../../common/css/mixin.less";
#myAlly {
  // padding: 40px 0;
  display: flex;
  height: 676px;
  overflow: hidden;
  .user-avatarList {
    flex: 0 290px;
    overflow: auto;
    border-right: 10px solid #f5f5f5;
    .tree-data {
      overflow-y: auto;
      position: relative;
      li:hover {
        background-color: #c4c4c4;
      }
      li .children-list:hover {
        padding-right: 20px;
        background-color: #e3e3e3;
      }
      li {
        width: 100%;
        height: 54px;
        overflow: hidden;
        font-size: 0;
        text-align: left;
        padding-left: 20px;
        transition: all 1s;
        .icon,
        .icon-active {
          display: inline-block;
          width: 11px;
          height: 11px;
          margin-right: 20px;
          vertical-align: middle;
          cursor: pointer;
          .bgImg("../../assets/images/team_icon_jia.png", contain);
        }
        .icon-active {
          .bgImg("../../assets/images/login_icon_xuanze.png", contain);
        }
        div {
          cursor: pointer;
          display: inline-block;
          width: 84%;
          line-height: 54px;
          .tree-avatar {
            display: inline-block;
            width: 34px;
            height: 34px;
            border-radius: 4px;
            vertical-align: middle;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          .tree-username {
            font-size: 14px;
            color: #333;
            padding-left: 12px;
            vertical-align: middle;
          }
        }
        .two-user {
          margin-left: 74px;
        }

        ul {
          height: auto;
          .children-list {
            position: relative;
            left: -20px;
            width: 310px;
          }
        }
      }
    }
  }
  .user-details {
    text-align: left;
    flex: 1;
    padding: 90px 0 0 140px;
    max-width: 750px;
    margin-right: 140px;
    .user-top {
      font-size: 0;
      padding-bottom: 30px;
      box-sizing: border-box;
      border-bottom: 1px solid #f5f5f5;
      .userDetails {
        vertical-align: middle;
        display: inline-block;
        .names {
          font-size: 18px;
          color: #333;
          margin-bottom: 21px;
        }
        p {
          color: #999;
          font-size: 14px;
          span {
            color: #333;
          }
        }
      }
      .userAvatar {
        display: inline-block;
        width: 70px;
        height: 70px;
        vertical-align: middle;
        border-radius: 14px;
        overflow: hidden;
        float: right;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    .user-center {
      box-sizing: border-box;
      padding: 31px 0;
      border-bottom: 1px solid #f5f5f5;
      color: #999999;
      font-size: 14px;
      p:nth-of-type(1) {
        margin-bottom: 22px;
      }
      p {
        span {
          color: #333333;
          margin-left: 10px;
        }
      }
    }
    .user-bx {
      margin-top: 40px;
      h4 {
        font-size: 18px;
        color: #333;
        margin-bottom: 20px;
      }
    }
  }
}
</style>