<template>
  <div id="shipei">
    <mt-loadmore :top-method="loadTop" ref="loadmore">
      <div class="cont_box">
        <!-- <Header titleheader="赛尔链SAR" :isshowback="false"></Header> -->
        <div class="banner">
          <img src="../../static/img/banner.png">
          <img src="../../static/img/logo.png" class="logo">
          <div class="identity" v-show="UserGrade.NodeId==1">身份: 见习矿工</div>
          <div class="identity" v-show="UserGrade.NodeId==2">身份: 倔强青铜</div>
          <div class="identity" v-show="UserGrade.NodeId==3">身份: 混沌白银</div>
          <div class="identity" v-show="UserGrade.NodeId==4">身份: 分野黄金</div>
          <div class="identity" v-show="UserGrade.NodeId==5">身份: 成熟铂金</div>
          <div class="identity" v-show="UserGrade.NodeId==6">身份: 永恒钻石</div>
          <div class="status" v-show="UserGrade.UserStatus==0">状态: 未激活</div>
          <div class="status" v-show="UserGrade.UserStatus==1">状态: 有效</div>
          <div class="status" v-show="UserGrade.UserStatus==2">状态: 无效</div>
          <div class="tube">
            <div class="schedule">
              <p class="schedule_text">已挖矿：{{publicData.Num}}</p>
            </div>
          </div>
          <p class="banner_right_text">矿池总量：130,000,000</p>
        </div>
        <div class="data_list">
          <div class="data_item">
            <p class="data_item_text">全球矿工人数</p>
            <p class="data_item_num">{{publicData.Users}}</p>
          </div>
          <div class="data_item">
            <p class="data_item_text">今日奖池额度</p>
            <p class="data_item_num">{{publicData.Amount}}</p>
          </div>
          <div class="data_item">
            <p class="data_item_text">今日交易最多</p>
            <p class="data_item_num">{{publicData.Most}}</p>
          </div>
          <div class="data_item">
            <p class="data_item_text">今日激活最多</p>
            <p class="data_item_num">{{publicData.Active}}</p>
          </div>
        </div>
        <div class="data_block">
          <div class="data_block_title">
            <div
              class="title_item"
              :class="title_item==1?'title_item_select':''"
              @click="itemSelect(1)"
            >昨日排行</div>
            <div
              class="title_item"
              :class="title_item==2?'title_item_select':''"
              @click="itemSelect(2)"
            >我的矿池</div>
            <div
              class="title_item"
              :class="title_item==3?'title_item_select':''"
              @click="itemSelect(3)"
            >我的团队</div>
            <!-- <div
              class="title_item"
              :class="title_item==6?'title_item_select':''"
              @click="itemSelect(6)"
            >我的奖励</div>-->
          </div>
          <div class="data_nav">

            <!-- 
                ---
                弹窗列表组件------------
                ---- 

            -->
            <div class='listShowContainer'>
                <TeamList></TeamList>
            </div>  


            <div class="data_nav_block" v-show="title_item!=3">
              <div
                class="data_nav_item"
                :class="nav_item==1?'nav_item_select':''"
                @click="navItemSelect(1)"
                v-show="title_item==1"
              >
                交易排名
                <div class="nav_item_style" v-show="nav_item==1"></div>
              </div>
              <div
                class="data_nav_item"
                :class="nav_item==4?'nav_item_select':''"
                @click="navItemSelect(4)"
                v-show="title_item==1"
              >
                激活排名
                <div class="nav_item_style" v-show="nav_item==4"></div>
              </div>
              <div
                class="data_nav_item"
                :class="nav_item==2?'nav_item_select':''"
                @click="navItemSelect(2)"
                v-show="title_item==2"
              >
                资产明细
                <div class="nav_item_style" v-show="nav_item==2"></div>
              </div>
              <div
                class="data_nav_item"
                :class="nav_item==5?'nav_item_select':''"
                @click="navItemSelect(5)"
                v-show="title_item==2"
              >
                资金流水
                <div class="nav_item_style" v-show="nav_item==5"></div>
              </div>
              <div
                class="data_nav_item1"
                :class="nav_item==3?'nav_item_select':''"
                @click="navItemSelect(3)"
                v-show="title_item==4"
              >团队收益</div>
              <div class="data_nav_item2" v-show="title_item==4">
                <!-- <img
                  src="../../static\img\closeTeam.png"
                  width="26"
                  height="26"
                  class="closeTeam"
                  @click="itemSelect(3)"
                  alt
                >-->
              </div>
            </div>
            <div class="data_block">
              <!--            <template>-->
              <!--              <p class="none_data">暂无数据</p>-->
              <!--            </template>-->
              <div class="firstBolck" v-show="nav_item==1" v-for="jiaoyiIeam in jiaoyipaiming">
                <div class="rowfirst">
                  <div class="first_col">
                    <p>用户UID</p>
                    <p class="first_col_data">{{jiaoyiIeam.UserId}}</p>
                  </div>
                  <div class="first_col">
                    <p>日期</p>
                    <p class="first_col_data">{{jiaoyiIeam.StatDate}}</p>
                  </div>
                  <div class="third_col">
                    <p>交易数量</p>
                    <p class="third_col_data">{{jiaoyiIeam.TradeAmount}}</p>
                  </div>
                </div>
                <div class="rowfirst">
                  <div class="first_col">
                    <p>奖励数量</p>
                    <p class="first_col_data">{{jiaoyiIeam.GiftAmount}}</p>
                  </div>
                  <div class="first_col">
                    <p>奖池总额</p>
                    <p class="first_col_data">{{jiaoyiIeam.GiftPoolAmount}}</p>
                  </div>
                  <div class="third_col"></div>
                </div>
                <hr>
              </div>
              <div class="firstBolck" v-show="nav_item==4" v-for="jihuoIteam in jihuopaihang">
                <div class="rowfirst">
                  <div class="first_col">
                    <p>用户UID</p>
                    <p class="first_col_data">{{jihuoIteam.UserId}}</p>
                  </div>
                  <div class="first_col">
                    <p>日期</p>
                    <p class="first_col_data">{{jihuoIteam.StatDate}}</p>
                  </div>
                  <div class="third_col">
                    <p>激活人数</p>
                    <p class="third_col_data">{{jihuoIteam.ActiveUsers}}</p>
                  </div>
                </div>
                <div class="rowfirst">
                  <div class="first_col">
                    <p>奖励数量</p>
                    <p class="first_col_data">{{jihuoIteam.GiftAmount}}</p>
                  </div>
                  <div class="first_col">
                    <p>奖池总额</p>
                    <p class="first_col_data">{{jihuoIteam.GiftPoolAmount}}</p>
                  </div>
                  <div class="third_col"></div>
                </div>
                <hr>
              </div>
              <div class="firstBolck" v-show="nav_item==2">
                <div class="rowfirst">
                  <div class="first_col">
                    <p>矿池授信额度</p>
                    <p class="first_col_data">{{zichanmingxi.AllAmount}}</p>
                  </div>
                  <div class="first_col">
                    <p>待挖矿数量</p>
                    <p class="first_col_data">{{zichanmingxi.UsableAmount}}</p>
                  </div>
                  <div class="third_col">
                    <p>奖励笔数</p>
                    <p class="third_col_data">{{zichanmingxi.Num}}</p>
                  </div>
                </div>
                <div class="rowfirst">
                  <div class="first_col">
                    <p>日挖上限</p>
                    <p class="first_col_data">{{zichanmingxi.Used}}/{{zichanmingxi.UpLimit}}</p>
                  </div>
                  <div class="first_col">
                    <p>累计挖出数量</p>
                    <p class="first_col_data">{{zichanmingxi.Total}}</p>
                  </div>
                  <div class="third_col"></div>
                </div>
                <hr>
              </div>
              <div class="myTeam" v-show="title_item==4">
                <div class="firstBolck" v-for="TeamIteam in TeamData">
                  <div class="rowsecond">
                    <div class="second_col">
                      <div class="col_block">
                        <p class="first_col_text">用户UID：</p>
                        <p class="first_col_data">{{TeamIteam.UserId}}</p>
                      </div>
                      <div class="col_block">
                        <p class="first_col_text">交易对：</p>
                        <p class="first_col_data">SAR/USDT</p>
                      </div>
                      <div class="col_block">
                        <p class="first_col_text">订单成交日期：</p>
                        <p class="first_col_data">{{TeamIteam.OrderDate}}</p>
                      </div>
                    </div>
                    <div class="second_col">
                      <div class="col_block">
                        <p class="first_col_text">用户身份：</p>
                        <p class="first_col_data">{{TeamIteam.NodeId}}</p>
                      </div>
                      <div class="col_block">
                        <p class="first_col_text">奖励数量：</p>
                        <p class="first_col_data">{{TeamIteam.GiftNum}}</p>
                      </div>
                      <div class="col_block">
                        <p class="first_col_text">收益发放时间：</p>
                        <p class="first_col_data">{{TeamIteam.CalcTime}}</p>
                        <!-- <p class="first_col_data_shijian">(16:50:36)</p> -->
                      </div>
                    </div>
                  </div>
                  <hr>
                </div>
                <div class="fenye" v-show="Teamtotal>10">
                  <span class="shang">
                    <img src="../../static/img/zuo.png" alt>
                  </span>
                  <!-- <span class="pageStyle" :class="selcectItem==1?'selcectItem':''" v-show="Teamtotal>10" v-for="n in Teamcurrent">n</span> -->
                  <!-- <span class="pageStyle">…</span> -->
                  <span class="xia">
                    <img src="../../static/img/you.png" alt>
                  </span>
                </div>
              </div>
              <div class="zijin_data_block">
                <div class="data_nav_caozuo" v-show="nav_item==5">
                  <span class="data_nav_text">操作类型</span>
                  <select name id class="data_nav_select" v-model="type">
                    <option value="-1">全部</option>
                    <option value="0">推荐奖励</option>
                    <option value="1">买入释放</option>
                    <option value="2">系统划入</option>
                    <option value="3">注册奖励</option>
                    <option value="4">系统扣除</option>
                  </select>
                  <span class="nav_nav_start" @click="openStartPicker">开始日期</span>
                  <mt-datetime-picker ref="start" type="date" v-model="startDate"></mt-datetime-picker>
                  <span class="nav_nav_zhi">至</span>
                  <span class="nav_nav_end" @click="openEndPicker">结束日期</span>
                  <mt-datetime-picker ref="end" type="date" v-model="endDate"></mt-datetime-picker>
                  <button class="data_nav_button" @click="getZijinData">查询</button>
                </div>
                <!--              <p class="none_data" v-show="nav_item==2">暂无数据</p>-->
                <div class="showzijinData">
                  <table v-show="nav_item==5">
                    <tr>
                      <th>币种</th>
                      <th>时间</th>
                      <th>操作类型</th>
                      <th>数量</th>
                      <th>余额</th>
                    </tr>
                    <tr v-for="zijin in zijinliushui">
                      <td>{{zijin.Symbol}}</td>
                      <td>{{zijin.TradeTime}}</td>
                      <td v-show="zijin.Type==0">推荐奖励</td>
                      <td v-show="zijin.Type==1">买入释放</td>
                      <td v-show="zijin.Type==2">系统划入</td>
                      <td v-show="zijin.Type==3">注册奖励</td>
                      <td v-show="zijin.Type==4">系统扣除</td>
                      <td>{{zijin.Num}}</td>
                      <td>{{zijin.Freeze}}</td>
                    </tr>
                  </table>
                  <div class="fenye" v-show="nav_item==5&&Zijintotal>10">
                    <span class="shang" @click="Zijinshang"><</span>
                    <!-- <span class="pageStyle" v-show="Zijintotal>10" v-for="n in Zijincurrent">n</span> -->
                    <!-- <span class="pageStyle">…</span> -->
                    <span class="xia" @click="Zijinxia">></span>
                  </div>
                  <table v-show="title_item==3">
                    <tr>
                      <th>好友等级</th>
                      <th>邀请人数</th>
                      <th>激活人数</th>
                      <th>累计奖励</th>
                      <th>操作</th>
                    </tr>
                    <tr v-for="(team,index) in MyTeam">
                      <td>{{team.Level}}</td>
                      <td>{{team.InviteNum}}</td>
                      <td>{{team.ActiveNum}}</td>
                      <td>{{team.GiftSum}}</td>
                      <td>
                        <button class="chakan" @click="getTeamData(team.Level)">查看</button>
                      </td>
                    </tr>
                  </table>
                  


                  <!-- <table v-show="title_item==6">
                    <tr>
                      <th>币种</th>
                      <th>时间</th>
                      <th>操作类型</th>
                      <th>奖励数量</th>
                    </tr>
                    <tr v-for="(team,index) in MyTeam">
                      <td>{{team.Level}}</td>
                      <td>{{team.InviteNum}}</td>
                      <td>{{team.ActiveNum}}</td>
                      <td>{{team.GiftSum}}</td>
                      <td>
                        <button class="chakan" @click="getTeamData(6,team.Level)">查看</button>
                      </td>
                    </tr>
                  </table>-->
                </div>
              </div>
            </div>

            

          </div>
        </div>
        <div class="xieyi_box">
          <div class="xieyi" :class="{xieyi_show:isShowXieYi}">
            <button class="xieyi_btn" @click="showXieyi">
              规则说明
              <span class="xieyi_xia">∨</span>
            </button>
            <div class="xie_cont">
              <p class="xieyi_title">赛尔链SAR交易挖矿制度</p>
              <p class="xieyi_first">一、注册即送</p>
              <div class="xieyi_first_text">
                1.新用户注册即送10000个SAR赛尔链的矿池授信额度，通过买入SAR进行交易挖矿的有效释放。
                <br>2.直接推荐人奖励2000个SAR的矿池授信额度，推荐奖励无上限。
                <br>3.若用户连续15天没有完成至少一笔买入SAR的成交订单，则视为账号失效，自动收回所有剩余待挖矿数量。
              </div>
              <p class="xieyi_first">二、挖矿释放</p>
              <div class="xieyi_first_text">
                1.按用户每天买入SAR的前10笔订单的0.5%进行挖矿释放，普通用户每天最多释放150枚SAR。
                <br>2.用户可通过推广邀请好友加入挖矿来提高每日上限，每日最高可释放300枚。
                <br>3.买入和卖出SAR的交易手续费均为0.1%
              </div>
              <p class="xieyi_first">三、分享得奖</p>
              <div class="xieyi_first_text">
                1.您可获得好友买入SAR的交易手续费的邀请返佣奖励，次日结算到账。
                <br>2.您可获得第一级好友的买入交易手续费的18%，第二级好友的买入交易手续费的15%，第三级好友的买入交易手续费的12%。
                <br>3.若用户连续15天没有完成至少一笔买入SAR的成交订单，则视为账号失效，自动收回手续费返佣的权益，不再享有好友的交易手续费的奖励。
              </div>
              <p class="xieyi_first">四、排名夺宝</p>
              <div class="xieyi_first_text">
                1.每日所有用户买入SAR的交易手续费的10%放入当日奖池。
                <br>2.每日买卖交易量最大的用户，获得奖池50%的奖励。
                <br>3.每日邀请有效激活的好友人数最多的用户，获得奖池50%的奖励。
                <br>4.若出现多个并列排名第一的用户，则均分对应的奖励。
              </div>
              <p class="xieyi_first">五、矿工节点</p>
              <div class="xieyi_first_text">
                1.系统根据用户邀请的有效激活的好友数量，进行判定节点身份和权益。
                <br>2.直推好友和三代好友的人数必须同时满足条件，才可以升级为为对应的级别。
                <br>3.至尊星耀：直接推荐的5人为倔强青铜，则升级为至尊星耀，奖励本团队所有的有效激活用户购买SAR交易手续费的20%分润.
                <br>4.合伙人：团队5个区域的三代有效激活用户里，分别产生至尊星耀（即各区至少有1个至尊星耀），并且旗下团队的用户交易活跃度达60%以上，升级为合伙人。合伙人获得交易所的所有会员购买SAR手续费的20%分润。其中，10%为所有合伙人平均分配，10%按各合伙人团队业绩比例分配。
                <br>
                <br>
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td>矿工级别</td>
                    <td colspan="2">升级条件</td>
                    <td>释放比例</td>
                    <td>每日上限</td>
                  </tr>
                  <tr>
                    <td>见习矿工</td>
                    <td colspan="2">新用户注册激活</td>
                    <td>1.50%</td>
                    <td>150枚</td>
                  </tr>
                  <tr>
                    <td>倔强青铜</td>
                    <td>直接推荐激活3人</td>
                    <td>团队三代激活40人</td>
                    <td>1.70%</td>
                    <td>170枚</td>
                  </tr>
                  <tr>
                    <td>混沌白银</td>
                    <td>直接推荐激活5人</td>
                    <td>团队三代激活80人</td>
                    <td>1.90%</td>
                    <td>190枚</td>
                  </tr>
                  <tr>
                    <td>分野黄金</td>
                    <td>直接推荐激活8人</td>
                    <td>团队三代激活120人</td>
                    <td>2.20%</td>
                    <td>220枚</td>
                  </tr>
                  <tr>
                    <td>成熟铂金</td>
                    <td>直接推荐激活12人</td>
                    <td>团队三代激活160人</td>
                    <td>2.60%</td>
                    <td>260枚</td>
                  </tr>
                  <tr>
                    <td>永恒钻石</td>
                    <td>直接推荐激活15人</td>
                    <td>团队三代激活200人</td>
                    <td>3.00%</td>
                    <td>300枚</td>
                  </tr>
                </table>
              </div>
              <p class="xieyi_first">六、其他相关</p>
              <div class="xieyi_first_text">
                1.为保障公平的交易环境和健康的市场秩序，避免不正当的恶意套利行为，自SAR交易挖矿上线之日起，用户提现T+1日审核，当日划入场外账户数量将被锁定暂不可卖出，次日9:00自动解锁。
                <br>2.SHARE（SAR）赛尔链对本制度享有最终解释权。
              </div>
            </div>
          </div>
        </div>
        <!-- <Footers></Footers> -->
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footers from "../components/Footers.vue";
import TeamList from "../components/TeamList.vue";
import { Toast, MessageBox, DatetimePicker, Loadmore } from "mint-ui";
import Vue from "vue";
import MintUI from "mint-ui";
Vue.use(MintUI, Toast, MessageBox, DatetimePicker, Loadmore);
export default {
  name: "home",
  data() {
    return {
      type: -1,
      Zijinpage: 1,
      Zijintotal: 0,
      Zijincurrent: 1,
      Teampage: 1,
      Teamtotal: 0,
      Teamcurrent: 1,
      startDate: "",
      endDate: "",
      selectedstartDate: "",
      selectedendDate: "",
      publicData: {},
      jiaoyipaiming: [],
      jihuopaihang: [],
      zichanmingxi: [],
      zijinliushui: [],
      MyTeam: [],
      UserGrade: {},
      TeamData: [],
      isShowXieYi: false,
      pickerValue: "",
      title_item: 1,
      nav_item: 1
    };
  },
  methods: {
    // 下拉刷新start
    loadTop() {
      // 定时器
      Promise.all([
        this.getPublic(),
        this.getJiaoyiData(),
        this.getUserGrade(),
        this.getZichanData()
      ])
        .then(res => {
          if (res.length) {
            // 不要问我为什么用500 毫秒的定时器，你可以去掉看看效果。闪一下很难受
            setTimeout(() => {
              this.$refs.loadmore.onTopLoaded();
              Toast({
                message: "刷新成功",
                duration: 2000
              });
            }, 500);
          }
        })
        .catch(err => {
          console.log(err);
          Toast({
            message: "刷新失败",
            duration: 2000
          });
        });
    },
    // 下拉刷新end
    getPublic() {
      this.axios.get("/open/api/public").then(res => {
        if (res.data.code == 100) {
          this.publicData = res.data.data;
          // console.log(this.publicData);
          for (let i in this.publicData) {
            if (this.publicData[i] == "") {
              this.publicData[i] = 0;
            }
          }
        }
      });
    },
    getUserGrade() {
      this.axios.post("/open/api/web/grade").then(res => {
        if (res.data.code == 100) {
          this.UserGrade = res.data.data;
        }
      });
    },
    getJiaoyiData() {
      this.axios.get("/open/api/web/tradetop").then(res => {
        if (res.data.code == 100) {
          this.jiaoyipaiming = res.data.data;
        }
      });
    },
    getJihuoData() {
      this.axios.get("/open/api/web/activetop").then(res => {
        if (res.data.code == 100) {
          this.jihuopaihang = res.data.data;
        }
      });
    },
    getZichanData() {
      this.axios.post("/open/api/web/wallet").then(res => {
        if (res.data.code == 100) {
          this.zichanmingxi = res.data.data;
        }
      });
    },
    Zijinshang() {
      this.Zijincurrent++;
    },
    Zijinxia() {
      this.Zijincurrent--;
    },
    getZijinData() {
      if (this.selectedstartDate != "" && this.selectedendDate != "") {
        this.startDate = this.tool.format(
          new Date(this.startDate),
          "yyyy-MM-dd"
        );
        this.endDate = this.tool.format(new Date(this.endDate), "yyyy-MM-dd");
      } else {
        delete this.startDate;
        delete this.endDate;
      }
      if (this.Zijincurrent > 1) {
        this.Zijinpage = this.Zijincurrent;
      }
      this.axios
        .post("/open/api/flow", {
          type: this.type,
          t1: this.startDate,
          t2: this.endDate,
          page: this.Zijinpage
        })
        .then(res => {
          if (res.data.code == 100) {
            this.zijinliushui = res.data.data.records;
            this.Zijintotal = res.data.data.total;
            this.Zijincurrent = res.data.data.current;
          }
        });
    },
    getMyTeamData() {
      this.axios.post("/open/api/web/team").then(res => {
        if (res.data.code == 100) {
          this.MyTeam = res.data.data;
        }
      });
    },
    getChakanTeamData(level) {
      this.axios.post("/open/api/web/teamdetail", { i: level }).then(res => {
        if (res.data.code == 100) {
          this.TeamData = res.data.data.records;
          this.Teamtotal = res.data.data.total;
        }
      });
    },
    getTeamData(level) {
      this.title_item = 4;
      
      this.getChakanTeamDatas = setInterval(() => {
          this.getChakanTeamData(level);
        },60000)
    },
    itemSelect(index) {
      this.title_item = index;
      this.nav_item = index;
      if (this.title_item == 2) {
        this.NavItem2 = setInterval(() => {
          this.getZichanData();
        },60000)
      }
      if (this.title_item == 3) {
        this.NavItem3 = setInterval(() => {
          this.getMyTeamData();
        },60000)
      }
    },
    showXieyi() {
      this.isShowXieYi = !this.isShowXieYi;
    },
    navItemSelect(index) {
      this.nav_item = index;
      if (this.nav_item == 1) {
        this.NavItem1 = setInterval(() => {
          this.getJiaoyiData();
        },60000)
      }
      if (this.nav_item == 2) {
        this.NavItem2 = setInterval(() => {
          this.getZichanData();
        },60000)
      }
      if (this.nav_item == 3) {
        this.NavItem3 = setInterval(() => {
          this.getMyTeamData();
        },60000)
      }
      if (this.nav_item == 4) {
        this.NavItem4 = setInterval(() => {
          this.getJihuoData();
        },60000)
        
      }
      if (this.nav_item == 5) {
         this.NavItem5 = setInterval(() => {
          this.getZijinData();
        },60000)
      }
    },
    openStartPicker() {
      if (this.selectedstartDate) {
        this.startDate = this.selectedstartDate;
      } else {
        this.startDate = new Date();
      }
      this.$refs.start.open();
    },
    openEndPicker() {
      if (this.selectedendDate) {
        this.endDate = this.selectedendDate;
      } else {
        this.endDate = new Date();
      }
      this.$refs.end.open();
    }
  },
  components: { Footers, Header , TeamList },
  mounted() {
    let url = window.location.href;
    let token = url.substring(url.indexOf("=") + 1, url.indexOf("#"));
    localStorage.setItem("token", token);
    this.getPublic();
    // 定时器
    this.getuserGradeTime = setInterval(() => {
      this.getJiaoyiData();
      this.getUserGrade();
    }, 60000);
  },
  // 生命周期销毁时 清除定时器
  destroyed() {
    clearInterval(this.getuserGradeTime);
    clearInterval(this.NavItem1);
    clearInterval(this.NavItem2);
    clearInterval(this.NavItem3);
    clearInterval(this.NavItem4);
    clearInterval(this.NavItem5);
    clearInterval(this.getChakanTeamDatas);
  }
};
</script>

<style lang="scss" scoped>
@import "src/common/css/mixin";
* {
  margin: 0;
  padding: 0;
}
#shipei {
  width: 100%;
  overflow-x: hidden;
  background: #080e25;
  padding-bottom: Rem(300);
}
.cont_box {
  // padding: Rem(43) 0;
  width: Rem(375);
  margin: 0 auto;
  background: #080e25;
}
.closeTeam {
  margin-top: Rem(3);
  text-align: right;
  margin-right: Rem(40);
}
.banner {
  width: Rem(375);
  position: relative;
  .logo {
    position: absolute;
    top: Rem(8);
    left: Rem(18);
    width: Rem(36);
    height: Rem(50);
  }
  img {
    width: 100%;
  }
  .identity {
    width: Rem(90);
    height: Rem(15);
    background-color: #24a6ff;
    font-size: Rem(11);
    color: #ffffff;
    border-radius: Rem(8);
    position: absolute;
    top: Rem(15);
    right: Rem(10);
    text-align: center;
  }
  .status {
    width: Rem(90);
    height: Rem(15);
    background-color: #13b887;
    font-size: Rem(11);
    color: #ffffff;
    border-radius: Rem(8);
    position: absolute;
    top: Rem(37);
    right: Rem(10);
    text-align: center;
  }
  .tube {
    position: absolute;
    left: Rem(18);
    top: Rem(142);
    width: Rem(340);
    height: Rem(16);
    background-color: #656565;
    border-radius: Rem(8);
    .schedule {
      width: Rem(144);
      height: Rem(15);
      background-color: #13b887;
      border-radius: Rem(8);
      .schedule_text {
        font-size: Rem(10);
        text-align: center;
        color: #ffffff;
      }
    }
  }
  .banner_right_text {
    font-size: Rem(10);
    color: #ffffff;
    position: absolute;
    right: Rem(17);
    top: Rem(168);
  }
}

.data_list {
  display: flex;
  margin-left: Rem(10);
  .data_item {
    width: Rem(85);
    height: Rem(50);
    background-color: #131d3d;
    margin-right: Rem(5);
    text-align: center;
    padding-bottom: Rem(10);
    .data_item_text {
      margin-top: Rem(11);
      font-size: Rem(12);
      color: #4683f5;
    }
    .data_item_num {
      font-size: Rem(13);
      color: #ffffff;
      margin-top: Rem(8);
    }
  }
}

.data_block {
  margin-bottom: Rem(10);
  .data_block_title {
    display: flex;
    margin-top: Rem(20);
    .title_item {
      width: Rem(95);
      height: Rem(30);
      line-height: Rem(30);
      font-size: Rem(15);
      text-align: center;
      color: #717b96;
    }
    .title_item_select {
      background-color: #4683f6;
      border-radius: Rem(15);
      color: #ffffff;
    }
  }
  .data_nav {
    margin: Rem(10);
    background-color: #131d3d;
    /*
        ****
        ****
        弹窗列表组件增加
        ****
        ****
    */
    position: relative;
    .listShowContainer{
        position: absolute;
        top: 0;
        width: 100%;
    }

    .nav_style_title {
      background-color: #131d3d;
      font-weight: bold;
    }
    .data_nav_block {
      display: flex;
      height: Rem(30);
      background-color: #202d5a;
      border-radius: Rem(5) Rem(5) 0 0;
      .data_nav_item {
        flex: 1;
        font-size: Rem(13);
        font-weight: bold;
        color: #717b96;
        text-align: center;
        height: Rem(30);
        line-height: Rem(30);

        .nav_item_style {
          width: Rem(50);
          height: Rem(2);
          background-color: #4683f6;
          margin: 0 auto;
        }
      }
      .data_nav_item1 {
        flex: 1;
        font-size: Rem(13);
        font-weight: bold;
        color: #717b96;
        height: Rem(30);
        line-height: Rem(30);
        margin-left: Rem(21);
      }
      .data_nav_item2 {
        flex: 1;
        text-align: right;
        font-size: Rem(13);
        font-weight: bold;
        color: #717b96;
        height: Rem(30);
        line-height: Rem(30);
        margin-left: Rem(21);
      }
      .nav_item_select {
        color: #ffffff;
      }
    }

    .data_block {
      padding-bottom: Rem(104);
      hr {
        border-color: #35445e;
      }
      .firstBolck {
        .rowfirst {
          margin-left: Rem(20);
          margin-top: Rem(7);
          margin-bottom: Rem(10);
          display: flex;
          color: #717b96;
          font-size: Rem(11);
          .first_col {
            flex: 1;
            .first_col_data {
              font-size: Rem(12);
              color: #ffffff;
            }
          }
          .third_col {
            flex: 1;
            text-align: center;
            .third_col_data {
              font-size: Rem(12);
              color: #ffffff;
              text-align: center;
            }
          }
        }
        .rowsecond {
          margin-left: Rem(10);
          margin-top: Rem(7);
          margin-bottom: Rem(10);
          display: flex;
          justify-content: space-around;
          color: #717b96;
          font-size: Rem(11);
          .second_col {
            flex: 1;
            .col_block {
              .first_col_text {
                width: Rem(85);
                float: left;
                text-align: right;
                padding-right: Rem(10);
                font-size: Rem(11);
              }
              .first_col_data {
                font-size: Rem(12);
                color: #ffffff;
              }
              .first_col_data_shijian {
                font-size: Rem(12);
                color: #ffffff;
                text-align: left;
                margin-left: Rem(95);
              }
            }
          }
          .third_col {
            flex: 1;
            text-align: center;
            .third_col_data {
              font-size: Rem(12);
              color: #ffffff;
              text-align: center;
            }
          }
        }
      }
      .firstBolck {
        .rowfirst {
          margin-left: Rem(20);
          margin-top: Rem(7);
          margin-bottom: Rem(10);
          display: flex;
          color: #717b96;
          font-size: Rem(11);
          .first_col {
            flex: 1;
            .first_col_data {
              font-size: Rem(12);
              color: #ffffff;
            }
          }
          .third_col {
            flex: 1;
            text-align: center;
            .third_col_data {
              font-size: Rem(12);
              color: #ffffff;
              text-align: center;
            }
          }
        }
      }
      .none_data {
        font-size: Rem(11);
        color: #105380;
        padding-left: Rem(156);
        padding-top: Rem(30);
      }
    }

    .zijin_data_block {
      .data_nav_caozuo {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: Rem(10);
        .data_nav_text {
          color: #ffffff;
          font-size: Rem(10);
        }
        .data_nav_select {
          width: Rem(75);
          height: Rem(20);
          margin: 0 Rem(11);
          background-color: #29364b;
          color: #ffffff;
          border-radius: Rem(10);
          border: Rem(1) solid #46587b;
        }
        .nav_nav_start {
          font-size: Rem(11);
          color: #ffffff;
          margin-right: Rem(10);
        }
        .nav_nav_zhi {
          font-size: Rem(11);
          color: #ffffff;
        }
        .nav_nav_end {
          margin-left: Rem(10);
          font-size: Rem(11);
          color: #ffffff;
        }
        .data_nav_button {
          margin-left: Rem(10);
          width: Rem(45);
          height: Rem(20);
          background-color: #24a6ff;
          border-radius: Rem(10);
          border: 0;
          color: #ffffff;
          font-size: Rem(11);
        }
      }
      .none_data {
        font-size: Rem(11);
        color: #105380;
        padding: Rem(55) Rem(151) Rem(85);
      }
      .showzijinData {
        table {
          margin-top: Rem(11);
          width: 100%;
          th {
            background-color: #375482;
            font-size: Rem(11);
            color: #717b96;
            padding: Rem(7) 0;
          }
          td {
            text-align: center;
            font-size: Rem(11);
            font-weight: bold;
            color: #ffffff;
            padding: Rem(7) 0;
          }
        }
        .chakan {
          margin-left: Rem(10);
          width: Rem(45);
          height: Rem(17);
          background-color: #4683f6;
          border-radius: Rem(5);
          border: 0;
          color: #ffffff;
          font-size: Rem(11);
        }
      }
    }

    //分页样式
    .fenye {
      margin-top: Rem(10);
      display: flex;
      align-items: center;
      justify-content: center;
      .shang {
        font-size: Rem(25);
        margin-right: Rem(20);
        color: #ffffff;
      }
      .pageStyle {
        background-color: #24a6ff;
        font-size: Rem(11);
        color: #ffffff;
        padding: Rem(5) Rem(10);
        border-radius: Rem(3);
        margin-right: Rem(10);
      }
      .xia {
        margin-left: Rem(10);
        font-size: Rem(25);
        color: #ffffff;
      }
      .selcectItem {
        background: #24a6ff;
      }
    }
  }
}
.xieyi_box {
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 31px;
  .xieyi {
    width: Rem(375);
    height: Rem(25);
    overflow: hidden;
    background-color: #131d3d;
    .xieyi_btn {
      position: absolute;
      top: Rem(3);
      left: Rem(132);
      width: Rem(90);
      height: Rem(20);
      background-color: #1d2635;
      border: 1px solid #24a6ff;
      border-radius: Rem(20);
      font-size: Rem(13);
      color: #ffffff;
      .xieyi_xia {
        font-size: Rem(13);
      }
    }
    .xie_cont {
      margin-left: Rem(20);
      margin-right: Rem(35);
    }
    .xieyi_title {
      margin-top: Rem(42);
      color: #ffffff;
      font-size: Rem(13);
      margin-bottom: 30px;
    }
    .xieyi_first {
      margin-top: Rem(31);
      margin-bottom: Rem(17);
      font-size: Rem(12);
      color: #24a6ff;
    }
  }
  .xieyi_show {
    height: 1414px;
  }
  .xieyi_first_text {
    font-size: Rem(11);
    color: #ffffff;
    table {
      // margin-left: Rem(-10);
      width: Rem(340);
      height: Rem(143);
    }
    table tr td {
      font-size: 5px;
      // white-space: nowrap;
      text-align: center;
      border: 1px solid #ffffff;
    }
  }
}
</style>
