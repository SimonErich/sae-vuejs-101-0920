<template>
  <div class="pl-20 pr-20">
    <section class="bg-white py-8" v-if="currentProduct">
      <div class="container flex text-left">
        <div class="flex-2 p-20">
          <img v-bind:src="currentProduct.image" v-bind:title="currentProduct.title" />
        </div>
        <div class="flex-4 p-20">
          <h1 class="text-4xl text-black">{{currentProduct.title}}</h1>

          <!-- NOTIZ: Beachte die v-html Direktive hier, mit Hilfe derer man HTML Code aus einer Variable ausgeben kann. Würde man diese hier nicht verwenden, würde vue die <p> im Text escapen -->
          <p v-html="currentProduct.description" class="p-5 bg-gray-100 mt-10" />

          <p class="pt-20 text-4xl text-red-400">€ {{currentProduct.price}}</p>
        </div>
      </div>
    </section>

    <div v-else>
      <h1 class="text-4xl text-black">Produkt nicht gefunden</h1>
      <p class="text-sm">Das gewünschte Produkt wurde nicht gefunden</p>
    </div>
  </div>
</template>


<script>
export default {
  name: "ProductDetail",
  components: {},
  data: () => ({
    currentProduct: "",
  }),
  props: {
    products: Array,
    bookmarkedProducts: Object,
  },
  // NOTIZ: verwende die lifecycle Methode created, um aus allen Produkten, die wir haben genau das mit der in der URL vergebenen id zu verwenden
  async mounted() {
    setTimeout(() => {
      // hack, um sicherzugehen, dass wir die products haben, wenn wir die Suche. Bei einer sauberen Abstraktion ist das nicht notwendig!
      const productIdInUrl = this.$route.params.productId;

      // loop through all products and find the one with this id
      for (const indx in this.products) {
        // if we found the correct product -> set the "currentProduct"
        if (this.products[indx].id == productIdInUrl) {
          this.currentProduct = this.products[indx];
        }
      }
    }, 200);
  },
};
</script>
