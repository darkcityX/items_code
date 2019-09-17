// 1、获取应用实例
const app = getApp();
const { link } = require('../../utils/ajax.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId: "",
        userGrade: 1,   // 1 普通用户 2 商户 3 商户学员 4 商户老师

        isShowUploadText: true,   // 是否显示上传作品
        shopId: '',             // 作品集id
        showCard: true,         // card/list显示视图切换
        listData: [],           // 详情数据

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 1、获取从列表传过来的参数
        let shopId = options.shopId;
        // 2、将作品集id保存
        this.setData({
            shopId
        });

        // 3、调取本地缓存
        this.getStorageUserInfo();



        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
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
    getStorageUserInfo() {
        let url = this.route;
        console.log(url);
        if (url != "pages/loading/loading") {
            wx.getStorage({
                key: 'userInfo',
                success: res => {
                    console.log(`从缓存中取出授权登陆后的用户信息`);
                    console.log(res);
                    // 1、存储相关数据
                    let userId = res.data.userId;     // 后续接口需要
                    let userGrade = res.data.status;  // 后续判断可能会用到   模拟操作 机构类 2;
                    this.setData({
                        userId,
                        userGrade: userGrade,       // 模拟操作 2
                    });

                    // 调用获取数据接口
                    this.getWorkListData();
                },
                fail: err => {
                    console.log(`缓存中没有，返回到启动页`);
                    wx.redirectTo({
                        url: "pages/loading/loading"
                    });
                }
            });
        }
    },
    /**
     * 接口调用： 根据作品集id获取作品列表
    */
    getWorkListData(){
        // 根据作品id发送ajax请求
        link.ajax({
            path: '/api/productCollection/collectionDetail',
            data: {
                collectionId: this.data.shopId
            }
        }).then(res => {
            console.log(res);

            // 1、动态设置页面 NavigationBarTitle
            this.setNavigationBarTitleText(res.data.collectionName);

            // 2、判断是商户/普通用户及当前作品集是否为官方作品集
            console.log( "是否为官方作品集："+res.data.isOfficial );
            console.log( "当前用户身份等级:" + this.data.userGrade );
            if( res.data.isOfficial && this.data.userGrade == 1 ){ // 为官方作品集且为普通用户
                this.setData({
                    isShowUploadText: false
                });
            }

            // 2、重组数据
            let allListData = [];
            if( res.data.allInfo.length == 0 ){
                wx.showToast({
                    title: '当前作品集无作品,请上传您的作品!',
                    icon: 'none',
                    duration: 2000,
                    // success(){
                    //     setTimeout(()=>{
                    //         wx.navigateBack({
                    //             delta: 1
                    //         });
                    //     },2000);
                    // }
                });
            }else{
                for ( let obj of res.data.allInfo ){
                    // console.log( obj );
                    let time = new Date(obj.createTime);
                    // 获取年份
                    let year = time.getFullYear();
                    // 获取月份
                    let mouth = (time.getMonth() + 1) < 10 
                                    ? "0" + (time.getMonth() + 1) 
                                    : time.getMonth() + 1;
                    // 获取日
                    let day = time.getDate() < 10
                                ? "0" + time.getDate()
                                : time.getDate();
                    allListData.push({
                        year: year,
                        mouth: mouth,
                        day: day,
                        comment: obj.comment,
                        isLiked: obj.isLiked,
                        like: obj.like,
                        productId: obj.productId,
                        productPhoto: obj.productPhoto
                    });
                }
                console.log(allListData );
                this.setData({
                    listData: allListData
                });
            }

            // 判断 返回的 allInfo 对象是否为空对象
            // if ( Object.getOwnPropertyNames(res.data.allInfo).length == 0  ){
            //     // 为空 则退出
            //     console.error('当前详情页无该作品详情');
            //     wx.showToast({
            //         title: '当前作品集无作品,请上传您的作品!',
            //         icon: 'none',
            //         duration: 2000,
            //         // success(){
            //         //     setTimeout(()=>{
            //         //         wx.navigateBack({
            //         //             delta: 1
            //         //         });
            //         //     },2000);
            //         // }
            //     });
            // }else{
            //     // 则重构数据
            //     for (let key in res.data.allInfo) {
            //         console.log(`-----------------------------`);
            //         console.log(key);
            //         console.log(res.data.allInfo[key]);
            //         console.log(typeof res.data.allInfo[key] == "object");
            //         console.log(`-----------------------------`);
            //         if (res.data.allInfo[key].length > 1) {
            //             res.data.allInfo[key].forEach((item, index) => {
            //                 if (typeof item == 'object') {
            //                     console.log(item);
            //                     let nowListItem = key.split('-');
            //                     console.log(nowListItem);
            //                     console.log(`这是key---------${nowListItem}`);
            //                     allListData.push({
            //                         year: nowListItem[0],
            //                         mouth: nowListItem[1],
            //                         day: nowListItem[2],
            //                         productId: item.productId,
            //                         productPhoto: item.productPhoto,
            //                         like: item.like,
            //                         isLiked: item.isLiked,
            //                         comment: item.comment
            //                     });

            //                     console.log(allListData);

            //                     this.setData({
            //                         listData: allListData
            //                     });
            //                 }
            //             });
            //         }
            //     }
            // }








        })
    },
    //  以card形式展现数据
    showCard(e) {
        console.log(`--- 点击了card ---`);
        this.setData({
            showCard: true
        });
    },
    //  以list形式展现数据
    showList(e) {
        console.log(`--- 点击了list ---`);
        this.setData({
            showCard: false
        });
    },
    /**
     * 路由跳转 ——去上传作品页面
    */
    gotoUploadPage(){
        wx.navigateTo({
            url: '../uploadWork/uploadWork?shopId=' + this.data.shopId,
        });
    },
    /**
     * 路由跳转 ——去作品详情页
     *    
    */
    gotoDetails(e){
        console.log(e);
        if (e.target.id != 'shareBtn' ){
            // 获取作品id
            let productId = e.currentTarget.dataset.productid;
            // 路由跳转    
            wx.navigateTo({
                url: "../workDetails/workDetails?productId=" + productId
            });
        }
    },
    /**
     * 路由跳转
     * 目前未定制---为二期需求（故只给提示）
    */
    gotoTipPage(){
        wx.showToast({
            title: '服务暂未开放，敬请期待',
            icon: 'none',
            duration: 2000
        });
    },
    /**
     * 动态修改作品集名称
     * 需传入标题
    */
    setNavigationBarTitleText(title){
        wx.setNavigationBarTitle({
            title: `《${title}》`
        });
    },
    /**
     * 交互—— 点赞
    */
    userDianZan(e) {
        console.log(`---------- 我点赞了！ ----------------`);
        console.log(e);
        let idx = e.currentTarget.dataset.index;
        let productId = e.currentTarget.dataset.workid;
        let isLike = this.data.listData[idx].isLiked;

        console.log( isLike );
        if (isLike) {
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
        } else {
            link.ajax({
                path: '/api/productCollection/like',
                data: {
                    productId
                }
            }).then(res => {
                let nowIsLike = 'listData[' + idx + '].isLiked';
                let nowLikeNum = 'listData[' + idx + '].like';
                this.setData({
                    [nowIsLike]: !isLike,
                    [nowLikeNum]: this.data.listData[idx].like += 1
                });
                wx.showToast({
                    title: '已成功点赞!',
                    icon: 'success',
                    duration: 2000
                });

            });
        }
    },
    /**
     * 交互——留言： 跳转到详情页，并打开留言对话框
     * 
    */
    goDetailsShowLiuYan(e){
        console.log(`我点击了留言`);
        console.log(e);
        let productId = e.currentTarget.dataset.workid;
        // 路由跳转    
        wx.navigateTo({
            url: "../workDetails/workDetails?productId=" + productId + "&showLiuYan="+true
        });
    }
})