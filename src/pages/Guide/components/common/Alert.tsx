import type { AlertProps } from 'element-plus/es/components/alert'
import { defineComponent, type PropType } from 'vue'
import { ElAlert } from 'element-plus'

export default defineComponent({
    props: { type: String as PropType<AlertProps['type']> },
    setup: ({ type = 'info' }, ctx) => {
        return () => (
            <ElAlert
                type={type}
                closable={false}
                v-slots={ctx.slots}
                showIcon
            />
        )
    },
})
