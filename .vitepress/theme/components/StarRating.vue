<template>
    <div class="star-rating" :class="`size-${size}`">
        <span v-for="i in 5" :key="i" class="star" :class="getStarClass(i)" :style="getStarStyle(i)">
            <span class="star-bg">★</span>
            <span class="star-fg">★</span>
        </span>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    rating: number
    size?: 'small' | 'medium' | 'large'
}>(), {
    rating: 0,
    size: 'medium',
})

const getStarClass = (index: number) => {
    const fullStars = Math.floor(props.rating)
    const remainder = props.rating - fullStars

    if (index <= fullStars) {
        return 'filled'
    } else if (index === fullStars + 1 && remainder > 0) {
        return 'partial'
    }
    return ''
}

const getStarStyle = (index: number) => {
    const fullStars = Math.floor(props.rating)
    if (index === fullStars + 1) {
        const remainder = props.rating - fullStars
        return {
            '--partial-width': `${remainder * 100}%`
        }
    }
    return {}
}
</script>

<style scoped>
.star-rating {
    display: inline-flex;
    gap: 0.1rem;
    align-items: center;
    line-height: 1;
}

.star {
    position: relative;
    display: inline-block;
    line-height: 1;
}

.star-bg,
.star-fg {
    display: inline-block;
    line-height: 1;
}

.star-bg {
    color: var(--vp-c-text-2);
}

.star-fg {
    position: absolute;
    left: 0;
    top: 0;
    color: #ffa500;
    opacity: 0;
    overflow: hidden;
    width: 0;
}

.star.filled .star-fg {
    opacity: 1;
    width: 100%;
}

.star.partial .star-fg {
    opacity: 1;
    width: var(--partial-width, 0%);
}

.size-small .star {
    font-size: 0.7rem;
}

.size-medium .star {
    font-size: 1.1rem;
}

.size-large .star {
    font-size: 1.5rem;
}
</style>
