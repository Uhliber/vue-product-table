<template>
    <button class="rounded-[3px] text-xs" :class="[computedClass]">
        <slot></slot>
    </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    variant: {
        type: String,
        default: 'primary',
        validator: (v) => ['primary', 'secondary', 'transparent'].includes(v),
    },
    sizes: {
        type: String,
        default: 'base',
        validator: (v) => ['base', 'sm'].includes(v),
    }
});

const variantClasses = {
    primary: 'bg-theme-blue text-white',
    secondary: 'bg-theme-green text-white',
    transparent: 'bg-transparent',
}

const sizesClasses = {
    base: 'px-3 py-2',
    sm: 'px-3 py-1',
}

const computedClass = computed(() => {
    return `${variantClasses[props.variant]} ${sizesClasses[props.sizes]}`;
});
</script>