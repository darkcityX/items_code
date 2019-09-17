<template>
	<div class="Alipay">
		<!-- <p>【支付宝绑定】页面/【绑定成功】提示框</p> -->
		<Row>
			<Col span="12" offset="6">
				<p class="pageTitle">
					<span>绑定支付宝账户</span>	
				</p>
				<div class="pageContent">
					<Row class="alipayCode">
						<Col span="8">
							<label>支付宝账户:</label>
						</Col>
						<Col span="12">
							 <Input v-model="alipayInfo.alipayAccount" placeholder="请输入支付宝账户"/>	
						</Col>
					</Row>
					<Row class="alipayUserName">
						<Col span="8">
							<label>支付宝账户真实姓名:</label>
						</Col>
						<Col span="12">
							 <Input v-model="alipayInfo.alipayName" placeholder="请输入支付宝账户真实姓名"/>	
						</Col>
					</Row>
					<Row class="verificationCode">
						<Col span="8">
							<label>图片验证码:</label>
						</Col>
						<Col span="6">
							<Input v-model="alipayInfo.checkCode" placeholder="请输入校验码"/>	
						</Col>
						<Col class="codeImg" span="6">
							<!-- <img src="#" alt=""> -->
							<div class="code" @click="refreshCode">
								<Sidentify :identifyCode="identifyCode"></Sidentify>
							</div>
						</Col>
					</Row>
				</div>	
				<div class="submitBtn">
					<Row>
						<Col span="18" offset="4">
							<Button @click="checkFrom();" type="primary">绑定支付宝账户</Button>
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
	// 导入校验码组件
	import Sidentify from './../../../components/identify.vue';

	export default {
		name: 'Alipay',
		data(){
			return {
				// 验证码
				identifyCodes: "1234567890",
				identifyCode: "",
				
				// 是否显示绑定成功
				isView: false,

				// 表单
				alipayInfo: {
					alipayAccount : '',
					alipayName: '',
					checkCode: '',
				}
			}
		},
		components:{
			Sidentify	
		},
		mounted() {
			// 图片验证码
			this.identifyCode = "";
			this.makeCode(this.identifyCodes, 4);
		},
		methods: {
			randomNum(min, max) {
				return Math.floor(Math.random() * (max - min) + min);
			},
			refreshCode() {
				this.identifyCode = "";
				this.makeCode(this.identifyCodes, 4);
			},
			makeCode(o, l) {
				for (let i = 0; i < l; i++) {
					this.identifyCode += this.identifyCodes[
					this.randomNum(0, this.identifyCodes.length)
					];
				}
				console.log(this.identifyCode);
			},
			// checkForm
			checkFrom(){
				if (!this.alipayInfo.alipayAccount) {
					// 账户验证
					this.$Message.error("请输入支付宝账户!");
				}else if( !this.alipayInfo.alipayName ){
					// 真实姓名验证
					this.$Message.error("请输入您的真实姓名!");
				}else if( !this.alipayInfo.checkCode ){
					// 验证码
					this.$Message.error("请输入验证码!");
				}else if( this.alipayInfo.checkCode != this.identifyCode ){
					this.$Message.error("请输入正确的验证码!");
				}else{
					// 发送请求
					this.getBinding();
				}
			},
			// 发送请求
			getBinding(){
				var _this = this;
				this.$axios.post('api/user/bindingAlipay',{
					alipayAccount: this.alipayInfo.alipayAccount,
					alipayName: this.alipayInfo.alipayName
				}).then(res=>{
					/* ------------------- 友好提示 ----------------- */ 
					this.isView = true;
					let id = setTimeout(function() {
						_this.isView = false;   
						clearTimeout(id);
					}, 3000);
					/* ------------- 更新当前本地存储 ---------------- */ 
					let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
					// console.log(" -- 更新前 -- ");
					// console.log( userInfo.user );
					// 
					userInfo.user.alipayAccount = this.alipayInfo.alipayAccount;
					userInfo.user.alipayName = this.alipayInfo.alipayName;
					sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
					// console.log(" -- 更新后 -- ");
					// console.log( userInfo.user );
				}).catch(err=>{
					console.log( err );
					this.$Message.success("绑定失败，请稍后再试!");
				})
			}
		}
	}
	
</script>

<style lang="less">
	.Alipay{
		padding: 100px 0;
		min-height: 760px;
		.pageTitle{
			color:rgba(34,34,34,1);
			font-size:16px;
			font-weight:400;
			span{
				position: relative;
				margin: 0 auto;
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
			margin: 40px 0;
			>div{
				margin-bottom: 20px;
				label{
					padding: 0 10px;
					display: block;
					font-size:14px;
					font-weight:400;
					color:rgba(51,51,51,1);
					height: 50px;
					line-height: 50px;
					text-align: right;
					white-space: nowrap;
				}
				input{
					height: 50px;
				}
				.codeImg{
					padding-left: 10px;
					img{
						display: inline-block;
						width: 100%;
						height: 50px;
						border-radius: 4px;
						background: #ff0000;
					}					
				}
				
			}

		}
		.submitBtn{
			button{
				width: 100%;
				font-size: 16px;
				height: 50px;
				background: #00A0EA;
			}
		}
		.successBinding{
			position: fixed;
			top: 0;
			left: 0;
			z-index: 10;
			width: 100%;
			height: 100%;
			.successTip{
				margin: 0 auto;
				margin-top: 100%;
				padding: 20px 0;
				width: 100%;
				border-radius: 8px;
				background:rgba(0,0,0,.6);
				p{
					font-size:16px;
					color:#fff;
				}

			}
		}
	}	
</style>