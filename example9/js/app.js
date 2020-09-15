const app = new Vue({
    el: '#app',
    data: {
        username: 'Simon',
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
            { author: 'Harald', content: 'Hey, how is it going?', time: '11:30', avatar: 'https://www.vol.at/2020/01/14-01-2020-11-34-57-4-3-660785589-785x589.jpg' },
            { author: 'Peter', content: 'Was für ein tolles Leben?', time: '11:32', avatar: 'https://i2.wp.com/a16z.com/wp-content/uploads/2015/08/PeterLevine.jpg?resize=400%2C400&ssl=1' },
            { author: 'Claudia', content: 'Ganz schön cool hier', time: '11:35', avatar: 'https://rapp.univie.ac.at/fileadmin/_processed_/csm_Rapp_C._82853d028c.jpg' },
        ],
     },
});


