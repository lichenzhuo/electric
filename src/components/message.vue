<template>
  <div class="singalwarn">
    <div class="icon">
        <i class="el-icon-message-solid" style="vertical-align:middle"></i>
        <span class="message">
            新消息：{{length}}
        </span>
    </div>
    
    <div class="table">
      <el-table
        :data="table"
        border
        style="width: 100%"
        @row-click="rowclick"
        header-cell-class-name="tablebg"
      >
        <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
        <el-table-column align="center" prop="Created_At" label="时间"></el-table-column>
        <el-table-column align="center" label="地点">
          <template scope="scope">
            <el-tag>{{scope.row.Province}}{{scope.row.City}}{{scope.row.Area}}{{scope.row.Address}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="SiteName" label="站点"></el-table-column>
        <el-table-column align="center" prop="MachinaryId" label="报警设备"></el-table-column>
        <el-table-column align="center" prop="4" label="实际处理时间"></el-table-column>
        <el-table-column align="center" prop="UserName" label="工作人员">
          <template scope="scope">
            <el-tag>{{scope.row.UserName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="Phone" label="联系电话"></el-table-column>
        <el-table-column align="center" prop="CharacterName" label="角色"></el-table-column>
        <el-table-column align="center" prop="8" label="检修状态"></el-table-column>
        <el-table-column align="center" prop="9" label="检修结果"></el-table-column>
        <el-table-column align="center" prop="10" label="备注"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { regionData, CodeToText } from "element-china-area-data";
export default {
  name: "message",
  data() {
    return {
      table:[],
      length:""
    };
  },
  created() {
    this.getData();
    console.log("这是site");
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    getData() {
      this.$axios.post("MachineData/GetNews").then(res => {
        console.log(res.data.Data);
        this.table=res.data.Data
        this.length=res.data.Data.length
      });
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

.icon{
    font-size 40px
    color red
    padding-top 10px
    padding-left 80px
    .message{
        font-size 20px
    }
}

  .table {
    margin-top: 10px;
    padding: 0 78px;
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