<template>
  <div class="alliancePage">
    <!-- 2、main主体 -->
    <div class="alliancePageMain">
      <Row>
        <Col span="16" offset="4">
          <Layout>
            <Layout>
              <!-- 2.1、面包屑 -->
              <Row>
                <Col span="24">
                  <Breadcrumb class="breadCrumbs">
                    <BreadcrumbItem>原子联盟</BreadcrumbItem>
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
                        <!-- 菜单 -->
                        <Menu
                          @on-select="childTag"
                          class="mainLeftBottom"
                          :active-name="avtiveMenu"
                          theme="light"
                          width="auto"
                          :open-names="['原子链联盟']"
                        >
                          <Submenu name="原子链联盟">
                            <template slot="title">
                              <Icon type="ios-navigate"></Icon>原子链联盟
                            </template>
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
                      <Content class="mainRight" :style="{background: '#fff'}">
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
		name: "alliancePage",
		data() {
			return {
			// 原子联盟二级导航
			navList: [
				{
				title: "我的奖励",
				tagName: "我的奖励",
				address: "/AlliancePage/myReward"
				},
				{
				title: "奖励规则",
				tagName: "奖励规则",
				address: "/AlliancePage/rewardRules"
				},
				{
				title: "我的盟友",
				tagName: "我的盟友",
				address: "/AlliancePage/myAlly"
				},
				{
				title: "我的邀请",
				tagName: "我的邀请",
				address: "/AlliancePage/myInvitation"
				},
				{
				title: "我的资产",
				tagName: "我的资产",
				address: "/AlliancePage/myAssets/myPurse"
				},
				{
				title: "我的消息",
				tagName: "我的消息",
				address: "/AlliancePage/myMessage"
				},
				{
				title: "联系客服",
				tagName: "联系客服",
				address: "/AlliancePage/contactCustomerService"
				},
				{
				title: "提高奖励",
				tagName: "提高奖励",
				address: "/AlliancePage/increaseRewards"
				}
			],
			
			// 当前激活的菜单
			avtiveMenu : '我的奖励',

			// 当前二级面包屑
			directory: "我的奖励"
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
			// 读取当前标签
			this.avtiveMenu = localStorage.getItem('activeMenu');
		},
		methods: {
			// 获取当前激活的二级导航文本
			childTag(e) {
				// console.log( e );
				this.directory = e;
				// 将目录存储进localStrong
				localStorage.setItem('activeMenu',e);

			}
		}
	};
</script>

<style lang="less">
.alliancePage {
  padding-bottom: 40px;
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  .alliancePageMain {
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
        .ivu-menu-submenu-title {
          color: #fff;
          background: linear-gradient(
            0deg,
            rgba(0, 198, 255, 1) 0%,
            rgba(0, 160, 234, 1) 100%
          );
        }
        .ivu-menu {
          background: rgba(232, 254, 255, 1);
          .ivu-menu-item-active {
            color: rgba(0, 160, 234, 1);
            background: none;
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

