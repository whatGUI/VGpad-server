<template>
  <h1>VGpad 服务端应用</h1>
  <h3>使用手机浏览器扫描二维码连接此服务器</h3>
  <QrCode :value="getQRCodeValue"></QrCode>
  <div>服务器地址：{{ serverIP[selectedIP] }}:{{ port }}</div>
  <span>或选择其他网络接口：</span>
  <select v-model="selectedIP">
    <option v-for="(i, index) in serverIP" :key="index" :value="index">{{ i }}</option>
  </select>
</template>

<script>
import QrCode from "./components/QrCode.vue";

export default {
  name: 'App',
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
  mounted() {
    this.getServerIP();
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
          if(ip.includes("192.168")){
            ipList.unshift(ip)
          }else{
            ipList.push(ip)
          }
        });
        this.serverIP = ipList
      })
    },
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
</style>
