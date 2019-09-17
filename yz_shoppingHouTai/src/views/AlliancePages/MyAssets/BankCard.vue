<template>
  <div class="bankCard">
    <!-- <p>【银行卡绑定】页面/【绑定成功】提示框</p> -->
    <Row>
      <Col span="12" offset="6">
        <p class="pageTitle">
          <span>绑定银行卡</span>
        </p>
        <div class="pageContent">
          <Row class="alipayCode">
            <Col span="8">
              <label>请选择银行:</label>
            </Col>
            <Col span="12">
              <Select @on-change="showOption">
                <Option
                  v-for="item in bankCardList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
          <Row class="alipayUserName">
            <Col span="8">
              <label>姓名：</label>
            </Col>
            <Col span="12">
              <Input v-model="submitfrom.bankCardName" placeholder="请输入个人真实姓名"/>
            </Col>
          </Row>
          <Row class="verificationCode">
            <Col span="8">
              <label>请输入卡号:</label>
            </Col>
            <Col span="12">
              <Input v-model="submitfrom.bankCardNumber" placeholder="请输入银行卡号"/>
            </Col>
          </Row>
          <Row class="phone">
            <Col span="8">
              <label>银行预留手机号:</label>
            </Col>
            <Col span="12">
              <Input v-model="submitfrom.bankCardPhone" placeholder="请输入手机号"/>
            </Col>
          </Row>
        </div>
        <div class="submitBtn">
          <Row>
            <Col span="18" offset="4">
              <Button @click="checkFrom();" type="primary">绑定银行卡</Button>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
    <!-- 绑定成功提示框 -->
    <!-- 3、登陆成功跳转提示框 -->
    <div class="successBinding" v-show="isView">
      <Row>
        <Col span="4" offset="10">
          <div class="successTip">
            <p>绑定成功!</p>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
	export default {
		name: "bankCard",
		data() {
			return {
				// 绑定弹窗
				isView : false,

				bankCardList: [
					{
						value: "中国人民银行",
						label: "中国人民银行"
					},
					{
						value: "中国建设银行",
						label: "中国建设银行"
					}
				],

				submitfrom: {
					selectBank : '',
					bankCardName : '',
					bankCardNumber : '',
					bankCardPhone : ''
				},

				

			};
		},
		methods: {
			showOption( val ){
				console.log( val );
				this.submitfrom.selectBank = val;
			},
			checkFrom(){
				if( !this.submitfrom.selectBank ){
					this.$Message.error("请选择你要提现的银行!");
				}else if( !this.submitfrom.bankCardName ){
					this.$Message.error("请输入您的姓名!");
				}else if( !this.submitfrom.bankCardNumber ){
					this.$Message.error("请输入银行卡号!");
				}else if( !this.submitfrom.bankCardPhone ){
					this.$Message.error("请输入银行预留手机号!");
				}else if (!/^1[34578]\d{9}$/.test(this.submitfrom.bankCardPhone)) {
        			this.$Message.error("请输入正确的手机号码!");
      			}else{
					this.getBinding();
				}
			},
			getBinding(){
				this.$axios.post('api/user/bindBankCard',{
					bank_card_number : this.submitfrom.bankCardNumber,
					bank_card_name : this.submitfrom.bankCardName,
					bank_card_phone : this.submitfrom.bankCardPhone
				}).then(res=>{
					console.log( res );
					let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

					userInfo.user.bankCardName = this.submitfrom.bankCardName;
					userInfo.user.bankCardNumber = this.submitfrom.bankCardNumber;
					userInfo.user.bankCardPhone = this.submitfrom.bankCardPhone;
					sessionStorage.setItem("userInfo", JSON.stringify(userInfo));

					this.isView = true;
					let id = setTimeout(function() {
						_this.isView = false;   
						clearTimeout(id);
					}, 3000);


				}).catch(err=>{
					console.log( err );
					this.$Message.error(err.data.msg);
				});
			}
		}
	};
</script>

<style lang="less">
.bankCard {
  padding: 100px 0;
  min-height: 760px;
  .pageTitle {
    color: rgba(34, 34, 34, 1);
    font-size: 16px;
    font-weight: 400;
    span {
      position: relative;
      margin: 0 auto;
      padding: 0 10px;
      display: inline-block;
      height: 32px;
      border-bottom: 2px solid rgba(0, 160, 234, 1);
      &:after {
        position: absolute;
        top: 32px;
        left: 42%;
        display: block;
        content: "";
        width: 0;
        border: 8px solid #fff;
        border-color: transparent;
        border-top-color: #00a0ea;
      }
    }
  }
  .pageContent {
    margin: 40px 0;
    > div {
      margin-bottom: 20px;
      label {
        padding: 0 10px;
        display: block;
        font-size: 14px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        height: 50px;
        line-height: 50px;
        text-align: right;
        white-space: nowrap;
      }
      input {
        height: 50px;
      }
      .ivu-select-selection {
        height: 50px;
        .ivu-select-placeholder {
          display: none;
          height: 50px;
          line-height: 50px;
        }
        .ivu-select-selected-value {
          height: 50px;
          line-height: 50px;
        }
        // ICON
        .ivu-icon {
          // top: 7px;
          // right: 0px;
          // font-size: 32px;
          // height: 48px;
          // line-height: 48px;
          // width: 50px;
          // border-radius: 0 4px 4px 0;
          // background: #666666;
        }
      }
    }
  }
  .submitBtn {
    button {
      width: 100%;
      font-size: 16px;
      height: 50px;
      background: #00a0ea;
    }
  }
  .successBinding {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    .successTip {
      margin: 0 auto;
      margin-top: 100%;
      padding: 20px 0;
      width: 100%;
      border-radius: 8px;
      background: rgba(0, 0, 0, 0.6);
      p {
        font-size: 16px;
        color: #fff;
      }
    }
  }
}
</style>