<template>
  <div class="info">
    <div class="banner">
      <div class="header">
        <span class="box" style="background-color:#C0C4CC">基本信息</span>
      </div>
      <el-divider></el-divider>
      <div class="header">
        <span class="box">用户名：{{UserName}}</span>
        <span v-if="Sex=='1'" class="box">性别：男</span>
        <span v-else class="box">性别：女</span>
        <span class="box">所属单位：{{UnitName}}</span>
        <span class="box">部门：{{DepartmentName}}</span>
        <span class="box">职务：{{PositionName}}</span>
      </div>
      <el-divider></el-divider>
      <div class="header">
        <span class="box">办公室电话：{{UnitPhone}}</span>
        <span class="box">手机号：{{Phone}}</span>
        <span class="box">微信号：{{vX}}</span>
      </div>
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
export default {
  name: "personaldata",

  data() {
    return {
      UserName: "",
      Sex: "",
      UnitName: "",
      DepartmentName: "",
      PositionName: "",
      UnitPhone: "",
      Phone: "",
      vX: ""
    };
  },
  created() {},
  mounted() {
    this.GetJCType();
  },
  methods: {
    GetJCType() {
      var UserId = JSON.parse(localStorage.getItem("LoginData")).UserId;
      this.$axios
        .post("Login/GetUserInfoCJ", {
          UserId: UserId
        })
        .then(res => {
          console.log(res.data.Data.Data, "111");
          this.UserName=res.data.Data.Data.UserName
          this.Sex=res.data.Data.Data.Sex
          this.UnitName=res.data.Data.Data.UnitName
          this.DepartmentName=res.data.Data.Data.DepartmentName
          this.PositionName=res.data.Data.Data.PositionName
          this.UnitPhone=res.data.Data.Data.UnitPhone
          this.Phone=res.data.Data.Data.Phone
          this.vX=res.data.Data.Data.VX
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
</style>