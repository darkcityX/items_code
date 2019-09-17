// 1、获取应用实例
const app = getApp();
const { link } = require('../../utils/ajax.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId: '',
        userGrade: 1,

        collectionDesc: '',     // 作品说明
        uploadImgFile: '',      // 封面上传
        collectionName: '',     // 作品名称
        ispublic: false,        // 是否公开
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log( options );

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
        // console.log( url );
        if (url != "pages/loading/loading") {
            wx.getStorage({
                key: 'userInfo',
                success: res => {
                    // console.log(`从缓存中取出授权登陆后的用户信息`);
                    console.log(res);
                    // 1、对用户状态进行更改
                    this.setData({
                        userId: res.data.userId,
                        userGrade: res.data.status
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
     * 作品集说明
    */
    collectionDesc(e){
        console.log(e);
        this.setData({
            collectionDesc: e.detail.value   
        }); 
    },
    /**
     * 封面图片上传
    */
    uploadImg(){
        let _this = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album'],
            success(res) {
                console.log( res );
                _this.setData({
                    uploadImgFile: res.tempFilePaths[0]  
                });
            },
        });    
    },
    /**
     * 作品集名称
    */
    collectionName(e){
        this.setData({
            collectionName: e.detail.value
        });
    },
    gotoStudentPage(){
        console.log(`看啥！ 点我干锤子`);
        wx.navigateTo({
            url: '../myStudents/myStudents',
        });
    },
    /**
     * 是否公开
    */
    switch1Change(e){
        this.setData({
            ispublic: e.detail.value
        });
    },
    /**
     * 提交按钮
    */
    submitAll(){
        if ( !this.data.collectionDesc ){
            wx.showToast({
                title: '请输入作品集说明',
                icon: 'none',
                duration: 2000
            });
        } else if ( !this.data.uploadImgFile ){
            wx.showToast({
                title: '请上传作品集封面',
                icon: 'none',
                duration: 2000
            });
        } else if ( !this.data.collectionName ){
            wx.showToast({
                title: '请输入作品集名称',
                icon: 'none',
                duration: 2000
            });
        } else {
            console.log( '验证通过！--------------' );
            console.log( this.data.collectionName );
            console.log( this.data.uploadImgFile  );
            let _this = this;
            wx.uploadFile({
                url: 'https://zhangyu.liangziqishi.shop/api/user/uploadFile',
                filePath: this.data.uploadImgFile,
                name: 'file',
                header: {
                    //和服务器约定的token, 一般也可以放在header中
                    token: wx.getStorageSync("token"),
                    "Content-Type": "multipart/form-data" // 配置必须
                },
                success({ data }){
                    let [{ id }] = JSON.parse(data).data; // 图片id
                    
                    if ( _this.data.userGrade != 1 ){ // 机构 用户

                    }else{ // 普通用户
                        link.ajax({
                            path: '/api/productCollection/createCollection',
                            data: {
                                description: _this.data.collectionDesc,     // 作品说明
                                fileId: id,                                   // 封面上传
                                sampleReelsName: _this.data.collectionName, // 作品名称
                                status: _this.data.ispublic ? '1' : '2',    // 是否公开
                            }
                        }).then(res => {
                            console.log(res);
                            if( res.code == 100 ){
                                wx.showToast({
                                    title: '创建成功!',
                                    icon: 'success',
                                    duration: 2000,
                                    success(){
                                        // wx.redirectTo({
                                        //     url: '../myHuiGuan/myHuiGuan',
                                        // });
                                        wx.redirectTo({
                                            url: '../myCollection/myCollection?shopId=' + res.data.sampleReelsId,
                                        });
                                        
                                    }
                                })        
                            }
                            
                        });
                    }
                    
                }
            })
        }
    }
})