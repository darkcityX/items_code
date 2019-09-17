<template>
  <div id="shipingAddress">
    <div class="addressContainer">
      <h1>收货地址</h1>
      <div class="add_Address" @click="addAdderss">
        <button>
          <img src="../../assets/images/dizhi_tianjia.png" alt>
          <p>添加新地址</p>
        </button>
        <p>您已创建{{consigneeList.length}}个收货地址，最多可创建10个</p>
      </div>
      <div class="address_list">
        <addressTem :consigneeList="consigneeList"></addressTem>
      </div>
    </div>
    <!-- 对话框 -->
    <Modal v-model="isShow" title="添加收货地址" width="950" @on-ok="submitAddress">
      <form class="layer_box">
        <!-- 收货人 -->
        <div class="labelInput">
          <label>*收货人：</label>
          <input v-model="address.consigneeName" type="text">
        </div>
        <!-- 联系方式 -->
        <div class="labelInput">
          <label>*联系方式：</label>
          <input v-model="address.consigneeMobile" type="text">
        </div>
        <!-- 所在地区 -->
        <div class="labelSelect">
          <p>*所在地区：</p>
          <!-- 省 -->
          <Select
            size="large"
            style="width:200px"
            v-model="address.province"
            @on-change="citySheng"
          >
            <Option v-for="(item,index) in citys" :key="index" :value="item">{{item}}</Option>
          </Select>
          <!-- 市 -->
          <Select size="large" style="width:200px" v-model="address.city" @on-change="citysShi">
            <Option v-for="(item,index) in cityShi" :value="item" :key="index">{{item}}</Option>
          </Select>
          <!-- 县或区 -->
          <Select size="large" style="width:200px" v-model="address.area">
            <Option v-for="(item,index) in cityQU" :key="index" :value="item">{{item}}</Option>
          </Select>
        </div>
        <!-- 详细地址 -->
        <div class="labelInput">
          <label>*详细地址：</label>
          <input type="text" class="textarea" v-model="address.addressDetail">
        </div>
        <p class="btx">*必填项</p>
      </form>
    </Modal>
  </div>
</template>

<script>
import addressTem from "../../components/AddressTem";
import city from "@/common/js/city.js";
export default {
  name: "shipingAddress",
  data() {
    return {
      consigneeList: [],
      isShow: false,
      citys: [],
      cityShi: [],
      cityQU: [],
      address: {
        consigneeName: "",
        consigneeMobile: "",
        addressDetail: "",
        province: "",
        city: "",
        area: "",
        isDefault: 1
      },
      isEdit:'add',
      consigneeId:''
    };
  },
  components: {
    addressTem
  },
  methods: {
    getAddressList() {
      this.$axios
        .post("/api/consignee/listConsignee")
        .then(res => (this.consigneeList = res.consigneeList));
    },
    addAdderss() {
      this.isShow = true;
      this.address.consigneeName = "";
      this.address.consigneeMobile = "";
      this.address.addressDetail = "";
      this.address.province = "";
      this.address.city = "";
      this.address.area = "";
      this.isEdit = 'add'
    },
    citySheng(val) {
      this.citysSheng = val; // 获取当前选中的
      this.cityShi = Object.keys(city[val]); // 获取市区数据
    },
    citysShi(val) {
      this.address.city = val;
      this.cityQU = city[this.citysSheng][val]; // 获取县
    },
    submitAddress() {
      if (this.isEdit == 'edit') {
        console.log(this.consigneeId);
        // 如果isEdit 为真 就编辑
        let add = this.address;
        add.consigneeId = this.consigneeId;
        if (
          add.consigneeName &&
          add.consigneeMobile &&
          add.addressDetail &&
          add.province &&
          add.city &&
          add.area &&
          add.consigneeId
        ) {
          this.$axios.post("/api/consignee/editConsignee", add).then(res => {
            this.getAddressList();
            this.$Message.success({
              content: "编辑成功",
              duration: 3,
              closable: true
            });
          });
        } else {
          this.$Message.error({
            content: "有必填项未填写",
            duration: 3,
            closable: true
          });
          setTimeout(() => {
            this.isShow = true;
          }, 1);
        }
      } else if (this.isEdit == 'add') {
        // 否则新加
        let add = this.address;
        if (
          add.consigneeName &&
          add.consigneeMobile &&
          add.addressDetail &&
          add.province &&
          add.city &&
          add.area
        ) {
          this.$axios.post("/api/consignee/addConsignee", add).then(res => {
            this.getAddressList();
            this.$Message.success({
              content: "添加成功",
              duration: 3,
              closable: true
            });
          });
        } else {
          this.$Message.error({
            content: "有必填项未填写",
            duration: 3,
            closable: true
          });
          setTimeout(() => {
            this.isShow = true;
          }, 1);
        }
      }
    },
    getcitys() {
      this.citys = Object.keys(city); // 先获取省 也就是对象的key值
    }
  },
  created() {
    this.getAddressList();
    this.getcitys();
  }
};
</script>

<style lang="less">
#shipingAddress {
  text-align: left;
  box-sizing: border-box;
  padding: 40px 60px;
  .addressContainer {
    h1 {
      margin-bottom: 60px;
    }
  }
  .add_Address {
    margin-bottom: 60px;
    height: 160px;
    button {
      display: inline-block;
      width: 240px;
      height: 100%;
      background-color: transparent;
      border: 1px solid #eee;
      border-radius: 4px;
      outline: none;
      cursor: pointer;
      vertical-align: bottom;
      img {
        display: block;
        width: 38px;
        height: 38px;
        margin: 20px auto;
      }
      p {
        font-size: 14px;
        display: block;
        color: #222;
        margin: 0 auto;
      }
    }
    p {
      display: inline-block;
      vertical-align: bottom;
      font-size: 14px;
      color: #999999;
      margin-left: 20px;
    }
  }
}
</style>

<style>
.ivu-modal-header,
.ivu-modal-footer {
  border: 0;
}
.ivu-modal-body {
  padding: 0;
}
.layer_box {
  box-sizing: border-box;
  padding: 0 50px 50px;
}
.labelInput label,
.labelSelect p {
  display: block;
  margin: 30px 0 14px;
  color: #222222;
  font-weight: bold;
}
.labelInput input {
  width: 290px;
  height: 50px;
  box-sizing: border-box;
  padding: 5px 10px;
  border-radius: 4px;
  border: 0;
  border: 1px solid #ccc;
  outline: none;
}
.labelSelect .ivu-select {
  margin-right: 30px;
}
.labelInput .textarea {
  width: 600px;
}

.btx {
  margin-top: 20px;
}
</style>

