<template>
    <div class="rounded-full w-2.5 h-2.5 flex-shrink-0" :class="computedClass"></div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    status: {
        type: String,
        default: 'green',
        validator: (v) => ['green', 'yellow', 'red'].includes(v),
    },
})

const statusClasses = {
    green: 'bg-status-green',
    yellow: 'bg-status-yellow',
    red: 'bg-status-red',
}

const computedClass = computed(() => statusClasses[props.status]);
</script>
