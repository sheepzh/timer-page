import { t } from "@/i18n"
import { ElMenu, ElMenuItem, ElSubMenu } from "element-plus"
import { computed, defineComponent } from "vue"
import { useRouter } from "vue-router"

const computeActive = (routePath: string): string => {
    if (!routePath) return null
    if (routePath.startsWith("/")) routePath = routePath.substring(1)
    const [first, second] = routePath.split("/")
    if (first === "about") return `${first}/${second}`
    console.log(first, second)
    return first
}

const _default = defineComponent(() => {
    const router = useRouter()
    const currentRoute = router.currentRoute
    const active = computed(() => computeActive(currentRoute.value?.path))
    return () => (
        <ElMenu
            mode="horizontal"
            ellipsis={false}
            defaultActive={active.value}
            onSelect={idx => router.push(`/${idx}`)}
        >
            <ElMenuItem index="doc">
                {t(msg => msg.layout.header.doc)}
            </ElMenuItem>
            <ElMenuItem index="sponsor">
                Sponsor
            </ElMenuItem>
            <ElSubMenu
                index="about"
                v-slots={{
                    title: () => t(msg => msg.layout.header.about)
                }}
            >
                <ElMenuItem index="about/release">
                    Releases
                </ElMenuItem>
                <ElMenuItem index="about/author">
                    Author
                </ElMenuItem>
            </ElSubMenu>
        </ElMenu>
    )
})

export default _default