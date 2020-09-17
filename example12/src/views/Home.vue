<template>
  <section class="bg-white py-8">
    <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">
      <product-listing-head
        v-on:change-searchterm="changeSearchterm"
        v-bind:searchterm="searchterm"
      />

      <!-- NOTIZ: hier verwenden wir for und v-bind um durch alle Produkte durchzuloopen und das Produkt an die ProductItemTile Komponente zu übergeben -->
      <!-- weiters verwenden wir hier v-bind:key, da es sich um eine dynamische komponente in einem v-for handelt -->

      <!-- NOTIZ: beachte hier auch die Verwendung von "v-on="$listeners" mit dem wir alle custom events ($emits) an die Kind Komponenten runterreichen -->
      <product-item-tile
        v-for="product in products"
        v-bind:product="product"
        v-bind:key="product.id"
        v-bind:isBookmarked="bookmarkedProducts[product.id] && bookmarkedProducts[product.id] == true"
        v-on="$listeners"
        v-bind:isHidden="isNotFilteredOut(product) == false"
      />
    </div>
  </section>
</template>

<script>
import ProductListingHead from "@/components/Products/ProductListingHead.vue";
import ProductItemTile from "@/components/Products/ProductItemTile.vue";

export default {
  name: "Home",
  components: {
    ProductListingHead,
    ProductItemTile,
  },
  data: () => ({
    searchterm: "",
  }),
  props: {
    products: Array,
    bookmarkedProducts: Object,
  },
  methods: {
    // NOTIZ: hier haben wir eine Funktion, die als custom Event dafür zuständig ist den searchterm von Kind Komponenten aus in den Daten hier zu setzen
    changeSearchterm: function (newSearchterm) {
      this.searchterm = newSearchterm;
    },
    // NOTIZ: diese Computed method wird bei jedem Item im Loop oben als "if"-Bedingung angewendet und gibt true (passt nicht zum Suchbegriff) oder false (passt und soll angezeigt werden) zurück
    isNotFilteredOut: function (product) {
      // falls kein suchbegriff definiert wurde (beachte das Rufezeichen vor "this.searchterm") -> sollen alle angezeigt werden, daher immer "true".
      if (!this.searchterm) {
        return true;
      }

      // da der nächste Befehl "indexOf" auf Groß- und Kleinschreibung achtet, verwandeln wir alles in Kleinbuchstaben, um bessere Treffer zu bekommen
      const searchTermLowerCase = this.searchterm.toLowerCase();
      const productTitleLowerCase = product.title.toLowerCase();

      // wenn der suchstring im Produkttitel gefunden wurde, soll es angezeigt werden (also "return false" hier - es soll nicht ausgefilt)
      // siehe dazu die Funktion "indexOf" mit der wir überprüfen können, an welcher Position ein String in einem anderen existiert
      // https://www.w3schools.com/jsref/jsref_indexof.asp
      if (productTitleLowerCase.indexOf(searchTermLowerCase) !== -1) {
        return true;
      }

      // Wenn keines der anderen Resultate gepasst hat, gib immer false zurück
      return false;
    },
  },
};
</script>

