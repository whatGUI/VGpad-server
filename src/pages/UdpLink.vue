<template>
  <div>
    <h1 class="no-select">VGpad 服务端应用</h1>
    <h3 class="no-select">使用微信扫描二维码连接此服务端</h3>
    <img class="weappcode no-select" src="../assets/image/weappcode.jpg">
    <div class="no-select">此服务端的ip地址为</div>
    <div class="ip" v-for="(ip, index) in serverIPs" :key="index">{{ ip }}</div>
  </div>
</template>

<script>
export default {
  name: 'UdpLink',
  data() {
    return {
      serverIPs: [],
    }
  },
  created() {
    this.startUdpServer()
    this.getServerIP()
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
    },
    getServerIP() {
      window.ipcRenderer.invoke("get-server-ip").then((data) => {
        this.serverIPs = data
      })
    },
  },
}
</script>

<style scoped>
.no-select{
  user-select: none;
}
.weappcode {
  width: 250px;
  height: 250px;
  display: inline-block;
  -webkit-user-drag: none;
}
.ip{
  font-size: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  color: #ff0000;
}
</style>
