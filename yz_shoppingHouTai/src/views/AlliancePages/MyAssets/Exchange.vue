{<template>
    <div class="exchange">
        <!-- <p>人民币兑换成原子币</p> -->
        <!-- <Row>
            <Col span="3" style="background: red;">3</Col>
            <Col span="8" style="background: green;">8</Col>
            <Col span="2" style="background: yellow;">2</Col>
            <Col span="8" style="background: red;">8</Col>
            <Col span="3" style="background: green;">3</Col>
        </Row> -->
        <div class="main">
            <Row>
                <!-- 1.1、左侧 -->
                <Col span="7" offset="3">
                    <div class="classification classificationLeft">
                        <img src="./../../../assets/images/rmbIcon.png" alt="">
                        <span>RMB</span>
                    </div>
                    <div class="input inputLeft">
                        <Input v-model="nowSalary" placeholder="请输入兑换金额"/>
                        <p>(账户余额:￥{{ getNum.rmbBalance }})</p>
                    </div>
                </Col>
                <!-- 1.2、中 -->
                <Col span="4">
                    <div class="middlContent">
                        <img src="./../../../assets/images/exchangeIcon.png" alt="">    
                    </div>
                </Col>
                <!-- 1.3、右侧 -->
                <Col span="7">
                    <div class="classification classificationRight">
                        <img src="./../../../assets/images/yuanziIcon.png" alt="">
                        <span>ATOS</span>
                    </div>
                    <div class="input inputRight">
                        <Input v-model="exchangeNum" placeholder="请输入兑换金额"/>
                        <p>(实际数量:{{getNum.actualAmount}}枚 + 奖励数量: {{getNum.rewardsAmount}}枚)</p>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span="6" offset="9">
                    <Button class="submitBtn" type="primary">提交</Button>
                </Col>
            </Row>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'exchange',
        data(){
            return {
                
                getNum:{
                    rmbBalance : 0,
                    actualAmount : 0,
                    rewardsAmount : 0      
                },
                
                nowSalary: "",
                exchangeNum : 0,
            }
        }
    }
</script>

<style lang="less">
    .exchange{
        padding: 40px 0;
		min-height: 760px;
        background: rgb(255, 255, 255); 
        .main{
            margin-top: 20%;
            
            .classification{
                margin-bottom: 30px;
                text-align: left;
                img{
                    vertical-align: middle;
                    border: 2px dashed #e5e5e5;
                }
                span{
                   font-size:24px;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                    vertical-align: middle;
                }
            }
            .classificationRight{
                text-align: right;
            }

            .input{
                .ivu-input{
                    padding: 0 20px;
                    height: 50px;
                    font-size: 16px;
                    border: none;
                    border-radius: 0;
                    box-shadow: none;
                    border-bottom: 1px solid #333;
                }
                p{
                    margin-top: 4px;
                    font-size:14px;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                    text-align: left;
                }

            }
            .inputRight{
                .ivu-input{
                    text-align: right;
                }
                p{
                    text-align: right;
                }
            }

            .middlContent{
                margin-top: 64px;
                padding: 0 10px;
                position: relative;
                height: 50px;
                img{
                    display: inline-block;
                    position: absolute;
                    left: calc( 50% - 19px );
                    bottom: 0;
                    border: 2px dashed #e5e5e5;
                }
            }

        }
        .submitBtn{
            margin-top: 100px;
            width: 100%;
            height: 50px;
            font-size: 16px;
        }
    }
</style>




