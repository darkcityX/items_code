<template>
  <ul id="addressTem">
    <li v-for="(item,index) in consigneeList" :key="index">
      <div class="addressName">
        {{item.consigneeName}}
        <i v-if="item.isDefault == 1">默认</i>
      </div>
      <div class="address_del">
        <p>
          <span class="title">收货人：</span>
          <span>{{item.consigneeName}}</span>
        </p>
        <p>
          <span class="title">联系方式：</span>
          <span>{{item.consigneeMobile}}</span>
        </p>
        <p>
          <span class="title">收件地址：</span>
          <span>{{item.province}}{{item.city}}{{item.area}}{{item.addressDetail}}</span>
        </p>
      </div>
      <div class="address-btn">
        <button v-if="item.isDefault !== 1" @click="isDefault(item)">设为默认</button>
        <button @click="delAddress(item,index)">删除</button>
        <button @click="editAddress(item)">修改</button>
      </div>
    </li>
    <!-- 设置默认地址对话框 -->
    <Modal v-model="defaultShow" title="提示" @on-ok="okDefault">
      <p style="margin-left:30px; font-size:14px;">确认使用该条地址吗？</p>
    </Modal>
  </ul>
</template>

<script>
export default {
  name: "addressTem",
  props: {
    consigneeList: Array
  },
  data() {
    return {
      defaultShow: false,
      consigneeIdDefault:''
    };
  },
  methods: {
    okDefault() {
      this.$axios
        .post("/api/consignee/defaultConsignee", { consigneeId:this.consigneeIdDefault })
        .then(res => {
          this.$parent.getAddressList(); // 调用父级方法从新请求一次
          this.msg("设置成功!");
        });
    },
    isDefault({ consigneeId }) {
      this.defaultShow = true;
      this.consigneeIdDefault = consigneeId;
    },
    delAddress({ consigneeId }, index) {
      this.$axios
        .post("/api/consignee/deleteConsignee", { consigneeId })
        .then(res => {
          this.consigneeList.splice(index, 1);
          this.msg("删除成功!");
        });
    },
    editAddress(item) {
      this.$nextTick(e => {
        if (this.$parent.$data) {
          // 显示弹出层
          this.$parent.$data.isShow = true;
          this.$parent.getcitys();

          // 编辑进行赋值
          this.$parent.$data.address.addressDetail = item.addressDetail;
          this.$parent.$data.address.area = item.area;
          this.$parent.$data.address.city = item.city;
          this.$parent.$data.address.province = item.province;
          this.$parent.$data.address.consigneeName = item.consigneeName;
          this.$parent.$data.address.consigneeMobile = item.consigneeMobile;
          this.$parent.$data.consigneeId = item.consigneeId;

          this.$parent.$data.isEdit = "edit";
        }
      });
    },
    msg(msg) {
      this.$Message.success({
        content: msg,
        duration: 3,
        closable: true
      });
    }
  }
};
</script>

<style scoped lang="less">
#addressTem {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  li {
    width: 438px;
    margin: 5px 0;
    border: 1px solid #cccccc;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 20px 20px 40px;
    font-size: 14px;
    position: relative;
    .addressName {
      font-size: 16px;
      i {
        margin-left: 30px;
        display: inline-block;
        font-size: 14px;
        padding: 5px;
        background-color: #00a0ea;
        color: #fff;
      }
    }
    .address_del {
      margin-top: 34px;
      p {
        margin-bottom: 16px;
        span {
          width: 280px;
          text-align: left;
          display: inline-block;
          font-size: 14px;
          vertical-align: top;
        }
        .title {
          width: 100px;
          text-align: right;
          color: #999999;
        }
      }
    }
    .address-btn {
      position: absolute;
      right: 0;
      bottom: 20px;
      text-align: right;
      button {
        margin-right: 30px;
        border: 0;
        background-color: transparent;
        color: #00a0ea;
        outline: none;
        cursor: pointer;
      }
    }
  }
}
</style>