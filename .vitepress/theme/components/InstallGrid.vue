<template>
    <LinkGrid :items="installChannels" />
</template>
<script setup>
import { useUrlSearchParams } from '@vueuse/core'
import { onMounted } from 'vue'

const installChannels = [
    {
        id: 'chrome',
        name: 'Chrome',
        target: '_blank',
        link: 'https://chrome.google.com/webstore/detail/%E7%BD%91%E8%B4%B9%E5%BE%88%E8%B4%B5-%E4%B8%8A%E7%BD%91%E6%97%B6%E9%97%B4%E7%BB%9F%E8%AE%A1/dkdhhcbjijekmneelocdllcldcpmekmm',
        icon: 'i-logos-chrome',
    },
    {
        id: 'edge',
        name: 'Edge',
        target: '_blank',
        link: 'https://microsoftedge.microsoft.com/addons/detail/timer-the-web-time-is-e/fepjgblalcnepokjblgbgmapmlkgfahc',
        icon: 'i-logos-edge',
    },
    {
        id: 'firefox',
        name: 'Firefox',
        target: '_blank',
        link: 'https://addons.mozilla.org/firefox/addon/besttimetracker',
        icon: 'i-logos-firefox',
    },
]
</script>