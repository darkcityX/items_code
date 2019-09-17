<template>
	<div class="index">
		<!-- 一、头部区域 -->
		<div class='header'>
			<!-- 1、左侧 -->
			<div class='headerSon header-left'>
				<!-- 1.1、logo -->
				<img class='logo' src="@/assets/images/logo.png" alt="">
				<img class='containerBottom' src="@/assets/images/line1.png" alt="">
			</div>
			<!-- 2、中部：导航 -->
			<div class='headerSon header-center'>
				<router-link class='active' to="/">{{ $t('m.首页') }}</router-link>	
				<!-- <router-link to="/settings">系统设置</router-link>	 -->
			</div>
			<!-- 3、右侧搜索及语言设置 -->
			<div class='headerSon header-right'>
				<el-select 
					class='language' 
					v-model="headerData.languages.selected" 
					@change="selectLanguage"
					placeholder="请选择">
					<el-option
						v-for="item in headerData.languages.opts"
						:key="item.language"
						:label="$t('m.'+item.label)"
						:value="item.language">
					</el-option>
				</el-select>
				<el-input 
					class='search' 
					v-model="headerData.searchData.seach" 
					suffix-icon="el-icon-search"
					@keyup.enter.native="submit"
					:placeholder="$t('m.搜索内容')"
				>    
                </el-input>
                <span class='seachBtn' @click='submit'></span>
			</div>	
		</div>
		<!-- 二、banner -->
		<div class='banner'>
			<div class='bannerAll'>
				<img class='bannerImage' src="@/assets/images/bannerImg.png" alt="">
				<img class='bannerImage' src="@/assets/images/bannerText.png" alt="">
			</div>
			<img class='bannerLine bannerTopline' src="@/assets/images/line1.png" alt="">
			<img class='bannerLine bannerBottomline' src="@/assets/images/line2.png" alt="">
			<img class='bannerLine bannerBi' src="@/assets/images/bi1.png" alt="">
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
                                    {{ item.tradeStatus }}
									<el-progress class='progressView' :text-inside="true" :stroke-width="18" :percentage="item.tradeStatus"></el-progress>
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
							<el-select 
                                v-model="floor2Data.lineCharSlect.selected"
                                @change="selectSymbol" 
                                placeholder="请选择">
								<el-option
									v-for="item in floor2Data.lineCharSlect.opts"
									:key="item.value"
									:label="item.label"
									:value="item.label">
								</el-option>
							</el-select>
						</div>
						<div class="echartsView">
							<div id="floor2EChart" :style="{width: '800px', height: '600px'}"></div>
						</div>
					</div>
					<img class='imgRight' src="./../assets/images/floor2_rightImg.png" alt="">
				</div>
			</div>
		</div>
		<!-- 五、楼层三：最新完成交易数据 -->
		<div class='floor floor3'>
			<div class='container'>
				<div class='floorTitle'>
					<h2>{{ $t('m.最新完成交易数据') }}</h2>
					<p>Latest Completed Data</p>
				</div>
				<div class='floorContainer'>
					<div class='left'>
						<div class='title'>
							<p>{{ $t('m.地址名称') }}:</p>	
						</div>	
						<div class='main'>
							<el-card class="box-card card1">
								<ul>
                                    <el-radio-group class='showData showData1' v-model="floor3Data.radioSelected1">
										<el-radio 
											v-for='(item,index) in floor3Data.frontTradeAddress'
											:key='index'
											v-if='index < 3'
											:label="item.tradeAddressId"
										>
											{{ item.tradeAddress }}
										</el-radio>
                                    </el-radio-group>
                                    <li class='icons'>
										<div 
											class='incoView'
											v-for='(item,index) in floor3Data.frontTradeAddress'
											:key='index'
											v-if='index < 3'>
											<img :src="item.tradeLogoUrl" :alt="item.tradeAddressId">
										</div>
                                    </li>
								</ul>
							</el-card>
							<el-card class="box-card card2">
								<ul>
                                    <el-radio-group class='showData showData2' v-model="floor3Data.radioSelected2">
										<el-radio 
											v-for='(item,index) in floor3Data.frontTradeAddress'
											:key='index'
											v-if='index > 2 && index < 6'
											:label="item.tradeAddressId"
										>
											{{ item.tradeAddress }}
										</el-radio>
                                    </el-radio-group>
                                    <li class='icons'>
										<div 
											class='incoView'
											v-for='(item,index) in floor3Data.frontTradeAddress'
											:key='index'
											v-if='index > 2 && index < 6'>
											<img :src="item.tradeLogoUrl" :alt="item.tradeAddressId">
										</div>
                                    </li>    
								</ul>
							</el-card>
						</div>
					</div>
					<div class='right'>
						<dir class='title'>
							<p>{{ $t('m.交易时间') }}:</p>
						</dir>
						<div class='main'>
							<el-card class="box-card card1">
								<el-radio-group class='showDataTime1' v-model="floor3Data.radioSelected1">
									<el-radio 
										v-for='(item,index) in floor3Data.frontTradeAddress'
										:key='index'
										v-if='index < 3'
										:label="item.tradeAddressId"
									>
										{{ item.createTime }}
									</el-radio>
                                </el-radio-group>
							</el-card>
							<el-card class="box-card card1">
                                <el-radio-group class='showDataTime2' v-model="floor3Data.radioSelected2">
									<el-radio 
										v-for='(item,index) in floor3Data.frontTradeAddress'
										:key='index'
										v-if='index > 2 && index <6'
										:label="item.tradeAddressId"
									>
										{{ item.createTime }}
									</el-radio>
                                </el-radio-group>
							</el-card>
						</div>
					</div>
				</div>
                <div class='bottomBtn'>
                    <a class='moremore' href="javascript:void(0);" @click='viewModelShow'>
						<span class='text'>{{ $t('m.更多') }}</span>
						<span class='iconmore el-icon-zoom-in'></span>
					</a>
                </div>
			</div>
		</div>
		<!-- 六、楼层四：布伦特原油交易行情 -->
		<div class='floor floor4'>
			<div class='container'>
				<div class='floorTitle'>
					<h2>{{ $t('m.布伦特原油交易行情') }}</h2>
					<p>Brent Crude Traded</p>
				</div>
				<div class='flooorContainer'>
					<div class='allInfo'>
						<div class='infoTop'>
							<p class='price'>
                                {{ floor4Data.oilTodayInfo.openPrice }}
                            </p>
							<p 
                                class='amplitude' 
                                v-bind:class='{ active: isRise }'>
                                {{ (floor4Data.oilTodayInfo.openPrice - floor4Data.oilTodayInfo.closePrice).toFixed(2) + '%' }}
                            </p>
							<p class='icon'>
                                <img v-if='isRise == false' src="@/assets/images/floor4_icon1.png" alt="">
                                <img v-else src="@/assets/images/floor4_icon2.png" alt="">
                            </p>
						</div>
						<div class='infoBottom'>
							<div class='infoBottomBlock left'>
								<div class='showIcon riseIcon'>
                                    <div class='draw'></div>
                                </div>
								<div class='block rise'>
									<p class='num'>{{ floor4Data.oilTodayInfo.max }}</p>
									<p class='text'>Heigh</p>
								</div>
							</div>
							<div class='infoBottomBlock right'>
								<div class='showIcon fallIcon'>
                                    <div class='draw'></div>    
                                </div>
								<div class='block fall'>
									<p class='num'>{{ floor4Data.oilTodayInfo.min }}</p>
									<p class='text'>Low</p>
								</div>
							</div>
						</div>
					</div>
					<div class="echartsView">
						<div id="floor4Echart" :style="{width: '1000px', height: '800px'}"></div>
					</div>
				</div>
			</div>
		</div>
		<!-- 七、弹出窗 -->
		<div class='tipModelTips'>
			<!-- 1、header——搜索成功显示数据模态框 -->
			<div class='successSearchModel'>
				<el-dialog 
					:title="$t('m.交易地址信息')"
					custom-class='viewTitle' 
					:visible.sync="headerData.searchData.successSearchModel"
					width="90%"
					center>
					<el-table 
						:data="headerData.searchData.gridData"
						header-row-class-name='titleTr'
						header-cell-class-name='title'
						row-class-name='cententTh'
						cell-class-name='centent'>
						<el-table-column header-align='center' align ='center' property="dailyTransactions" :label="$t('m.日交易次数')" width="150"></el-table-column>
						<el-table-column header-align='center' align ='center' property="realTimeFrequency" :label="$t('m.实时频率')" width="200"></el-table-column>
						<el-table-column header-align='center' align ='center' property="coinsNum" :label="$t('m.原始币数量')"></el-table-column>
						<el-table-column header-align='center' align ='center' property="currWallet" :label="$t('m.当前钱包内货币总数')"></el-table-column>
						<el-table-column header-align='center' align ='center' class-name='minCoinsNum' property="minCoinsNum" :label="$t('m.最低时期币数')"></el-table-column>
						<el-table-column header-align='center' align ='center' class-name='maxCoinsNum' property="maxCoinsNum" :label="$t('m.最高时期币数')"></el-table-column>
						<el-table-column header-align='center' align ='center' min-width='100' property="walletAddress" :label="$t('m.钱包地址')"></el-table-column>
					</el-table>
				</el-dialog>
			</div>
			<!-- 2、header——搜索失败显示暂无数据模态框 -->
			<div class='errSearchModel'>
				<el-dialog
					:title="$t('m.提示')"
					:visible.sync="headerData.searchData.errorSearchModel"
					width="30%"
				>
					<span>{{ $t('m.暂无数据') }}</span>
					<span slot="footer" class="dialog-footer">
						<!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
						<el-button type="primary" @click="headerData.searchData.errorSearchModel = false">{{ $t('m.确定') }}</el-button>
					</span>
				</el-dialog>
			</div>
            <!-- 3、楼层3——更多最新数据展示 -->
            <div class='moreModel'>
                <el-dialog 
                    :title="$t('m.最新完成交易数据')" 
                    width = '90%'
                    :visible.sync="floor3Data.moreModelData.moreModelVis">
                    <!-- tableData.slice((currentPage-1)*pagesize,currentPage*pagesize) -->
                    <el-table 
                        height='400px'
                        max-height='400px' 
                        :show-header='false'
                        :border='false'
                        :data="floor3Data.frontTradeAddress.slice( (floor3Data.moreModelData.pagination.currentPage-1)*floor3Data.moreModelData.pagination.pagesize , floor3Data.moreModelData.pagination.currentPage*floor3Data.moreModelData.pagination.pagesize )">
                        <el-table-column property="tradeAddress" :label="$t('m.钱包地址')"></el-table-column>
                        <el-table-column property="tradeLogoUrl" :label="$t('m.图标')">
                            <template slot-scope="scope">            
                                <img :src="scope.row.tradeLogoUrl"  min-width="30" height="30" />
                            </template>
                        </el-table-column>
                        <el-table-column property="createTime" label="日期"></el-table-column>
                    </el-table>
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="floor3Data.frontTradeAddress.length"
                        :page-size='floor3Data.moreModelData.pagination.pagesize'
                        @current-change="current_change">
                    </el-pagination>
                </el-dialog>
            </div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'index',
		data () {
			return {
				lang: 'zh-CN',  // 默认语言
                headerData:{
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
                        selected: this.$t('m.中文'),				
                    },
					searchData: {
						seach: "",
						successSearchModel: false,	// 搜索结果成功弹出窗控制
						errorSearchModel: false,	// 搜索结果失败弹出窗控制
						gridData: [
							{
								dailyTransactions: 3,
								realTimeFrequency: 4,
								coinsNum: 8,
								currWallet: 6,
								minCoinsNum: 7,
								maxCoinsNum: 17,
								walletAddress: 'MWY2OTImYzUtMTU5Zi0x'
							}
						],

					}    
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
						opts: [ // 交易所
							{
								language: 'ETH',
								label: 'ETH'
							}, 
							{
								language: 'ITC',
								label: 'ITC'
							}, 
							{
								language: 'BTC',
								label: 'BTC'
							},
							{
								language: 'XRP',
								label: 'XRP'
							},
							{
								language: 'EOS',
								label: 'EOS'
							},
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
				floor3Data:{
					// 选定数据
					radioSelected1: 3,
					radioSelected2: 3,
					// 
					frontTradeAddress: [
						/*{
							tradeAddressId: number,
							tradeAddress: 'MWY2N2EzZTMtMTU5Zi0x',
							createTime: '2019-05-14T10:16:29'
							tradeLogoUrl: '"http://idapp.atoshi.cn/images/10.png"'
						}*/
					],
                    moreModelData: {
                        moreModelVis: false,
                        // gridData: [ // 数据为 floor3Data.frontTradeAddress
						// 	{
                        //  }
						// ],
                        pagination: {
                            total: 0,
                            pagesize:5,
                            currentPage:1
                        }

                    }
				},
				floor4Data:{
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
        computed: {
            isRise : function(){ // 楼层4涨跌率的动态样式绑定及涨跌icon挂载
                return (this.floor4Data.oilTodayInfo.openPrice - this.floor4Data.oilTodayInfo.closePrice) < 0;
            }   
        },
        created(){
            this.getFloor1Data();
            this.getFloor2Data();
			this.getFloor3Data();
			this.getFloor4Data();
		},
		mounted(){},
		methods: {
			/**
			 * 切换语言事件
			*/
			selectLanguage(lang){
				this.$confirm( this.$t('m.确定切换语言吗')+'?', this.$t('m.提示'), {
					confirmButtonText: this.$t('m.确定'),
					cancelButtonText: this.$t('m.取消'),
					type: 'warning'
				}).then(() => {
					if ( lang === 'zh-CN' ) {
						this.lang = 'zh-CN';
						this.$i18n.locale = this.lang;
					}else if( lang === 'en-US' ){
						this.lang = 'en-US';
						this.$i18n.locale = this.lang;
					}else if( lang === 'ko-KR' ){
						this.lang = 'ko-KR';
						this.$i18n.locale = this.lang;
					}else{
						this.lang = 'ja-JP';
						this.$i18n.locale = this.lang;
					}
				}).catch((err) => {
					console.log( err );
					// this.$message({
					// 	type: 'info'
					// });          
				});
			},
			/** 
			 * 搜索事件
			*/
			submit(){
                console.log( '11111111111' );
				// 1、获取当前输入框内容
				let inputResult = this.headerData.searchData.seach;

				// 2、进行判断
				if( inputResult.trim() == "" ){
					this.$message({
						message: '请输入要查询的钱包地址!',
						type: 'warning'
					});
				}else{
					// 3、调用接口函数接口
					// let code = '100';
					// if( code == '100' ){
					// 	this.headerData.searchData.successSearchModel = true;	
					// }else{
					// 	this.headerData.searchData.errorSearchModel = true;	
                    // }
                    this.getSearchData();
					
				}
			},
            /** 
            * 获取搜索信息
            * 调用搜索接口：api/currency/search            
            */
            getSearchData(){
                console.log( this.headerData.searchData.seach );
                this.$axios.post('api/currency/search',{
                    walletAddress: this.headerData.searchData.seach
                }).then(res => {
                    console.log( '请求成功-------------------' );
                    console.log( res );
                    // 数据赋值
                    let {
                        riJiaoYiShuLiang : dailyTransactions,            // 日交易次数 
						shiShiPingLv : realTimeFrequency,         // 实时频率
						yuanShiBiShuLiang : coinsNum, // 原始币数量
						dangQianHuoBiZongShu : currWallet,                // 当前钱包内货币总数
						zuiDiBiShu : minCoinsNum,               // 最低时期币数
						zuiGaoBiShu : maxCoinsNum,              // 最高时期币数
						walletAddress : walletAddress    // 钱包地址  
                    } = res;
                    
                    // 存入data中
                    this.headerData.searchData.gridData[0] = {
                        dailyTransactions : dailyTransactions,
                        realTimeFrequency : realTimeFrequency,
                        coinsNum : coinsNum,
                        currWallet : currWallet,
                        minCoinsNum : minCoinsNum,
                        maxCoinsNum : maxCoinsNum,
                        walletAddress : walletAddress

                    }

                    // console.log( this.headerData.searchData.gridData[0] );

                    // 打开模态框
                    this.headerData.searchData.successSearchModel = true;

                }).catch(err => {
                    // console.log( '请求失败---------------------' );
                    this.headerData.searchData.errorSearchModel = true;
                });
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
								fontSize: 14
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
							name : this.floor2Data.echartsData.exchange[0],
							type : 'line', 
							itemStyle:{

							},
							lineStyle: {
								color: '#F14F9E',
								width: 2,
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
								width: 2,
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
								width: 2,
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
								width: 2,
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
            selectSymbol( selected ){
				// console.log( "----已选定币种："+selected );
				this.floor2Data.lineCharSlect.selected = selected;
				this.getFloor2Data();
            },

			/**
			 * 获取楼层3数据——最新完成交易数据
			 * 接口：api/currency/newTrade
			*/ 
            getFloor3Data(){ 
				this.$axios.post('api/currency/newTrade',{

				}).then(res =>{
					// console.log( res.TradeAddress );
					if( res.TradeAddress ){
                        // console.log( res );
						// 1、对后台数据进行处理
						this.floor3Data.frontTradeAddress = res.TradeAddress.map((val,index,arr) => {
							return {
								tradeAddressId: val.tradeAddressId,
								tradeAddress: val.tradeAddress,
								createTime: val.createTime,
								tradeLogoUrl: val.tradeLogoUrl
							}
						});	
						// 2、对默认选定项进行赋值
						this.floor3Data.radioSelected1 = this.floor3Data.frontTradeAddress[0].tradeAddressId;
						this.floor3Data.radioSelected2 = this.floor3Data.frontTradeAddress[3].tradeAddressId;					
					}else{
						console.error('前端定义报错信息：楼层3字段数据TradeAddress不存在!');
					}
				}).catch(err =>{
					console.log(err);
				});
            },

            /** 
             * 页码切换事件
            */
            current_change:function(currentPage){
                this.floor3Data.moreModelData.pagination.currentPage = currentPage;
            },

            /**
             * 更多按钮点击事件
             */
            viewModelShow(){

                // 1 设置页码总数
                this.floor3Data.moreModelData.pagination.total = this.floor3Data.frontTradeAddress.length;
                
                // 2、显示更多模态框
                this.floor3Data.moreModelData.moreModelVis = true; 

            },
            
			/**
			 * 获取楼层4数据——布伦特原油交易行情
			 * 1、调用获取原油信息接口函数
             * 2、调用获取原油实时数据接口函数
			*/ 
            getFloor4Data(){ 
                this.getFloor4OliInfo();
                this.getFloor4OliLineData();
			},
			getFloor4OliInfo(){ // 获取原油信息接口函数: api/oil/today
				this.$axios.post('api/oil/today',{

				}).then(res => {
					if( res.oilTodayPrice ){
						this.floor4Data.oilTodayInfo = res.oilTodayPrice;

						// console.log( this.floor4Data.oilTodayInfo );
					}else{
						console.error('前端定义报错信息：楼层3字段数据TradeAddress不存在!');
					}
				}).catch(err => {
					console.log(err);
				});
            },
            getFloor4OliLineData(){ // 获取原油折线图数据
                this.$axios.post('api/oil/realTimePriceList',{
                    count: '32'
                }).then(res => {
                    // console.log( res.oilRealtimePriceList );
                    if( res.oilRealtimePriceList ){
                        this.floor4Data.lineData = res.oilRealtimePriceList.map((val,index,arr) => {
                            return {
                                name: val.name,
                                nowPrice: val.nowPrice,
                                time: val.time
                            }
                        });
                        // 调用数据二次处理函数
                        this.factory4Data();
                    }else{
						console.error('前端定义报错信息：楼层3字段数据TradeAddress不存在!');
					}
                }).catch(err => {
                    console.log(err);
                });
            },
            factory4Data(){ 
                // 1、处理x轴轴线数据
                this.floor4Data.echartsData.xLabel = this.floor4Data.lineData.map((val,index,arr) => {
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
                this.floor4Data.echartsData.data = this.floor4Data.lineData.map((val) => {
                    return val.nowPrice;
                });

                // 3、折现原油名称
                // console.log( this.floor4Data.lineData[0].name );
                this.floor4Data.echartsData.oilname = this.floor4Data.lineData[0].name;
                
                // console.log( this.floor4Data.echartsData );

                // 4、调用折现绘制函数
                this.drawFloor4Line();

            },
			drawFloor4Line(){
				// 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('floor4Echart'));
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
                                name : this.floor4Data.echartsData.oilname, 
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
                            data : this.floor4Data.echartsData.xLabel,
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
							name: this.floor4Data.echartsData.oilname || '原油',
							type:'line', 
							itemStyle:{

							},
							lineStyle: {
								color: '#F14F9E',
								width: 2,
							},    
							smooth: true,
							smoothMonotone: 'x',       
                            data: this.floor4Data.echartsData.data
						}
					]
				});    				
            }            
		}
	}
</script>


<style lang='less' scoped>
// 导入封装的样式函数库
@import "../common/css/mixin.less";

.index{
	height: 7552px;
	background: url("./../assets/images/bigbg.png") no-repeat top center;
	.header{
		margin: 0 auto;
		padding: 20px 15px;
		width: 1200px;
		min-width: 960px;
		max-width: 1200px;
		height: 80px;
		min-height: 80px;
        font-size: 0;
		.headerSon{
			display: inline-block;
			vertical-align: middle;
			width: 33.3%;
			height: 80px;
			min-height: 80px;
			line-height: 80px;
		}
		.header-left{
			position: relative;
			line-height: 113px;
			text-align: left;
			.logo{
				min-width: 112px;
				min-height: 33px;	
			}
			.containerBottom{
				position: absolute;
				left: -50%;
				bottom: -20px;
				width: 100%;
				transform: translateX(25%);
			}
		}
		.header-center{
			text-align: center;
			a{
				padding: 6px 20px;
				color: #fff;
				font-size: 16px;
				
			}
			.active{
				background:linear-gradient(90deg,rgba(138,103,225,1),rgba(234,82,161,1));
				border-radius:15px 16px 16px 16px;
			}
		}
		/deep/.header-right{
            position: relative;
			text-align: right;
			white-space: nowrap;
			.language,.search{
				display: inline-block !important;
            }	
			.language{
				width: 100px;
				.el-input{
					.el-input__inner{
						color: #fff;
						border-right: none;
						border-radius: 4px 0 0 4px;
						border-color: #fff !important;
						background: rgba(255,255,255,0);
					}	
				}			
			}
			.search{
				width: 200px;
				.el-input__inner{
					color: #fff;
					border-left: none;
					border-radius: 0 4px 4px 0;
					border-color: #fff !important;
					background: rgba(255,255,255,0);
				}	
            }
            .seachBtn{
                display: block;
                position: absolute;
                top: 50%;
                right: 6px;
                z-index: 100;
                width: 24px;
                height: 24px;
                background: rgba(255,255,255,0);
                transform: translateY(-50%);                    
            }
		}
	}
	.banner{
		position: relative;
		top: 160px;
        min-width: 960px;
		.bannerAll{
			img{
				margin: 0 auto;
				display: block;
			}
		}
		.bannerLine{
			position: absolute;	
		}	
		.bannerTopline{
			top: 50%;
			right: 0;
			transform: translateY(-50%);
		}
		.bannerBottomline{
			left: 0;
			bottom: -60px;
		}
		.bannerBi{
			display: none;
			left: 100px;
			bottom: -435px;
		}

	}
	.floor{
		margin: 0 auto;
		width: 100%;
	}
	.floor1{
		// min-width: 1200px;
		// width: 1200px;
		// position: relative;
		// margin-top: 550px;
		// height: 400px;
		.floorSet(400px,550px);
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
				font-size: 0;
				.floor1main{
					display: inline-block;
					width: 50%;
					font-size: 16px;
					vertical-align: top;
					.title{
						margin-bottom: 40px;
						color: #1E0D6F;
						font-size: 20px;
						font-weight: 600;
					}
				}
				.floor1Left{
					.left{
						li{
							text-align: left;
							padding: 10px 0;
							color: #1E0E70;
							font-size: 18px;
							font-weight: 600;
							height: 30px;
							line-height: 30px;
						}
					}

				}
				.floor1Right{
					.right{
						li{
							padding: 10px 20px 10px 0;
							font-size: 18px;
							height: 30px;
							line-height: 30px;
							white-space: nowrap;
							.progress{
								position: relative;
								display: inline-block;
								width: 60%;
								font-size: 0;
								vertical-align: middle;
								border: 1px solid #A89EF0;
								border-radius: 18px;
								/deep/.progressView{
									box-sizing: border-box;
									padding: 0 20px;
									padding-right: 120px;
									display: inline-block;
									width: 100%;
									.el-progress-bar{
										.el-progress-bar__outer{
											background: none;
											.el-progress-bar__inner{
												background:linear-gradient(90deg,rgba(138,103,225,1),rgba(234,82,161,1));
												.el-progress-bar__innerText{
													display: none;
												}
											}
										}
									}
								}
								.result{
									position: absolute;
									right: 0;
									width: 100px;
									font-size: 18px;
									font-weight: 500;
									text-align: center;
									color: #EA72A4;
								}
								.active{
									color: #6352A8;
								}

							}
							.indexNum{
								padding-left: 20px;
								display: inline-block;
								width: 40%;
								font-size: 18px;
								font-weight: 600;
								vertical-align: middle;
								color: #EA72A4;
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
		// min-width: 1200px;
		// width: 1200px;
		// margin-top: 800px;
		// position: relative;
		// height: 900px;
		.floorSet(900px,800px);
		.container{
			// position: absolute;
			// top: 0;
			// left: 50%;
			// min-width: 1200px;
			// width: 1200px;
			// transform: translateX(-50%);
			.containerSet();
			.floorTitle{
				margin-top: 20px;
                text-align: right;
                &:before{
					position: absolute;
					top: -19px;
					right: 0;
					display: block;
					content: "";
					width:70px;
					height:5px;
					background:linear-gradient(90deg,rgba(191,82,231,1),rgba(250,79,148,1));
					border-radius:1px;
				}
				h2{
					color: #1E0D6F;
					font-size: 32px;
					font-weight: 600;
				}
				p{
					margin-top: 12px;
					color: #946AD1;
					font-size: 24px;
					font-weight: 500;
				}
			}
			.floorContainer{
				margin-top: 20px;
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
						margin-top: 100px;
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
	.floor3{
		// min-width: 1200px;
		// width: 1200px;
		// margin-top: 600px;
		// position: relative;
		// height: 800px;
		.floorSet(800px,600px);	
        .container{
            // position: absolute;
			// top: 0;
			// left: 50%;
			// min-width: 1200px;
			// width: 1200px;
			// transform: translateX(-50%);  
			.containerSet();
            .floorTitle{
                margin-top: 20px;
                position: relative;
                text-align: center;
                &:before{
					position: absolute;
					top: -19px;
					left: 50%;
					display: block;
					content: "";
					width:70px;
                    height:5px;
                    border-radius:1px;
                    transform: translateX(-180%);
					background:linear-gradient(90deg,rgba(191,82,231,1),rgba(250,79,148,1));
					
				}
				h2{
					color: #1E0D6F;
					font-size: 32px;
					font-weight: 600;
				}
				p{
					margin-top: 12px;
					color: #946AD1;
					font-size: 24px;
					font-weight: 500;
                }   
                 
            }  
            .floorContainer{
                margin-top: 64px;
                display: flex;
                // font-size: 0;
                .left,.right{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    .title{
                        margin: 0;
                        padding: 0;
                        margin-bottom: 26px;
                        padding-left: 60px;
                        
                        p{
                            font-size:19px;
                            font-family:PingFangSC-Regular;
                            font-weight:bold;
                            color:#23156F;
                        }
                    }
                    .main{
                        .el-card{
                            margin-bottom: 36px;    
                        }     
                        .el-card:last-child{
                            margin-bottom: 0;
                        }  
                    }
                }
                .left{
                    padding-right: 24px;
                    .title{
                        
                        width: 332px;
                        max-width: 332px;
                        min-width: 332px;
                        align-self: flex-end;
                    }
                    .main{
                        align-self: flex-end;
                        .el-card{
                            width: 332px;
                            height: 210px;
                            // align-self: flex-end;
                        }
                        ul{
							.showData{
								// font-size:16px;
								// font-family: PingFangSC-Medium;
								// font-weight: bold;
								// color:#23156F;
								/deep/.el-radio{
									margin-bottom: 24px;
									.el-radio__input{
										.el-radio__inner{
											border-color: #fff;
										}	
									}
									.el-radio__label{
										font-size:16px;
										font-family: PingFangSC-Medium;
										font-weight: bold;
										color:#23156F;	
									}
								}
								/deep/.is-checked{
									.el-radio__inner{
										background: #A578D9;
    									box-shadow: 0px 0px 12px 3px rgba(115,92,153,0.18);
									}
								}
							}
                            .icons{
                                display:flex;
                                flex-direction: row;
                                flex-wrap: nowrap;
                                justify-content: space-between;
                                // img{
                                //     width: 78px;
								// 	height: 40px;
								// 	object-fit: contain;
								// 	border: 6px solid #ddd;
								// 	border-image: linear-gradient(#8a67e1, #ea52a1) 20 20;
								// }
								.incoView{
									box-sizing: border-box;
									width: 78px;
									height: 40px; 
									box-sizing: border-box; 
									padding: 4px; 
									border-radius: 50px; 
									background-image: -webkit-linear-gradient(90deg, #8a67e1, #ea52a1);  
									background-image: -moz-linear-gradient(90deg, #8a67e1, #ea52a1); 
									background-image: linear-gradient(90deg, #8a67e1, #ea52a1);
									img{
										box-sizing: border-box;
    									padding: 2px;
										width: 100%;
										height: 100%;
										object-fit: contain;
										border-radius:50px; 
										background:#fff;
									}
								}
                            }
                        }
                        
                    }
                }
                .right{
					padding-top: 20px;
                    padding-left: 24px;
                    .title{
                        max-width: 256px;
                    }
                    .main{
						
                        /deep/.el-card{
                            width: 256px;
							height: 166px;
							.el-card__body{
								box-sizing: border-box;
								height: 100%;
								.el-radio-group {
									height: 100%;
									display: flex;
									flex-direction: column;
									flex-wrap: nowrap;
									justify-content: space-between;	
									.el-radio{
										padding: 10px 0;
										.el-radio__input{
											.el-radio__inner{
												border-color: #fff;
											}	
										}
										.el-radio__label{
											font-size:16px;
											font-family: PingFangSC-Medium;
											font-weight: bold;
											color:#EA72A4;	
										}
									}
									.is-checked{
										.el-radio__inner{
											background: #EA72A4;
											box-shadow: 0px 0px 12px 3px rgba(234,114,164,0.18);
										}
									}
								}								
							}
                        }
                    }   
                }
            }
        }
        .bottomBtn{
            margin-top: 58px;
            text-align: center;
            .moremore{
                margin: 0 auto;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: space-around;
                width: 133px;
                height: 49px;
                line-height: 49px;
                border-radius: 25px;
                background: linear-gradient(90deg, #8a67e1, #ea52a1);
                .text{
					flex: 2;
                    color: #fff;
                    font-size: 18px;
                }
                .iconmore{
					flex: 1;
                    color: #fff;
                    font-size: 24px;
                    line-height: 49px;
                }
            }
        }
		
	}
	.floor4{
		// margin-top: 900px;
		// position: relative;
		// height: 800px;
		.floorSet(800px,900px);
		.container{
			// position: absolute;
			// top: 0;
			// left: 50%;
			// min-width: 1200px;
			// width: 1200px;
			// transform: translateX(-50%); 
			.containerSet();
			.floorTitle{
				margin-bottom: 54px;
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
			.flooorContainer{
				.allInfo{
					.infoTop{
						margin-bottom: 25px;
						display: flex;
						flex-direction: row;
						flex-wrap: nowrap;
						justify-content: flex-start;
						.price{
							font-size:28px;
							font-family:PingFangSC-Regular;
							font-weight:bold;
							color:#23156F;
							align-self: flex-end;
						}
						.amplitude{
							padding: 0 10px;
							font-size:16px;
							font-family:PingFangSC-Regular;
							font-weight:bold;
							color:#F03F3B;
							align-self: flex-end;
                        }
                        .active{
                            color: #11A514;
                        }
						.icon{
							align-self: flex-end;
							img{
								width: 18px;
								height: 14px;
							}
						}
					}
					.infoBottom{
						display: flex;
						flex-direction: row;
						flex-wrap: nowrap;
						justify-content: flex-start;
						.infoBottomBlock{
							box-sizing: border-box;
							display: flex;
							flex-direction: row;
							flex-wrap: nowrap;
							width: 145px;
							height: 80px;
							border-radius: 4px;
                            background: #515075;
                            .showIcon{
                                flex: 1;
                            }
							.block{
								flex: 1;
							}
							.rise,.fall{
								display: flex;
								flex-direction: column;
								.num,.text{
									flex: 1;
									width: 52px;
									align-self: center;
    								text-align: right;
								}
								.num{
									color: #fff;
									font-size: 20px;
									line-height: 2;
								}
								.text{
									color: #AD90E9;
									font-size: 16px;
								}
							}
						}
						.left{
                            margin-right: 10px;
                            .riseIcon{
                                .draw{
                                    position: relative;
                                    width: 0;
                                    border-top: 30px solid transparent;
                                    border-right: 30px solid #615F82;
                                    -webkit-transform: rotate(10deg) translateX(100%);
                                    transform: rotate(250deg) translateX(-30px) translateY(24px);   
                                }
                                :after{
                                    content: "";
                                    position: absolute;
                                    border: 0 solid transparent;
                                    border-top: 10px solid #615F82;
                                    border-radius: 0 200px 0 0;
                                    top: -60px;
                                    left: -14px;
                                    width: 46px;
                                    height: 30px;
                                    -webkit-transform: rotate(45deg);
                                    transform: rotate(224deg);
                                } 
                            }
						}
						.right{
                            .showIcon{
                                .draw{
                                    position: relative;
                                    width: 0;
                                    border-top: 30px solid transparent;
                                    border-right: 30px solid #615F82;
                                    -webkit-transform: rotate(10deg) translateX(100%);
                                    transform: rotate(10deg) translateX(150%) translateY(24px);
                                }
                                :after{
                                    content: "";
                                    position: absolute;
                                    border: 0 solid transparent;
                                    border-top: 10px solid #615F82;
                                    border-radius: 200px 0 0 0;
                                    top: -40px;
                                    left: -34px;
                                    width: 46px;
                                    height: 30px;
                                    -webkit-transform: rotate(45deg);
                                    transform: rotate(45deg);
                                }
                            }    
                        }
						
					}
				}	
				.echartsView{
					margin-top: 60px;	
				}
			}

		}

	}
	.tipModelTips{
		.successSearchModel{
			/deep/.el-dialog__wrapper{
				.viewTitle{
					.el-dialog__header{
						.el-dialog__title{
							position: relative;
							color: #1E0E6E;
							font-weight: 600;
							&:before,&:after{
								position: absolute;
								top: 50%;
								display: inline-block;
								content: '';
								width: 18px;
								height: 4px;
								transform: translateY(-50%);
								background: linear-gradient(90deg, #8a67e1, #ea52a1);
							}
							&:before{
								left: -30px;
							}
							&:after{
								right: -30px
							}
						}							
					}
				}
				.titleTr{
					.title{
						color: #1E0E6E;
						font-weight: 600;
					}
				}
				.cententTh{
					.centent{
						color: #1E0E6E;
						font-weight: 600;	
					}
					.minCoinsNum,.maxCoinsNum{
						padding: 0 10px;
						div{
							height: 40px;
							line-height: 40px;
							border-radius: 50px;
							background: #ff0000;
						}
					}
					.minCoinsNum{
						div{
							background: #80E2DF;
						}
					}
					.maxCoinsNum{
						div{
							background: #FEBED9;
						}
					}
				}
			}
		}
        .errSearchModel{}
        .moreModel{
            .el-pagination{
                padding-top: 20px;
                text-align: center;
            }
        }
	}



}
</style>
