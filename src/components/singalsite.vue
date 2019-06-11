<template>
  <div class="singalwarn">
    <div class="top">
      <div class="row">
        <sitethreeselect></sitethreeselect>
      </div>
      <div class="block con">
        <span class="tip">站点编号</span>
       <el-input style="width:auto" v-model="sitenumber" placeholder="请输入站点编号"></el-input>
      </div>
      <div class="block con">
        <span class="tip">设备编号</span>
        <el-input style="width:auto" v-model="machinenumber" placeholder="请输入内容"></el-input>
      </div>
      <el-button type="primary" round style="margin-left:20px" @click="query">查询</el-button>
      <el-button type="primary" round style="margin-left:20px" @click="dialogVisible = true">添加</el-button>
      <el-dialog :visible.sync="dialogVisible" width="25%" :show-close="false" center>
        <div slot="title">新增站点</div>
        <span>
          <el-form
            label-position="right"
            label-width="100px"
            :model="formLabelAlign"
            style="padding-left:40px"
          >
            <el-form-item label="站点编号">
              <el-input
                style="width:217px"
                v-model="formLabelAlign.number"
                placeholder
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="站点名称">
              <el-input style="width:217px" v-model="formLabelAlign.name" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="站点所在区域">
              <el-cascader
                :options="optionone"
                v-model="selectedOptions"
                filterable
                change-on-select
                @change="addressChange"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址">
              <el-input
                style="width:217px"
                type="textarea"
                v-model="formLabelAlign.address"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item label="所有设备">
              <el-select v-model="formLabelAlign.type" placeholder="请选择">
                <el-option
                  v-for="item in machinetypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="相关人员">
              <el-input
                style="width:217px"
                v-model="formLabelAlign.name"
                placeholder
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-divider></el-divider>
    <div class="table">
      <el-table
        :data="table.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%"
        @row-click="rowclick"
        header-cell-class-name="tablebg"
      >
        <el-table-column align="center" prop="0" label="站点编号"></el-table-column>
        <el-table-column align="center" prop="one" label="站点名称"></el-table-column>
        <el-table-column align="center" prop="2" label="详细地址"></el-table-column>
        <el-table-column align="center" prop="3" label="所有设备"></el-table-column>
        <el-table-column align="center" prop="5" label="相关人员">
          <template scope="scope">
            <el-tag>{{scope.row.five}}</el-tag>
            <!-- <span>{{scope.row.one}}</span> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="page">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          :page-size="pagesize"
          layout="prev, pager, next, jumper"
          :total="table.length"
        ></el-pagination>
      </div> -->
    </div>
  </div>
</template>

<script>
import { regionData, CodeToText } from "element-china-area-data";
import sitethreeselect from "./sitethreeselect";
export default {
  name: "singalsite",
  components:{
    sitethreeselect
  },
  created() {
    this.getRouterData();
    console.log("这是site");
  },
  methods: {
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
      console.log(e.id);
    },
    addressChange(arr) {
      console.log(arr, "地址");
      console.log(
        CodeToText[arr[0]] + "/" + CodeToText[arr[1]] + "/" + CodeToText[arr[2]]
      );
    }
  },
  data() {
    return {
      optionone: regionData,
      selectedOptions: [],
      dialogVisible: false,
      formLabelAlign: {
        number: "",
        name: "",
        address: "",
        type: "",
      },
      total: 0,
      currentPage: 1,
      pagesize: 5,
      table: [
        {
          id: "0",
          0: "2019-05-21",
          one: "122v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
      ],
      
      machinetypes: [
        {
          value: "typeone",
          label: "直流绝缘监测"
        },
        {
          value: "typetwo",
          label: "交流绝缘监测"
        }
      ],
      machinenumber: "",
      sitenumber:'',
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
}

.el-dialog__header {
  background-color: #409EFF;
  text-align: center;
  color: #ffffff;
  font-size: 22px;
}
</style>