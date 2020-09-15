const ChatContent = Vue.component('chat-content', {
    props: ['messages', 'currentChannel'],
    template: `
        <div class="flex-1 flex flex-col bg-white overflow-hidden">
            <chat-topbar v-bind:channel="currentChannel"></chat-topbar>
        
            <div class="px-6 py-4 flex-1 overflow-y-scroll">
                <chat-message v-for="messageItem in messages" v-bind:message="messageItem" v-bind:key="messageItem.content"></chat-message>
            </div>
            
            <chat-composer></chat-composer>
        </div>
    `
});