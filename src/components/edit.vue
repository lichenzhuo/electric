<template>
  <div class="singalwarn">
    <div class="top">
      <div class="con">
        <span class="tip">监测类型</span>
        <el-select v-model="jcvalue" placeholder="请选择" @change="selchange">
          <el-option
            v-for="item in options"
            :key="item.Id"
            :label="item.AlertType"
            :value="item.Id"
          ></el-option>
        </el-select>
      </div>
      <el-button type="primary" round style="margin-left:20px">编辑</el-button>
      <el-button type="primary" round style="margin-left:20px">新增</el-button>
    </div>
    <el-divider></el-divider>
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
      <el-button type="primary" round style="margin-left:20px">编辑</el-button>
      <el-button type="primary" round style="margin-left:20px">新增</el-button>
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
      <el-button type="primary" round style="margin-left:20px">编辑</el-button>
      <el-button type="primary" round style="margin-left:20px">新增</el-button>
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
      <el-button type="primary" round style="margin-left:20px">新增</el-button>
    </div>
    <el-divider></el-divider>
    <el-dialog :visible.sync="Charactereditdialog" width="20%" :show-close="false" center>
      <div slot="title">角色编辑</div>
      <div style="text-align:center">
        <!-- <span  v-for="item in CharacterNametype" :key="item.Id">
          <el-input style="width:200px;margin-bottom:20px" v-model="CharacterNameone"></el-input>
        </span> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Charactereditdialog = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "edit",
  data() {
    return {
      options: [],
      jcvalue: "",
      machinetypes: [],
      machinetype: "",
      DepartmentNametype: [],
      DepartmentName: "",
      CharacterNametype: [],
      CharacterName: "",
      Charactereditdialog: false,
      CharacterNameone:""
    };
  },
  created() {
    this.GetJCType();
  },
  mounted() {
    // this.GetJCType();
    this.alertmsg()
  },
  methods: {
    GetJCType() {
      this.$axios.get("Types/GetYJType").then(res => {
        console.log(res.data.Data, "监测类型");
        this.options = res.data.Data;
      });
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
        this.CharacterNameone = res.data.Data[0].CharacterName;
      });
    },
    alertmsg(){
        this.$alert('功能正在开发中', '未开放')
    },
    showCharactereditDialog() {
      this.Charactereditdialog = true;
    },
    selchange(e) {
      console.log(e);
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
