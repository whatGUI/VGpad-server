<template>
  <component :is="currentPage"></component>
  <button class="switch-btn" @click="switchLink">{{ switchBtnText }}</button>
</template>

<script>
import QrcodeLink from "./pages/QrcodeLink.vue";
import UdpLink from "./pages/UdpLink.vue";

export default {
  name: 'App',
  components: {
    QrcodeLink,
    UdpLink
  },
  data() {
    return {
      currentPage: 'UdpLink',
      switchBtnText: '切换到使用H5页面'
    }
  },
  methods: {
    switchLink() {
      if (this.currentPage === 'QrcodeLink') {
        this.currentPage = 'UdpLink'
        this.switchBtnText = '切换到使用H5页面'
      } else {
        this.currentPage = 'QrcodeLink'
        this.switchBtnText = '切换到使用微信小程序页面'
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 20px 0;
}

.switch-btn {
  outline: 0;
}
</style>
