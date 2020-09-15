const WorkspaceSwitch = Vue.component('workspace-switch', {
    props: ['title'],
    template: `
        <div class="cursor-pointer mb-4">
            <div class="bg-white h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden">
                <img src="https://jitsi.org/wp-content/uploads/2017/01/slack-logo.png" alt="">
            </div>
            <div class="text-center text-white opacity-50 text-sm">{{title}}</div>
        </div>
    `
});
