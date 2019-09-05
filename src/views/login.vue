<template>
  <div class="register">
    <section class="form_container">
      <!-- <div class="manage_tip">
        <span class="title">直流后台监测系统</span>
      </div>-->
      <el-form
        :model="registerUser"
        :rules="rules"
        class="registerForm"
        ref="registerForm"
        label-width="80px"
      >
        <el-form-item label="登录账号" prop="name">
          <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!-- <el-form-item label="邮箱" prop="email">
                    <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>-->
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerUser.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <!-- <el-form-item label="确认密码" prop="password2">
          <el-input v-model="registerUser.password2" placeholder="请确认密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="选择身份">
          <el-select v-model="registerUser.identity" placeholder="请选择身份">
            <el-option label="管理员" value="manager"></el-option>
            <el-option label="员工" value="employee"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">登 录</el-button>
        </el-form-item>
        <el-tag @click="gotoregister" class="tip">没有账号？去注册</el-tag>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      registerUser: {
        name: "",
        password: ""
      },
      rules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "change" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created(){
    this.watchKey()
  },
  methods: {
    watchKey(){
      document.onkeydown=e=>{
        let _key=window.event.keyCode;
        if (_key===13) {
          console.log('adsadsad')
          this.submitForm('registerForm')
        }
      }
    },
    submitForm(formName) {
      // console.log(this.registerUser, "111111");
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.$axios
          //   .post("/api/users/register", this.registerUser)
          //   .then(res => {
          //     // 注册成功
          //     this.$message({
          //       message: "注册成功！",
          //       type: "success"
          //     });
          //     // this.$router.push("/login");
          //   });

          this.$axios
            .post("Login/Login", {
              UserId: this.registerUser.name,
              Password: this.registerUser.password
            })
            .then(res => {
              console.log(res.data, "登录");
              if (res.data.Data.Msg == "登录成功") {
                // this.$message({
                //   message: "登陆成功",
                //   type: "success"
                // });
                localStorage.setItem(
                  "CharacterId",
                  JSON.stringify(res.data.Data.Data.CharacterId)
                );
                localStorage.setItem(
                  "LoginData",
                  JSON.stringify(res.data.Data.Data)
                );
                console.log(
                  JSON.parse(localStorage.getItem("LoginData")),
                  "111111111"
                );

                if (
                  res.data.Data.Data.CharacterId == 1 ||
                  res.data.Data.Data.CharacterId == 2 ||
                  res.data.Data.Data.CharacterId == 3
                ) {
                  console.log("123");
                  this.$router.push({ path: "/index" });
                } else if (res.data.Data.Data.CharacterId == 4) {
                  console.log("444");
                  this.$router.push({ path: "/manufacturerindex" });
                }
              } else {
                //账号密码错误
                console.log("失败");
                alert("账号或密码错误");
                this.registerUser.name = "";
                this.registerUser.password = "";
              }
            });
          // console.log("000");
        } else {
          console.log("error submit!!");
          // return false;
        }
      });
    },
    gotoregister() {
      console.log("33333");
      this.$router.push({ path: "/register" });
    }
  }
};
</script>

<style lang="stylus" scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('../assets/bg.jpg') no-repeat center center;
  background-size: 100% 100%;
}

.form_container {
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-40%, -70%);
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}

.form_container .manage_tip .title {
  font-family: 'Microsoft YaHei';
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}

.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 50px 80px 30px 20px;
  border-radius: 10px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}

.tip {
  margin-left: 75px;
}
</style>





