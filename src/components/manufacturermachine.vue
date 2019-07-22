<template>
  <div class="singalwarn">
    <div class="icon">
      <i class="el-icon-message-solid" style="vertical-align:middle"></i>
      <span class="message">新消息：{{dataLength}}</span>
    </div>

    <div class="table">
      <el-table :data="table" border style="width: 100%" header-cell-class-name="tablebg">
        <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
        <el-table-column align="center" prop="Created_AtStr" label="时间"></el-table-column>
        <el-table-column align="center" label="地区">
          <template slot-scope="scope">
            <span>{{scope.row.Province}}{{scope.row.City}}{{scope.row.Area}}{{scope.row.Address}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="SiteName" label="站点"></el-table-column>
        <el-table-column align="center" prop="MachinaryId" label="报警设备"></el-table-column>
        <el-table-column align="center" prop="EquipState" label="设备状态"></el-table-column>
        <el-table-column align="center" label="反馈">
          <template slot-scope="scope">
            <el-button type="primary" round @click="feedback(scope.row)">反馈</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="25%" :show-close="false" center>
      <span>
        <div class="topone">
          <span class="box">设备编码：{{MachinaryId}}</span>
          <span class="box">站点：{{SiteName}}</span>
        </div>
        <div class="block">
          <span class="tip">检修状态</span>
          <el-select v-model="checkState" placeholder="请选择">
            <el-option
              v-for="item in checkStateType"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="block">
          <span class="tip">检修结果</span>
          <el-select v-model="checkResult" placeholder="请选择">
            <el-option
              v-for="item in checkResultType"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="block" style="margin-left: 77px;">
          <span class="tip" style="vertical-align: top">备注</span>
          <el-input
            style="width:220px"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="beizhu"
          ></el-input>
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
  data() {
    return {
      checkStateType: [
        { value: "0", label: "未检修" },
        { value: "1", label: "已检修" }
      ],
      checkState: "",
      nowcheckState: "",
      checkResultType: [
        { value: "0", label: "成功" },
        { value: "1", label: "失败" }
      ],
      checkResult: "",
      nowcheckResult: "",
      table: [],
      dataLength: "",
      beizhu: "",
      MachinaryId: "",
      SiteName: "",
      SiteId: "",
      dialogVisible: false
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    // this.AlreadyRead();
    this.getData();
  },
  methods: {
    getData() {
      this.$axios.post("MachineData/GetNew").then(res => {
        console.log(res.data.Data, "111");
        this.table = res.data.Data;
        // this.Length = res.data.Data.length;
        // console.log(this.Length,'00000000')
      });
      this.$axios.post("MachineData/GetNewCount").then(res => {
        console.log(res.data.Data, "2222");
        // this.table = res.data.Data;
        this.dataLength = res.data.Data;
      });
    },

    // AlreadyRead() {
    //   this.$axios.post("MachineData/UpReadSate").then(res => {
    //     console.log(res, "222");
    //   });
    // },
    feedback(row) {
      console.log(row);
      this.MachinaryId = row.MachinaryId;
      this.SiteName = row.SiteName;
      this.SiteId = row.SiteId;
      this.dialogVisible = true;
    },
    handleCurrentChange() {},
    sure() {
      if (this.checkState) {
      } else {
        this.nowcheckState = "2";
      }
      if (this.checkResult) {
      } else {
        this.nowcheckResult = "2";
      }
      console.log(this.MachinaryId);
      console.log(this.SiteId);
      console.log(this.nowcheckState);
      console.log(this.nowcheckResult);
      console.log(this.beizhu);
      this.$confirm("确认提交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("MachineData/UpReadSate", {
              MachinaryId: this.MachinaryId,
              SiteId: this.SiteId,
              RepaireStatus: this.nowcheckState,
              Result: this.nowcheckResult,
              Remarks: this.beizhu,
              UserId: JSON.parse(localStorage.getItem("LoginData")).UserId
            })
            .then(res => {
              console.log(res, "1232131221312");
              this.dialogVisible = false;
              this.$message({
                type: "success",
                message: "提交成功!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
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

  .block {
    margin-top: 20px;
    margin-left: 50px;
  }
}
</style>