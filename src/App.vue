<template>
  <div id="app">
    <div class="timeline-nav">
      <div class="nav-title">
        Timeline
        <div class="nav-btn">
          <button id="sortDes" v-act="'des'">&#9660;</button>
          <button id="sortAsc" v-act="'asc'">&#9650;</button>
          <button id="add" v-act="'add'" @click="openModal">&#43;</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const _url = '/api/data';
export default {
  methods:{
    openModal: function(){
      // 開啟 plugin 彈窗
      this.$timeline.$children[0].$refs.modal.show();
    },
  },
  created: function() {
    this.axios
      .get(_url)
      .then((res) => {
        // 傳入 data
        this.$timeline.setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
.test {
  margin: 100px;
}
.timeline-nav {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 5;
  background: grey;
  .nav-title {
    color: white;
    margin: 0 10px;
    font-size: 30px;
    position: relative;
    .nav-btn {
      position: absolute;
      bottom: -15px;
      left: 110px;
      button {
        font-size: 1rem;
        cursor: pointer;
        background: $yellow;
        color: white;
        border: none;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        margin-left: 5px;
      }
    }
  }
}
</style>
