<template>
  <div class="rewardRules">
    <!-- 1-1、奖励规则页面 -->
    <!-- 1、我的奖励级别 -->
    <div class="myRewardLevel">
      <Row>
        <Col span="24">
          <!-- :columns="columns2" -->
          <!-- <Table border :columns="columns2" :data="data5"></Table> -->
          <table>
            <tbody>
              <tr>
                <td rowspan="2">我的奖励级别</td>
                <td>参与金额</td>
                <td>直推奖励</td>
                <td>团队业绩</td>
              </tr>
              <tr>
                <!-- <td></td> -->
                <td>0</td>
                <td>8%</td>
                <td>14%</td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
    <!-- 2、奖励规则 -->
    <div class="ruleIntroduction">
      <Row>
        <Col span="24">
          <div class="ruleItem ruleItem1">
            <div class="ruleTitleContainer">
              <span class="iconRow"></span>
              <span class="ruleTitle">奖励概述</span>
              <span class="iconRow"></span>
            </div>
            <div
              class="ruleContent"
            >院子币官方拿出业绩总额的37%奖励市场；制订了只要努力基本月收入能3-5万以上销售分享计划（如果你是宇宙强人，上不封顶噢）；奖品包括原子币，人名币，比特币，以太坊，特斯拉，奔驰轿车等；并通过大数据算法捕捉每一人的每一个努力，让人人的劳动得到重视，越努力收入越高；小伙伴，赶紧获取原子币，分享赚钱吧！</div>
          </div>
          <div class="ruleItem ruleItem2">
            <div class="ruleTitleContainer">
              <span class="iconRow"></span>
              <span class="ruleTitle">原子联盟奖励细则</span>
              <span class="iconRow"></span>
            </div>
            <div class="ruleContent">
              <div class="dividendTable">
                <table>
                  <tbody>
                    <tr>
                      <td class="grayBg" rowspan="2">
                        <span>
                          <p>参与金额</p>
                          <p>(元)</p>
                        </span>
                      </td>
                      <td class="skyBuleBg" rowspan="2">
                        <span>直接奖励</span>
                      </td>
                      <td class="lightPurpleBg" colspan="6">
                        <span>最高分红</span>
                      </td>
                      <!-- <td>
												<span></span>
											</td>
											<td>
												<span></span>
											</td>
											<td>
												<span></span>
											</td>
											<td>
												<span></span>
											</td>
											<td>
												<span></span>
                      </td>-->
                    </tr>
                    <tr>
                      <!-- <td></td>
                      <td></td>-->
                      <td class="lightYellow">
                        <span>
                          <p>团队业绩</p>
                          <p>0-9.99万</p>
                        </span>
                      </td>
                      <td class="grayBg">
                        <span>
                          <p>团队业绩</p>
                          <p>10-29.99万</p>
                        </span>
                      </td>
                      <td class="lightBuleBg">
                        <span>
                          <p>团队业绩</p>
                          <p>30-49.99</p>
                        </span>
                      </td>
                      <td class="grayBg">
                        <span>
                          <p>团队业绩</p>
                          <p>50-99.99万</p>
                        </span>
                      </td>
                      <td class="OrangeBg">
                        <span>
                          <p>团队业绩</p>
                          <p>100-199.99万</p>
                        </span>
                      </td>
                      <td class="grayBg">
                        <span>
                          <p>团队业绩</p>
                          <p>200万以上</p>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="grayBg">
                        <span>0</span>
                      </td>
                      <td class="skyBuleBg">
                        <span>8%</span>
                      </td>
                      <td class="lightYellow">
                        <span>14%</span>
                      </td>
                      <td class="grayBg">
                        <span>17%</span>
                      </td>
                      <td class="lightBuleBg">
                        <span>20%</span>
                      </td>
                      <td class="grayBg">
                        <span>22%</span>
                      </td>
                      <td class="OrangeBg">
                        <span>24%</span>
                      </td>
                      <td class="grayBg">
                        <span>26%</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="grayBg">
                        <span>3000</span>
                      </td>
                      <td class="skyBuleBg">
                        <span>10%</span>
                      </td>
                      <td class="lightYellow">
                        <span>17%</span>
                      </td>
                      <td class="grayBg">
                        <span>20%</span>
                      </td>
                      <td class="lightBuleBg">
                        <span>23%</span>
                      </td>
                      <td class="grayBg">
                        <span>25%</span>
                      </td>
                      <td class="OrangeBg">
                        <span>27%</span>
                      </td>
                      <td class="grayBg">
                        <span>28%</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="grayBg">
                        <span>6000</span>
                      </td>
                      <td class="skyBuleBg">
                        <span>12%</span>
                      </td>
                      <td class="lightYellow">
                        <span>20%</span>
                      </td>
                      <td class="grayBg">
                        <span>23%</span>
                      </td>
                      <td class="lightBuleBg">
                        <span>25%</span>
                      </td>
                      <td>
                        <span>27%</span>
                      </td>
                      <td class="OrangeBg">
                        <span>28%</span>
                      </td>
                      <td class="grayBg">
                        <span>31%</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="grayBg">
                        <span>10000及以上</span>
                      </td>
                      <td class="skyBuleBg">
                        <span>14%</span>
                      </td>
                      <td class="lightYellow">
                        <span>23%</span>
                      </td>
                      <td class="grayBg">
                        <span>26%</span>
                      </td>
                      <td class="lightBuleBg">
                        <span>29%</span>
                      </td>
                      <td class="grayBg">
                        <span>30%</span>
                      </td>
                      <td class="OrangeBg">
                        <span>31%</span>
                      </td>
                      <td class="grayBg">
                        <span>32%</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p class="tableInfo">*统计单位是元（人民币）：用比特币等加密货币兑换原子币，将按市场价换算成等值人名币进行统计</p>
              </div>
              <div class="textInfo">
                <div class="info info1">
                  <p class="infoTitleContainer">
                    <span class="infoIcon">1</span>
                    <span class="infoTitle">什么是参与金额?</span>
                  </p>
                  <div
                    class="infoContent"
                  >你通过原子链官方网站进入获得原子币所付出的人名币金额，比如你在原子链商城购买产品3000块，或者币币兑换原子币，付出3000块人名币等值的加密货币。</div>
                </div>
                <div class="info info2">
                  <p class="infoTitleContainer">
                    <span class="infoIcon">2</span>
                    <span class="infoTitle">什么是直接奖励?</span>
                  </p>
                  <div class="infoContent">A发注册码给B，B注册获得原子币，奖励A，叫做直推奖励</div>
                </div>
                <div class="info info3">
                  <p class="infoTitleContainer">
                    <span class="infoIcon">3</span>
                    <span class="infoTitle">奖励的币种有哪些?分别如何获取?</span>
                  </p>
                  <div class="infoContent">奖励的币种跟被邀请人获取原子币所付出得币种是一致的。目前我们的奖励有：原子币，人民币，比特币，以太坊，USDT.</div>
                </div>
                <div class="info info4">
                  <p class="infoTitleContainer">
                    <span class="infoIcon">4</span>
                    <span class="infoTitle">如何计算团队业绩?</span>
                  </p>
                  <div
                    class="infoContent"
                  >A发注册码给B，B发给C，C到D......形成一条直线：A,B, C,D...XYZ这一条直线上和旁边线的所有人都是你的团队，每个人的业绩都是你团队的业绩.</div>
                </div>
                <div class="info info5">
                  <p class="infoTitleContainer">
                    <span class="infoIcon">5</span>
                    <span class="infoTitle">什么是分红奖励?</span>
                  </p>
                  <div class="infoContent">
                    <p>通过大数据算法，我们能分析出你的原子链事业当中的努力。就算你分享原子链到几个群，我们都能捕捉到你的劳动。我们根据大数据算法奖励您的每一份劳动和努力。要想提高分红奖励，一定要做好以下几点:</p>
                    <p>1.邀请的人越多越好</p>
                    <p>2.被邀请人获得原子币数量越多越好</p>
                    <p>3.团队业绩越高越好</p>
                  </div>
                </div>
                <div class="info info1">
                  <p class="infoTitleContainer">
                    <span class="infoIcon">6</span>
                    <span class="infoTitle">神秘大奖</span>
                  </p>
                  <div class="infoContent">
                    <p>团队业绩达到100W 抽奖华为手机Mate 20X（每次大会抽奖次数=团队业绩/100万，直到中奖为止）</p>
                    <p>团队业绩达到200W 抽奖苹果手机iphone XS Mas（每次大会抽奖次数=团队业绩/200万，直到中奖为止）</p>
                    <p>团队业绩达到400W 抽奖10万元左右的轿车（每次大会抽奖次数=团队业绩/400万，直到中奖为止）</p>
                    <p>团队业绩达到600W 抽奖奔驰轿车（每次大会抽奖次数=团队业绩/600万，直到中奖为止）</p>
                    <p>团队业绩达到1000W 抽奖特斯拉轿车（每次大会抽奖次数=团队业绩/1000万，直到中奖为止）</p>
                  </div>
                </div>
                <div class="info info1">
                  <p class="infoTitleContainer">
                    <span class="infoIcon">7</span>
                    <span class="infoTitle">如何升级?</span>
                  </p>
                  <div class="infoContent">
                    <p>1.通过场外获取、币币兑换、原子链商城获得原子币就能升级;</p>
                    <p>2.团队业绩做的越高，下属越多，升级越快</p>
                    <p>以上两点两手抓，两手硬。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: "rewardRules",
  data() {
    return {
      columns2: [
        {
          title: "我的奖励级别",
          key: "",
          align: "center"
        },
        {
          title: "参与金额",
          key: "salary",
          align: "center"
        },
        {
          title: "直推奖励",
          key: "reward",
          align: "center"
        },
        {
          title: "团队业绩",
          key: "performance",
          align: "center"
        }
      ],
      data5: [
        {
          salary: "0",
          reward: "8%",
          performance: "14%"
        }
      ]
    };
  }
};
</script>

<style lang="less">
.rewardRules {
  background: #f5f5f5;
  table {
    width: 100%;
    border-collapse: collapse;
    tr {
      td {
        padding: 10px 0;
        font-size: 14px;
        color: rgba(51, 51, 51, 1);
        text-align: center;
      }
    }
  }
  .myRewardLevel {
    background: #fff;
    td {
      border: 1px solid #f5f5f5;
    }
    tr:nth-child(n + 2) {
      td {
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
  .ruleIntroduction {
    margin-top: 10px;
    padding: 20px 10px;
    border: 2px dashed #ccc;
    .ruleItem {
      .ruleTitleContainer {
        margin-bottom: 20px;
        .iconRow {
          display: inline-block;
          width: 40px;
          height: 2px;
          vertical-align: middle;
          background: #00a0ea;
        }
        .ruleTitle {
          margin: 0 10px;
          display: inline-block;
          color: #333;
          vertical-align: middle;
          font-size: 16px;
          font-weight: bold;
        }
      }
      .ruleContent {
        color: #333;
        font-size: 14px;
      }
    }
    .ruleItem1 {
      .ruleContent {
        text-align: left;
        line-height: 20px;
      }
    }
    .ruleItem2 {
      .ruleContent {
        // 表格介绍
        .dividendTable {
          tr {
            td {
              border: 1px solid #fff;
            }
            .grayBg {
              background: #f5f5f5;
            }
            .skyBuleBg {
              background: #dcf6ff;
            }
            .lightYellow {
              background: #faffdc;
            }
            .lightBuleBg {
              background: #dcfffa;
            }
            .OrangeBg {
              background: #fff0dc;
            }
            .lightPurpleBg {
              background: #dce7ff;
            }
          }
          tr:nth-child(1),
          tr:nth-child(2) {
            td {
              font-size: 16px;
              font-weight: bold;
            }
          }
          .tableInfo {
            color: #333;
            font-size: 12px;
            font-weight: 600;
            text-align: left;
            padding-top: 10px;
          }
        }
        // 文本介绍
        .textInfo {
          // margin-top: 20px;
          .info {
            margin-top: 20px;
            color: #333;
            font-size: 14px;
            line-height: 2;
            text-align: left;
            // 标题
            .infoTitleContainer {
              position: relative;
              font-size: 0;
              font-weight: 600;
              .infoIcon {
                position: absolute;
                top: 6px;
                left: 0;
                display: inline-block;
                width: 16px;
                height: 16px;
                color: #fff;
                font-size: 14px;
                line-height: 16px;
                text-align: center;
                vertical-align: middle;
                border-radius: 50%;
                background: #00a0ea;
              }
              .infoTitle {
                padding-left: 30px;
                display: inline-block;
                font-size: 14px;
                vertical-align: middle;
              }
            }
            // 内容
            .infoContent {
              padding-left: 30px;
            }
          }
        }
      }
    }
  }
}
</style>