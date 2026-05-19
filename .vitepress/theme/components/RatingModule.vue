<template>
    <div class="rating-module">
        <div class="rating-grid">
            <a v-for="rating in ratings" :key="rating.browser" :href="rating.link" :target="rating.target"
                :title="`Download Time Tracker for ${rating.browser}`" class="rating-item">
                <div :class="`${rating.icon} rating-icon`" />
                <div class="rating-info">
                    <div class="rating-stars">
                        <StarRating :rating="rating.rating" size="small" />
                    </div>
                    <div class="rating-value">
                        <span class="rating-number">{{ rating.rating.toFixed(2) }}</span>
                        <span class="rating-count">({{ formatCount(rating.count) }})</span>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { STORE_RATINGS } from '../../shared/ratings'
import StarRating from './StarRating.vue'

interface Rating {
    browser: string
    icon: string
    rating: number
    count: number
    link: string
    target?: string
}

const props = withDefaults(defineProps<{
    ratings?: Rating[]
    title?: string
}>(), {
    ratings: () => Object.entries(STORE_RATINGS).map(([browser, rating]) => ({
        browser,
        ...rating,
        icon: `i-logos-${browser}`,
        target: '_blank',
    })),
    title: 'Browser Ratings',
})

const formatCount = (count: number): string => {
    if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
}

const structuredData = computed(() => {
    const totalCount = props.ratings.reduce((sum, item) => sum + item.count, 0)
    const weightedRating = totalCount === 0
        ? 0
        : props.ratings.reduce((sum, item) => sum + item.rating * item.count, 0) / totalCount

    return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Time Tracker for Browser',
        applicationCategory: 'BrowserApplication',
        operatingSystem: 'Chrome, Firefox, Edge',
        isAccessibleForFree: true,
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: weightedRating.toFixed(2),
            bestRating: '5',
            worstRating: '1',
            ratingCount: totalCount.toString(),
            reviewCount: totalCount.toString(),
        },
        sameAs: props.ratings.map(item => item.link),
    })
})

onMounted(() => {
    const scriptId = 'tt-jsonld-software'
    if (document.getElementById(scriptId)) {
        return
    }
    const script = document.createElement('script')
    script.id = scriptId
    script.type = 'application/ld+json'
    script.textContent = structuredData.value
    document.head.appendChild(script)
})

</script>

<style scoped>
.rating-module {
    margin: 3rem 0 0.5rem 0;
    padding: 0;
    display: flex;
    justify-content: center;
}

.rating-grid {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: center;
}

.rating-item {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.25rem 0.5rem;
    background: transparent;
    border-radius: 6px;
    border: none;
    text-decoration: none;
    color: inherit;
    transition: all 0.2s;
}

.rating-item:hover {
    background: var(--vp-c-bg-soft);
}

.rating-icon {
    width: 1rem;
    height: 1rem;
    background-size: 100% 100%;
    opacity: 1;
    flex-shrink: 0;
}

.rating-info {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    line-height: 1.2;
}

.rating-stars {
    display: inline-flex;
    align-items: center;
}

.stars-display {
    display: inline-flex;
    gap: 0.08rem;
    line-height: 1;
    align-items: center;
}

.star {
    font-size: 0.7rem;
    color: var(--vp-c-text-2);
    line-height: 1;
    display: inline-block;
}

.star.filled {
    color: #ffa500;
    opacity: 1;
}

.rating-value {
    display: inline-flex;
    align-items: baseline;
    gap: 0.15rem;
    line-height: 1;
}

.rating-number {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--vp-c-text-1);
}

.rating-count {
    font-size: 0.65rem;
    color: var(--vp-c-text-2);
    font-weight: 400;
}

@media (max-width: 640px) {
    .rating-grid {
        gap: 0.5rem;
    }

    .rating-item {
        padding: 0.2rem 0.4rem;
    }

    .rating-icon {
        width: 0.9rem;
        height: 0.9rem;
    }

    .star {
        font-size: 0.65rem;
    }

    .rating-number {
        font-size: 0.7rem;
    }
}
</style>
