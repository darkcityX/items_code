<template>
    <div class='other'>
        <!-- 一、头部区域 -->
		<div class='header'>
			<!-- 1、左侧 -->
			<div class='headerSon header-left'>
				<!-- 1.1、logo -->
				<img class='logo' src="@/assets/images/logo.png" alt="">
			</div>
			<!-- 2、中部：导航 -->
			<div class='headerSon header-center'>
				<!-- <router-link class='active' to="/">{{ $t('m.首页') }}</router-link>	 -->
				<!-- <router-link to="/settings">系统设置</router-link>	 -->
			</div>
			<!-- 3、右侧搜索及语言设置 -->
			<div class='headerSon header-right'>
				<el-button class='languageBtn' @click='headerData.wordingSelectModel = true' round>{{ $t('m.语言设置') }}</el-button>
			</div>	
		</div>
        <!-- 二、banner -->
		<div class='banner'>
			<div class='bannerAll'>
				<img class='bannerImage' src="@/assets/images/bannerImg.png" alt="">
				<img class='bannerImage' src="@/assets/images/bannerText.png" alt="">
			</div>
		</div>
        <!-- 三、楼层一：数量实时数据 -->
        <div class='floor floor1'>
			<div class='container'>
				<div class='floorTitle'>
					<h2>{{ $t('m.EOC数量实时数据') }}</h2>
					<p>EOC Number Data</p>
				</div>
				<div class='floorContainer'>
                    <ul class='dataViews'>
                        <li class='remainingNum'>
                            <p class='title'>{{ $t('m.EOC当前剩余数量') }}:</p>
                            <p class='txt'>
                                <span class='txt_num'>9</span>
                                <span class='txt_num'>0</span>
                                <span class='txt_sym'>,</span>
                                <span class='txt_num'>0</span>
                                <span class='txt_num'>0</span>
                                <span class='txt_num'>0</span>
                                <span class='txt_sym'>,</span>
                                <span class='txt_num'>0</span>
                                <span class='txt_num'>0</span>
                            </p>
                        </li>
                        <li class='distributionNum'>
                            <p class='title'>{{ $t('m.EOC当日分配数量') }}:</p>
                            <p class='txt'>
                                <span class='txt_num'>2</span>
                                <span class='txt_sym'>,</span>
                                <span class='txt_num'>1</span>
                                <span class='txt_num'>0</span>
                                <span class='txt_num'>0</span>
                            </p>
                        </li>
                        <li class='remDisNum'>
                            <p class='title'>{{ $t('m.EOC当日分配剩余数量') }}:</p>
                            <p class='txt'>
                                <span class='txt_num'>1</span>
                                <span class='txt_sym'>,</span>
                                <span class='txt_num'>0</span>
                                <span class='txt_num'>0</span>
                                <span class='txt_num'>0</span>    
                            </p>
                        </li>
                        <li class='eachartContainer'>
                            <p class='title'>{{ $t('m.EOC数量实时数据图') }}</p>
                            <div id="floor1EChart" :style="{width: '1000px', height: '800px'}"></div>
                        </li>
                    </ul>
				</div>				
			</div>

		</div>
        <!-- 四、楼层二：每日会员增长数 -->
        <div class='floor floor2'>
			<div class='container'>
				<div class='floorTitle'>
					<h2>{{ "i-Bank " + $t('m.每日会员增长数量') }}</h2>
					<p>Daily Membership Growth</p>
				</div>
				<div class='floorContainer'>
                    <ul class='dataViews'>
                        <li class='remainingNum'>
                            <p class='title'>i-Bank{{ $t('m.当前会员总数') }}:</p>
                            <p class='txt'>
                                <span class='txt_num'>1</span>
                                <span class='txt_sym'>,</span>
                                <span class='txt_num'>0</span>
                                <span class='txt_num'>0</span>
                                <span class='txt_num'>0</span>
                                <span class='txt_sym'>,</span>
                                <span class='txt_num'>0</span>
                                <span class='txt_num'>0</span>
                            </p>
                        </li>
                        <li class='eachartContainer'>
                            <p class='title'>i-Bank{{ $t('m.每日会员增长数量') }}：</p>
                            <div id="floor2Echart" :style="{width: '1000px', height: '800px'}"></div>
                        </li>
                    </ul>
				</div>				
			</div>

		</div>

        <!-- 五、弹出窗 -->
        <div class='tipModelTips'>
            <!-- 1、语言选择弹出窗 -->
            <div class='wordingSelectModel'>
                <el-dialog
                    :title="$t('m.请选择您要切换的语言')"
                    :visible.sync="headerData.wordingSelectModel"
                    width="30%"
                    center>
                    <div class='wordingSelect'>
                        <el-radio-group v-model="headerData.languages.selected">
                            <!-- <el-radio :label="3">中文</el-radio>
                            <el-radio :label="6">英文</el-radio>
                            <el-radio :label="9">韩语</el-radio>
                            <el-radio :label="9">日语</el-radio> -->
                            <el-radio 
                                v-for='(item,index) in headerData.languages.opts' 
                                :key='index' 
                                :label="item.language"
                                >
                                {{ $t('m.'+item.label) }}
                            </el-radio>
                        </el-radio-group>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="headerData.wordingSelectModel = false">{{ $t('m.取消') }}</el-button>
                        <el-button type="primary" @click="selectLanguage">{{ $t('m.确定') }}</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        data (){
            return {
                lang: 'zh-CN',  // 默认语言
                headerData:{
                    wordingSelectModel : false,
                    languages:{
                        opts: [
                            {
                                language: 'zh-CN',
                                label: this.$t('m.中文')
                            }, 
                            {
                                language: 'en-US',
                                label: this.$t('m.英文')
                            }, 
                            {
                                language: 'ko-KR',
                                label: this.$t('m.韩语')
                            }, 
                            {
                                language: 'ja-JP',
                                label: this.$t('m.日语')
                            },
                        ],	
                        selected: 'zh-CN',//this.$t('m.中文'),				
                    },   
                },
                floor1Data:{
                    showNums:{ // 楼层1 直接展示数据
                        remainingAmount: 9000000,   // EOC当前剩余数量
                        allocatedQuantity: 2100,    // EOC当日分配数量
                        remainingAllocation: 1000,  // EOC当日分配剩余数量
                    },
                    statisticalData:{ // 楼层1 统计图数据
                        // data:[],            // 时间
                        //                     // EOC总分配数量：取的后台的【】
                        //                     // EOC当前剩余数量：取后台的【eocStartNum】字段
                        //                     // EOC销毁量：取后台的【eocDestoryNum】字段

                    }
                },
                floor2Data:{
                    // isRise: true,
					oilTodayInfo:{/*
						oilTodayPriceId: num  // 编号
						closePrice： floorNum // 收盘价 
						openPrice： floorNum  // 开盘价
						max: floorNum  		  // 最高价
						min: floorNum		  // 最低价
						tradeNum: num  		  // 交易数量
						code：				  // 油编码，有blt和wti
						time：				  // 时间
                    */},
                    lineData:[/* 存储后台传过来的有用的数据
                        {
                            name: name
                            nowPrice: floornum  // 价格
                            time: time          // 时间   
                        }
                        
                    */],
                    echartsData:{  // 存储渲染时所要使用的数据
                        oilname: this.$t('m.原油'),
                        xLabel:[],  // x轴 轴线数据
                        data: [],   // 折现数据

                    }
				},
            }   
        },
        created(){

            this.getFloor2Data();
            
            
        },
        mounted(){

            this.drawFloor1Line();    
        },
        methods : {
            /** 
             * 语言切换函数
            */
            selectLanguage(){
                console.log( this.headerData.languages.selected );
                switch ( this.headerData.languages.selected ){
                    case 'zh-CN':
                        this.lang = 'zh-CN';
                        this.$i18n.locale = this.lang;
                        break;
                    case 'en-US':
                        this.lang = 'en-US';
						this.$i18n.locale = this.lang;
                        break;
                    case 'ko-KR':
                        this.lang = 'ko-KR';
						this.$i18n.locale = this.lang;
                        break;
                    case 'ja-JP':
                        this.lang = 'ja-JP';
						this.$i18n.locale = this.lang;
                        break;    
                }

                // 关闭模态框
                this.headerData.wordingSelectModel = false;

            },

            drawFloor1Line(){
                console.log('11111');
                // 基于准备好的dom，初始化echarts实例
                // console.log( document.getElementById('floor1EChart') );
                let myChart = this.$echarts.init(document.getElementById('floor1EChart'));  
                console.log( myChart ); 
                // 绘制图表
				myChart.setOption({
                    color: ['#323353','#F14F9E','#9B57E8'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        show: true,     // 图例组件是否显示
						bottom: 0,         // 图例位置
						left: 'center',       // 图例位置
						// width: 300,     // 图例宽度
						align: 'left',  // icon位置
						itemWidth: 50,  // icon宽度
						itemHeight: 20, // icon高度
						itemGap: 20,
						orient: 'horizontal',
						textStyle:{
							color: '#1E0E6F',
							fontSize: 14,
							fontWeight: 600
						},
						data:[
							{name:'联盟广告', icon:'roundRect'},
							{name:'视频广告',icon:'roundRect'},
							{name:'搜索引擎',    icon:'roundRect'},
							// {name:'okConin',  icon:'roundRect'}
						]
                        // data: ['联盟广告','视频广告','搜索引擎']
                    },
                    grid: {
                        left: '10%',
                        right: '4%',
                        bottom: '14%',
                        // containLabel: true
                    },
					xAxis: {
                        type: 'category',
                        data: [
                            '2019-04-14',
                            '2019-04-15',
                            '2019-04-16',
                            '2019-04-17',
                            '2019-04-18',
                            '2019-04-19',
                            '2019-04-20',
                            '2019-04-21',
                            '2019-04-22',
                            '2019-04-23',
                        ],
                        axisLabel:{
                            interval:0,
                            rotate: 45
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
                    },
                    yAxis: {
                        type: 'value',
                        data:[
                            0,
                            10000,
                            20000,
                            30000,
                            40000,
                            50000,
                            60000,
                            70000,
                            80000,
                            90000,
                            100000,
                        ],
                        min: function(value) {  // y轴坐标值最小值限制
							return 0;
						},
						max: function(value) {  // y轴坐标值最大值限制
							return 110000;
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
                    },
                    series: [
                        {
                            name: '联盟广告',
                            type: 'bar',
                            // stack: '总量',
                            // label: {
                            //     normal: {
                            //         show: true,
                            //         position: 'insideRight'
                            //     }
                            // },
                            barGap: '-100%',
                            z: 11,
                            barWidth: 40,
                            data: [10000, 10000, 10000, 10000, 10000, 10000, 10000,10000, 10000,10000]
                        },
                        {
                            name: '视频广告',
                            type: 'bar',
                            // stack: '总量',
                            // label: {
                            //     normal: {
                            //         show: true,
                            //         position: 'insideRight'
                            //     }
                            // },
                            barGap: '-100%',
                            z: 10,
                            barWidth: 40,
                            data: [20000, 20500, 21000, 21500, 22000, 22500, 23000,23500,24000,24500]
                        },
                        {
                            name: '搜索引擎',
                            type: 'bar',
                            stack: 10000,
                            // label: {
                            //     normal: {
                            //         show: true,
                            //         position: 'insideRight'
                            //     }
                            // },
                            barWidth: 40,
                            data: [100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000]
                        }
                    ]
                });
            },
            /**
			 * 获取楼层2数据——布伦特原油交易行情
			 * 1、调用获取原油信息接口函数
             * 2、调用获取原油实时数据接口函数
			*/ 
            getFloor2Data(){ 
                this.getFloor2OliInfo();
                this.getFloor2OliLineData();
			},
			getFloor2OliInfo(){ // 获取原油信息接口函数: api/oil/today
				this.$axios.post('api/oil/today',{

				}).then(res => {
					if( res.oilTodayPrice ){
						this.floor2Data.oilTodayInfo = res.oilTodayPrice;

						// console.log( this.floor2Data.oilTodayInfo );
					}else{
						console.error('前端定义报错信息：楼层3字段数据TradeAddress不存在!');
					}
				}).catch(err => {
					console.log(err);
				});
            },
            getFloor2OliLineData(){ // 获取原油折线图数据
                this.$axios.post('api/oil/realTimePriceList',{
                    count: '32'
                }).then(res => {
                    // console.log( res.oilRealtimePriceList );
                    if( res.oilRealtimePriceList ){
                        this.floor2Data.lineData = res.oilRealtimePriceList.map((val,index,arr) => {
                            return {
                                name: val.name,
                                nowPrice: val.nowPrice,
                                time: val.time
                            }
                        });
                        // 调用数据二次处理函数
                        this.factory2Data();
                    }else{
						console.error('前端定义报错信息：楼层3字段数据TradeAddress不存在!');
					}
                }).catch(err => {
                    console.log(err);
                });
            },
            factory2Data(){ 
                // 1、处理x轴轴线数据
                this.floor2Data.echartsData.xLabel = this.floor2Data.lineData.map((val,index,arr) => {
                    // 1、处理data数据中的数据： 只显示4条x轴label 
                    let label = (index+1) % 2 == 0 ? val.time : "";
                    // let label = val.time;
                    // 2、处理时间格式 2019-05-17 19:32:21  ==> '17:03\n05-04'
                    if( label ){
                        label =  new Date( label.replace(/-/g,"/") );
                        // label = label.getHours() + ':' + label.getMinutes() + '\n' + label.getMonth()+1 + '-' + label.
                        let hours = label.getHours() > 9 ? label.getHours() : '0' + label.getHours();
                        let minu = label.getMinutes() > 9 ? label.getMinutes() : '0' + label.getMinutes();
                        let month = label.getMonth() + 1 > 9 ? label.getMonth() + 1 : '0' + (label.getMonth() + 1);
                        let day = label.getDate() > 9 ?  label.getDate() : '0' + label.getDate();
                        label = hours + ':' + minu + '\n' + month + '-' + day;
                    }
                    return label;
                });

                // 2、折现图数据
                this.floor2Data.echartsData.data = this.floor2Data.lineData.map((val) => {
                    return val.nowPrice;
                });

                // 3、折现原油名称
                // console.log( this.floor2Data.lineData[0].name );
                this.floor2Data.echartsData.oilname = this.floor2Data.lineData[0].name;
                
                // console.log( this.floor2Data.echartsData );

                // 2、调用折现绘制函数
                this.drawFloor2Line();

            },
			drawFloor2Line(){
				// 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('floor2Echart'));
				// 绘制图表
				myChart.setOption({
					color: ['#F14F9E'],
					tooltip : {
						trigger: 'axis'
					},
					legend: {         // 图例组件
						show: true,     // 图例组件是否显示
						bottom: 0,         // 图例位置
						left: '6%',       // 图例位置
						width: 300,     // 图例宽度
						align: 'left',  // icon位置
						itemWidth: 50,  // icon宽度
						itemHeight: 20, // icon高度
						itemGap: 20,
						orient: 'horizontal',
						textStyle:{
							color: '#1E0E6F',
							fontSize: 14,
							fontWeight: 600
						},
						data:[
                            {
                                name : this.floor2Data.echartsData.oilname, 
                                icon : 'roundRect'
                            }
						]
					},
					grid:{
						show: false,
						top: '10%',
						left: '0%',
						right: '20%',
						bottom: '10%',
						borderWidth: 0,
						containLabel: true
					},
					toolbox: {
						show : true,
						feature : {
							mark : {show: true}  
						}
					},
					// calculable : true,
					xAxis : [ // x轴相关配置
						{
							show: true,             // 是否显示
							gridIndex: 0,
							position: 'bottom',     // x 轴的位置
							offset: 0,
							type : 'category',      // 坐标轴类型
							boundaryGap: false,     // x轴两边对齐
                            data : this.floor2Data.echartsData.xLabel,
							maxInterval: 8 ,
							
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
								fontSize: 14
							},
							minInterval: 1,
							// value: {
							// 	min: 166,
							// 	max: 170
							// },
							min: function(value) {  // y轴坐标值最小值限制
								return Math.ceil(value.min-2);
							},
							max: function(value) {  // y轴坐标值最大值限制
								return Math.ceil(value.max+1);
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
								fontSize: 12
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
							name: this.floor2Data.echartsData.oilname || '原油',
							type:'line', 
							itemStyle:{

							},
							lineStyle: {
								color: '#F14F9E',
								width: 2,
							},    
							smooth: true,
							smoothMonotone: 'x',       
                            data: this.floor2Data.echartsData.data
                            //[168.75,168.80,168.89,169.00,168.75,167.21,167.44,169.00],
							// markLine: {
							//     lineStyle:{
							//         color: '#000'
							//     }
							// },
						}
					]
				});    				
            }
        }
    }
</script>

<style lang="less" scoped>
// 导入封装的样式函数库
@import "../common/css/mixin.less";
.other{
    height: 5626px;
    background: url("./../assets/images/page2_bg.png") no-repeat top center;
    .header{
        margin: 0 auto;
		padding: 90px 15px;
		width: 1200px;
		min-width: 960px;
		max-width: 1200px;
        font-size: 0;
        .flexParent(row,space-between);
        .header-right{
            .languageBtn{
                color: #fff;
                font-size: 16px;
                border: none;
                .bgGradient();
            }
        }   
    }
    .banner{
		position: relative;
		top: 0px;
        min-width: 1200px;
		.bannerAll{
			img{
				margin: 0 auto;
				display: block;
			}
		}

    }
    .floor{
		margin: 0 auto;
        width: 100%;
        .container{
			// margin: 0 auto;
			// max-width: 100%;
			.containerSet();
			.floorTitle{
				margin-bottom: 60px;
				position: relative;
				text-align: left;
				&:before{
					position: absolute;
					top: -19px;
					left: 0;
					display: block;
					content: "";
					width:70px;
					height:5px;
					background:linear-gradient(90deg,rgba(191,82,231,1),rgba(250,79,148,1));
					border-radius:1px;
				}
				h2,p{
					display: inline-block;
				}	
				h2{
					color: #1E0D6F;
					font-size: 32px;
					font-weight: 600;
				}
				p{
					margin-left: 12px;
					color: #946AD1;
					font-size: 24px;
					font-weight: 500;
				}
			}
			.floorContainer{
				width: 100%;
				.dataViews{
                    font-size: 0;
                    li{
                        margin-bottom: 42px;
                        .title{
                            margin-bottom: 16px;
                            color: @fc1;
                            font-size: 16px;
                            &:before{
                                box-sizing: border-box;
                                margin-right: 10px;
                                display: inline-block;
                                content: "";
                                width: 14px;
                                height: 14px;
                                border: 2px solid #D7C2EF;
                                border-radius: 10px;
                                background: @mc2;
                            }
                        }
                        .txt{
                            padding-left: 20px;
                            // padding: 10px 10px 10px 20px;
                            .txt_num{
                                margin-right: 4px;
                                padding: 4px 6px;
                                display: inline-block;
                                color: #fff;
                                font-size: 24px;
                                background: @mc3;
                            }
                            .txt_sym{
                                padding-right: 4px;
                                color: @mc3;
                                font-size: 24px;

                            }

                        }

                    }
                    li:last-child{
                        margin-bottom: 0;
                    }

                }
				

			}			
		}
    }
    .floor1{
        .floorSet(1242px,550px);
        // background: red;
        .eachartContainer{

        }

    }
    .floor2{
        .floorSet(1080px,250vh);
        // background: yellow;
		

    }
    .tipModelTips{
        // 语言选择弹出窗
        .wordingSelectModel{
            /deep/.el-dialog__wrapper{
                .el-dialog__header{
                    text-align: left;
                    border-bottom: 1px solid #e5e5e5;
                    .el-dialog__title{
                        color: @mc1;
                        font-size: 16px;
                    }
                }
                .el-dialog__body{
                    .el-radio-group{
                        .flexParent(column,space-between);
                        .el-radio{
                            .resize;
                            margin-bottom: 10px;
                            .el-radio__input{
                                box-sizing: border-box;
                                display: inline-block;
                                padding-right: 10px;
                                width: 50%;
                                text-align: right;
                                vertical-align: middle;
                                // .el-radio__inner{
                                //     border-color: #A578D9;
                                //     background: #A578D9;
                                // }
                            }
                            .el-radio__label{
                                box-sizing: border-box;
                                display: inline-block;
                                font-size: 16px;
                                vertical-align: middle;
                            }
                        }
                        .is-checked{
                            .is-checked{
                                .el-radio__inner{
                                    border-color: @fc3;
                                    background: @fc3;
                                }
                            }
                            .el-radio__label{
                                color: @fc3;
                            }
                        }
                        .el-radio:last-child{
                            margin: 0;
                        }
                    }
                }
                .el-dialog__footer{
                    .dialog-footer{
                        .el-button--default{
                            background: #f5f5f5;
                        }
                        .el-button--primary{
                            border: 1px solid @fc2;
                            background: @mc2;
                        }
                    }
                }
            }
        }
    }
    
}
</style>



