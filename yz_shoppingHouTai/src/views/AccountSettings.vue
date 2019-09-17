<template>
  <!-- 账户设置 -->
  <div class="accountSettingsPage">
    <!-- 2、main主体 -->
    <div class="AccountSettingsPageMain">
      <Row>
        <Col span="16" offset="4">
          <Layout>
            <Layout>
              <!-- 2.1、面包屑 -->
              <Row>
                <Col span="24">
                  <Breadcrumb class="breadCrumbs">
                    <BreadcrumbItem>账户设置</BreadcrumbItem>
                    <BreadcrumbItem>{{directory}}</BreadcrumbItem>
                  </Breadcrumb>
                </Col>
              </Row>
              <!-- 2.2、主体内容区域 -->
              <Content>
                <Layout>
                  <Row>
                    <!-- 2.2.1、左侧导航栏 -->
                    <Col span="5">
                      <Sider class="mainLeft" hide-trigger width="100%">
                        <UserAvatar/>
                        <Menu
                          @on-select="childTag"
                          class="mainLeftBottom"
                          active-name="个人资料"
                          theme="light"
                          width="auto"
                          :open-names="['1']"
                        >
                          <Submenu name="1">
                            <MenuItem
                              v-for="(nav,index) in navList"
                              :key="index"
                              :name="nav.tagName"
                              :to="nav.address"
                            >{{nav.title}}</MenuItem>
                          </Submenu>
                        </Menu>
                      </Sider>
                    </Col>
                    <!-- 2.2.2、右侧内容区域 -->
                    <Col span="19">
                      <Content class="mainRight" :style="{minHeight: '280px', background: '#fff'}">
                        <router-view/>
                      </Content>
                    </Col>
                  </Row>
                </Layout>
              </Content>
            </Layout>
          </Layout>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import UserAvatar from "@/components/UserAvatar.vue";

export default {
  name: "accountSettingsPage",
  data() {
    return {
      // 账户设置二级导航
      navList: [
        {
          title: "个人资料",
          tagName: "个人资料",
          address: "/accountSettingsPage/personalInformation"
        },
        {
          title: "收货地址",
          tagName: "收货地址",
          address: "/accountSettingsPage/shippingAddress"
        },
        {
          title: "修改密码",
          tagName: "修改密码",
          address: "/accountSettingsPage/editPassword"
        }
      ],

      // 当前二级面包屑
      directory: "个人资料"
    };
  },
  components: {
    UserAvatar
  },
  created: function() {
    if (!sessionStorage.isLogin) {
      // alert("未登陆");
      this.$Message.error("请进行登陆!");
      this.$router.push("/loginPage");
    }
  },
  methods: {
    // 获取当前激活的二级导航文本
    childTag(e) {
      this.directory = e;
    }
  }
};
</script>

<style lang="less">
.accountSettingsPage {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  .AccountSettingsPageMain {
    // 面包屑
    .breadCrumbs {
      margin: 16px 0;
      text-align: left;
    }
    // 左侧导航栏
    .mainLeft {
      margin: 0 10px;
      min-height: 760px;
      background: #fff;
      // 左侧头部区域【头像、进度条、链接】
      .mainLeftTop {
        .userInfo {
          img {
            display: inline-block;
            max-width: 70px;
            max-height: 70px;
            min-width: 70px;
            min-height: 70px;
            text-align: center;
            overflow: hidden;
          }
          .ivu-progress {
            .ivu-progress-text {
              display: none;
            }
          }
          a {
            display: block;
            text-align: right;
          }
        }
      }
      // 左侧菜单栏
      .mainLeftBottom {
        margin-top: 40px;
        .ivu-menu-submenu-title {
          display: none;
        }
        .ivu-menu {
          .ivu-menu-item-active {
            color: rgba(0, 160, 234, 1);
            background: rgba(232, 254, 255, 1);
            &:after {
              display: none;
            }
          }
        }
      }
    }
    // 右侧内容主区域
  }
}
</style>

