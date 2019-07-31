<template>
  <div class="singalwarn">
    <div class="top">
      <div class="con">
        <span class="tip">设备类型</span>
        <el-select v-model="machinetype" placeholder="请选择" @change="machinetypechange">
          <el-option
            v-for="item in machinetypes"
            :key="item.Id"
            :label="item.EquipType"
            :value="item.Id"
          ></el-option>
        </el-select>
      </div>
      <el-button type="primary" round style="margin-left:20px" @click="showmachinetypeeditdialog">编辑</el-button>
      <el-button type="primary" round style="margin-left:20px" @click="machinetypeInsert">新增</el-button>
    </div>
    <el-divider></el-divider>
    <div class="top">
      <div class="con">
        <span class="tip">部门类型</span>
        <el-select v-model="DepartmentName" placeholder="请选择" @change="DepartmentNamechange">
          <el-option
            v-for="item in DepartmentNametype"
            :key="item.Id"
            :label="item.DepartmentName"
            :value="item.Id"
          ></el-option>
        </el-select>
      </div>
      <el-button
        type="primary"
        round
        style="margin-left:20px"
        @click="showDepartmentNameeditdialog"
      >编辑</el-button>
      <el-button type="primary" round style="margin-left:20px" @click="DepartmentInsert">新增</el-button>
    </div>
    <el-divider></el-divider>
    <div class="top">
      <div class="con">
        <span class="tip">角色类型</span>
        <el-select v-model="CharacterName" placeholder="请选择" @change="CharacterNamechange">
          <el-option
            v-for="item in CharacterNametype"
            :key="item.Id"
            :label="item.CharacterName"
            :value="item.Id"
          ></el-option>
        </el-select>
      </div>
      <el-button type="primary" round style="margin-left:20px" @click="showCharactereditDialog">编辑</el-button>
      <el-button type="primary" round style="margin-left:20px" @click="CharacterInsert">新增</el-button>
    </div>
    <el-divider></el-divider>
    <div class="top">
      <div class="con">
        <span class="tip">站点级别</span>
        <el-select v-model="LevelName" placeholder="请选择" @change="CharacterNamechange">
          <el-option
            v-for="item in SiteLevel"
            :key="item.Id"
            :label="item.LevelName"
            :value="item.Id"
          ></el-option>
        </el-select>
      </div>
      <el-button type="primary" round style="margin-left:20px" @click="showLevelNameeditDialog">编辑</el-button>
      <el-button type="primary" round style="margin-left:20px" @click="LevelNameInsert">新增</el-button>
    </div>
    <el-divider></el-divider>
    <el-dialog :visible.sync="machinetypeeditdialog" width="20%" :show-close="false" center>
      <div slot="title">设备类型编辑</div>
      <div style="text-align:center">
        <el-radio-group v-model="machinetypeList" style="width:150px;text-align:left">
          <el-radio v-for="item in machinetypes" :key="item.Id" :label="item">{{item.EquipType}}</el-radio>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="machinetypeeditdialog = false">取 消</el-button>
        <el-button type="primary" @click="onSuremachinetype">修 改</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="Departmenteditdialog" width="20%" :show-close="false" center>
      <div slot="title">部门编辑</div>
      <div style="text-align:center">
        <el-radio-group v-model="DepartmentNameList" style="width:120px;text-align:left">
          <el-radio
            v-for="item in DepartmentNametype"
            :key="item.Id"
            :label="item"
          >{{item.DepartmentName}}</el-radio>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Charactereditdialog = false">取 消</el-button>
        <el-button type="primary" @click="onSureDepartment">修 改</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="Charactereditdialog" width="20%" :show-close="false" center>
      <div slot="title">角色编辑</div>
      <div style="text-align:center">
        <el-radio-group v-model="checkList" style="width:150px;text-align:left">
          <el-radio
            v-for="item in CharacterNametype"
            :key="item.Id"
            :label="item"
          >{{item.CharacterName}}</el-radio>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Charactereditdialog = false">取 消</el-button>
        <el-button type="primary" @click="onSure">修 改</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="LevelNameeditdialog" width="20%" :show-close="false" center>
      <div slot="title">角色编辑</div>
      <div style="text-align:center">
        <el-radio-group v-model="LevelNameList" style="width:150px;text-align:left">
          <el-radio v-for="item in SiteLevel" :key="item.Id" :label="item">{{item.LevelName}}</el-radio>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="LevelNameeditdialog = false">取 消</el-button>
        <el-button type="primary" @click="onSureLevelName">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "edit",
  data() {
    return {
      machinetypes: [],
      machinetype: "",
      DepartmentNametype: [],
      DepartmentName: "",
      CharacterNametype: [],
      CharacterName: "",
      Charactereditdialog: false,
      checkList: [],
      machinetypeeditdialog: false,
      machinetypeList: [],
      Departmenteditdialog: false,
      DepartmentNameList: [],
      SiteLevel: [],
      LevelName: "",
      LevelNameeditdialog: false,
      LevelNameList: []
    };
  },
  created() {
    this.GetJCType();
  },
  mounted() {
    // this.GetJCType();
    // this.alertmsg()
  },
  methods: {
    GetJCType() {
      //设备类型
      this.$axios.get("Types/GetEquipType").then(res => {
        console.log(res.data.Data, "设备类型");
        this.machinetypes = res.data.Data;
      });
      //部门
      this.$axios.get("Types/GetDepartmentType").then(res => {
        console.log(res.data.Data, "部门");
        this.DepartmentNametype = res.data.Data;
      });
      //角色
      this.$axios.get("UserInfos/GetCharacterList").then(res => {
        console.log(res.data.Data, "角色");
        this.CharacterNametype = res.data.Data;
      });
      // 获取站点级别
      this.$axios.get("UserInfos/GetSiteLevelList", {}).then(res => {
        console.log(res.data.Data, " 站点级别");
        this.SiteLevel = res.data.Data;
      });
    },
    // 设备类型编辑
    onSuremachinetype() {
      let that = this;
      console.log(that.machinetypeList.Id);
      that
        .$prompt("请输入修改值", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
          inputErrorMessage: "不能为空"
        })
        .then(({ value }) => {
          that.$axios
            .post("Types/UpEQType", {
              Id: that.machinetypeList.Id,
              EquipType: value
            })
            .then(res => {
              console.log(value, "value");
              console.log(res.data.Msg, "角色");
              if (res.data.Msg == "成功") {
                //
                that.$message({
                  type: "success",
                  message: "修改成功"
                });
                that.machinetypeeditdialog = false;
                that.GetJCType();
              } else if (res.data.Msg == "该设备类型已存在") {
                that.$message.error("该设备类型已存在");
              }
            });
        });
    },
    // 设备类型新增
    machinetypeInsert() {
      let that = this;
      that
        .$prompt("请输入", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
          inputErrorMessage: "不能为空"
        })
        .then(({ value }) => {
          that.$axios
            .post("Types/EQTypeInsert", {
              EquipType: value
            })
            .then(res => {
              console.log(value, "value");
              console.log(res.data.Data, "设备类型");
              if (res.data.Msg == "成功") {
                that.$message({
                  type: "success",
                  message: "添加成功"
                });
                that.GetJCType();
              } else if (res.data.Msg == "已存在该设备类型") {
                that.$message.error("已存在该设备类型");
              }
            });
        });
    },
    // 部门类型编辑
    onSureDepartment() {
      let that = this;
      console.log(that.DepartmentNameList.Id);
      that
        .$prompt("请输入修改值", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
          inputErrorMessage: "不能为空"
        })
        .then(({ value }) => {
          that.$axios
            .post("Types/UpDepartment", {
              Id: that.DepartmentNameList.Id,
              DepartmentName: value
            })
            .then(res => {
              console.log(value, "value");
              console.log(res.data.Msg, "部门");
              if (res.data.Msg == "成功") {
                //
                that.$message({
                  type: "success",
                  message: "修改成功"
                });
                that.Departmenteditdialog = false;
                that.GetJCType();
              } else if (res.data.Msg == "该部门已存在") {
                that.$message.error(res.data.Msg);
              }
            });
        });
    },
    // 部门类型新增
    DepartmentInsert() {
      let that = this;
      that
        .$prompt("请输入", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
          inputErrorMessage: "不能为空"
        })
        .then(({ value }) => {
          that.$axios
            .post("Types/DepartmentInsert", {
              DepartmentName: value
            })
            .then(res => {
              console.log(value, "value");
              console.log(res.data.Data, "设备类型");
              if (res.data.Msg == "成功") {
                that.$message({
                  type: "success",
                  message: "添加成功"
                });
                that.GetJCType();
              } else if (res.data.Msg == "已存在该部门") {
                that.$message.error(res.data.Msg);
              }
            });
        });
    },
    // 角色类型编辑
    onSure() {
      let that = this;
      console.log(that.checkList.Id);
      that
        .$prompt("请输入修改值", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
          inputErrorMessage: "不能为空"
        })
        .then(({ value }) => {
          that.$axios
            .post("UserInfos/UpCharacter", {
              Id: that.checkList.Id,
              CharacterName: value
            })
            .then(res => {
              console.log(value, "value");
              console.log(res.data.Msg, "角色");
              if (res.data.Msg == "成功") {
                that.$message({
                  type: "success",
                  message: "修改成功"
                });
                that.GetJCType();
                that.machinetypeeditdialog = false;
              } else if (res.data.Msg == "该角色已存在") {
                that.$message.error(res.data.Msg);
              }
            });
        });
    },
    // 角色类型新增
    CharacterInsert() {
      let that = this;
      that
        .$prompt("请输入", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
          inputErrorMessage: "不能为空"
        })
        .then(({ value }) => {
          that.$axios
            .post("UserInfos/CharacterInsert", {
              CharacterName: value
            })
            .then(res => {
              console.log(value, "value");
              console.log(res.data.Data, "角色");
              if (res.data.Data == "添加成功") {
                that.$message({
                  type: "success",
                  message: "添加成功"
                });
              } else if (res.data.Msg == "角色新增失败") {
                that.$message.error(res.data.Msg);
              }
              that.GetJCType();
            });
        });
    },
    // 站点级别编辑
    onSureLevelName() {
      let that = this;
      console.log(that.LevelNameList.Id);
      that
        .$prompt("请输入修改值", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
          inputErrorMessage: "不能为空"
        })
        .then(({ value }) => {
          that.$axios
            .post("UserInfos/UpSiteLevel", {
              Id: that.LevelNameList.Id,
              LevelName: value
            })
            .then(res => {
              console.log(value, "value");
              console.log(res.data.Msg, "站点级别");
              if (res.data.Msg == "成功") {
                //
                that.$message({
                  type: "success",
                  message: "修改成功"
                });
                that.LevelNameeditdialog = false;
                that.GetJCType();
              } else if (res.data.Msg == "已存在该站点级别") {
                that.$message.error("已存在该站点级别");
              }
            });
        });
    },
    // 站点级别新增
    LevelNameInsert() {
      let that = this;
      that
        .$prompt("请输入", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
          inputErrorMessage: "不能为空"
        })
        .then(({ value }) => {
          that.$axios
            .post("UserInfos/SiteLevelInsert", {
              LevelName: value
            })
            .then(res => {
              console.log(value, "value");
              console.log(res.data.Msg, "站点级别");
              if (res.data.Msg == "成功") {
                that.$message({
                  type: "success",
                  message: "添加成功"
                });
                that.GetJCType();
              } else if (res.data.Msg == "已存在该站点级别") {
                that.$message.error(res.data.Msg);
              }
            });
        });
    },
    showmachinetypeeditdialog() {
      this.machinetypeeditdialog = true;
    },
    showDepartmentNameeditdialog() {
      this.Departmenteditdialog = true;
    },
    showCharactereditDialog() {
      this.Charactereditdialog = true;
    },
    showLevelNameeditDialog() {
      this.LevelNameeditdialog = true;
    },
    machinetypechange(e) {
      console.log(e);
    },
    DepartmentNamechange(e) {
      console.log(e);
    },
    CharacterNamechange(e) {
      console.log(e);
    }
  }
};
</script>

<style lang="stylus" scoped>
.singalwarn {
  width: 1600px;
  background-color: #ffffff;
  min-height: 800px;
  margin-top: 20px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px, rgba(0, 0, 0, 0.2) 0px 3px 1px -2px;

  .top {
    padding-top: 30px;
    padding-left: 80px;
  }

  .header {
    padding-top: 30px;
    padding-left: 80px;
  }

  .con {
    display: inline-block;
    margin-right: 80px;
  }

  .tip {
    color: #333333;
    margin-right: 10px;
  }

  .table {
    margin-top: 50px;
    text-align: center;
    padding: 0;
    width: 1601px;
  }

  .color {
    color: #3936de;
  }

  .is-leaf {
    text-align: center;
  }

  .page {
    text-align: right;
    margin-top: 20px;
    padding-bottom: 50px;
  }

  .indent {
    padding: left 2em;
  }

  .tablebg {
    background-color: #409EFF;
    color: #ffffff;
    font-size: 18px;
  }
}
</style>
