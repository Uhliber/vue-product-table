<template>
    <div>
        <div class="bg-white rounded-md border border-slate-300 shadow-sm p-4">
            <slot name="header">
    
            </slot>
            <slot :product="products"></slot>
        </div>
        <slot name="footer"></slot>
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