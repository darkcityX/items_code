// 1、获取应用实例
const app = getApp();
const { link } = require('../../utils/ajax.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId: "",
        avater: "",     // 用户头像
        userName: "",   // 用户名称
        userGrade: 1,   // 1 普通用户 2 商户 3 商户学员 4 商户老师

        userProductNum: 0,           // 我的作品数量            ---普通用户
        userProductCollectionNum: 0, // 我的作品集-我的作品数    ---普通用户
        forward: 0,                  // 转发次数                ---普通机构共有
        view: 0,                     // 访问次数                ---普通机构共有
        getEnrollmentNum: 0,         // 获取招生线索条数         ---普通用户
        gallery: [],                  // 封面

        noViewClew: 0,                // 招生线索               ---机构
        myStudents: 0,                // 我的学员               ---机构
        collectionNum: 0,             // 作品集数               ---机构
        totalClews: 0                 // 获取招生线素           ---机构

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        console.log(`onShow-------------------`);
        // 打开加载提示，等待数据加载完成关闭
        wx.showLoading({
            title: '数据加载中...',
        });
        /**
         * 判断是否存在userInfo缓存，
         *    没有则跳转到启动页；
         *    有则根据用户身份进行页面信息展示
         * */
        this.getStorageUserInfo();

        /**
         * 根据userId获取用户其它信息
         * */
        // this.getUserOtherInfo(); 
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

    },
    /**
     * 判断当前页面路由：。
     * 1、如果为启动页->不处理
     * 2、如果为非启动页->则根据userInfo缓存判断
     *      1).存在userInfo缓存   -> 存储用户名、头像、用户身份
     *                           -> 调取当前用户相关信息接口
     *                           -> 将接口的相关信息保存本地
     *      2).不存在userInfo缓存 -> 跳转到启动页
    */
    getStorageUserInfo() {
        let url = this.route;
        // console.log(url);
        if (url != "pages/loading/loading") {
            wx.getStorage({
                key: 'userInfo',
                success: res => {
                    console.log(`从缓存中取出授权登陆后的用户信息`);
                    console.log(res);
                    // 1、存储相关数据
                    let userId = res.data.userId;     // 后续接口需要
                    let userGrade =  res.data.status;  // 后续判断可能会用到   模拟操作 机构类 2;
                    this.setData({
                        userId,
                        userGrade: userGrade,       // 模拟操作 2
                    });
                    // 2、调取接口
                    // console.log( `----------个人中心------------------------` );
                    link.ajax({
                        path: '/api/sampleReels/userCollectionDetail',
                        data: { 
                            userId: userId, //模拟操作 机构类 15,
                            userStatus: userGrade // 模拟操作 机构类 2 
                        }
                    }).then(res => {
                        console.log(res);
                        console.log(app);
                        // 根据用户级别将相关数据绑定到本地中
                        if ( userGrade == 1 ){ // 如果为普通用户
                            // console.log( `普通用户----------------` );
                            this.setData({
                                // 头像
                                avater: userGrade == 1 ?
                                    app.globalData.userInfo.avatarUrl :
                                    res.data.avatar,
                                // 用户名
                                userName: userGrade == 1 ?
                                    app.globalData.userInfo.nickName :
                                    res.data.userName,

                                // 我的作品数：
                                userProductNum: res.data.userProductNum,
                                // 我的作品集数：
                                userProductCollectionNum: res.data.userProductCollectionNum,
                                // 转发次数：
                                forward: res.data.forward,
                                // 访问次数：
                                view: res.data.view,
                                // 作品集封面:
                                gallery: res.data.gallery
                            });
                        }else{ // 如果为机构用户 2，3，4
                            // console.log(`机构用户----------------`);
                            this.setData({
                                // 头像
                                avater: res.data.logo != '' 
                                            ? res.data.logo 
                                            : app.globalData.userInfo.avater,
                                // 用户名
                                userName: res.data.organizationName != ''
                                            ? res.data.organizationName
                                            : app.globalData.userInfo.nickName,
                                    // userGrade == 1 ?
                                    // app.globalData.userInfo.nickName :
                                    // res.data.userName,    
                                // 招生线索
                                noViewClew: res.data.noViewClew,
                                // 我的学员
                                myStudents: res.data.myStudents,
                                // 	作品集数
                                collectionNum: res.data.collectionNum,
                                // 家长转发
                                forward: res.data.forward,
                                // 累计访问
                                views: res.data.views,
                                //	获取招生线素
                                totalClews: res.data.totalClews,
                                // 封面
                                gallery: res.data.gallery

                            });
                        }
                        wx.hideLoading();
                    });
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
     * 设置icon点击事件
     * 跳转到 用户设置页面
    */
    goToSetting(){
        wx.navigateTo({
            url: '../userSetting/userSetting',
        })
    },
    /**
     * 跳转-用户身份为普通用户
     * 我的作品--跳转到我的会馆
    */
    goMyWork(){
        // wx.reLaunch({
        //     url: '../index/index?activeStatus=myWorks',

        // });
        wx.navigateTo({
            url: '../myHuiGuan/myHuiGuan',
        });
    },
    /**
     * 跳转-创建作品页面 
    */
    gotoCJ(){
        // console.log(`我被电击了`);
        wx.navigateTo({
            url: '../chuangJianCollection/chuangJianCollection',
        })
    },
    /**
     * 路由跳转 ——跳转到我的招生线索
    */
    gotoZSXS(){
        wx.navigateTo({
            url: '../zhaoShengXianSuo/zhaoShengXianSuo',
        });
    },
    /**
     * 路由跳转 ——跳转到我的学员
    */
    gotoWDXY(){
        wx.navigateTo({
            url: '../myStudents/myStudents',
        });
    }
})