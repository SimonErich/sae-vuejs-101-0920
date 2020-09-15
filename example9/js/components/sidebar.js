const Headline1 = Vue.component('headline-1', {
    props: ['title'],
    template: `
        <h1>{{title}}</h1>
    `
});