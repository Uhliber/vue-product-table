<template>
    <div>
        <div class="bg-white rounded-md border border-slate-300 shadow-sm p-4">
            <slot name="header">
    
            </slot>
            <slot></slot>
        </div>
        <slot name="footer"></slot>
    </div>
</template>
