<template>
  <div class="footer">
    <!-- 1、尾部top：-->
    <Row class="footerTop">
      <Col
        class="footerTopContainer"
        span="10"
        offset="6"
      >&copy;Copyright2017-2018&nbsp;|&nbsp;原子链&nbsp;and&nbsp;Atoshi&nbsp;All&nbsp;Rights&nbsp;Reserved&nbsp;|&nbsp;Powered&nbsp;by原子基金会</Col>
    </Row>
    <!-- 2、icon链接 -->
    <Row class="footerBottom">
      <Col class="footerBottomContainer" span="10" offset="6">
        <div class="footerListLeft">
          <span>原子链官方:</span>
          <span>
            <a href="https://weibo.com/atoshi" target="_blank">
              <img src="./../assets/images/weibo.png" alt>
            </a>
            <a
              target="_blank"
              href="https://wx.zsxq.com/dweb/#/index/552858518854?from=mweb&type=joingroup"
            >
              <img src="./../assets/images/zhishixingqiu.png" alt>
            </a>
            <a target="_blank" href="https://www.facebook.com/atoshifoundation/">
              <img src="./../assets/images/facebook.png" alt>
            </a>
            <a target="_blank" href="https://t.me/atoshifoundation">
              <img src="./../assets/images/tele.png" alt>
            </a>
            <a target="_blank" href="https://twitter.com/atoshifoudation">
              <img src="./../assets/images/twitter.png" alt>
            </a>
            <a target="_blank" href="https://www.linkedin.com/company/atoshifoundation">
              <img src="./../assets/images/lin.png" alt>
            </a>
          </span>
        </div>
        <div class="footerListRight">
          <span>CEO廖望:</span>
          <span>
            <a target="_blank" href="https://weibo.com/liaodoer">
              <img src="./../assets/images/weibo.png" alt>
            </a>
            <a
              target="_blank"
              href="https://i.qq.com/?s_url=http%3A%2F%2Fuser.qzone.qq.com%2F75510696%2Finfocenter&rd=1"
            >
              <img src="./../assets/images/qone.png" alt>
            </a>
            <a target="_blank" href="https://www.facebook.com/liaowangdoer">
              <img src="./../assets/images/facebook.png" alt>
            </a>
          </span>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  }
};
</script>

<style scoped lang="less">
.footer {
  // margin-top: 40px;
  padding: 10px 0;
  max-height: 90px;
  background: rgba(229, 229, 229, 1);
  .footerTop {
    margin-bottom: 12px;
    .footerTopContainer {
      height: 15px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      white-space: nowrap;
    }
  }
  .footerBottom {
    min-width: 1200px;
    .footerBottomContainer {
      position: relative;
      text-align: right;
      white-space: nowrap;
      div {
        display: inline-block;
        font-size: 0;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        span {
          margin: 0 5px;
          display: inline-block;
          font-size: 14px;
          vertical-align: middle;
        }
      }
      .footerListLeft {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 0;
        span {
          display: inline-block;
          font-size: 14px;
        }
      }
      .footerListRight {
        width: 100%;
        font-size: 0;
        font-size: 0;
        span {
          display: inline-block;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
