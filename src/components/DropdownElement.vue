<template>
    <div class="relative">
        <div class="select-none cursor-pointer transition-all py-2 px-3 -mt-2 bg-transparent" :class="{'bg-white shadow-sm rounded-md': showDropdown}">
            <slot :toggle="toggleDropdown" :currentActiveSort="currentActiveSort" :isOpen="showDropdown"></slot>
            <div v-if="showDropdown" class="border-t border-slate-200 my-1 pt-2">
                <slot name="list" :setCurrentActiveSort="setCurrentActiveSort">
    
                </slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    default: {
        type: [String, Number],
        default: null,
    }
})

const emits = defineEmits(['select-item']);

const showDropdown = ref(false);
const currentActiveSort = ref(props.default);

function toggleDropdown() {
    showDropdown.value = !showDropdown.value;
}

function setCurrentActiveSort(value) {
    currentActiveSort.value = value;
    showDropdown.value = false;
    emits('select-item', value);
}
</script>
