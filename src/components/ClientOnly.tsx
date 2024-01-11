import { defineComponent, onMounted, ref } from 'vue'

export const ClientOnly = defineComponent({
    setup(_, { slots }) {
        const mounted = ref(false)
        onMounted(() => (mounted.value = true))

        return () => {
            return mounted.value
                ? slots.default && slots.default({})
                : slots.placeholder && slots.placeholder({})
        }
    },
})
