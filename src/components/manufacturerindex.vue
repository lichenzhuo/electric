<template>
  <div class="singalwarn">
    <div class="conte">
      <div class="thebox">
        <span class="title">
          待维修：
          <span class="numbert">{{aNumber}}</span>
        </span>
      </div>
      <div class="thebox">
        <span class="title">
          站点消息：
          <span class="numbert">{{SiteNews}}</span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "manufacturerindex",
  data() {
    return {
      aNumber:"",
      SiteNews:"",
    };
  },
  mounted() {
    this.GetJCType();
    this.requireAuth()
  },
  methods: {
    GetJCType() {
      this.$axios.post("MachineData/GetNewCount").then(res => {
        console.log(res.data.Data, "111");
        this.aNumber=res.data.Data
      });
       this.$axios.post("MachineData/GetUnRepaired").then(res => {
         this.SiteNews=res.data.Data
        console.log(res.data.Data, "222");
      });
    },
    requireAuth(){
      // this.$store.state
    },
  }
};
</script>
<style lang="stylus" scoped>
.singalwarn {
  width: 1600px;
  background-color: #ffffff;
  min-height: 800px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px, rgba(0, 0, 0, 0.2) 0px 3px 1px -2px;

  .conte {
    padding-top: 100px;
  }

  .thebox {
    margin-left: 200px;
    margin-bottom: 20px;
    background-color: #E4E7ED;
  padding: 12px 30px;
  border-radius: 12px;
  display inline-block
  }
}
</style>

