<template>
  <div class="singalwarn">
    <div class="top">
      <div class="con">
       <sitethreeselect></sitethreeselect>
      </div>
      <div class="con">
        <span class="tip">单位编号</span>
        <el-input style="width:auto" v-model="machinenumber" placeholder="请输入内容"></el-input>
      </div>
      <el-button type="primary" round style="margin-left:20px" @click="query">查询</el-button>
      <el-button type="primary" round style="margin-left:20px" @click="dialogVisible = true">添加</el-button>
      <el-dialog :visible.sync="dialogVisible" width="25%" :show-close="false" center top="5vh">
        <div slot="title">新增单位</div>
        <span>
          <el-form
            label-position="right"
            label-width="100px"
            :model="formLabelAlign"
            style="padding-left:40px"
          >
            <el-form-item label="单位编号">
              <el-input
                style="width:217px"
                v-model="formLabelAlign.name"
                placeholder
              ></el-input>
            </el-form-item>
            <el-form-item label="单位类别">
              <el-select v-model="formLabelAlign.region" placeholder="请选择">
                <el-option
                  v-for="item in machinetypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单位名称">
              <el-select v-model="formLabelAlign.region" placeholder="请选择">
                <el-option
                  v-for="item in machinetypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="地址">
              <el-input
                style="width:217px"
                type="textarea"
                v-model="formLabelAlign.address"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input style="width:217px" v-model="formLabelAlign.name" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="部门">
              <el-select v-model="formLabelAlign.region" placeholder="请选择部门">
                <el-option
                  v-for="item in machinetypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职位">
              <el-select v-model="formLabelAlign.region" placeholder="请选择职位">
                <el-option
                  v-for="item in machinetypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input style="width:217px" v-model="formLabelAlign.name" placeholder="请输入联系电话"></el-input>
            </el-form-item>
            <el-form-item label="微信">
              <el-input style="width:217px" v-model="formLabelAlign.name" placeholder="请输入微信"></el-input>
            </el-form-item>
            <el-form-item label="所有站点">
              <el-select v-model="formLabelAlign.region" placeholder="请选择">
                <el-option
                  v-for="item in machinetypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
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
        <el-table-column align="center" prop="0" label="单位编号"></el-table-column>
        <el-table-column align="center" prop="one" label="单位名称"></el-table-column>
        <el-table-column align="center" prop="2" label="地址"></el-table-column>
        <el-table-column align="center" prop="3" label="类别"></el-table-column>
        <el-table-column align="center" prop="5" label="联系人">
          <template scope="scope">
            <el-tag>{{scope.row.five}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="6" label="部门"></el-table-column>
        <el-table-column align="center" prop="7" label="职位"></el-table-column>
        <el-table-column align="center" prop="8" label="联系电话"></el-table-column>
        <el-table-column align="center" prop="9" label="微信"></el-table-column>
        <el-table-column align="center" prop="10" label="相关站点"></el-table-column>
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
import { regionData, CodeToText } from "element-china-area-data";
import sitethreeselect from "./sitethreeselect";
export default {
  name: "companyinfo",
  components: {
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
        name: "",
        region: "",
        type: ""
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
        {
          id: "1",
          0: "2019-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "李四",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "2",
          0: "2019-05-21",
          one: "21v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "3",
          0: "saa2019-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "4",
          0: "2fg019-05-21",
          one: "22v",
          2: "122v",
          3: "-fg50v",
          4: "200",
          five: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "5",
          0: "2019-05-21",
          one: "22v",
          2: "12df2v",
          3: "-50v",
          4: "200",
          five: "22dfgdf0v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "2dfgdf2v"
        },
        {
          id: "6",
          0: "2019-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "220v",
          6: "dgdf9v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "7",
          0: "2019-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "8",
          0: "2019-05-21",
          one: "22v",
          2: "122v",
          3: "hdfg0v",
          4: "200",
          five: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "9",
          0: "201f-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "10",
          0: "2019-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "张三",
          6: "229v",
          7: "22fhfgv",
          8: "22v",
          9: "22v"
        },
        {
          id: "11",
          0: "2019-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "12",
          0: "2019-05-21",
          one: "22fgv",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "13",
          0: "2019-05-21",
          one: "22v",
          2: "hfghf2v",
          3: "-50v",
          4: "200",
          five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "14",
          0: "2019-05-21",
          one: "22gv",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "15",
          0: "2019-05-21",
          one: "hfgh2v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "16",
          0: "2019-05-21",
          one: "25432v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "17",
          0: "2069-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "18",
          0: "20456542fgdf1",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "19",
          0: "20145dasdsa",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "20",
          0: "20176dgdf",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "21",
          0: "2019-05-21",
          one: "22v",
          2: "122kv",
          3: "-50v",
          4: "200",
          five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "22",
          0: "2019-05-21",
          one: "22v",
          2: "1hj22v",
          3: "-50v",
          4: "200",
          five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "23",
          0: "2019-05-21",
          one: "23442v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "24",
          0: "2019-05-21",
          one: "2a642v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        }
      ],
      value2: "",
      options:[],
      value: "",
      machinetype: "",
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
      machinenumber: ""
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