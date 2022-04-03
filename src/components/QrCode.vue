<template>
  <div class="">
    <QrcodeVue :value="value" :size="300" level="H"></QrcodeVue>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';
export default {
  name: 'QrCode',
  props:{
      value:{
          type:String,
          required:true
      }
  },
  components: {QrcodeVue},
}
</script>