<template>
  <div>
    <h1>VGpad 服务端应用</h1>
    <h3>使用微信扫描二维码连接此服务器</h3>
    <img class="weappcode" src="../assets/image/weappcode.jpg">
  </div>
</template>

<script>
export default {
  name: 'UdpLink',
  created() {
    this.startUdpServer()
  },
  beforeUnmount() {
    this.closeUdpServer()
  },
  methods: {
    startUdpServer() {
      window.ipcRenderer.send("start-server", "udp")
    },
    closeUdpServer() {
      window.ipcRenderer.send("close-server", "udp")
    }
  },
}
</script>

<style scoped>
.weappcode {
  width: 300px;
  height: 300px;
  display: inline-block;
}
</style>
