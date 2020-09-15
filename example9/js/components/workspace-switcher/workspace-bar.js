const WorkspaceBar = Vue.component('workspace-bar', {
    props: ['workspaces'],
    template: `
        <div class="bg-indigo-darkest text-purple-lighter flex-none w-24 p-6 hidden md:block" style="background:#191e38;">
            <workspace-switch v-for="workspaceItem in workspaces" v-bind:title="workspaceItem.title" v-bind:key="workspaceItem.title"></workspace-switch>
        </div>
    `
});