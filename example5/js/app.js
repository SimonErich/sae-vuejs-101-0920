const app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todos: [
            { title: 'Wäsche waschen', done: true },
            { title: 'Staub saugen', done: false },
            { title: 'Fenster putzen', done: false }
        ],
    },
});