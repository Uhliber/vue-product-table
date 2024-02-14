<template>
    <div>
        <div v-for="(product, index) in products" :key="index" class="h-full">
            <slot :product="product"></slot>
        </div>
    </div>
</template>

<script setup>
defineProps({
    products: {
        type: Array,
        default: () => [],
    }
})
</script>

<style lang="scss" scoped>

</style>