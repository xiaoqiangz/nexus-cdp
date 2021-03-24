<template>
  <router-view />
</template>

<script>
import './preset-layout.less'
export default {
  name: 'PresetLayout'
  // data() {
  //   return {
  //     tabs: {
  //       items: [
  //         {
  //           key: '1',
  //           title: '高层概览'
  //         },
  //         {
  //           key: '2',
  //           title: '市场概览'
  //         },
  //         {
  //           key: '3',
  //           title: '营运概览'
  //         }
  //       ],
  //       active: () => {
  //         switch (this.$route.path) {
  //           case '/dashboard/preset/HighLevel':
  //             return '1'
  //           case '/dashboard/preset/PresetMarket':
  //             return '2'
  //           case '/dashboard/preset/PresetOperating':
  //             return '3'
  //           default:
  //             return '1'
  //         }
  //       },
  //       callback: key => {
  //         switch (key) {
  //           case '1':
  //             this.$router.push('/dashboard/preset/HighLevel')
  //             break
  //           case '2':
  //             this.$router.push('/dashboard/preset/PresetMarket')
  //             break
  //           case '3':
  //             this.$router.push('/dashboard/preset/PresetOperating')
  //             break
  //           default:
  //             this.$router.push('/dashboard/preset/HighLevel')
  //         }
  //       }
  //     }
  //   }
  // }
}
</script>

