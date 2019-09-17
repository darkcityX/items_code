<template>
  <div class="myPurse">
    <!-- <p>【我的钱包】页面：是我的资产页面的默认入口页面；选择人民币/原子币弹窗</p>

		<h1><router-link to="/AlliancePage/myAssets/withdrawalRmb">选择人民币提现</router-link></h1>
    <h1><router-link to="/AlliancePage/myAssets/withdrawalAtomicCurrency">选择原子币提现</router-link></h1>-->
    <div class="mainTop">
      <div class="puresNumView">
        <Row>
          <Col span="12">
            <div class="assetsView assetsRMB">
              <div class="title">
                <img src="./../../../assets/images/qianbao_icon_rmb.png" alt>
                <span>人民币</span>
              </div>
              <div class="salary">
                ￥
                <span>{{ MyPurseInfo.rmb | moneyFilter }}</span>
              </div>
            </div>
          </Col>
          <Col span="12">
            <div class="assetsView assetsBi">
              <div class="title">
                <img src="./../../../assets/images/qianbao_icon_atos.png" alt>
                <span>原子币</span>
              </div>
              <div class="salary">{{ MyPurseInfo.atoshi }}</div>
            </div>
          </Col>
        </Row>
      </div>
      <div class="withdraw">
        <Row>
          <Col span="8" offset="8">
            <Button type="info" @click="withdraw();">提现</Button>
          </Col>
        </Row>
      </div>
    </div>
    <div class="mainList">
      <div class="yesListInfo" v-show="recordList.length>0">
        <div class="tableList">
          <!-- :columns="" :data="" -->
          <!-- <Table stripe></Table> -->
        </div>
        <div class="pages">
          <!-- <Page :total="100" /> -->
        </div>
      </div>
      <div class="noListInfo" v-show="!recordList.length">
        <p>暂无记录!</p>
      </div>
    </div>
    <!-- 3、选择弹出窗 -->
    <div class="selectContainer" v-show="selectView.isSelectViewModel">
      <div class="selectView">
        <p class="title">请选择提现币种</p>
        <div class="selectCentent">
          <Row>
            <Col span="16" offset="4">
              <RadioGroup v-model="selectView.selected">
                <div class="item item1">
                  <Radio label="人民币(￥)"></Radio>
                </div>
                <div class="item">
                  <Radio label="原子币(ATOS)"></Radio>
                </div>
              </RadioGroup>
            </Col>
          </Row>
          <Row>
            <Col span="10" offset="7">
              <Button class="selectSubmit" type="info" @click="selectSubmit();">确认</Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toMoney } from "@/common/js/MoneyFilter.js";

export default {
  name: "myPurse",
  data() {
    return {
      // 我的总资产
      MyPurseInfo: {},

      // 账户操作记录
      recordList: [],

      pagesData: {
        page: 1,
        pageSize: 20
      },

      // 选择弹出框

      selectView: {
        isSelectViewModel: false,
        selected: "人民币(￥)"
      }
    };
  },
  filters: {
    // 价格过滤器
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  created: function() {
    //console.log("---------------------------");
    // 请求资产
    this.getMyPurseInfo();
    // 请求用户查看提现记录
    // this.getLlistAwardRecord();
  },
  methods: {
    // 请求资产
    getMyPurseInfo() {
      this.$axios
        .post("api/user/queryUserAsset", {})
        .then(res => {
          //console.log(res);
          // 赋值
          this.MyPurseInfo = res;
        })
        .catch(err => {
          //console.log(err);
        });
    },
    // 请求用户查看提现记录
    getLlistAwardRecord() {
      this.$axios
        .post("api/awardRecord/listAwardRecord", {
          page: "",
          pageSize: "",
          startTime: "",
          endTime: ""
        })
        .then(res => {
        //   console.log(res);
          // 赋值
        })
        .catch(err => {
          // console.log(err);
        });
    },
    // 提现按钮： 弹出提现方式
    withdraw() {
      this.selectView.isSelectViewModel = true;
    },
    // 选择提现方式按钮
    selectSubmit() {
      let selected = this.selectView.selected;
    //   console.log(selected);
      if (selected == "人民币(￥)") {
        this.$router.push({ path: "/AlliancePage/myAssets/withdrawalRmb" });
      } else if (selected == "原子币(ATOS)") {
        this.$router.push({
          path: "/AlliancePage/myAssets/withdrawalAtomicCurrency"
        });
      }
    }
  }
};
</script>

<style lang="less">
.myPurse {
  .mainTop {
    max-height: 207px;
    min-height: 207px;
    border-bottom: 10px solid #f5f5f5;
    .puresNumView {
      border-bottom: 1px solid #f5f5f5;
      .assetsView {
        padding: 20px 40px;
        text-align: left;
        .title {
          margin-bottom: 10px;
          padding-bottom: 10px;
          max-width: 140px;
          min-width: 140px;
          border-bottom: 2px solid #f5f5f5;
          img,
          span {
            display: inline-block;
            vertical-align: middle;
          }
          img {
          }
          span {
            font-size: 16px;
            font-weight: 400;
            color: rgba(34, 34, 34, 1);
          }
        }
        .salary {
          font-size: 24px;
          font-weight: 400;
        }
      }
      .assetsRMB {
        border-right: 1px solid #f5f5f5;
        background: url("./../../../assets/images/qianbao_rmb_bg.png") no-repeat;
        background-position: right -30px;
        .salary {
          color: rgba(134, 188, 82, 1);
          font-size: 16px;
          span {
            font-size: 24px;
          }
        }
      }
      .assetsBi {
        .salary {
          color: rgba(239, 170, 22, 1);
        }
      }
    }
    // 提现按钮
    .withdraw {
      button {
        margin: 20px 0;
        max-width: 200px;
        width: 100%;
        height: 50px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .mainList {
    min-height: 553px;
    max-height: 553px;
    .yesListInfo {
    }
    .noListInfo {
      padding: 10px;
    }
  }
  // 弹出框
  .selectContainer {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    overflow: hidden;
    .selectView {
      position: relative;
      margin: 0 auto;
      margin-top: 10%;
      padding: 40px 0;
      max-width: 440px;
      max-height: 560px;
      border-radius: 8px;
      background: #fff;
      .title {
        margin-bottom: 20px;
        font-size: 18px;
        font-weight: 400;
        color: rgba(34, 34, 34, 1);
      }
      .selectCentent {
        .item {
          margin-bottom: 10px;
          .ivu-radio-wrapper {
            color: #333;
            font-size: 14px;
          }
        }
        .item1 {
          .ivu-radio-wrapper {
            padding-right: 20px;
          }
        }
        .item:last-child {
          margin-bottom: 0;
        }
        .selectSubmit {
          margin-top: 20px;
          width: 100%;
          height: 50px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>