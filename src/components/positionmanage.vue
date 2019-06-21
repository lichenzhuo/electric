<template>
  <div class="singalwarn">
    <div class="top">
      <!-- <div class="block con">
         <sitethreeselect></sitethreeselect>
      </div>-->
    
      <div class="con">
        <span class="tip">职务编号</span>
        <el-input style="width:auto" v-model="machinenumber" placeholder="请输入内容"></el-input>
      </div>
      <div class="block con">
        <span class="tip" style="padding-left:2em">部门</span>
        <el-select v-model="bumen" placeholder="请选择">
          <el-option
            v-for="item in bumentype"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
     
      <div class="block con">
        <span class="tip">职务名称</span>
        <el-select v-model="role" placeholder="请选择">
          <el-option
            v-for="item in roletype"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <el-button type="primary" round style="margin-left:20px" @click="query">查询</el-button>
      <el-button type="primary" round style="margin-left:20px" @click="dialogVisible = true">新增用户</el-button>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="25%" :show-close="false" center>
      <div slot="title">新增用户</div>
      <span>
        <el-form
          label-position="right"
          label-width="100px"
          :model="formLabelAlign"
          style="padding-left:40px"
        >
          <el-form-item label="职务名称">
            <el-select v-model="formLabelAlign.role" placeholder="请选择">
              <el-option
                v-for="item in roletype"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门">
            <el-select v-model="formLabelAlign.bumen" placeholder="请选择">
              <el-option
                v-for="item in bumentype"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input style="width:217px" v-model="formLabelAlign.name" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureForm">确 定</el-button>
      </span>
    </el-dialog>
    
    <el-divider></el-divider>
    <div class="table">
      <el-table
        :data="table.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%"
        @row-click="rowclick"
        header-cell-class-name="tablebg"
      >
        <el-table-column align="center" prop="0" label="职务编号" width="160"></el-table-column>
        <el-table-column align="center" prop="1" label="职务名称"></el-table-column>
        <el-table-column align="center" prop="2" label="部门"></el-table-column>
        <el-table-column align="center" prop="3" label="备注">
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          :page-size="pagesize"
          layout="prev, pager, next, jumper"
          :total="table.length"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// import sitethreeselect from "./sitethreeselect";
// import { regionData, CodeToText } from "element-china-area-data";
export default {
  name: "positionmanage",
  //    components:{
  //     sitethreeselect
  //   },
  created() {
    // this.getRouterData();
  },
  methods: {
    sureForm() {
      this.dialogVisible = false;
      console.log(this.formLabelAlign.type);
    },
    surePosition() {
      this.positiondialog = false;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    getRouterData() {
      this.id = this.$route.params.id;
      // console.log(this.id, "这是新路由接收的");
    },
    query() {
      this.$message({
        message: "点击查询成功",
        type: "success"
      });
    },
    insert() {
      this.$message({
        message: "点击添加成功",
        type: "success"
      });
    },
    rowclick(e) {
      //   console.log(e.id);
    },
    addressChange(arr) {
      console.log(arr, "地址");
      console.log(
        CodeToText[arr[0]] + "/" + CodeToText[arr[1]] + "/" + CodeToText[arr[2]]
      );
    },
    positionEdit(row) {
      console.log(row.id);
      this.positiondialog = true;
    }
  },
  data() {
    return {
      position: "",
      //   optionone: regionData,
      selectedOptions: [],
      dialogVisible: false,
      positiondialog: false,
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
        company: "",
        type: []
      },
      total: 0,
      currentPage: 1,
      pagesize: 5,
      table: [
        {
          id: "0",
          0: "0102051",
          1: "张三",
          2: "管理员"
        },
        {
          id: "1",
          0: "0102052",
          1: "李四",
          2: "运行人员"
        },
        {
          id: "2",
          0: "0102053",
          1: "王二",
          2: "维护人员"
        },
        {
          id: "3",
          0: "0102054",
          1: "张记",
          2: "厂家人员"
        }
      ],
      value: "",
      machinenumber: "",
      sextype: [
        {
          value: "man",
          label: "男"
        },
        {
          value: "woman",
          label: "女"
        }
      ],
      sex: "",
      roletype: [
        {
          value: "0",
          label: "管理员"
        },
        {
          value: "1",
          label: "运行人员"
        },
        {
          value: "2",
          label: "维护人员"
        },
        {
          value: "3",
          label: "厂家人员"
        }
      ],
      role: "",
      bumentype: [
        {
          value: "0",
          label: "生产部门"
        },
        {
          value: "1",
          label: "维护部门"
        }
      ],
      bumen: "",
      company: ""
    };
  }
};
</script>

<style lang="stylus">
.singalwarn {
  width: 1600px;
  background-color: #ffffff;
  min-height: 800px;
  margin-top: 20px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px, rgba(0, 0, 0, 0.2) 0px 3px 1px -2px;

  .top {
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

  .machineName {
    padding: 0 78px;
    margin-bottom: 20px;
    font-size: 18px;

    .box {
      margin-right: 58px;
    }
  }

  .table {
    margin-top: 50px;
    padding: 0 78px;
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

  .rowOne {
    margin-bottom: 30px;
  }
}

.el-dialog__header {
  background-color: #409EFF;
  text-align: center;
  color: #ffffff;
  font-size: 22px;
}
</style>