<template>
  <el-row class="tac">
    <el-col :span="12" class="aaa">
      <el-menu
        v-if="show"
        :default-active="this.$router.path"
        router
        class="el-menu-vertical-demo"
        @open="theselect"
        @close="close"
      >
        <el-submenu index="/">
          <template slot="title">
            <i class="el-icon-s-home"></i>
            <span>首页</span>
          </template>
          <el-menu-item index="/singalwarn">
            <template slot="title">
              <i class="el-icon-message-solid"></i>
              <span>单个预警</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/singalwarning">
            <template slot="title">
              <i class="el-icon-warning"></i>
              <span>单个报警</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/singalsite">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>单个站点</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/personinfo">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>相关人员资料</span>
            </template>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="/warnlog">
          <i class="el-icon-message-solid"></i>
          <span slot="title">预警日志</span>
        </el-menu-item>
        <el-menu-item index="/warninglog">
          <i class="el-icon-warning"></i>
          <span slot="title">报警日志</span>
        </el-menu-item>
        <el-submenu index="/machinemanage">
          <template slot="title">
            <i class="el-icon-s-tools"></i>
            <span>设备管理</span>
          </template>
          <el-submenu index="/sitemanage">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>站点管理</span>
            </template>
            <el-menu-item index="/companyinfo">
              <template slot="title">
                <i class="el-icon-info"></i>
                <span>单位信息</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/machineinfo">
            <template slot="title">
              <i class="el-icon-monitor"></i>
              <span>设备查看</span>
            </template>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="/usermanage">
          <i class="el-icon-user-solid"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="/positionmanage">
          <i class="el-icon-s-custom"></i>
          <span slot="title">职务管理</span>
        </el-menu-item>
        <el-menu-item index="/message">
          <i class="el-icon-s-comment"></i>
          <span slot="title">消息反馈</span>
        </el-menu-item>
        <el-menu-item index="/morefunction">
          <i class="el-icon-s-grid"></i>
          <span slot="title">高级功能</span>
        </el-menu-item>
      </el-menu>
      <el-menu
        v-if="orshow"
        :default-active="this.$router.path"
        router
        class="el-menu-vertical-demo"
        @open="theselect"
        @close="close"
      >
        <el-menu-item index="/manufacturerindex">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="/personaldata">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span>个人资料</span>
          </template>
          <el-menu-item index="/changepassword">
            <template slot="title">
              <i class="el-icon-bank-card"></i>
              <span>修改密码</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/infocomplete">
            <template slot="title">
              <i class="el-icon-info"></i>
              <span>信息完善</span>
            </template>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="/manufacturermachine">
          <i class="el-icon-s-tools"></i>
          <span slot="title">设备管理</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "leftnav",
  data() {
    return {
      show: "",
      orshow: ""
    };
  },
  beforeCreate() {},
  created() {
    this.showMenu();
  },
  mounted() {
    this.showMenu();
  },
  methods: {
    close(index, indexPath) {
      console.log(index, "111");
      this.$router.push({ path: index });
    },
    theselect(index) {
      console.log(index, "222");
      this.$router.push({ path: index });
    },
    showMenu() {
      var Id = localStorage.getItem("CharacterId");
      if (Id == 1 || Id == 2 || Id == 3) {
        console.log(Id, "正常列表");
        this.show = true;
        this.orshow = false;
      } else {
        console.log(Id, "厂家");
        this.show = false;
        this.orshow = true;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.tac {
  height: 100%;
  background-color: #4f52ba;
}

.aaa {
  height: 100%;
}

.el-col-12 {
  width: 100%;
}

.el-menu-vertical-demo {
  height: 100%;
}

.el-submenu .el-menu-item {
  min-width: 0;
}
</style>
