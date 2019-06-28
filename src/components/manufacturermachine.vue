<template>
  <div class="singalwarn">
    <div class="icon">
      <i class="el-icon-message-solid" style="vertical-align:middle"></i>
      <span class="message">新消息：3</span>
    </div>

    <div class="table">
      <el-table
        :data="table.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%"
        header-cell-class-name="tablebg"
      >
        <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
        <el-table-column align="center" prop="0" label="时间"></el-table-column>
        <el-table-column align="center" prop="one" label="地区"></el-table-column>
        <el-table-column align="center" prop="2" label="站点"></el-table-column>
        <el-table-column align="center" prop="3" label="报警设备"></el-table-column>
        <el-table-column align="center" prop="4" label="预处理时间"></el-table-column>
        <el-table-column align="center" prop="6" label="设备状态"></el-table-column>
        <el-table-column align="center" label="反馈">
          <template slot-scope="scope">
            <el-button type="primary" round @click="feedback(scope.row)">反馈</el-button>
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
    <el-dialog :visible.sync="dialogVisible" width="25%" :show-close="false" center>
      <span>
        <div class="topone">
          <span class="box">设备编码：xj-00012</span>
          <span class="box">站点：6号</span>
        </div>
        <div class="block">
          <span class="tip">检修状态</span>
          <el-select v-model="checkState" placeholder="请选择">
            <el-option
              v-for="item in checkStateType"
              :key="item.PositionId"
              :label="item.PositionName"
              :value="item.PositionName"
            ></el-option>
          </el-select>
        </div>
        <div class="block">
          <span class="tip">检修结果</span>
          <el-select v-model="checkResult" placeholder="请选择">
            <el-option
              v-for="item in checkResultType"
              :key="item.PositionId"
              :label="item.PositionName"
              :value="item.PositionName"
            ></el-option>
          </el-select>
        </div>
        <div class="block" style="margin-left: 77px;">
          <span class="tip" style="vertical-align: top">备注</span>
          <el-input style="width:220px" type="textarea" :rows="2" placeholder="请输入内容" v-model="beizhu"></el-input>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "manufacturermachine",
  created() {},
  methods: {
    feedback(row) {
      console.log(row);
      this.dialogVisible = true;
    },
    handleCurrentChange() {},
    sure(){
      // this.dialogVisible=false
      this.$confirm('确认提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dialogVisible=false
          this.$message({
            type: 'success',
            message: '提交成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    },
  },
  data() {
    return {
      checkStateType:[],
      checkState:"",
      checkResultType:[],
      checkResult:"",
      beizhu:"",
      dialogVisible: false,
      total: 0,
      currentPage: 1,
      pagesize: 10,
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
        }
      ]
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

  .icon {
    font-size: 40px;
    color: red;
    padding-top: 10px;
    padding-left: 80px;

    .message {
      font-size: 20px;
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

  .box {
    background-color: #E4E7ED;
    padding: 12px 30px;
    border-radius: 12px;
  }

  .topone {
    display: flex;
    justify-content: space-between;
  }
  .block{
    margin-top 20px
    margin-left 50px
  }
}
</style>