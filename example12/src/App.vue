<template>
  <div id="app">
    <!-- NOTIZ: beachte hier die Tag-Kurzschreibweise -> ohne schließendes Tag, aber mit "/>" wie bei Bildern -->
    <topbar v-bind:products="products" v-bind:bookmarkedProducts="bookmarkedProducts" />

    <banner />

    <!-- 
      NOTIZ: beachte hier die Verwendung von "v-on:add-product-bookmark", mit dem wir ein Eigenes Custom Event an die Kinder Komponenten weitergeben 
      Hiermiet werden wir in unteren Komponeten Daten dieser Komponente bearbeiten.
      
      Mehr Infos: https://vuejs.org/v2/guide/components-custom-events.html  
    -->
    <transition name="fade">
      <router-view
        v-bind:products="products"
        v-bind:bookmarkedProducts="bookmarkedProducts"
        v-on:add-product-bookmark="addProductBookmark"
        v-on:remove-product-bookmark="removeProductBookmark"
      />
    </transition>
  </div>
</template>

<script>
import Banner from "@/components/Layout/Banner.vue";
import Topbar from "@/components/Layout/Topbar.vue";
// NOTIZ: hier importieren wir axios (für API requests)
import axios from "axios";

// NOTIZ: hier haben wir ein paar Hilfsfunktionen, die keinen Zugriff auf vue Variablen benötigen, ausgelagert, um die Komponente sauber zu halten
import {
  updateBookmarkedProducts,
  getCurrentBookmarks,
} from "@/app.helpers.js";

export default {
  name: "App",
  components: {
    Banner,
    Topbar,
  },
  data: () => ({
    products: [],
    bookmarkedProducts: {},
  }),
  methods: {
    // NOTIZ: Hier definieren wir eine Funktion, die in unserem internen vue Objekt Bookmarks hinzufügt und entfernt
    // wir brauchen dieses Objekt, da nur bei Änderungen an diesem Objekt vue reagiert.
    // bei Änderungen im localStorage wird vuejs nichts machen, da es auf diese Änderungen nicht "lauscht"
    addProductBookmark: function (productId) {
      const newBookmarkedProducts = updateBookmarkedProducts(productId, true);

      // NOTIZ: nun setzten wir zuletzt noch die bookmarkedProducts auf das neue Objekt, das wir soeben erstellt haben
      // warum müssen wir das tun?
      // Der Grund dafür ist, dass vue nur auf Änderungen an den "data" Variablen selbst hört, aber nicht was wir in localStorage schreiben.
      // Die create Methode kümmert sich zwar darum beim ersten Laden der Komponente diese Variable richtig zu setzen, aber bei einer Änderung danach müssen wir vue manuell mitteilen, dass sich etwas getan hat
      // Das machen wir nun hier
      this.bookmarkedProducts = newBookmarkedProducts;
    },
    removeProductBookmark: function (productId) {
      // selbiges, wie oben -> nur diesmal mit dem Wert "false"
      const newBookmarkedProducts = updateBookmarkedProducts(productId, false);
      this.bookmarkedProducts = newBookmarkedProducts;
    },
  },

  // NOTIZ: hier verwenden wir die created lifecycle methode, um zu überprüfen, ob das Produkt im localstorage als bookmarked gesetzt ist und übertragen den Status auf die interne Variable "isBookmarked"
  async created() {
    // ######
    // ###### LADEN VON DATEN VON API (JSON Endpunkt)
    // ######

    // Lade die Produkte von API, JSON, ...
    // wir verwenden hier die library axios, die uns die Abfrage erleichtert, aber hier könnten Daten aus jeder erdenklichen Quelle kommen. Auch einfach statisch hineingeschrieben:
    // mehr infos zu axios: https://github.com/axios/axios (wir haben es hier via "npm install axios" bevor wir es verwenden können)
    // https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html
    const dataEndpointUrl = "/products.json"; // in diesem Fall nehmen wir das File "products.json" im /public Folder. Dies kann aber auch ein Laravel JSON Endpunkt sein
    const response = await axios.get(dataEndpointUrl);

    // nun setzen wir die Variable products
    this.products = response.data;

    // ######
    // ###### LADEN VON LOKALEN DATEN (localStorage)
    // ######

    // hol die aktuellen bookmarks aus dem  localstorage
    const currentBookmarks = getCurrentBookmarks();

    // setz die lokale variable bookmarked products auf diesen Wert
    this.bookmarkedProducts = currentBookmarks;
  },
};
</script>






<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease-out, max-height 0.8s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}

.fade-enter-to,
.fade-leave {
  opacity: 1;
  max-height: 2000px;
  overflow: hidden;
}
</style>
