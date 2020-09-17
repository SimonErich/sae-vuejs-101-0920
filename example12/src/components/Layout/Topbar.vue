<template>
  <div>
    <nav id="header" class="w-full z-30 top-0 py-1 fixed bg-white z-50">
      <div
        class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3 relative"
      >
        <!-- MOBILE BURGER BUTTON -->
        <label for="menu-toggle" class="cursor-pointer md:hidden block">
          <svg
            class="fill-current text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </label>
        <input class="hidden" type="checkbox" id="menu-toggle" />

        <!-- NAVIGATION -->
        <div class="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1" id="menu">
          <nav>
            <ul class="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
              <li>
                <!-- NOTIZ: hier verwenden wir router link, um links zu den Unterseiten zu haben -->
                <router-link
                  to="/"
                  class="inline-block no-underline hover:text-black hover:underline py-2 px-4"
                >Produkte</router-link>
              </li>
              <li>
                <!-- NOTIZ: hier verwenden wir router link, um links zu den Unterseiten zu haben -->
                <router-link
                  to="/order"
                  class="inline-block no-underline hover:text-black hover:underline py-2 px-4"
                >Bestellung</router-link>
              </li>
            </ul>
          </nav>
        </div>

        <!-- LOGO -->
        <div class="order-1 md:order-2">
          <router-link
            to="/"
            class="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl"
          >
            <svg
              class="fill-current text-gray-800 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M5,22h14c1.103,0,2-0.897,2-2V9c0-0.553-0.447-1-1-1h-3V7c0-2.757-2.243-5-5-5S7,4.243,7,7v1H4C3.447,8,3,8.447,3,9v11 C3,21.103,3.897,22,5,22z M9,7c0-1.654,1.346-3,3-3s3,1.346,3,3v1H9V7z M5,10h2v2h2v-2h6v2h2v-2h2l0.002,10H5V10z"
              />
            </svg>
            NORDICS
          </router-link>
        </div>

        <!-- CART ICON -->
        <div class="order-2 md:order-3 flex items-center relative" id="nav-content">
          <!-- NOTIZ: beachte das v-on:click. Wir verwenden hier wieder unseren !{{VARIABLE}} Trick, um zu sagen, dass bei einem Klick die SIchtbarkeit des Layers dem Gegenteil des aktuellen Boolean Wert entsprechen soll -->
          <button
            class="pl-3 inline-block no-underline hover:text-black relative"
            style="outline:none;"
            v-on:click="cartLayerIsToggled = !cartLayerIsToggled"
          >
            <svg
              class="fill-current hover:text-black"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z"
              />
              <circle cx="10.5" cy="18.5" r="1.5" />
              <circle cx="17.5" cy="18.5" r="1.5" />
            </svg>

            <!-- NOTIZ: wir verwenden hier eine computed method, die uns die Anzahl der gebookmarkten Produkte gibt. Wir wollen diese "badge" nur anzeigen, wenn wir mehr als 1 Produkt haben -->
            <span
              class="inline-block -mt-2 absolute w-5 h-5 rounded-lg bg-red-500 text-white text-xs"
              v-if="cartCount > 0"
            >{{cartCount}}</span>
          </button>

          <!-- ORDER CART OVERLAY -->
          <!-- NOTIZ: sieh hier verwenden wir cartLayerIsToggled als netten Trick, um dieses Extra Menü bei Klick auf den Button oben ein und auszublenden -->
          <div
            class="absolute bg-white p-10 pb-5 rounded-md right-0 shadow-lg text-left"
            style="top:100%; margin-top:25px; margin-right:-20px;"
            v-if="cartLayerIsToggled"
          >
            <p>HIER SOLLTE EINE LISTE DER GEBOOKMARKTEN PRODUKTE STEHEN</p>

            <div class="mt-10">
              <b>Summe:</b>
              € {{cartSum}}
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="h-15"></div>
  </div>
</template>


<script>
export default {
  name: "Topbar",
  props: {
    products: Array,
    bookmarkedProducts: Object,
  },
  data: () => ({
    cartLayerIsToggled: false,
  }),
  computed: {
    // NOTIZ: zählt alle im Kart befindlichen Produkte
    // Dazu verwandeln wir mit Object.keys das Objekt in ein Array und verwenden die für Array verfügbare "length" property
    cartCount: function () {
      // wenn keine bookmarkedProducts übergeben werden -> gib immer 0 zurück
      if (!this.bookmarkedProducts) {
        return 0;
      }

      return Object.keys(this.bookmarkedProducts).length;
    },
    // NOTIZ: Hier gehen wir durch die Produkte und fügen die Summe aller Produkte hinzu, welche gebookmarked wurden
    cartSum: function () {
      // wenn keine bookmarkedProducts übergeben werden -> gib immer 0 zurück
      if (!this.bookmarkedProducts) {
        return 0;
      }

      let sum = 0;
      for (const indx in this.products) {
        // erhalte das aktuelle produkt in dieser Iteration
        const product = this.products[indx];

        // wenn dieses Produkt gebookmarked wurde -> füge die summe hinzu
        if (this.bookmarkedProducts[product.id]) {
          sum += product.price;
        }
      }

      return sum;
    },
  },
};
</script>