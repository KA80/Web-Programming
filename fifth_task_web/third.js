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
                        text: "cartographer's chisel",
                        children: []
                    },
                    {
                        text: "gemcutter's prism",
                        children: []
                    },
                ]
            },
            {
                text: 'mirror of Kalandra',
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
                        text: 'fortify support',
                        children: []
                    },
                    {
                        text: 'mana leech support',
                        children: []
                    },
                    {
                        text: 'cast when stunned support',
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
                        text: 'blood and sand',
                        children: []
                    },
                    {
                        text: 'flash and stone',
                        children: []
                    },
                    {
                        text: 'pride',
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
                        text: 'desert map',
                        children: []
                    },
                    {
                        text: 'ivory temple map',
                        children: []
                    },
                ]
            },
            {
                text: 'tier 15',
                children: [
                    {
                        text: 'acid caverns map',
                        children: []
                    },
                    {
                        text: 'palace map',
                        children: []
                    },
                    {
                        text: 'caldera map',
                        children: []
                    },
                ]
            }
        ]
    },
];

$("body").append(make_new_child(items));
$("li").each(nested_elements);

function make_new_child(element) {
    let new_list = $('<ul/>');
    for(i of element){
        let new_element = $('<li/>');
        if (i.text != undefined)
            new_element.append(i.text);
        if (i.children != undefined)
            new_element.append(make_new_child(i.children));
        new_element.on('click', click);
        new_list.append(new_element);
    }
    return new_list;
}

function click(){
    $(this.firstElementChild).toggle(500);
    return false;
}

function nested_elements(){
    console.log("text:\t" + $(this).children("ul").end().text() + "\r\ncount of nested elements:\t" + 
        $(this).find("li").length);
}
