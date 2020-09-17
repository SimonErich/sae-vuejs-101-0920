<template>
  <!-- 
    NOTIZ: beachte die Transition hier, welche dazu führt, dass in Zusammenhang mit dem <style> unten eine Animation beim ein/ausblenden angezeigt wird 
    Mehr dazu: https://vuejs.org/v2/guide/transitions.html
  -->
  <transition name="slide">
    <div class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col" v-if="!isHidden">
      <!-- NOTIZ: beachte hier die dynamische Zusammensetzung der URL durch v-bind und dem "to" Parameter, weil ein Teil der URL ein statischer string ist (/produkt/) und der andere ist eine Variable -->
      <router-link v-bind:to="'/produkt/'+ product.id">
        <img class="hover:grow hover:shadow-lg" v-bind:src="product.image" />
      </router-link>
      <div class="pt-3 flex items-center justify-between">
        <p class>
          <router-link v-bind:to="'/produkt/'+ product.id">{{product.title}}</router-link>
        </p>

        <button type="button" style="outline:none!important" v-on:click="toggleBookmark()">
          <!-- 
            NOTIZ: Hier verwenden wir v-bind:class, um eine Css Klassen unter einer bestimmten Bedingung (in diesem Fall "isBookmarked") zu setzen.
              In diesem Fall wird v-bind:class ein Objekt übergeben, wobei der key die "Css Klasse" ist und der Value die Bedinung, die true oder false ist.
              Ist die Bedinung true, wird die Css Klasse verwendet, sonst nicht.
              Wir verwenden es hier, um das Herz im gebookmarkten Zustand rot erscheinen zu lassen!

              Mehr Infos: https://vuejs.org/v2/guide/class-and-style.html
          -->
          <svg
            class="h-6 w-6 fill-current text-gray-500 hover:text-black"
            v-bind:class="{ 'text-red-500': isBookmarked }"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z"
            />
          </svg>
        </button>
      </div>
      <p class="pt-1 text-gray-900">{{amountFormatted}}</p>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ProductItemTile",
  props: {
    product: Object,
    isBookmarked: Boolean,
    isHidden: Boolean,
  },
  computed: {
    // NOTIZ: hier verwenden wir eine computed Methode, um die Currency richtig zu stylen, bevor wie sie anzeigen
    amountFormatted: function () {
      return "€ " + this.product.price;
    },
  },

  methods: {
    // NOTIZ: hier implementieren wir die "Bookmark Toggle Funktion"
    toggleBookmark: function () {
      // wir erstellen nur einen Shortcut für die "id", da wir sie hier öfters brauchen werden
      const productId = this.product.id;

      // wir definieren den neuen Wert, den wir setzen möchten
      // falls es bereits enthalten und true ist, wollen wir das Produkt entfernen -> andernfalls hinzufügen
      // NOTIZ: hier verwenden wir vuejs event emitter für custom events (um Daten nach oben zu geben!)
      // Mehr dazu: https://vuejs.org/v2/guide/components-custom-events.html
      if (this.isBookmarked) {
        this.$emit("remove-product-bookmark", productId);
      } else {
        this.$emit("add-product-bookmark", productId);
      }
    },
  },
};
</script>


<!-- NOTIZ: die folgenden Klassen werden von transition automatisch hinzugefügt und können beliebig für die Animation verwendet werden -->
<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.8s ease-out, opacity 0.8s ease-out,
    max-width 1s ease-out;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
  max-width: 0;
  overflow: hidden;
}

.slide-enter-to,
.slide-leave {
  transform: translateX(0%);
  opacity: 1;
  max-width: 1000px;
  overflow: hidden;
}
</style>
