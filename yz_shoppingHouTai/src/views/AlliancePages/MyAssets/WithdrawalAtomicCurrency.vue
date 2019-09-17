<template>
	<div class="WithdrawalAtomicCurrency">
		<Row>
			<Col span="12" offset="6">
				<p class="pageTitle">
					<span>提现原子币</span>	
				</p>
				<div class="pageContent">
					<div class="submitNum">
						<Input v-model="submitNum" placeholder="请输入提取金额"/>
					</div>
					<div class="submitAddress">
						<Input v-model="submitAddress" placeholder="请输入以太坊钱包地址"/>
					</div>
					<div class="note">
						<p class="title">重要提示:</p>
						<p class="noteContainer">该以太坊钱包地址不能是交易所钱包地址，必须是数字货币钱包地址。原子币推荐使用：imToken、Kcash、Bitpie钱包。</p>
					</div>
					<div class="hrefBag">
						<p class="title">钱包下载链接：</p>
						<p class="address">
							<Row>
								<Col class="itemTitle" span="6">
									<span>imToken</span>	
								</Col>
								<Col class="itemCenter" span="18">
									<span><router-link to="www.token.im">www.token.im</router-link></span>	
								</Col>
							</Row>
						</p>
						<p class="address">
							<Row>
								<Col class="itemTitle" span="6">
									<span>Kcash</span>	
								</Col>
								<Col class="itemCenter" span="18">
									<span><router-link to="www.kcash.com">www.kcash.com</router-link></span>
								</Col>
							</Row>
						</p>
						<p class="address">
							<Row>
								<Col class="itemTitle" span="6">
									<span>Bitpie</span>	
								</Col>
								<Col class="itemCenter" span="8">
									<span><router-link to="bitpie.com">bitpie.com</router-link></span>
								</Col>
								<Col class="itemRight" span="10">
									<span>下载遇到问题联系<router-link to="/AlliancePage/contactCustomerService">我的客服</router-link></span>
								</Col>
							</Row>
						</p>
					</div>
				</div>
				<div class="submitBtn">
					<Row>
						<Col span="18" offset="2">
							<Button @click="checkForm();" type="info">提交</Button>
							<p class="tips">注：10000枚以上免手续费，10000枚以下1元手续费</p>
						</Col>
					</Row>
				</div>
			</Col>
		</Row>
		<!-- 3、客服弹出窗 -->
		<div class="keFuContainer" v-show="iskeFuViewModel">
			<div class="keFuView">
				<p class="title">提示</p>
				<p class="success">客服正在处理中......</p>
				<p class="kefuWorkTime">工作时间:早9:00————晚5:00</p>
				<Button @click="closeKeFu();" type="info">确认</Button>	
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Alipay',
		data(){
			return {
				submitNum: "",
				submitAddress: "",
				// 客服提示
				iskeFuViewModel : false
			}
		},
		methods: {
			closeKeFu(){
				this.iskeFuViewModel = false;
			},
			// 验证 + 调用接口函数
			checkForm(){
				if( !this.submitNum ){
					
					this.$Message.error("请输入要提取的金额!");
				}else if( !this.submitAddress ){
					this.$Message.error("请输入钱包地址!");
				}else{
					this.getBinding(this.submitNum,this.submitAddress);	
				}
			},
			// 接口调用
			getBinding(amount,wallet){
				this.$axios.post('api/atoshiWithdraw/withdrawAtoshi',{
					amount : amount,
					wallet : wallet
				}).then(res=>{
					this.iskeFuViewModel = true
				}).catch(err=>{
					console.log( err.msg );
					if( err.code == '400' ){
						this.$Message.error("提取失败，余额不足!");	
					}else{
						this.$Message.error("提取失败，请稍后再试!");	
					}
					
				})
			}
		}	
	}
</script>

<style lang="less">
	.WithdrawalAtomicCurrency{
		padding: 40px 0;
		min-height: 760px;
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
			margin-top: 40px;
			.submitNum,.submitAddress{
				margin-bottom: 40px;
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
			.note{
				.title{
					margin-bottom: 6px;
					font-size:16px;
					font-weight:400;
					color:rgba(0,160,234,1);
					text-align: left;
				}
				.noteContainer{
					font-size:14px;
					font-weight:400;
					color:rgba(51,51,51,1);
					line-height: 2;
					text-align: left;
				}
			}
			.hrefBag{
				margin-top: 20px;
				.title{
					margin-bottom: 16px;
					font-size:14px;
					font-weight:400;
					color:rgba(51,51,51,1);
					text-align: left;
				}
				.address{
					margin-bottom: 10px;
					.itemTitle{
						font-size:14px;
						font-weight:400;
						color:rgba(51,51,51,1);
						text-align: left;
					}
					.itemCenter{
						a{
							font-size:14px;
							font-weight:400;
							color:rgba(0,160,234,1);						
						}

						text-align: left;
					}
					.itemRight{
						span{
							display: inline-block;
							min-width: 168px;
							font-size:14px;
							font-weight:400;
							color:rgba(51,51,51,1);
							text-align: left;
							a{
								color:rgba(0,160,234,1);
							}							
						}

					}	

				}
			}

		}
		.submitBtn{
			margin-top: 80px;
			button{
				margin-bottom: 6px;
				width: 100%;
				height: 50px;
				font-size: 16px;
			}
			.tips{
				font-size:12px;
				font-weight:400;
				color:rgba(153,153,153,1);
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

	}	
</style>