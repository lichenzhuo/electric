<template>
  <div class="info">
    <div class="box">
      <div class="row">
        <span class="title">原密码</span>
        <el-input class="put" v-model="originalpassword" placeholder="请输入内容"></el-input>
      </div>
      <div class="row">
        <span class="title">新密码</span>
        <el-input class="put" v-model="newpassword" placeholder="请输入内容"></el-input>
      </div>
      <div class="row">
        <span class="title">再次输入新密码</span>
        <el-input class="put" v-model="renewpassword" placeholder="请输入内容"></el-input>
      </div>
      <div class="row">
        <el-button type="primary" round style="margin-left:220px" @click="surechange">确认修改</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "changepassword",

  data() {
    return {
      originalpassword: "",
      newpassword: "",
      nowpassword: "",
      UserId: "",
      renewpassword: ""
    };
  },
  created() {},
  mounted() {
    this.GetJCType();
  },
  methods: {
    GetJCType() {
      this.nowpassword = JSON.parse(localStorage.getItem("LoginData")).Password;
      this.UserId = JSON.parse(localStorage.getItem("LoginData")).UserId;
    },
    surechange() {
      this.$axios
        .post("Login/UpdatePassword", {
          oldPassword: this.originalpassword,
          newPassword: this.newpassword,
          UserId: this.UserId
        })
        .then(res => {
          console.log(res.data.Data, "111");
          if (res.data.Msg == "密码修改成功") {
            console.log("成功");
            localStorage.clear();
            this.$router.push({ path: "/login" });
          } else if (res.data.Msg == "原密码不正确") {
            console.log("失败");
            this.$message({
              type: "info",
              message: "原密码不正确"
            });
          }
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.info {
  width: 1600px;
  background-color: #ffffff;
  min-height: 700px;
  padding-top: 100px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px, rgba(0, 0, 0, 0.2) 0px 3px 1px -2px;
}

.box {
  width: 400px;
  height: 400px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-left: 500px;
  padding-top: 50px;
}

.title {
  width: 120px;
  display: inline-block;
  text-align: center;
  padding-left: 40px;
  margin-bottom: 50px;
}

.put {
  width: 150px;
  margin-left: 20px;
}
</style>

