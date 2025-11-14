<template>
    <div class="testimonials-section">
        <div class="testimonials-grid" ref="gridRef">
            <article v-for="(testimonial, index) in testimonials" :key="index" class="testimonial-card"
                :itemscope="true" :itemtype="'https://schema.org/Review'">
                <div class="testimonial-header">
                    <div class="testimonial-left">
                        <div class="testimonial-source">
                            <span class="source-icon" :class="getSourceIcon(testimonial.source)"></span>
                        </div>
                        <div class="testimonial-rating" :itemprop="'reviewRating'" :itemscope="true"
                            :itemtype="'https://schema.org/Rating'">
                            <meta :itemprop="'ratingValue'" :content="testimonial.rating.toString()" />
                            <meta :itemprop="'bestRating'" content="5" />
                            <StarRating :rating="testimonial.rating" />
                        </div>
                    </div>
                    <div class="testimonial-author" :itemprop="'author'" :itemscope="true"
                        :itemtype="'https://schema.org/Person'">
                        <span class="author-name" :itemprop="'name'">{{ testimonial.name }}</span>
                    </div>
                </div>
                <p class="testimonial-content" :itemprop="'reviewBody'">
                    {{ testimonial.content }}
                </p>
            </article>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import StarRating from './StarRating.vue'

interface Testimonial {
    rating: number
    name: string
    source: 'Chrome' | 'Firefox' | 'Edge'
    content: string
}

const testimonials: Testimonial[] = [
    {
        rating: 5,
        name: "GemedetAdept",
        source: 'Firefox',
        content: 'Simple and effective with nice bonus analytic features. I\'m using it to track my behavior, and it\'s perfectly unobtrusive when not pinned to the toolbar.Thank you!'
    },
    {
        rating: 5,
        name: 'Alfonso Ayala (Fonso)',
        source: 'Chrome',
        content: 'Its a really complete app with the ability to visualize the data and every metric any way you want it and stylish too. Works smoothly, not intrusive, very thorough a and all basically for free. Its pretty solid.'
    },
    {
        rating: 5,
        name: 'quantimnot',
        source: 'Firefox',
        content: 'A very useful tool to help me track my browser time. Bonus that the developer is responsive and friendly on GitHub. 谢谢'
    },
    {
        rating: 5,
        name: 'Frederico',
        source: 'Edge',
        content: 'Excelente, os desenvolvedores estão de parabéns, nota 10.',
    },
    {
        rating: 5,
        name: 'Système International',
        source: 'Chrome',
        content: 'Very good and customizable. I accidentally limited a website and set it impossible to change. I guess that\'s a good thing, lol.'
    },
    {
        rating: 5,
        name: 'Gustavo Renó Corrêa',
        source: 'Chrome',
        content: 'great extension, works flawlessly and is straight to the point'
    },
    {
        rating: 5,
        name: '小文',
        source: 'Edge',
        content: '特别好用的！！感恩，完美解决我的需求'
    },
    {
        rating: 5,
        name: 'Александр Тюкаев (altyukaev)',
        source: 'Chrome',
        content: `ПРекрасно. Почти идеально.Хорошая статистика. Близко к реальности считает.Из минусов не всегда срабатывают ограничения на сайт по длительности.Но приложение отличное. Рекомендую.`
    },
    {
        rating: 5,
        name: 'Luke',
        source: 'Firefox',
        content: 'my favorite extension. i love having insights like this',
    },
    {
        rating: 5,
        name: 'Lisa Song',
        source: 'Chrome',
        content: 'Very good. I like how detailed it is and the variety of features it has. Love the time limits, they\'re much better than any other site blocking extension. Underrated extension.'
    },
    {
        rating: 4,
        name: 'Alex Burns',
        source: 'Chrome',
        content: 'This app is great for tracking data in a clear and easily comprehensible way. It would be great if there was an option to create a weekly time limit. Let me know if this ever becomes available.'
    },
    {
        rating: 5,
        name: "Xu",
        source: "Edge",
        content: "挺不错的没想到功能和统计维度这么全面，比之前用的国外产品好不少"
    }
]

const getSourceIcon = (source: string) => {
    const iconMap: Record<string, string> = {
        'Chrome': 'i-logos-chrome',
        'Firefox': 'i-logos-firefox',
        'Edge': 'i-logos-edge',
    }
    return iconMap[source] || ''
}

const gridRef = ref<HTMLElement>()

const layoutMasonry = () => {
    if (!gridRef.value) return

    const cards = gridRef.value.querySelectorAll('.testimonial-card') as NodeListOf<HTMLElement>
    if (cards.length === 0) return

    cards.forEach((card) => {
        card.style.position = 'static'
        card.style.top = ''
        card.style.left = ''
        card.style.width = ''
    })

    requestAnimationFrame(() => {
        if (!gridRef.value) return

        const containerWidth = gridRef.value.offsetWidth
        const gap = 12 // 0.75rem = 12px
        const cardMinWidth = 350
        const columnCount = Math.max(1, Math.floor((containerWidth + gap) / (cardMinWidth + gap)))
        const columnWidth = (containerWidth - (columnCount - 1) * gap) / columnCount

        const columnHeights = new Array(columnCount).fill(0)

        cards.forEach((card) => {
            const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))

            card.style.position = 'absolute'
            card.style.top = `${columnHeights[shortestColumnIndex]}px`
            card.style.left = `${shortestColumnIndex * (columnWidth + gap)}px`
            card.style.width = `${columnWidth}px`

            const cardHeight = card.offsetHeight
            columnHeights[shortestColumnIndex] += cardHeight + gap
        })

        const maxHeight = Math.max(...columnHeights)
        gridRef.value!.style.height = `${maxHeight}px`
    })
}

onMounted(() => {
    nextTick(() => {
        setTimeout(() => {
            layoutMasonry()
        }, 100)

        let resizeTimer: ReturnType<typeof setTimeout>
        const handleResize = () => {
            clearTimeout(resizeTimer)
            resizeTimer = setTimeout(() => {
                layoutMasonry()
            }, 150)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            clearTimeout(resizeTimer)
        }
    })
})
</script>

<style scoped>
.testimonials-section {
    margin: 0 0 3rem 0;
    padding: 3rem 0 0 0;
    border-top: 1px solid var(--vp-c-divider);
    background: transparent;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
}

.testimonials-grid {
    position: relative;
    width: 100%;
}

.testimonial-card {
    padding: 1.5rem;
    background: var(--vp-c-bg);
    border-radius: 12px;
    border: 1px solid var(--vp-c-divider);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    margin-bottom: 0.75rem;
}

.testimonial-card:hover {
    border-color: var(--vp-c-brand);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    background: var(--vp-c-bg);
}

.testimonial-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    gap: 1rem;
}

.testimonial-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 1;
    min-width: 100px;
}

.testimonial-source {
    display: flex;
    align-items: center;
}

.source-icon {
    width: 1.2rem;
    height: 1.2rem;
    background-size: 100% 100%;
    opacity: 1;
}

.testimonial-rating {
    flex-shrink: 0;
}

.testimonial-author {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.25rem;
    flex: 2;
    min-width: 150px;
}

.author-name {
    font-weight: 700;
    color: var(--vp-c-text-1);
    font-size: 1rem;
    width: 100%;
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.testimonial-content {
    flex: 1;
    font-size: 1rem;
    line-height: 1.7;
    color: var(--vp-c-text-1);
    margin: 0;
    font-style: normal;
    font-weight: 400;
}

@media (max-width: 960px) {
    .testimonial-card {
        margin-bottom: 0.625rem;
    }
}

@media (max-width: 640px) {
    .testimonial-card {
        margin-bottom: 0.5rem;
        padding: 1.25rem;
    }
}
</style>
