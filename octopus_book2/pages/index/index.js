// 1、获取应用实例
const app = getApp();
const { link } = require('../../utils/ajax.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        userGrade: 1,               // 1 普通用户 2 商户 3 商户学员 4 商户老师

        showCard: true,             // 列表数据以卡片/列表形式展示方式选定
        showSelected: 'all',        // 全部/我的作品选定，添加动态样式
        listData: [],               // 当前页面列表展示数据
        myListData: [],             // 我的作品集信息数据：用来判断右上角文本

        notFoundImage: '../../images/notFound.jpg'
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log( '进入到index页面' );
        console.log( options );
        /**
         *  判断是否是从其它页面跳转过来的:
                约定 从其他页面跳转过来的会加状态值 activeStatus
                myWorks 指 我的作品
                all 指 全部
         * */ 
        if ( options.hasOwnProperty('activeStatus') ){
            if ( options.activeStatus == 'myWorks' ){
                this.showMy();
            }  
        }else{
            // 1、判断是否存在userInfo缓存，没有则跳转到启动页；有则根据用户身份进行页面展示
            this.getStorageUserInfo();
            // 2、调取获得全部列表的数据
            this.getAllListData();

            // 3、调取我的作品集数据接口
            this.getMyListDataTwo();
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () { 
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow( options ) {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        
    },

    /**
     * 用户点击分享按钮
     */
    onShareAppMessage: function (e) {
        console.log(`1111111111`);
        return {
            title: '章鱼书小程序',
            path: '/pages/loading/loading',
            success: res => {
                console.log('成功', res)
            }
        }        
    },

    /**
     * 判断当前页面路由：。
     * 1、如果为启动页->不处理
     * 2、如果为非启动页->则根据userInfo缓存判断
     *      1).存在userInfo缓存   -> 将用户身份数据取出保存在本地data中
     *      2).不存在userInfo缓存 -> 跳转到启动页
    */
    getStorageUserInfo(){
        let url = this.route;
        // console.log( url );
        if (url != "pages/loading/loading" ){
            wx.getStorage({
                key: 'userInfo',
                success: res => {
                    // console.log(`从缓存中取出授权登陆后的用户信息`);
                    // console.log(res);
                    // 1、对用户状态进行更改
                    this.setData({
                        userGrade: res.data.status
                    });
                },
                fail: err => {
                    console.log(`缓存中没有，返回到启动页`);
                    wx.redirectTo({
                        url: "../loading/loading"
                    });
                }
            });
        }

    },
    /**
     * 显示全部列表数据
     * */ 
    showAll(){
        // console.log(`--- 点击了展示全部信息 ---`);
        // 给全部设置动态样式类
        this.setData({
            showSelected: 'all'
        });
        // 更新当前视图所有列表数据
        this.getAllListData();
    },
    /**
     * 显示我的列表数据
     * */ 
    showMy(){
        // console.log(`--- 点击了展示我的信息 ---`);
        // 重置list数据
        this.setData({
            showSelected: 'myWorks'
        });
        // 调取接口更新当前视图list
        this.getMyListData();
    },
    /**
     * 从接口获取全部列表信息
     * */ 
    getAllListData(){
        // console.log(`调用接口函数------`);
        link.ajax({
            path: '/api/user/listSampleReelsByParam'
        }).then(res=>{
            console.log( res );
            this.setData({
                listData: res.data
            })
        });
    },
    /**
     * 从接口获取我的作品列表信息：在首页展示我的作品集信息(该功能已废除)
     * */ 
    getMyListData(){
        // console.log(`调用接口函数----myList--`);
        link.ajax({
            path: '/api/productCollection/listUserProductCollection'
        }).then(res=>{
            console.log( res.data );
            if( res.data.length>0 ){
                // 将我的作品列表信息设置到当前showlist数据中
                // console.log(`-----mylist 有数据`);
                // aa 为模拟数据
                let aa = [];
                this.setData({
                    listData: res.data
                });
            }else{
                // 显示没有拿数据  去创建 和 去首页
                console.log(`-----mylist 无数据`);
            }
        });
    },
    /**
     * 从接口获取我的作品列表信息：用来判断右上角文本展示
     * */
    getMyListDataTwo() {
        // console.log(`调用接口函数----myList--`);
        link.ajax({
            path: '/api/productCollection/listUserProductCollection'
        }).then(res => {
            console.log(res.data);
            if (res.data.length > 0) {
                // 将我的作品列表信息设置到当前showlist数据中
                // console.log(`-----mylist 有数据`);
                // aa 为模拟数据
                let aa = [];
                this.setData({
                    myListData: res.data
                });
            } else {
                // 显示没有拿数据  去创建 和 去首页
                console.log(`-----mylist 无数据`);
            }
        });
    },
    /**
     * 图片加载报错处理------------------------未处理
     * */ 
    errImg(e) {
        // console.log(e);
        // 获取当前触发函数的图片的下标
        let errorImgIndex = e.target.dataset.errorimg;    

        //carlistData为数据源，对象数组
        let imgObject = "'" + errorImgIndex + "'";
        
        var errorImg = {};

        //我们构建一个对象
        errorImg[imgObject] = "../../images/notFound.jpg"; 

        // console.log(errorImg );

        //修改数据源对应的数据
        this.setData(errorImg);

    },
    /**
     * 以card形式展现数据
     * */  
    showCard(e){
        // console.log(`--- 点击了card ---`);
        this.setData({
            showCard: true
        });
    },
    /**
     * 以list形式展现数据
     * */  
    showList(e){
        // console.log(`--- 点击了list ---`);
        this.setData({
            showCard: false
        });
    },
    /**
     * 点击作品跳转到作品详情页:非冒泡事件
     * */ 
    gotoDetails(e){
        // console.log(`---------作品被点击`);
        console.log(`//////////////////////////`);
        console.log(e);
        if (e.target.id != 'shareBtn' ){
            let shopId = e.currentTarget.dataset.shopid;
            // console.log( `当前作品的id为：${shopId}` );
            wx.navigateTo({
                url: "../myCollection/myCollection?shopId=" + shopId
            });
        }
    },
    /**
     * 跳转到创建作品集页面
     * 
    */
    goToNewWork(){
        wx.navigateTo({
            url: "../chuangJianCollection/chuangJianCollection",
        });
    },
    /**
     * 普通用户： 我的作品=》页面跳转 myHuiGuan
     *    
     * */ 
    gotoHuiGuan(e){
        wx.navigateTo({
            url: "../myHuiGuan/myHuiGuan",
        });
    },
    /**
     * 交互—— 点赞
    */
    userDianZan(e){
        console.log(`---------- 我点赞了！ ----------------`);
        console.log( e );
        let idx = e.currentTarget.dataset.index;
        let productId = e.currentTarget.dataset.workid;

        let isLike = this.data.listData[idx].isLiked;
        
        if( isLike ){ // 已点赞—— ： 取消点赞
            link.ajax({
                path: '/api/sampleReels/like',
                data: {
                    sampleReelsId: productId
                }
            }).then(res => {
                let nowIsLike = 'listData[' + idx + '].isLiked';
                let nowLikeNum = 'listData[' + idx + '].likeNum';
                this.setData({
                    [nowIsLike]: !isLike,
                    [nowLikeNum]: this.data.listData[idx].likeNum -= 1
                });
                wx.showToast({
                    title: '已取消点赞!',
                    icon: 'success',
                    duration: 2000
                });
            });
        }else{ // 未点赞—— ：点赞
            link.ajax({
                path: '/api/sampleReels/like',
                data:{
                    sampleReelsId: productId
                }
            }).then(res=>{
                let nowIsLike = 'listData[' + idx +'].isLiked';
                let nowLikeNum = 'listData[' + idx + '].likeNum';
                this.setData({
                    [nowIsLike]: !isLike,
                    [nowLikeNum]: this.data.listData[idx].likeNum+=1    
                });
                wx.showToast({
                    title: '已成功点赞!',
                    icon: 'success',
                    duration: 2000
                });
            });
        }
    }
})