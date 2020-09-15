const ChannelItem = Vue.component('channel-item', {
    props: ['channel'],
    template: `
        <div class="bg-teal-dark py-1 px-4 text-white"># {{channel.title}}</div>
    `
});
