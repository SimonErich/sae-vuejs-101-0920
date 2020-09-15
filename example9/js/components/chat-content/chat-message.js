const ChatMessage = Vue.component('chat-message', {
    props: ['message'],
    template: `
        <div class="flex items-start mb-4 text-sm">
            <img v-bind:src="message.avatar"
                class="w-10 h-10 rounded mr-3">
            <div class="flex-1 overflow-hidden">
                <div>
                    <span class="font-bold">{{message.author}}</span>
                    <span class="text-grey text-xs">{{message.time}}</span>
                </div>
                <p class="text-black leading-normal">{{message.content}}</p>
            </div>
        </div>
    `
});
