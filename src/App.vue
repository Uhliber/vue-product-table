<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import ButtonElement from './components/ButtonElement.vue';
import FormInput from './components/FormInput.vue';
import TableBox from './components/TableBox.vue';
import ProductList from './components/ProductList.vue';
import ProductListItem from './components/ProductListItem.vue';
import DropdownElement from './components/DropdownElement.vue';
import IconChevronDown from './components/IconChevronDown.vue';

import productsData from './assets/mock-data/products.json';

const products = ref(null);
const activeSort = ref('Default');
const activePageSize = ref(10);
const currentPage = ref(1); // Just show only first page for this demo

const searchInput = ref('');
const searchValue = ref('');

onMounted(() => {
  products.value = productsData;
});

watch(searchInput, (val) => {
  if (!val) {
    handleSearch();
  }
})

const filteredProducts = computed(() => {
  if (!products.value) {
    return [];
  }

  let filteredProducts = [...products.value];
  
  // Filter by search
  if (searchValue.value) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchValue.value.toLowerCase())
    );
  } else {
    filteredProducts = [...products.value];
  }

  // Sort
  if (activeSort.value === 'A-Z') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (activeSort.value === 'Z-A') {
    filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
  } else if (activeSort.value === 'Date') {
    filteredProducts.sort((a, b) => {
      if (!a.date && !b.date) return 0; // Both dates are null, maintain order
      if (!a.date) return 1; // Sort null dates below
      if (!b.date) return -1; // Sort null dates below
      return a.date - b.date; // Compare dates normally
    });
  }

  // Paginate
  const pageSize = activePageSize.value;
  const pageCount = Math.ceil(filteredProducts.length / pageSize);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    const start = i * pageSize;
    const end = start + pageSize;
    pages.push(filteredProducts.slice(start, end));
  }

  return pages;
});

function handleSortChange(value) {
  activeSort.value = value;
}

function handlePageSizeChange(value) {
  activePageSize.value = value;
}

function handleSearch() {
  searchValue.value = searchInput.value;
}
</script>

<template>
  <header>
    <h1 class="text-xl font-serif">
      Products
    </h1>
  </header>

  <main>
    <TableBox class="mt-4">
      <template #header>
        <div class="grid max-w-[300px] ml-0 xs:ml-auto">
          <div class="grid xxs:flex gap-2">
            <FormInput v-model="searchInput" type="text" placeholder="Find a Product" class="flex-grow"/>
            <ButtonElement @click="handleSearch">
              Search
            </ButtonElement>
          </div>
          <div class="grid xxs:flex gap-2 mt-2">
            <FormInput type="text" placeholder="Product Name" class="flex-grow"/>
            <ButtonElement variant="secondary">
              Add Product
            </ButtonElement>
          </div>
        </div>
      </template>

      <template #default>
        <ProductList :products="filteredProducts[0]" class="mt-4 grid grid-cols-1 gap-x-4 md:grid-cols-2">
          <template #default="{ product }">
            <ProductListItem :product="product" />
          </template>
        </ProductList>
      </template>

      <template #footer>
        <div class="flex justify-between mt-2 px-4 text-xs">
          <div>
            Page <strong>{{ currentPage }}</strong> of <strong>{{ filteredProducts.length }}</strong>
          </div>
          <div>
            <DropdownElement :default="activeSort" @select-item="handleSortChange">
              <template #default="{ toggle, currentActiveSort, isOpen }">
                <span @click="toggle" class="flex gap-1 items-center">
                  Sort by <strong>{{ currentActiveSort }} </strong>
                  <IconChevronDown class="ml-2 w-4 h-4 transition-transform" :class="{ 'rotate-180': isOpen }" />
                </span>
              </template>
              <template #list="{ setCurrentActiveSort }">
                <div>
                  <ul class="grid gap-1">
                    <li @click="setCurrentActiveSort('Default')">Default</li>
                    <li @click="setCurrentActiveSort('A-Z')">A-Z</li>
                    <li @click="setCurrentActiveSort('Date')">Date</li>
                  </ul>
                </div>
              </template>
              </DropdownElement>
          </div>
          <div>
            <DropdownElement :default="activePageSize" @select-item="handlePageSizeChange">
              <template #default="{ toggle, currentActiveSort, isOpen }">
                <span @click="toggle" class="flex gap-1 items-center">
                  <strong>{{ currentActiveSort }}</strong>
                  <IconChevronDown class="ml-2 w-4 h-4 transition-transform" :class="{ 'rotate-180': isOpen }" />
                </span>
              </template>
              <template #list="{ setCurrentActiveSort }">
                <div>
                  <ul class="grid gap-1">
                    <li @click="setCurrentActiveSort(10)">10</li>
                    <li @click="setCurrentActiveSort(15)">15</li>
                    <li @click="setCurrentActiveSort(50)">50</li>
                    <li @click="setCurrentActiveSort(100)">100</li>
                  </ul>
                </div>
              </template>
              </DropdownElement>
          </div>
        </div>
      </template>
    </TableBox>
  </main>
</template>
