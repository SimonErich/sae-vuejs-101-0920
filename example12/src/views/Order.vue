<template>
  <section class="bg-white py-8">
    <nav id="store" class="w-full z-30 top-0 px-6 py-1">
      <div
        class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3"
      >
        <span
          class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl"
        >Bestellungen ({{countResult}})</span>
      </div>
    </nav>

    <!-- NOTIZ: hier verwenden wir for und v-bind um durch alle Produkte durchzuloopen und das Produkt an die ProductItemTile Komponente zu übergeben -->
    <!-- weiters verwenden wir hier v-bind:key, da es sich um eine dynamische komponente in einem v-for handelt -->

    <!-- NOTIZ: beachte hier auch die Verwendung von "v-on="$listeners" mit dem wir alle custom events ($emits) an die Kind Komponenten runterreichen -->
    <div v-if="countResult > 0">
      <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">
        <product-item-tile
          v-for="product in products"
          v-bind:product="product"
          v-bind:key="product.id"
          v-bind:isBookmarked="bookmarkedProducts[product.id] && bookmarkedProducts[product.id] == true"
          v-on="$listeners"
          v-bind:isHidden="isBookmarked(product) == false"
        />
      </div>
    </div>
    <div
      v-else
      class="text-center pt-20 text-lg text-gray-700 w-full"
    >Es wurden noch keine Produkte gebookmarked!</div>
  </section>
</template>


<script>
import ProductItemTile from "@/components/Products/ProductItemTile.vue";

export default {
  name: "Order",
  components: {
    ProductItemTile,
  },
  props: {
    products: Array,
    bookmarkedProducts: Object,
  },
  computed: {
    countResult: function () {
      // wenn keine bookmarkedProducts übergeben werden -> gib immer 0 zurück
      if (!this.bookmarkedProducts) {
        return 0;
      }

      return Object.keys(this.bookmarkedProducts).length;
    },
  },
  methods: {
    // NOTIZ: diese Computed method wird bei jedem Item im Loop oben als "if"-Bedingung angewendet und gibt true (passt nicht zum Suchbegriff) oder false (passt und soll angezeigt werden) zurück
    isBookmarked: function (product) {
      // falls nichts gebookmarked wurde -> gib immer false zurück
      if (!this.bookmarkedProducts) {
        return false;
      }

      // Wenn dieses Produkt gebookmarked ist
      if (this.bookmarkedProducts[product.id]) {
        return true;
      }

      // Wenn keines der anderen Resultate gepasst hat, gib immer false zurück
      return false;
    },
  },
};
</script>

