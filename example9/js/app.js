const app = new Vue({
    el: '#app',
    data: {
        username: 'Maximilian',
        status: 'Verfügbar',
        workspaces: [
            { title: 'Space 1' },
            { title: 'Space 2' },
            { title: 'Space 3' },
        ],
        channels: [
            { title: 'random', description: 'just random stuff to talk about' },
            { title: 'team', description: 'everything team related' },
            { title: 'awesomecookies', description: 'just the best things in the world!' },
        ],
        messages: [
            { author: 'Harald', content: 'Hey, how is it going?', time: '11:30', avatar: 'harald.jpg' },
            { author: 'Peter', content: 'Was für ein tolles Leben?', time: '11:32', avatar: 'peter.jpg' },
            { author: 'Claudia', content: 'Ganz schön cool hier', time: '11:35', avatar: 'claudia.jpg' },
        ],
    },
});


