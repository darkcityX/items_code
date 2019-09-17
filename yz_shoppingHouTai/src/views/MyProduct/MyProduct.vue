<template>
  <!-- 账户设置 -->
  <div class="myProductPage">
    <!-- 2、main主体 -->
    <div class="myProductPageMain">
      <Row>
        <Col span="16" offset="4">
          <Layout>
            <Layout>
              <!-- 2.1、面包屑 -->
              <Row>
                <Col span="24">
                  <Breadcrumb class="breadCrumbs">
                    <BreadcrumbItem>我的订单</BreadcrumbItem>
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
                          class="mainLeftBottom"
                          :active-name="activeNav"
                          theme="light"
                          width="auto"
                          :open-names="['1']"
                          @on-select="routerParams"
                        >
                          <Submenu name="1">
                            <MenuItem
                              v-for="(item,index) in NavList"
                              :key="index"
                              :name="item.sort"
                              :to="item.path"
                              :data-flag="item.orderStatus"
                            >{{item.name}}</MenuItem>
                          </Submenu>
                        </Menu>
                      </Sider>
                    </Col>
                    <!-- 2.2.2、右侧内容区域 -->
                    <Col span="19">
                      <Content class="mainRight" :style="{ background: '#fff'}">
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
  name: "myProductPage",
  data() {
    return {
      NavList: [
        {
          sort: "0",
          path: "/myProduct/all_product",
          name: "全部订单"
		},
		{ sort: "1", path: "", name: "代付款" },
        { sort: "2", path: "", name: "已完成" },
        { sort: "3", path: "", name: "已过期" },
        { sort: "4", path: "", name: "失效订单" }
      ],
	  activeNav: "0",
	  // 当前二级面包屑
      directory: "全部订单"
	};
	
  },
  methods: {
    routerParams(flag) {
	  // 给二级导航传值
	  this.directory = this.NavList[flag].name;
	
      this.$router.push({
        path: "/myProduct/all_product",
        query: { orderStatus: flag }
      });
	},
  },
  components: {
    UserAvatar
  },
  created() {
    if (!sessionStorage.isLogin) {
      // alert("未登陆");
      this.$Message.error("请进行登陆!");
      this.$router.push("/loginPage");
    }

    let query = window.location.search.substr(
      window.location.search.length - 1,
      1
    );
    switch (query) {
      case " ":
		this.activeNav = "0";
		this.directory = this.NavList[this.activeNav].name;
        break;
      case "1":
		this.activeNav = "1";
		this.directory = this.NavList[this.activeNav].name;
        break;
      case "2":
		this.activeNav = "2";
		this.directory = this.NavList[this.activeNav].name;
        break;
      case "3":
		this.activeNav = "3";
		this.directory = this.NavList[this.activeNav].name;
        break;
      case "4":
		this.activeNav = "4";
		this.directory = this.NavList[this.activeNav].name;
        break;
    }
  }
};
</script>

<style lang="less">
.myProductPage {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  .myProductPageMain {
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

