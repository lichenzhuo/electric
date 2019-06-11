
<template>
  <baidu-map class="bm-view" :center="{lng: 116.404, lat: 39.915}" :zoom="15" @ready="handler">
    <bm-point-collection
      :points="points"
      shape="BMAP_POINT_SHAPE_RHOMBUS"
      color="red"
      size="BMAP_POINT_SIZE_BIGGER"
    ></bm-point-collection>
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
  </baidu-map>
</template>

<script>
export default {
  name: "baidumap",
  data() {
    return {
      center: { lng: 116.404, lat: 39.915 },
      location: "杭州",
      keyword: "海威大厦",
      zoom: 15,
      points: [{ lng: 116.402, lat: 39.9 }, { lng: 116.3, lat: 39.915 }]
    };
  },
  methods: {
    handler({ BMap, map }) {}
  }
};
</script>

<style lang="stylus" scoped>
.bm-view {
  width: 100%;
  height: 500px;
}
</style>
