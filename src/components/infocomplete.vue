<template>
  <div class="info">
    <div class="banner">
      <div class="header">
        <span class="box" style="background-color:#C0C4CC">基本信息</span>
      </div>
      <el-divider></el-divider>
      <div class="header">
        <span class="box">用户名：张三</span>
        <span class="box">性别：男</span>
        <span class="box">所属单位：浙江星炬电力科技有限公司</span>
        <!-- <span class="box">部门：运行维护</span>
        <span class="box">职务：一线维护</span>-->
      </div>
      <el-divider></el-divider>
      <div>
        <span class="name">手机号</span>
        <el-input class="put" v-model="phone"></el-input>
        <el-input class="put" v-model="UpdatePhone" placeholder="请输入内容"></el-input>
        <el-button type="primary" round style="margin-left:50px" @click="surechange">确认修改</el-button>
      </div>
      <el-divider></el-divider>
      <!-- <div class="table">
        <el-table :data="table" border style="width: 100%" header-cell-class-name="tablebg">
          <el-table-column align="center" prop="0" label="维护设备编号"></el-table-column>
          <el-table-column align="center" prop="1" label="详细地址"></el-table-column>
          <el-table-column align="center" prop="2" label="站点编号"></el-table-column>
        </el-table>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "infocomplete",
  data() {
    return {
      phone: "",
      UpdatePhone: "",
      Id:""
    };
  },
  created() {
    console.log("这是site");
  },
  mounted() {
    this.GetJCType();
  },
  methods: {
    GetJCType() {
      this.phone = JSON.parse(localStorage.getItem("LoginData")).Phone;
      this.Id = JSON.parse(localStorage.getItem("LoginData")).Id;
    },
    surechange() {
      this.$axios
        .post("Login/UpdatePhone", {
          Phone: this.UpdatePhone,
          Id:this.Id
        })
        .then(res => {
          console.log(res.data.Data, "111");
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.info {
  width: 1600px;
  background-color: #ffffff;
  min-height: 800px;
  margin-top: 20px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px, rgba(0, 0, 0, 0.2) 0px 3px 1px -2px;
}

.banner {
  padding: 30px 80px;
}

.header {
  display: flex;
  justify-content: space-between;
}

.box {
  background-color: #E4E7ED;
  padding: 12px 30px;
  border-radius: 12px;
}

.put {
  width: 150px;
  margin-left: 20px;
}
</style>