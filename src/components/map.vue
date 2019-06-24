
<template>
  <!-- <baidu-map class="bm-view" :center="{lng: 116.404, lat: 39.915}" :zoom="15" @ready="handler"  ak="z7TojHQEi0GxfxXkhKtTUzjlKYXrOdbP">
    <bm-point-collection
      :points="points"
      shape="BMAP_POINT_SHAPE_RHOMBUS"
      color="red"
      size="BMAP_POINT_SIZE_BIGGER"
    ></bm-point-collection>
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
  </baidu-map>-->
  <baidu-map
    :zoom="zoom"
    :scroll-wheel-zoom="true"
    :inertial-dragging="true"
    :continuous-zoom="true"
    :center="locationData"
    class="map"
    @ready="handler"
    @click="getClickInfo"
    @moving="syncCenterAndZoom"
    @moveend="syncCenterAndZoom"
    @zoomend="syncCenterAndZoom"
    ak="z7TojHQEi0GxfxXkhKtTUzjlKYXrOdbP"
  >
    <div class="content">
      <div class="number" style="text-align:center" @click="lookwhole">总览</div>
      <div
        class="number"
        v-for="(item,index) in listData"
        v-bind:key="index"
        v-bind:index="index"
        v-bind:id="item.Id"
        @click="changemark(item,index)"
      >{{item.local}}</div>
    </div>
    <!-- 拖拽点 -->
    <!-- <bm-marker
      :position="{lng: center.lng, lat: center.lat}"
      :dragging="true"
      animation="BMAP_ANIMATION_BOUNCE"
    >-->
    <!-- 缩放控件 -->
    <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"/>
    <!-- 比例尺 -->
    <bm-scale anchor="BMAP_ANCHOR_TOP_LEFT"/>
    <!-- 点击定位 -->
    <!-- <bm-geolocation
      :show-address-bar="true"
      :auto-location="true"
      anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
    />-->

    <!-- 检索地址 -->
    <bm-local-search
      :keyword="locallist"
      :auto-viewport="true"
      :panel="false"
      :select-first-result="false"
      :page-capacity="1"
    />
    <!-- </bm-marker> -->
  </baidu-map>
</template>

<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmPointCollection from "vue-baidu-map/components/overlays/PointCollection.vue";
import BmNavigation from "vue-baidu-map/components/controls//Navigation.vue";
import BmMarker from "vue-baidu-map/components/overlays/Marker.vue";
import BmGeolocation from "vue-baidu-map/components/controls/Geolocation.vue";
import BmScale from "vue-baidu-map/components/controls/Scale";
import BmLocalSearch from "vue-baidu-map/components/search/LocalSearch";
export default {
  name: "baidumap",
  components: {
    BaiduMap,
    BmPointCollection,
    BmNavigation,
    BmMarker,
    BmGeolocation,
    BmScale,
    BmLocalSearch
  },
  // data() {
  //   return {
  //     center: { lng: 116.404, lat: 39.915 },
  //     location: "杭州",
  //     keyword: "海威大厦",
  //     zoom: 15,
  //     points: [{ lng: 116.402, lat: 39.9 }, { lng: 116.3, lat: 39.915 }]
  //   };
  // },
  // methods: {
  //   handler({ BMap, map }) {}
  // }
  props: {
    locationData: {
      type: String,
      default: "浙江省杭州市上城区太和广场"
    },
    msg: "",
    locallist: "",
    listData: ""
  },
  data() {
    return {
      center: { lng: 116.404, lat: 39.915 },
      location: "",
      zoom: 15,
      // keyword:,
      loclist: [
        { id: 0, location: "杭州", keyword: "滨江区宝龙城" },
        { id: 1, location: "上海", keyword: "东方明珠" },
        { id: 2, location: "北京", keyword: "天安门" },
        { id: 3, location: "杭州", keyword: "太和广场" }
      ]
    };
  },
  mounted() {
    // console.log(this.keyword,'地图组件')
  },
  methods: {
    handler({ BMap, map }) {
      // console.log('定位数据bmap', BMap, 'map-------->', map.Oe)
    },
    changemark(item, index) {
      console.log(item.Id);
      console.log(index);
      // this.locallist=this.listData[index].local
      this.$emit("changemake", index);
      // this.location=this.loclist[e.currentTarget.id].location
      // this.keyword=this.loclist[e.currentTarget.id].keyword
    },
    lookwhole() {
      // this.locallist=this.listData
      this.$emit("lookwhole");
    },
    getClickInfo(e) {
      this.center.lng = e.point.lng;
      this.center.lat = e.point.lat;
    },
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter();
      this.center.lng = lng;
      this.center.lat = lat;
      this.zoom = e.target.getZoom();
      this.$emit("show-lng", e.target.getCenter());
      // console.log('点击e.target.getCenter()', e.target.getCenter())
    }
  }
};
</script>

<style lang="stylus" scoped>
.map {
  width: 100%;
  height: 500px;
  position: relative;
}

.content {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #ffffff;
  padding: 20px;
}

.number {
  margin: 5px 5px 20px 5px;
}
</style>
