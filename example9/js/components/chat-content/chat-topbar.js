const ChatTopbar = Vue.component('chat-topbar', {
    props: ['channel'],
    template: `
        <div class="border-b flex px-6 py-2 items-center flex-none">
            <div class="flex flex-col">
                <h3 class="text-grey-darkest mb-1 font-extrabold">
                    {{channel.title}}
                </h3>
                <div class="text-grey-dark text-sm truncate">
                    {{channel.description}}
                </div>
            </div>
            <div class="ml-auto hidden md:block">
                <div class="relative">
                    <input type="search" placeholder="Search"
                        class="appearance-none border border-grey rounded-lg pl-8 pr-4 py-2">
                    <div class="absolute pin-y pin-l pl-3 flex items-center justify-center">
                        <svg class="fill-current text-grey h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20">
                            <path
                                d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    `
});
