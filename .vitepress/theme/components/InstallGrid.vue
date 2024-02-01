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
        target: '_self',
        link: 'https://discord.gg/aFe57AKZUF',
        icon: 'i-logos-chrome',
    },
    {
        id: 'edge',
        name: 'Edge',
        target: '_blank',
        link: 'https://drive.google.com/drive/folders/1ade5zOu14oMIJlwaJd0qf-S_xdH9pkSa?usp=sharing',
        icon: 'i-logos-edge',
    },
    {
        id: 'firefox',
        name: 'Firefox',
        target: '_blank',
        link: 'https://drive.google.com/drive/folders/1ade5zOu14oMIJlwaJd0qf-S_xdH9pkSa?usp=sharing',
        icon: 'i-logos-firefox',
    },
]
</script>