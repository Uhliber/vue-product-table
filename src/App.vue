<script setup>
import { onMounted, ref } from 'vue';
import ButtonElement from './components/ButtonElement.vue';
import FormInput from './components/FormInput.vue';
import TableBox from './components/TableBox.vue';
import productsData from './assets/mock-data/products.json';
import ProductList from './components/ProductList.vue';
import ProductListItem from './components/ProductListItem.vue';

const products = ref(null);

onMounted(() => {
  products.value = productsData;
});
</script>

<template>
  <header>
    <h1 class="text-xl font-serif">
      Products
    </h1>
  </header>

  <main>
    <TableBox class="mt-4" :products="products">
      <template #header>
        <div class="grid max-w-[300px] ml-0 xs:ml-auto">
          <div class="grid xxs:flex gap-2">
            <FormInput type="text" placeholder="Find a Product" class="flex-grow"/>
            <ButtonElement>
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
        <ProductList :products="products" class="mt-4 grid grid-cols-1 gap-x-4 md:grid-cols-2">
          <template #default="{ product }">
            <ProductListItem :product="product" />
          </template>
        </ProductList>
      </template>

      <template #footer>
        Pagination
      </template>
    </TableBox>
  </main>
</template>
