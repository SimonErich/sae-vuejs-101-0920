<template>
  <nav id="store" class="w-full z-30 top-0 px-6 py-1">
    <div
      class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3"
    >
      <span class="uppercase tracking-wide no-underline font-bold text-gray-800 text-xl">Store</span>

      <div class="flex items-center" id="store-nav-content">
        <!-- NOTIZ: hier verwenden wir keyup, anstatt v-model, da wir nicht eine Variable in dieser Komponente ändern möchten, sondern das "change-searchterm" event von der parent component triggern möchten -->
        <input
          class="border-gray-500 border-2 rounded-lg p-1 text-xs outline-0"
          style="outline:none"
          type="text"
          placeholder="Suchbegriff eingeben"
          v-bind:value="searchterm"
          v-on:keyup="$emit('change-searchterm', $event.target.value)"
        />
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "ProductListingHead",
  props: {
    searchterm: String,
  },
};
</script>