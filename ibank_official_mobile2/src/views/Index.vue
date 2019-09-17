<template>
    <div class='index'>
		<!-- 一、头部区域 -->
		<div class='header'>
			<!-- 1、左侧 -->
			<div class='headerSon header-left'>
				<!-- 1.1、logo -->
				<img class='logo' src="@/assets/images/logo.png" alt="">
				<!-- <img class='containerBottom' src="@/assets/images/line1.png" alt=""> -->
			</div>
			<!-- 2、中部：导航 -->
			<div class='headerSon header-center'>
				<router-link class='active' to="/">首页</router-link>	
				<!-- <router-link to="/settings">系统设置</router-link>	 -->
			</div>
			<!-- 3、右侧搜索及语言设置 -->
			<div class='headerSon header-right'>
                <!-- 语言选择 -->
                <div class='langSelect'>
                    <van-button 
                        class='langButton'
                        type="default" 
                        size='mini'
                        @click='headerData.langsModelshow = true'>{{ $t('m.'+headerData.langsSelected) }}</van-button>
                    <van-button 
                        class='seachButton'
                        type="default" 
                        icon='search'
                        size='mini'
                        ></van-button>
                    <van-action-sheet
                        v-model="headerData.langsModelshow"
                        :actions="headerData.langs"
                        @select="selectLang"
                    />
                </div>
                
			</div>	
		</div>
        <!-- 二、banner -->
        <div class='banner'>
            <div class='bannerAll'>
				<img class='logo' src="@/assets/images/bannerImg.png" alt="">
				<img class='logoText' src="@/assets/images/bannerText.png" alt="">
			</div>
			<!-- <img class='bannerLine bannerTopline' src="@/assets/images/line1.png" alt="">
			<img class='bannerLine bannerBottomline' src="@/assets/images/line2.png" alt="">
			<img class='bannerLine bannerBi' src="@/assets/images/bi1.png" alt=""> -->
        </div>
        <!-- 三、楼层一：交易中心地址 -->
		<div class='floor floor1'>
			<div class='container'>
				<div class='floorTitle'>
					<h2>{{ $t('m.交易中的地址') }}</h2>
					<p>Address in Transaction</p>
				</div>
				<div class='floorContainer'>
					<div class='floor1main floor1Left'>
						<p class='title'>{{ $t('m.地址名称')}}:</p>
						<ul class='left'>
                            <li 
                                v-for='(item,index) in floor1Data.frontTradeAddress' 
                                :key='index' 
                                v-if='index < 5'
                            >
                                {{ item.tradeAddress }}
                            </li>
						</ul>
					</div>
					<div class='floor1main floor1Right'>
						<p class='title'>{{ $t('m.交易状态') }}:</p>
						<ul class='right'>
							<li 
                                v-for='(item,index) in floor1Data.frontTradeAddress'
                                :key='index'
                                v-if='index < 5'
                            >
								<span class='progress'>
									<!-- <el-progress class='progressView' :text-inside="true" :stroke-width="18" :percentage="item.tradeStatus"></el-progress> -->
									<!-- 进度条 -->
                                    <van-slider 
                                        class='progressView'
                                        v-model="item.tradeStatus" 
                                        bar-height='10px'/>
                                    <!-- text -->
                                    <span 
										class='result' 
										v-bind:class='{ active : item.tradeStatus == 100 }'>
										{{ item.tradeStatus == 100 ? $t('m.已完成') : $t('m.准备中') }}
									</span>
								</span>
								<span 
									class='indexNum' 
									v-bind:class='{ active : item.tradeStatus == 100 }'>
									{{ 5-index }}
								</span>
							</li>
						</ul>
					</div>
				</div>				
			</div>

		</div>
        <!-- 四、楼层二：币种价格曲线 -->
		<div class='floor floor2'>
			<div class='container'>
				<div class='floorTitle'>
					<h2>{{ $t('m.币种价格曲线') }}</h2>
					<p>Currency Price Curve</p>
				</div>
				<div class='floorContainer'>
					<div class='echarts'>
						<div class='select'>
                            <!-- 弹出选择币种对话框 -->
                            <van-button 
                                class='langButton'
                                type="default" 
                                size='mini'
                                @click='floor2Data.lineCharSlect.selectModelShow = true'>
                                    {{ floor2Data.lineCharSlect.selected }}
                            </van-button>
                            <!-- <van-picker
                                show-toolbar
                                title="标题"
                                :columns="columns"
                                @cancel="onCancel"
                                @confirm="onConfirm"
                            /> -->
							<!-- <el-select 
                                v-model="floor2Data.lineCharSlect.selected"
                                @change="selectSymbol" 
                                placeholder="请选择">
								<el-option
									v-for="item in floor2Data.lineCharSlect.opts"
									:key="item.value"
									:label="item.label"
									:value="item.label">
								</el-option>
							</el-select> -->
						</div>
						<div class="echartsView">
							<div id="floor2EChart" :style="{width: '70%', height: '15rem'}"></div>
						</div>
					</div>
					<!-- <img class='imgRight' src="./../assets/images/floor2_rightImg.png" alt=""> -->
				</div>
			</div>
		</div>

        <!-- 弹出对话框 -->
        <div>
            <!-- 1、币种选择 -->
            <van-popup 
                v-model="floor2Data.lineCharSlect.selectModelShow" 
                position="bottom" 
                :overlay="true">
                <van-picker
                    show-toolbar
                    title="币种选择"
                    :columns="floor2Data.lineCharSlect.opts"
                    @cancel="floor2Data.lineCharSlect.selectModelShow=false"
                    @confirm="onConfirm"
                />
            </van-popup>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'index',
        data () {
            return {

                headerData:{
                    langsModelshow: false,
                    langsSelected: '中文',
                    langs: [
                        { 
                            value: 'zh-CN',
                            name: this.$t('m.中文'),
                        },      
                        {
                            value: 'en-US',
                            name: this.$t('m.英文')
                        }, 
                        {
                            value: 'ko-KR',
                            name: this.$t('m.韩语')
                        }, 
                        {
                            value: 'ja-JP',
                            name: this.$t('m.日语')
                        },          
                    ],     
                },
                floor1Data:{
                    frontTradeAddress:[
                        /*{
                            tradeAddressId : number,
                            tradeAddress : 'MWY2N2EzZTMtMTU5Zi0x',  // 后台传输过来的可能有空字符串
                            tradeStatus : 100, // 0~100
                        }*/
                    ]
                },
                floor2Data:{
                    lineCharSlect:{
                        selectModelShow: false,
                        opts: [ // 交易所
                            'ETH','ITC','BTC','EOS'
                            // {
                            //     language: 'ETH',
                            //     label: 'ETH'
                            // }, 
                            // {
                            //     language: 'ITC',
                            //     label: 'ITC'
                            // }, 
                            // {
                            //     language: 'BTC',
                            //     label: 'BTC'
                            // },
                            // {
                            //     language: 'XRP',
                            //     label: 'XRP'
                            // },
                            // {
                            //     language: 'EOS',
                            //     label: 'EOS'
                            // },
                        ],	
                        selected: 'ETH'		
                    },
                    lineData:{ // 存储后台传过来的有用的数据
                        binanceList : {/*
                            lastPrice: num,     // 价格
                            createTime: 'time'  // 时间
                        */},
                        cointigers : {/* 
                            last: num,          // 价格
                            createTime： 'time' // 时间
                        */},
                        huobiList : {/*
                            close: num,         // 价格
                            time：'time'        // 时间
                        */},
                        okexList : {/*
                            lastPrice : num,    // 价格
                            time : 'time'       // 时间
                        */}
                    },
                    echartsData:{
                        // 1、交易所数据
                        exchange: ['Binance','CoinTiger','HuoBi','okCoin'],
                        // 2、xLabel——日期: 存储第一组数据的日期
                        xLabel: [],
                        // 3、data——折线数据:只存储价格
                        data:{
                            binanceList: [],
                            cointigers: [],
                            huobiList: [],
                            okexList: []
                        }
                    }
                },
            }
        },
        created(){
            this.getFloor1Data();
            this.getFloor2Data();
            // this.getFloor3Data();
            // this.getFloor4Data();
        },
        methods: {
            /** 
             * 选择语言
            */
            selectLang(item) {
                console.log( item );
                this.headerData.langsSelected = item.name
                // 点击选项时默认不会关闭菜单，可以手动关闭
                this.headerData.langsModelshow = false;
            },
            /**
            * 获取楼层1数据——交易中的地址
            * 接口：/api/currency/tradeAddress
            */ 
            getFloor1Data(){ 
                this.$axios.post('/api/currency/tradeAddress',{

                }).then(res=>{
                    // console.log('成功分支--------------------');
                    // console.log(res);
                    if( res.tradeAddress ){
                        this.floor1Data.frontTradeAddress = res.tradeAddress.map((val,index,arr) =>{                            
                            // console.log( index );
                            return {
                                tradeAddressId: val.tradeAddressId,
                                tradeAddress: val.tradeAddress,
                                tradeStatus: Math.round( Math.random()*100 )
                            } 
                        });                         
                    }else{
                        console.error('前端定义报错信息：楼层1字段数据tradeAddress不存在!');
                    }

                    // this.floor1Data.frontTradeAddress = res;
                }).catch(err=>{
                    console.log(err);
                });
            },
			/**
			 * 获取楼层2数据——币种价格曲线
			 * 
			 */
            getFloor2Data(){  
                this.$axios.post('api/currency/symbol',{
                    count: 32,
                    symbol: this.floor2Data.lineCharSlect.selected
                }).then(res=>{
                    // console.log( res );
                    if( res.binanceList && res.cointigers && res.huobiList && res.okexList ){
						// 1、对后台数据进行处理
						this.floor2Data.lineData.binanceList = res.binanceList.map((val,index) => { // binanceList
							return {
								price: val.lastPrice,
								time: val.time,	
							}
						});
						this.floor2Data.lineData.cointigers = res.cointigers.map((val,index) => { // cointigers
							return {
								price: val.last,
								time: val.createTime,		
							}
						});
						this.floor2Data.lineData.huobiList = res.huobiList.map((val,index) => { // huobiList
							return {
								price: val.close,
								time: val.time,		
							}
						});
						this.floor2Data.lineData.okexList = res.okexList.map((val,index) => { // okexList
							return {
								price: val.lastPrice,
								time: val.time,	
							}
						});

						// 2、调用数据二次处理函数
						this.factory2Data();
					}else{
						console.error('前端定义报错信息：楼层3字段数据TradeAddress不存在!');	
					}
                }).catch(err=>{
					console.log(err);
                });
			},
			/**
			 * 楼层2 折线图二次函数处理
			 */
			factory2Data(){
				// console.log( this.floor2Data.lineData );
				// 1、获取第一条数据的日期作为x轴数据xLabel
				this.floor2Data.echartsData.xLabel = this.floor2Data.lineData.binanceList.map((val,index) => {
					// 1、处理data数据中的数据： 只显示4条x轴label 
                    let label = (index+1) % 2 == 0 ? val.time : "";
					if( label ){
                        label =  new Date( label.replace(/-/g,"/").replace(/T/g," ") );
                        // label = label.getHours() + ':' + label.getMinutes() + '\n' + label.getMonth()+1 + '-' + label.
                        let hours = label.getHours() > 9 ? label.getHours() : '0' + label.getHours();
                        let minu = label.getMinutes() > 9 ? label.getMinutes() : '0' + label.getMinutes();
                        let month = label.getMonth() + 1 > 9 ? label.getMonth() + 1 : '0' + (label.getMonth() + 1);
                        let day = label.getDate() > 9 ?  label.getDate() : '0' + label.getDate();
                        label = hours + ':' + minu + '\n' + month + '-' + day;
                    }
                    return label;
				});

				// 2、获取四个交易所的四条数组价格
				this.floor2Data.echartsData.data.binanceList = this.floor2Data.lineData.binanceList.map((val,index) => {
					return val.price;	
				});
				this.floor2Data.echartsData.data.cointigers = this.floor2Data.lineData.cointigers.map((val,index) => {
					return val.price;	
				});
				this.floor2Data.echartsData.data.huobiList = this.floor2Data.lineData.huobiList.map((val,index) => {
					return val.price;	
				});
				this.floor2Data.echartsData.data.okexList = this.floor2Data.lineData.okexList.map((val,index) => {
					return val.price;	
				});

				// console.log( this.floor2Data.echartsData );
				this.drawFloor2Line();   

			},
			drawFloor2Line(){
				// console.log( this.floor2Data.echartsData.exchange[2] );
				// 基于准备好的dom，初始化echarts实例
				let myChart = this.$echarts.init(document.getElementById('floor2EChart'))
				// 绘制图表
				myChart.setOption({
					color: ['#F14F9E','#00A6FF','#810CF8','#2BC2BE'],
					tooltip : {
						trigger: 'axis'
					},
					legend: {         // 图例组件
						show: true,     // 图例组件是否显示
						bottom: 0,         // 图例位置
						right: 0,       // 图例位置
						width: 160,     // 图例宽度
						align: 'left',  // icon位置
						itemWidth: 10,  // icon宽度
						itemHeight: 4, // icon高度
						itemGap: 20,
						orient: 'horizontal',
						textStyle:{
							color: '#1E0E6F',
							fontSize: 10,
							// fontWeight: 600
						},
						data:[
							{name:'Binance', icon:'roundRect'},
							{name:'CoinTiger',icon:'roundRect'},
							{name:'HuoBi',    icon:'roundRect'},
							{name:'okConin',  icon:'roundRect'}
						]
					},
					grid:{
						show: true,
						top: '5%',
						left: '0%',
						right: '10%',
						bottom: '20%',
						borderWidth: 0,
						containLabel: true
					},
					toolbox: {
						show : true,
						feature : {
							mark : {show: true}  
						}
					},
					calculable : true,
					xAxis : [ // x轴相关配置
						{
							show: true,             // 是否显示
							gridIndex: 0,
							position: 'bottom',     // x 轴的位置
							offset: 0,
							type : 'category',      // 坐标轴类型
							boundaryGap: false,     // x轴两边对齐
							data : this.floor2Data.echartsData.xLabel,
							// [
							// 	// house + " : " + minutes + " " + mounth + "-" + day,
							// 	'',//'17:02\n05-04',
							// 	'17:03\n05-04',
							// 	'',//'17:04\n05-04',
							// 	'17:05\n05-04',
							// 	'',//'17:06\n05-04',
							// 	'17:07\n05-04',
							// 	'',//'17:08\n05-04',
							// 	'17:09\n05-04'
							// ],
							// value: {
							//     min: 3,
							//     max: 9
							// },
							// value:{
							//     min: "",
							//     max: "",
							// },
							// min: function(value) {
							//     return  value.min;
							// },
							// max: function(value) {
							//     return value.min;
							// },
							// maxInterval: 60 * 1000 ,
							
							name: 'Time',       // 坐标轴名称
							nameTextStyle: {    // 坐标轴名称样式
								color: '#8867E2',
								fontStyle: 'normal',
								fontWeight: 'bold',
								fontSize: 14 
							},
							axisLine : {    // 坐标轴轴线相关设置
								show : true,                // 是否显示坐标轴轴线
								symbol: ['none','none'],    //  轴线两边的箭头
								lineStyle : {   // 坐标轴线样式
									color: '#ccc',
									width: 2
								}
							},
							axisTick : {    // 坐标轴刻度相关设置
								show : true,
								alignWithLabel: false,
								interval: 2,
								lineStyle: {
									color: '#ccc'
								}
							},
							axisLabel : {   // 坐标轴刻度标签
								show : true,    // 是否显示刻度标签 
								inside : false, // 刻度标签是否朝内
								rotate : 0,     // 刻度标签旋转的角度
								color : '#23156F',
								fontWeight: 'bold',
								fontSize: 12
							},
							
						}
					],
					yAxis : [ // y轴相关配置
						{
							type : 'value',     // y轴坐标值类型
							name: 'Price/$',    // 文本内容
							nameTextStyle: {    // 文本样式
								color: '#8867E2',
								fontStyle: 'normal',
								fontWeight: 'bold',
								fontSize: 10
							},
							minInterval: 1,
							min: function(value) {  // y轴坐标值最小值限制
								return Math.ceil( value.min-1 );
							},
							max: function(value) {  // y轴坐标值最大值限制
								return Math.ceil( value.max+1 );
							},
							axisLine : {            // 坐标轴轴线相关设置
								lineStyle:{             // 轴线样式  
									color: '#ccc',
									width: 2
								},
								symbol: ['none','arrow'],    // 轴线两边的箭头 是否显示
								symbolSize: [6,10],          // 箭头大小 [宽、高]
								symbolOffset: [0,8]
							},
							axisTick : {    // 坐标轴刻度相关设置
								show : false,   // 刻度是否显示
								length: 0       // 刻度长度
							},
							axisLabel : {   // 坐标轴刻度标签
								show : true,    // 是否显示刻度标签 
								inside : false, // 刻度标签是否朝内
								rotate : 0,     // 刻度标签旋转的角度
								color : '#23156F',
								fontWeight: 'bold',
								fontSize: 10
							},
							splitLine : {   //  grid 区域中的分隔线
								show : true,
								lineStyle : {
									color : '#e5e5e5',
									type : 'dashed'
								}
							}

						}
					],
					series : [
						{
							name : this.floor2Data.echartsData.exchange[0],
							type : 'line', 
							itemStyle:{

							},
							lineStyle: {
								color: '#F14F9E',
								width: 1,
							},    
							smooth: true,
							smoothMonotone: 'x',       
							data:this.floor2Data.echartsData.data.binanceList,
						},
						{
							name : this.floor2Data.echartsData.exchange[1],
							type:'line',
							lineStyle: {
								color: '#00A6FF',
								width: 1,
							},    
							smooth: true,
							smoothMonotone: 'x',  
							data:this.floor2Data.echartsData.data.cointigers
						},
						{
							name:'HuoBi',
							type:'line',
							lineStyle: {
								color: '#810CF8',
								width: 1,
							},    
							smooth: true,
							smoothMonotone: 'x', 
							data:this.floor2Data.echartsData.data.huobiList
						},
						{
							name : 'okConin',
							type:'line',
							lineStyle: {
								color: '#2BC2BE',
								width: 1,
							},    
							smooth: true,
							smoothMonotone: 'x', 
							data:this.floor2Data.echartsData.data.okexList
						}
					]
				});    				
            },

            /**
             * 币种选择select选定出发函数
             * 
             */
            // selectSymbol( selected ){
			// 	// console.log( "----已选定币种："+selected );
			// 	this.floor2Data.lineCharSlect.selected = selected;
			// 	this.getFloor2Data();
            // },   
            
            // 币种选择函数
            onConfirm(value, index) {
                console.log( value + "---" + index );
                // Toast(`当前值：${value}, 当前索引：${index}`);
            },
            // 币种选择关闭对话框函数
            onCancel() {
                this.floor2Data.lineCharSlect.selectModelShow = false;
            }
            // onConfirm(value, index) {
            //     Toast(`当前值：${value}, 当前索引：${index}`);
            // },
            // onCancel() {
            //     Toast('取消');
            // }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "../common/css/const.less";
.index{
    height: 1474px;
    background: url("./../assets/images/index_bg.png") no-repeat top center;
    background-size: 100%;
    .header{
        padding: 10px;
        max-height: 44px;
        .flexParent();
        .headerSon{
            color: #fff;
        }
        .header-left{
            .resize;
            img{
                display: inline-block;
                width: 8.4rem;
            }
        }
        .header-center{
            .resize;
            a{
                padding: 4px 12px;
                color: #fff;
                font-size: 1.4rem;  
                border-radius: 20px;
                .bgGradient();
            }
        } 
        .header-right{
            .resize;
            .langSelect{
                font-size: 0;
                .van-button{
                    .resize;
                    font-size: 1.2rem;
                    height: 24px;
                    border: 1px solid @mc2;
                    background: rgba(255,255,255,0);
                    .van-icon-search{
                        color: #fff;
                        font-size: 2rem;
                        min-width: 20px;

                    }
                    .van-button__text{
                        color: #fff;
                    }

                }
                .langButton{
                    border-right: none;  
                      
                    border-radius: 4px 0 0 4px;
                }
                .seachButton{
                    min-width: 24px;
                    border-radius: 0px 4px  4px 0px;
                }

            }
        }       
    }
    .banner{
        margin-top: 2.4rem;
        .bannerAll{
            .flexParent(column,space-between);
            .logo{
                margin-bottom: 1.2rem;
                max-width: 3rem;
            }
            .logoText{
                max-width: 16.2rem;
            }

        }
    }
    .floor1{
        margin-top: 70px;
        padding: 1rem;
		.container{
			// margin: 0 auto;
			// max-width: 100%;
			.floorTitle{
				margin-bottom: 1rem;
				position: relative;
				text-align: left;
				&:before{
					position: absolute;
					top: -0.6rem;
					left: 0;
					display: block;
					content: "";
					width:2.6rem;
					height:0.2rem;
					background:linear-gradient(90deg,rgba(191,82,231,1),rgba(250,79,148,1));
					border-radius:1px;
				}
				h2,p{
					display: inline-block;
				}	
				h2{
					color: #1E0D6F;
					font-size: 1.6rem;
					font-weight: 600;
				}
				p{
					margin-left: 12px;
					color: #946AD1;
					font-size: 1.2rem;
					font-weight: 500;
				}
			}
			.floorContainer{
				width: 100%;
				font-size: 0;
				.floor1main{
					display: inline-block;
					width: 50%;
					font-size: 1.4rem;
					vertical-align: top;
					.title{
						margin-bottom: 1rem;
						color: #1E0D6F;
						font-size: 1.4rem;
                        font-weight: 600;
                        text-align: left;
					}
				}
				.floor1Left{
					.left{
						li{
							text-align: left;
							// padding: 10px 0;
							color: #1E0E70;
							font-size: 1.2rem;
							font-weight: 600;
							height: 24px;
							line-height: 24px;
						}
					}

				}
				.floor1Right{
					.right{
						li{
							// padding: 10px 20px 10px 0;
							font-size: 0;
							height: 24px;
							line-height: 24px;
                            white-space: nowrap;
                            overflow: hidden;
							.progress{
                                padding-left: 6px;
								position: relative;
								display: inline-block;
                                width: 90%;
                                height: 20px;
                                line-height: 20px;
                                font-size: 0;
                                text-align: left;
								vertical-align: middle;
								border: 1px solid #A89EF0;
								border-radius: 1.4rem;
								/deep/.progressView{
                                    box-sizing: border-box;
                                    margin-top: 5px;
									// padding: 0 4px;
                                    // padding-right: 62px;
                                    padding-right: 50px;
									display: inline-block;
                                    width: 100%;
                                    text-align: left;
                                    background: none;
                                    .van-slider__bar{
                                        display: inline-block;
                                        .bgGradient();
                                        .van-slider__button-wrapper{
                                            display: none;
                                        }
                                    }
									// .el-progress-bar{
									// 	.el-progress-bar__outer{
									// 		background: none;
									// 		.el-progress-bar__inner{
									// 			background:linear-gradient(90deg,rgba(138,103,225,1),rgba(234,82,161,1));
									// 			.el-progress-bar__innerText{
									// 				display: none;
									// 			}
									// 		}
									// 	}
                                    // }
                                    
								}
								.result{
									position: absolute;
									right: 0;
                                    width: 50px;
                                    
									font-size: 1.4rem;
									font-weight: 500;
									text-align: center;
									color: #EA72A4;
								}
								.active{
									color: #6352A8;
								}

							}
							.indexNum{
								// padding-left: 20px;
								display: inline-block;
                                width: 10%;
								font-size: 1.4rem;
								font-weight: 600;
								vertical-align: middle;
                                color: #EA72A4;
                                text-align: right;
							}
							.active{
								color: #6352A8;
							}
						}
					}
				}

			}			
		}

    }
	.floor2{
        padding: 1rem;
		.container{
			.floorTitle{
                margin-top: 1rem;
                position: relative;
                text-align: right;
                &:before{
					position: absolute;
					top: -0.6rem;
					right: 0;
					display: block;
					content: "";
					width: 2.6rem;
                    height: 0.2rem;
					background:linear-gradient(90deg,rgba(191,82,231,1),rgba(250,79,148,1));
					border-radius:1px;
				}
				h2{
					color: #1E0D6F;
					font-size: 1.6rem;
					font-weight: 600;
				}
				p{
					margin-top: 0.4rem;
					color: #946AD1;
					font-size: 1.4rem;
					font-weight: 500;
				}
			}
			.floorContainer{
				// margin-top: 20px;
				.echarts{
					/deep/.select{
						.el-select{
							.el-input__inner{
								width: 120px;
								color: #fff;
								font-size: 18px;
								border: none;
								border-radius: 20px;
								background: linear-gradient(90deg, #8a67e1, #ea52a1);
							}
							.el-select__caret{
								color: #fff;
								font-size: 18px;
							}
						}
					}
					.echartsView{
                        // margin-top: 100px;
                        #floor2EChart{
                            margin-left: 0;
                        }
					}
				}
				.imgRight{
					display: none;
					position: relative;
					top: -540px;
					right: -80%;
					width: 320px;
					height: 330px;
				}
			}

		}
	}    

}
</style>
