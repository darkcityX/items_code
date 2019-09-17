<template>
	<div class="contactCustomerService">
		<!-- 1-1、联系客服页面 -->
		<Row>
			<Col span="6" offset="4">
				<div class="kefu">
					<img src="./../../assets/images/kefu.png" alt="">					
				</div>
			</Col>
			<Col span="8" offset="1">
				<div class="kefuInfo">
					<div class="kefuPhone">
						<p>客服电话</p>
						<img src="./../../assets/images/kefu_dianhua.png" alt="">
					</div>
					<div class="kefuWeiXin">
						<p>客服微信</p>
						<img src="./../../assets/images/kefuerweima.png" alt="">
					</div>
				</div>
			</Col>
		</Row>
	</div>
</template>

<script>
	export default {
		name: 'contactCustomerService',
		data (){
			return {

			}
		}	
	}
</script>

<style lang="less">
	.contactCustomerService{
		min-height: 760px;
		.ivu-col{
			position: relative;
			.kefu{
				width: 100%;
				height: 760px;
				line-height: 760px;
			}
			.kefuInfo{
				margin-top: 36%;
				>div{
					margin-bottom: 40%;
					p{
                        margin-bottom: 20px;
						width: 100%;
						font-size:18px;
						font-family:MicrosoftYaHei;
						color:rgba(34,34,34,1);
					}
					img{}
				}
			}			
		}

	}	
</style>