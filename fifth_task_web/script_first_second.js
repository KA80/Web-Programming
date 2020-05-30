var items = [
    {
        text: 'currency',
        children: [
            {
                text: 'orbs',
                children: [
                    {
                        text: 'blessed orb',
                        children: []
                    },
                    {
                        text: 'chaos orb',
                        children: []
                    },
                    {
                        text: 'regal orb',
                        children: []
                    },
                    {
                        text: 'divine orb',
                        children: []
                    },
                    {
                        text: 'exalted orb',
                        children: []
                    },
                    {
                        text: 'vaal orb',
                        children: []
                    },
                ]
            },
            {
                text: 'shards',
                children: [
                    {
                        text: 'exalted shard',
                        children: []
                    },
                    {
                        text: 'chaos shard',
                        children: []
                    },
                    {
                        text: 'alteration shard',
                        children: []
                    },
                ]
            },
            {
                text: 'improve quality',
                children: [
                    {
                        text: "armourer's scrap",
                        children: []
                    },
                    {
                        text: "blacksmith's scrap",
                        children: []
                    },
                    {
                        text:"cartographer's chisel",
                        children: []
                    },
                    {
                        text:"gemcutter's prism",
                        children: []
                    },
                ]
            },
            {
                text:'mirror of Kalandra',
                children: []
            },
        ]
    },
    {
        text: 'gems',
        children: [
            {
                text: 'support',
                children: [
                    {
                        text:'fortify support',
                        children: []
                    },
                    {
                        text:'mana leech support',
                        children: []
                    },
                    {
                        text:'cast when stunned support',
                        children: []
                    }
                ]
            },
            {
                text: 'skill',
                children: [
                    {
                        text: 'cyclone',
                        children: []
                    },
                    {
                        text: 'cleave',
                        children: []
                    },
                ]
            },
            {
                text: 'aura',
                children: [
                    {
                        text:'blood and sand',
                        children: []
                    },
                    {
                        text:'flash and stone',
                        children: []
                    },
                    {
                        text:'pride',
                        children: []
                    },
                ]
            },
        ]
    },
    {
        text: 'maps',
        children: [
            {
                text: 'tier 1',
                children: [
                    {
                        text:'desert map',
                        children: []
                    },
                    {
                        text:'ivory temple map',
                        children: []
                    },
                ]
            },
            {
                text: 'tier 15',
                children: [
                    {
                        text:'acid caverns map',
                        children: []
                    },
                    {
                        text:'palace map',
                        children: []
                    },
                    {
                        text:'caldera map',
                        children: []
                    },
                ]
            }
        ]
    },
];

let element_ul = document.body.appendChild(document.createElement('ul'));
for (i of items){
    make_new_child(i, element_ul);
}
data(document);

function make_new_child(element_li, element_ul) {
    let new_element_li = element_ul.appendChild(document.createElement('li'));
    new_element_li.appendChild(document.createTextNode(element_li.text));
    if (new_element_li.children) {
        let new_element_ul = new_element_li.appendChild(document.createElement('ul'));
        for (i of element_li.children){
            make_new_child(i, new_element_ul);
        } 
    }
}

function data(element){
    for(i of element.children){
        console.dir(i);
        data(i);
    }
}

