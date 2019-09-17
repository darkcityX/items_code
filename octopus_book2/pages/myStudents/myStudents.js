// 1、获取应用实例
const app = getApp();
const { link } = require('../../utils/ajax.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId: '',
        userGrade: '',

        students: []

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {


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
            title: '快来加入我们吧!',
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
        // console.log( url );
        if (url != "pages/loading/loading") {
            wx.getStorage({
                key: 'userInfo',
                success: res => {
                    // console.log(`从缓存中取出授权登陆后的用户信息`);
                    // console.log(res);
                    // 1、对用户状态进行更改
                    this.setData({
                        userId : res.data.status,
                        userGrade: res.data.status
                    });
                    // 2、获取页面数据
                    this.getAllData(res.data.status);
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
     * 请求数据
     * 
    */
    getAllData(userId){
        let uid = userId;
        console.log( userId );
        console.log('---------------------' + uid );
        link.ajax({
            path: '/api/organization/getStudent',
            data:{
                organizationId: uid    
            }
        }).then(res=>{
            console.log( res );
            
            // 1、修改页面标题
            this.setNavigationBarTitleText( res.data.organizationName );

            // 2、将学员数据保存在本地data中
            this.setData({
                students : res.data.allInfo
            });
        });
    },
    /**
     * 动态修改作品集名称
     * 需传入标题
    */
    setNavigationBarTitleText(title) {
        wx.setNavigationBarTitle({
            title: `${title}`
        });
    },
    /**
     * 调接口—— 移除学员
    */
    removeStudent(e){
        console.log( "-----------------------" );
        

        let studentId = e.currentTarget.dataset.studentid;

        link.ajax({
            path: '/api/organization/removeStudent',
            data:{
                studentId
            }
        }).then(res=>{
            console.log( res );
            if( res.code == '100' ){
                let arr = this.data.students;
                console.log( studentId );
                console.log(arr);
                
                if ( arr.findIndex(item => item.userId == studentId) != -1) {
                    console.log(`存在当前学生`);

                    arr.splice( arr.findIndex(item => item.userId == studentId), 1);

                    console.log(arr);

                    this.setData({
                        students: arr
                    });

                } else {
                    console.log(`不存在当前学生`);
                }
        
            }

        })
    
    },
    /**
     * 路由跳转—— 返回到创建页面，携带姓名回去
    */
    backChuangjian(e){
        // console.log( e );
        let studentName = e.currentTarget.dataset.studentname;
        console.log( studentName );
        wx.navigateTo({
            url: '../chuangJianCollection/chuangJianCollection?studentName=' + studentName,
        });
    },
    /**
     * 功能： 邀请学员
     * 
    */
    yaoQingXueYuan(){
        
    }
});