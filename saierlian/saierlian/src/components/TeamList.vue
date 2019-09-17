<template>
    <!-- 团队收益列表组件 -->
    <div id='teamIncomeList' class='teamIncomeList'>
        <div class='listTitle'>
            <span class='title'>团队收益</span>
            <span class='close'>
                <i class="mint-toast-icon mintui mintui-field-error"></i>
            </span>
        </div>
        <!-- 列表 -->
        <ul class='listAll'>
            <li 
                class='item'
                v-for='(item,index) in showCurrList'
                :key='index'
                >
                <div class='row'>
                    <p class='cloum'>
                        <span class='label'>用户UID:</span>
                        <span class='value'>{{ item.UserId }}</span>
                    </p>
                    <p class='cloum'>
                        <span class='label'>用户身份:</span>
                        <span class='value'>{{ item.NodeId }}</span>
                    </p>
                </div>
                <div class='row'>
                    <p class='cloum'>
                        <span class='label'>交易对:</span>
                        <span class='value'>SAR/USDT</span>
                    </p>
                    <p class='cloum'>
                        <span class='label'>奖励数量:</span>
                        <span class='value'>{{ item.GiftNum }}</span>
                    </p>
                </div>
                <div class='row'>
                    <p class='cloum'>
                        <span class='label'>订单成交日期:</span>
                        <span class='value'>{{ item.OrderDate }}</span>
                    </p>
                    <p class='cloum'>
                        <span class='label'>收益发放时间:</span>
                        <span class='value'>{{ item.CalcTime }}</span>
                    </p>
                </div>
                
            </li>   
        </ul>
        <!-- 页码 -->
        <div class='page-bar'>
            <!-- 
                mint-toast-icon mintui mintui-more 
                mint-toast-icon mintui mintui-allow-right
            -->
            <ul>
                <li v-if="pageData.current>1"><a v-on:click="pageData.current--,pageClick()">&lt;</a></li>
                <li v-if="pageData.current==1"><a class="banclick">&lt;</a></li>
                <li v-for="index in indexs"  v-bind:class="{ 'active': pageData.current == index}">
                    <a v-on:click="btnClick(index)">{{ index }}</a>
                </li>
                <li v-if="pageData.current!=pageData.pages"><a v-on:click="pageData.current++,pageClick()">&gt;</a></li>
                <li v-if="pageData.current == pageData.pages"><a class="banclick">&gt;</a></li>
                <!-- <li><a>共<i>{{this.pageData.pages}}</i>页</a></li> -->
            </ul>
        </div>
    </div>
    <!-- 页码 -->
</template>

<script>
    export default {
        name: 'teamList',
        data(){
            return {
                // all: 2,    //总页数
                // cur: 1,     //当前页码

                postData:{
                    uid: 63238,
                    i: 3,  // 传参：
                },
                teamIncomeList:[ // mock数据
                    {
                        UserId: '0',        // 用户UID
                        NodeId: '见习矿工',      // 用户身份
                        GiftNum: '1.1234',      // 奖励数量
                        OrderDate: '2019-05-30 15:48:16', // 订单成交日期
                        CalcTime: '2019-05-31'        // 	收益发放时间
                    },
                    {
                        UserId: '1',        // 用户UID
                        NodeId: '见习矿工',      // 用户身份
                        GiftNum: '1.1234',      // 奖励数量
                        OrderDate: '2019-05-30 15:48:16', // 订单成交日期
                        CalcTime: '2019-05-31'        // 	收益发放时间
                    },
                    {
                        UserId: '2',        // 用户UID
                        NodeId: '见习矿工',      // 用户身份
                        GiftNum: '1.1234',      // 奖励数量
                        OrderDate: '2019-05-30 15:48:16', // 订单成交日期
                        CalcTime: '2019-05-31'        // 	收益发放时间
                    },
                    {
                        UserId: '3',        // 用户UID
                        NodeId: '见习矿工',      // 用户身份
                        GiftNum: '1.1234',      // 奖励数量
                        OrderDate: '2019-05-30 15:48:16', // 订单成交日期
                        CalcTime: '2019-05-31'        // 	收益发放时间
                    },
                    {
                        UserId: '4',        // 用户UID
                        NodeId: '见习矿工',      // 用户身份
                        GiftNum: '1.1234',      // 奖励数量
                        OrderDate: '2019-05-30 15:48:16', // 订单成交日期
                        CalcTime: '2019-05-31'        // 	收益发放时间
                    },
                    {
                        UserId: '5',        // 用户UID
                        NodeId: '见习矿工',      // 用户身份
                        GiftNum: '1.1234',      // 奖励数量
                        OrderDate: '2019-05-30 15:48:16', // 订单成交日期
                        CalcTime: '2019-05-31'        // 	收益发放时间
                    },
                ],
                showCurrList: [],
                pageData:{
                    current: 1,         // 当前页
                    pages: 0,           // 总页数
                    // searchCount: true,  // 
                    size: 5,           // 每页显示的条数
                    total: 0,           // 总条数   
                }
                
            }
        },
        computed: {
            indexs: function(){
                var left = 1;
                var right = this.pageData.pages;
                console.log( `----index:----------${this.pageData.pages}` );
                var ar = [];
                if(this.pageData.pages>= 5){
                    if(this.pageData.current > 3 && this.pageData.current < this.pageData.pages-2){
                            left = this.pageData.current - 2;
                            right = this.pageData.current + 2;
                    }else{
                        if(this.pageData.current<=3){
                            left = 1;
                            right = 5;
                        }else{
                            right = this.pageData.pages;
                            left = this.pageData.pages -4;
                        }
                    }
                }
                while (left <= right){
                    ar.push(left);
                    left ++;
                }
                return ar
            }
            
        },
        watch: {
            cur: function(oldValue , newValue){
                console.log(arguments);
            }
        },
        created(){
            // 设置token
            localStorage.setItem('token','c529851934f4767edafb0217558925a4b846e37cd87f4380b69ee611190a34dd');

            // mok数据：
            this.teamIncomeList = [];
            for( let i = 0 ; i < 98 ; i++ ){
                this.teamIncomeList.push({
                        UserId: i,        // 用户UID
                        NodeId: '见习矿工',      // 用户身份
                        GiftNum: '1.1234',      // 奖励数量
                        OrderDate: '2019-05-30 15:48:16', // 订单成交日期
                        CalcTime: '2019-05-31'        // 	收益发放时间
                });    
            }


            // 模拟给值页码值
            console.log("--挂载-赋值前：--总列表长度："+ this.teamIncomeList.length +"--总页数:-"+ this.pageData.pages +"--总条数：-"+this.pageData.total);
            this.pageData.total = this.teamIncomeList.length;  // 总条数
            this.pageData.pages = Math.ceil(this.teamIncomeList.length/this.pageData.size);
            console.log("--挂载-赋值前：--总列表长度："+ this.teamIncomeList.length +"--总页数:-"+ this.pageData.pages +"--总条数：-"+this.pageData.total);





            // 调用后台接口函数
            this.getTeamDtata();
        },
        mounted(){

            // 初次加载数据展示
            this.showCurrList = this.teamIncomeList.slice(0,this.pageData.size);
        },
        methods:{
            getTeamDtata(){ // 获取后台数据: /open/api/web/teamdetail
                this.axios.post('/open/api/web/teamdetail',{
                    uid: this.postData.uid,
                    i: this.postData.i
                }).then(res => {

                    console.log( res );

                }).catch(err => {

                });

            },
            btnClick: function(data){//页码点击事件
                console.log( `--当前点击的页码:${data}--当前页码:${this.pageData.current}` );
                if(data != this.pageData.current){
                        
                }
            },
            pageClick: function(){
                
                // 计算截取总列表截取起始位置和终结位置 
                let start = this.pageData.current*this.pageData.size-this.pageData.size;//this.pageData.current*this.pageData.size-this.pageData.size+1;
                let end = this.pageData.current*this.pageData.size;
                // console.log( open,end );

                // console.log( this.teamIncomeList );

                // 当前显示页列表
                this.showCurrList = this.teamIncomeList.slice(start,end);

            }   
        }

    }
</script>

<style scoped lang="scss">
    @import "src/common/css/mixin";
    .teamIncomeList{
        // padding: Rem(10);
        // padding-top: 0;
        .listTitle{
            padding: 0 Rem(10);
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: space-between;  
            height: Rem(30);  
            border-radius: Rem(4) Rem(4) 0 0;
            background: #202D5A;
            span{
                font-size: Rem(14);
            }
            span:first-child{
                color: #fff;
                font-size: Rem(16);
            }
            span:last-child{
                color: #385B92;
            }
        }
        .listAll{
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            justify-content: flex-start;
            background: #131D3D;
            .item{
                padding: Rem(10);
                display: flex;
                flex-direction: column;
                flex-wrap: nowrap;
                justify-content: flex-start; 
                border-bottom: 1px solid #35445E;
                .row{
                    margin-bottom: Rem(10);
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    justify-content: space-between;   
                    .cloum{
                        flex: 1;
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        justify-content: space-between;
                        .label,.value{
                            flex: 1;
                            font-size: Rem(11);
                        }
                        .label{
                            color: #6C7691;
                            text-align: right;
                        }
                        .value{
                            padding-left: Rem(10);
                            color: #fff;
                        }
                    }                     
                } 
                .row:last-child{
                    margin-bottom: 0;
                }

            }

        }
        .page-bar{
            // margin: 40px;
            background: #131D3D;
            ul{
                margin: 0px;
                padding: Rem(10);
                font-size: Rem(12);
                text-align: center;
                white-space: nowrap;
                li{
                    margin-left: Rem(4);
                    display: inline-block;
                    list-style: none;
                    border-radius: 4px;
                    a{
                        box-sizing: border-box;
                        display: inline-block;
                        
                        text-decoration: none;
                        // position: relative;
                        // float: left;
                        padding: Rem(6) Rem(12);
                        margin-left: -1px;
                        
                        color: #fff;
                        font-size: Rem(12);
                        line-height: 1.42857143;
                        border: 1px solid #1D2D5F;
                        border-radius: Rem(4);
                        background: #1D2D5F;
                        i{
                            font-size: Rem(12);
                        }
                    }
                    a.banclick{
                        cursor:not-allowed;
                    }
                    
                }
                li:first-child{
                    margin-left: 0px;
                    a{
                        margin-left: 0px;
                    }
                }
                li.active{
                    a{
                        color: #fff;
                        cursor: default;
                        background-color: #24A6FF;
                        border-color: #24A6FF;
                    }
                }
            }
        }

    }
</style>




