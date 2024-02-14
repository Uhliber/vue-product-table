<template>
    <div class="h-full border-b border-slate-200/50">
        <div class="flex items-center py-3 gap-2">
            <div class="w-6 h-6 rounded-sm overflow-hidden flex-shrink-0">
                <img v-if="product.image" :src="product.image" class="w-full h-full object-contain"/>
                <div v-else class="w-full h-full bg-neutral-300"></div>
            </div>
            <div class="rounded-full bg-status-green w-2.5 h-2.5 flex-shrink-0"></div>
            <p class="flex-grow">
                {{ product.name }}
            </p>
            <p v-if="product.date">
                {{ unixToDate(product.date) }}
            </p>
            <iconChevronDown class="ml-3 w-4 h-4 transition-transform" :class="{ 'rotate-180': showConfig }" @click="handleToggleConfig" />
        </div>
        <transition name="collapse">
            <div v-if="showConfig" class="overflow-hidden max-h-screen mb-3">
                <div class="grid justify-center gap-4 xxs:flex xxs:justify-normal xxs:gap-8">
                    <div class="w-44 h-44 rounded-md overflow-hidden flex-shrink-0">
                        <img v-if="product.image" :src="product.image" class="w-full h-full object-contain"/>
                        <div v-else class="w-full h-full grid justify-center items-center bg-neutral-50 border border-slate-200 border-dashed rounded-md">
                            <span class="text-sm text-slate-400">
                                Upload Photo
                            </span>
                        </div>
                    </div>
                    <div class="flex items-center content-center justify-center gap-4 xxs:grid">
                        <ButtonElement sizes="sm">
                            Replace
                        </ButtonElement>
                        <ButtonElement variant="transparent">
                            Clear
                        </ButtonElement>
                    </div>
                </div>
                <div class="grid mt-4">
                    <FormLabel for="image-title">Image Title</FormLabel>
                    <FormInput type="text" placeholder="Image Title" id="image-title" class="mt-1"/>
                </div>
                <div class="grid mt-2">
                    <FormLabel for="alt-text">Alt Text</FormLabel>
                    <FormInput type="text" placeholder="Alt Text" id="alt-text" class="mt-1"/>
                </div>
                <div class="grid mt-2">
                    <FormLabel for="img-link">Link</FormLabel>
                    <FormInput type="text" placeholder="Link" id="img-link" class="mt-1"/>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import IconChevronDown from './IconChevronDown.vue';
import FormLabel from './FormLabel.vue';
import FormInput from './FormInput.vue';
import ButtonElement from './ButtonElement.vue';

defineProps({
    product: {
        type: Object,
        required: true,
    }
})

const showConfig = ref(false);

function unixToDate(unix) {
    if (unix) {
        const date = new Date(unix * 1000);
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear() % 100}`;
        return formattedDate;
    }
    return '';
}

function handleToggleConfig() {
    showConfig.value = !showConfig.value;
}
</script>

<style>
.collapse-enter-active,
.collapse-leave-active {
  transition: max-height 0.5s ease-out;
}

.collapse-enter-from,
.collapse-leave-to {
    max-height: 0;
    overflow: hidden;
}
</style>