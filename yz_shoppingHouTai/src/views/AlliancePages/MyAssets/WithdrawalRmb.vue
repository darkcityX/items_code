<template>
	<div class="withdrawalRmb">
		<Row>
			<Col span="12" offset="6">
				<p class="pageTitle">
					<span>提现人民币</span>	
				</p>
				<div class="pageContent">
					<div class="submitSalary">
						<Input v-model="submitSalary" placeholder="请输入提取金额"/>
					</div>
					<div class="paymentMethod">
						<p class="paymentMethodTitle">请选择收款方式</p>
						<div class="paymentMethodConatiner">
							<div class="item">
								<Row>
									<Col span="21">
										<div class="method">
											<Radio v-model="alipaySelected">支付宝</Radio>	
										</div>	
										<Input v-model="userInfo.user.alipayAccount" readonly placeholder="您还没有绑定过支付宝"/>
									</Col>
									<Col class="bangdingConatiner" span="3">
										<router-link class="tobangding" to="/AlliancePage/myAssets/alipay">绑定</router-link>
									</Col>
								</Row>
							</div>
							<div class="item">
								<Row>
									<Col span="21">
										<div class="method">
											<Radio v-model="weChatSelected">微信</Radio>
										</div>
										<Input v-model="userInfo.user.wechatId" readonly placeholder="您还没有绑定过微信"/>
									</Col>
									<Col class="bangdingConatiner" span="3">
										<router-link class="tobangding" to="/AlliancePage/myAssets/weChat">绑定</router-link>
									</Col>
								</Row>
							</div>
							<div class="item">
								<Row>
									<Col span="21">
										<div class="method">
											<Radio v-model="blankSelected">银行卡</Radio>
										</div>
										<Input v-model="userInfo.user.bankCardNumber" readonly placeholder="您还没有绑定过银行卡"/>
									</Col>
									<Col class="bangdingConatiner" span="3">
										<router-link class="tobangding" to="/AlliancePage/myAssets/bankCard">绑定</router-link>
									</Col>
								</Row>
							</div>
						</div>
					</div>
					<div class="note">
						<span class="title">注意</span>
						<div class="noteItems">
							<p>1.提现需要扣去10%的个税</p>
							<p>2.单笔最小提现额为100元</p>
							<p>3.如果兑换成原子币,不收税,额外再奖励10%</p>
						</div>
					</div>
				</div>
				<div class="submitBtn">
					<Row>
						<Col span="10" offset="2">
							<Button @click="checkFrom();">提现</Button>
						</Col>
						<Col span="10" offset="2">
							<Button type="info" @click="goToOther();">兑换成原子币</Button>
						</Col>
					</Row>
				</div>
			</Col>
		</Row>
		<!-- 3、客服弹出窗 -->
		<div class="keFuContainer" v-show="iskeFuViewModel">
			<div class="keFuView">
				<p class="title">提示</p>
				<p class="success">您已成功体现<span>￥{{submitSalary}}元</span>,客服正在处理中......</p>
				<p class="kefuWorkTime">工作时间:早9:00————晚5:00</p>
				<Button @click="closeKeFu();" type="info">确认</Button>	
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'WithdrawalRmb',
		data(){
			return {
				// 提现金额
				submitSalary: "",

				// 提现方式
				alipaySelected : false,
				weChatSelected : false,
				blankSelected : false,


				// 客户弹窗
				iskeFuViewModel: false,

				// 用户相关信息
				userInfo : {}
			}
		},
		created: function(){
			this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
			console.log( this.userInfo );
		},
		watch:{
			alipaySelected( val ){
				if ( val ){
					this.weChatSelected = false;
					this.blankSelected = false;
				}
			},
			weChatSelected( val ){
				if( val ){
					this.alipaySelected = false;
					this.blankSelected = false;
				}
			},
			blankSelected( val ){
				if( val ){
					this.alipaySelected = false;
					this.weChatSelected = false;
				}
			}
		},
		methods:{
			closeKeFu(){
				this.iskeFuViewModel = false;	
			},
			goToOther(){
				this.$router.push({ path:'/AlliancePage/myAssets/exchange'});
			},
			checkFrom(){
				if( !this.submitSalary ){
					this.$Message.error("请输入要提现的金额!");
				}else if( (this.submitSalary*1) < 100 ){
					this.$Message.error("单笔最小提现金额为100元!");
				}else if( !this.alipaySelected && !this.weChatSelected && !this.blankSelected ){
					this.$Message.error("请选择收款方式!");
				}else if( this.alipaySelected && !this.userInfo.user.alipayAccount ){
					this.$Message.error("请绑定支付宝!");
				}else if( this.weChatSelected && !this.userInfo.user.wechatId ){
					this.$Message.error("请绑定微信!");
				}else if( !this.blankSelected && !this.userInfo.user.bankCardNumber ){
					this.$Message.error("请绑定银行卡!");
				}else{
					// alert("-------- 验证成功 --------------");
					let selected = this.weChatSelected ? "1" : this.weChatSelected ? "2" : "3";
					this.getBinding(this.submitSalary,selected);
				}
			},
			// 发送请求
			getBinding(withdrawalAmount,accountType){

				this.$axios.post('api/withdrawalRecord/withdrawRMB',{
					withdrawalAmount : withdrawalAmount,
					accountType : accountType
				}).then(res=>{
					this.iskeFuViewModel = true;
				}).catch(err=>{
					console.log(err.data);
					if( err.data.code == '400' ){
						this.$Message.error("提取失败，余额不足!");	
					}else{
						this.$Message.error("提取失败，请稍后再试!");	
					}
				});

			}
			
		}	
	}
</script>

<style lang="less">
	.withdrawalRmb{
		padding: 40px 0;
		min-height: 760px;
		background: rgb(255, 255, 255); 
		.pageTitle{
			color:rgba(34,34,34,1);
			font-size:16px;
			font-weight:400;
			span{
				position: relative;
				margin: 0 auto;
				padding: 0 10px;
				display: inline-block;
				height: 32px;
				border-bottom: 2px solid rgba(0,160,234,1);
				&:after{
					position: absolute;
					top: 32px;
					left: 42%;
					display: block;
					content: "";
					width: 0;   
					border:  8px solid #fff;  
					border-color: transparent; 
					border-top-color: #00A0EA;
				}
			}
		}	
		.pageContent{
			margin-top: 60px;
			.submitSalary{
				.ivu-input{
					height: 50px;
					color: #333;
					font-size: 20px;
					text-align: center;
					border: none;
					border-radius: 0;
                    border-bottom: 1px solid #333;
                    box-shadow: none;
				}
			}
			.paymentMethod{
				margin: 40px 0;
				.paymentMethodTitle{
					color: #333;
					font-size: 14px;
					margin-bottom: 20px;
				}
				.paymentMethodConatiner{
					.item{
						margin-bottom: 10px;
						position: relative;
						.method{
							position: absolute;
							top: 0;
							left: 0;
							width: 60px;
							height: 50px;
							line-height: 50px;
							text-align: left;
						}
						.ivu-input-wrapper{
							padding-left: 70px;
							border-bottom: 1px solid #333;
							.ivu-input{
								height: 50px;
								font-size: 14px;
								border: none;
								border-radius: 0;
                                text-align: right;
                                box-shadow: none;
							}
						}
						.bangdingConatiner{
							position: relative;
							display: inline-block;
							min-width: 28px;
							min-height: 50px;
							height: 50px;	
							a{
								position: absolute;
								left: 10px;
								bottom: 0;
								display: inline-block;
								color: #00A0EA;	
								min-width: 28px;
								white-space: nowrap;
								text-decoration:underline
							}	
						}
					}	
				}

			}
			.note{
				margin-bottom: 60px;
				position: relative;
				.title{
					position: absolute;
					left: 0;
					top: 0;
					font-size:16px;
					font-weight:400;
					color:rgba(51,51,51,1);
					width: 40px;
					text-align: left;
				}
				.noteItems{
					width: 100%;
					padding-left: 44px;
					text-align: left;
					p{
						margin-bottom: 10px;
						font-size:14px;
						font-family:MicrosoftYaHei;
						font-weight:400;
						color:rgba(102,102,102,1);
					}
					p:last-child{
						margin-bottom: 0;
					}
				}
			}

		}
		.submitBtn{
			button{
				width: 100%;
				height: 50px;
				font-size: 14px;
			}
		}	
	}	
	// 客服弹窗
	.keFuContainer {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
		overflow: hidden;
		.keFuView {
			position: relative;
			margin: 0 auto;
			margin-top: 10%;
			padding: 40px 0;
			max-width: 440px;
			max-height: 560px;
			border-radius: 8px;
			background: #fff;
			.title{
				margin-bottom: 20px;
				font-size:18px;
				font-weight:400;
				color:rgba(34,34,34,1);
			}
			.success{
				margin-bottom: 20px;
				color:rgba(51,51,51,1);
				font-size:16px;
				font-weight:400;
			}
			.kefuWorkTime{
				margin-bottom: 20px;
				font-size:14px;
				font-weight:400;
				color:rgba(51,51,51,1);
			}
			button{
				min-width: 260px;
				height: 50px;
				font-size: 16px;
			}
			
		}
	}
</style>