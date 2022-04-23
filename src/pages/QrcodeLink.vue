<template>
  <div>
    <h1>VGpad 服务端应用</h1>
    <h3>使用手机浏览器扫描二维码连接此服务器</h3>
    <QrCode :value="getQRCodeValue"></QrCode>
    <div>服务器地址：{{ serverIP[selectedIP] }}:{{ port }}</div>
    <span>或选择其他网络接口：</span>
    <select v-model="selectedIP">
      <option v-for="(i, index) in serverIP" :key="index" :value="index">{{ i }}</option>
    </select>
  </div>
</template>

<script>
import QrCode from "../components/QrCode.vue";

export default {
  name: 'QrcodeLink',
  components: {
    QrCode
  },
  data() {
    return {
      serverIP: [],
      port: process.env.VUE_APP_EXPRESS_PORT,
      selectedIP: 0,
    }
  },
  created() {
    this.getServerIP();
    this.startWebsocketServer();
  },
  beforeUnmount() {
    this.closeWebsocketServer();
  },
  computed: {
    getQRCodeValue() {
      return `http://${this.serverIP[this.selectedIP]}:${this.port}`
    }
  },
  methods: {
    getServerIP() {
      window.ipcRenderer.invoke("get-server-ip").then((data) => {
        let ipList = []
        // 将IP地址排序，首选192.168开头的ip
        data.forEach(ip => {
          if (ip.includes("192.168")) {
            ipList.unshift(ip)
          } else {
            ipList.push(ip)
          }
        });
        this.serverIP = ipList
      })
    },
    startWebsocketServer() {
      window.ipcRenderer.send("start-server", "websocket")
    },
    closeWebsocketServer() {
      window.ipcRenderer.send("close-server", "websocket")
    }
  }

}
</script>

<style scoped>
</style>
