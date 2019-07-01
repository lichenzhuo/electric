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
        v-if="showregisterone"
      >
        <el-form-item label="登录账号" prop="LoginName">
          <el-input v-model="registerUser.LoginName" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="UserName">
          <el-input v-model="registerUser.UserName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!-- <el-form-item label="邮箱" prop="email">
                    <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>-->
        <el-form-item label="密码" prop="Password">
          <el-input v-model="registerUser.Password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input v-model="registerUser.password2" placeholder="请确认密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="选择性别" prop="Sex">
          <el-select v-model="registerUser.Sex" placeholder="请选择性别">
            <el-option
              v-for="item in SexList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="submit_btn"
            @click="Fillinformation('registerForm')"
          >确认并填写资料</el-button>
        </el-form-item>
      </el-form>
      <el-form
        :model="registerUser"
        :rules="rules"
        class="registerForm"
        ref="registerFormone"
        label-width="80px"
        v-if="showregistertwo"
      >
        <el-form-item label="手机号码" prop="Phone">
          <el-input v-model="registerUser.Phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="微信" prop="VX">
          <el-input v-model="registerUser.VX" placeholder="请输入微信号"></el-input>
        </el-form-item>
        <!-- <el-form-item label="邮箱" prop="email">
                    <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>-->
        <el-form-item label="选择单位" prop="UnitNumber">
          <el-select v-model="registerUser.UnitNumber" placeholder="请选择单位">
            <el-option
              v-for="item in UnitNameList"
              :key="item.UnitNumber"
              :label="item.UnitName"
              :value="item.UnitNumber"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门" prop="DepartmentId">
          <el-select v-model="registerUser.DepartmentId" placeholder="请选择部门">
            <el-option
              v-for="item in DepartmentType"
              :key="item.Id"
              :label="item.DepartmentName"
              :value="item.Id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择职务" prop="PositionId">
          <el-select v-model="registerUser.PositionId" placeholder="请选择职务">
            <el-option
              v-for="item in PositionNameList"
              :key="item.PositionId"
              :label="item.PositionName"
              :value="item.PositionId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择角色" prop="CharacterId">
          <el-select v-model="registerUser.CharacterId" placeholder="请选择角色">
            <el-option
              v-for="item in CharacterList"
              :key="item.Id"
              :label="item.CharacterName"
              :value="item.Id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="submitForm('registerFormone')">注 册</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  name: "register",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.Password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      showregisterone: true,
      showregistertwo: false,
      CharacterList: "",
      UnitNameList: "",
      PositionNameList: "",
      DepartmentType: "",
      SexList: [{ value: 0, label: "男" }, { value: 1, label: "女" }],
      registerUser: {
        LoginName: "",
        // email: "",
        UserName: "",
        Password: "",
        password2: "",
        Sex: "",
        Phone: "",
        VX: "",
        UnitNumber: "",
        DepartmentId: "",
        PositionId: "",
        CharacterId: ""
      },
      rules: {
        LoginName: [
          { required: true, message: "用户名不能为空", trigger: "change" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        UserName: [
          { required: true, message: "用户名不能为空", trigger: "change" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ],
        // email: [
        //   {
        //     type: "email",
        //     required: true,
        //     message: "邮箱格式不正确",
        //     trigger: "blur"
        //   }
        // ],
        Password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 4, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ],
        password2: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          {
            min: 4,
            max: 30,
            message: "长度在 6 到 30 个字符",
            trigger: "blur"
          },
          { validator: validatePass2, trigger: "blur" } //validator是自定义校验规则，定义的validatePass2在上面写出来了
        ],
        Sex: [{ required: true, message: "职务不能为空", trigger: "blur" }],
        Phone: [{ required: true, trigger: "blur", validator: checkPhone }],
        VX: [{ required: true, message: "微信号码不能为空", trigger: "blur" }],
        UnitNumber: [
          { required: true, message: "单位不能为空", trigger: "blur" }
        ],
        DepartmentId: [
          { required: true, message: "部门不能为空", trigger: "blur" }
        ],
        PositionId: [
          { required: true, message: "职位不能为空", trigger: "blur" }
        ],
        CharacterId: [
          { required: true, message: "角色不能为空", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.GetJCType();
  },
  methods: {
    Fillinformation(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.showregisterone = false;
          this.showregistertwo = true;
          console.log(this.registerUser);
        } else {
          console.log("error submit!!");
        }
      });
    },
    submitForm(formName) {
      console.log(this.registerUser, "111111");
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.registerUser.CharacterId == "") {
            console.log("空");
            this.$alert("请选择用户角色", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          } else {
            console.log("不是空");
            console.log(this.registerUser.CharacterId);
            this.$axios
              .post("Login/LoginInsert", {
                LoginName: this.registerUser.LoginName,
                UserName: this.registerUser.UserName,
                Password: this.registerUser.Password,
                Sex: this.registerUser.Sex,
                Phone: this.registerUser.Phone,
                VX: this.registerUser.VX,
                UnitNumber: this.registerUser.UnitNumber,
                DepartmentId: this.registerUser.DepartmentId,
                PositionId: this.registerUser.PositionId,
                CharacterId: this.registerUser.CharacterId
              })
              .then(res => {
                console.log(res.data.Data, "注册");
                if (res.data.Code == 0) {
                  this.$message({
                    message: "恭喜你，注册成功",
                    type: "success"
                  });
                  var that=this
                  // this.$router.push({ path: "/login" });
                  setTimeout(function() {
                    that.$router.push({ path: "/login" });
                    console.log('2000')
                  }, 2000);
                }else{
                  this.$message.error('注册失败');
                }
              });
          }
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
          console.log("00000");
        } else {
          console.log("error submit!!");
          // return false;
        }
      });
    },
    GetJCType() {
      this.$axios.get("UserInfos/GetCharacterList").then(res => {
        console.log(res.data.Data, "角色");
        this.CharacterList = res.data.Data;
      });
      this.$axios.get("UserInfos/GetUnitNameList").then(res => {
        console.log(res.data.Data, "单位名称");
        this.UnitNameList = res.data.Data;
      });
      this.$axios.get("PositionManager/GetPositionNameList").then(res => {
        console.log(res.data.Data, "职务");
        this.PositionNameList = res.data.Data;
      });
      this.$axios.get("Types/GetDepartmentType").then(res => {
        console.log(res.data.Data, "部门");
        this.DepartmentType = res.data.Data;
      });
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
</style>





