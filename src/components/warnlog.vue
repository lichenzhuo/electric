<template>
  <div class="singalwarn">
    <div class="top">
      <!-- <div class="block con">
        <span class="tip">站点名称</span>
        <el-cascader expand-trigger="hover" :options="options" v-model="selectedOptions2"></el-cascader>
      </div> -->
      <sitethreeselect></sitethreeselect>
      <div class="block con">
        <span class="tip" style="padding-left:2em">时间</span>
        <el-date-picker
          v-model="value2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </div>
      <div class="con">
        <span class="tip">监测类型</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <el-button type="primary" round style="margin-left:20px">清空</el-button>
      <el-button type="primary" round style="margin-left:20px">搜索</el-button>
    </div>
    <el-divider></el-divider>
    <div class="table">
      <el-table
        :data="table.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%"
        header-cell-class-name='tablebg'
      >
        <el-table-column align="center" prop="0" label="预警时间" width="160"></el-table-column>
        <el-table-column align="center" prop="one" label="地区">
          <template scope="scope">
            <span v-if="scope.row.one=='22v'">{{scope.row.one}}</span>
            <span v-else style="color: red">{{scope.row.one}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="2" label="地点">
          <template scope="scope">
            <span v-if="scope.row.one=='22v'">{{scope.row.one}}</span>
            <span v-else style="color: red">{{scope.row.one}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="3" label="机器编号">
          <template scope="scope">
            <span v-if="scope.row.one=='22v'">{{scope.row.one}}</span>
            <span v-else style="color: red">{{scope.row.one}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="4" label="母线电压">
          <template scope="scope">
            <span v-if="scope.row.one=='22v'">{{scope.row.one}}</span>
            <span v-else style="color: red">{{scope.row.one}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="5" label="正极电压">
          <template scope="scope">
            <span v-if="scope.row.one=='22v'">{{scope.row.one}}</span>
            <span v-else style="color: red">{{scope.row.one}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="6" label="负极电压">
          <template scope="scope">
            <span v-if="scope.row.one=='22v'">{{scope.row.one}}</span>
            <span v-else style="color: red">{{scope.row.one}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="7" label="正负压差">
          <template scope="scope">
            <span v-if="scope.row.one=='22v'">{{scope.row.one}}</span>
            <span v-else style="color: red">{{scope.row.one}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="8" label="交流电压">
          <template scope="scope">
            <span v-if="scope.row.one=='22v'">{{scope.row.one}}</span>
            <span v-else style="color: red">{{scope.row.one}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="9" label="纹波电压">
          <template scope="scope">
            <span v-if="scope.row.one=='22v'">{{scope.row.one}}</span>
            <span v-else style="color: red">{{scope.row.one}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="10" label="正极绝缘">
          <template scope="scope">
            <span v-if="scope.row.one=='22v'">{{scope.row.one}}</span>
            <span v-else style="color: red">{{scope.row.one}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="11" label="负极绝缘">
          <template scope="scope">
            <span v-if="scope.row.one=='22v'">{{scope.row.one}}</span>
            <span v-else style="color: red">{{scope.row.one}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="12" label="母联绝缘">
          <template scope="scope">
            <span v-if="scope.row.one=='22v'">{{scope.row.one}}</span>
            <span v-else style="color: red">{{scope.row.one}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="13" label="支路绝缘">
          <template scope="scope">
            <span v-if="scope.row.one=='22v'">{{scope.row.one}}</span>
            <span v-else style="color: red">{{scope.row.one}}</span>
          </template>
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
import sitethreeselect from "./sitethreeselect";
export default {
  name: "warnlog",
   components:{
    sitethreeselect
  },
  created() {
    this.getRouterData();
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    getRouterData() {
      this.id = this.$route.params.id;
      // console.log(this.id, "这是新路由接收的");
    }
  },
  data() {
    return {
      total: 0,
      currentPage: 1,
      pagesize: 10,
      table: [
        {
          0: "2019-05-21",
          one: "122v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "21v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "saa2019-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2fg019-05-21",
          one: "22v",
          2: "122v",
          3: "-fg50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "22v",
          2: "12df2v",
          3: "-50v",
          4: "200",
          5: "22dfgdf0v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "2dfgdf2v"
        },
        {
          0: "2019-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "dgdf9v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "22v",
          2: "122v",
          3: "hdfg0v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "201f-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22fhfgv",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "22fgv",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "22v",
          2: "hfghf2v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "22gv",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "hfgh2v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "25432v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2069-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "20456542fgdf1",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "20145dasdsa",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "20176dgdf",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "22v",
          2: "122kv",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "22v",
          2: "1hj22v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "23442v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "2a642v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value2: "",
      options:[],
      selectedOptions2: [],
      value: ""
    };
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
  .tablebg{
    background-color #409EFF
    color #ffffff
    font-size 18px
  }
}
</style>
