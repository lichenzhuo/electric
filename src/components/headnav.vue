<template>
  <div class="head">
    <img src="../assets/logo.jpg" alt="星炬科技" />
    <p class="title">监测管理系统</p>
    <div class="user">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          欢迎你：{{UserName}}/{{CharacterName}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="item" command="personinfo">个人信息</el-dropdown-item>
          <el-dropdown-item class="item" command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "headnav",
  data() {
    return {
      UserName: "",
      CharacterName: ""
    };
  },
  created() {
    this.GetJCType();
  },
  mounted() {},
  methods: {
    GetJCType() {
      this.UserName = JSON.parse(localStorage.getItem("LoginData")).UserName;
      this.CharacterName = JSON.parse(
        localStorage.getItem("LoginData")
      ).CharacterName;
    },

    handleCommand(command) {
      if (command == "logout") {
        console.log("000000");
        localStorage.removeItem("LoginData");
        localStorage.removeItem("CharacterId");
        this.$router.push({ path: "/login" });
      } else if (command == "personinfo") {
        this.$router.push({ path: "/personinfo" });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.head {
  height: 60px;

  .title {
    font-size: 26px;
    float: left;
    margin-left: 50px;
    margin-top: 14px;
  }

  .user {
    float: right;
    margin-right: 100px;
    padding-top: 20px;

    .item {
      color: #606266;
    }
  }
}

.router-link-active {
  text-decoration: none;
}

a {
  text-decoration: none;
  color: black;
}

img {
  height: 60px;
  float: left;
  margin-left: 30px;
}
</style>
