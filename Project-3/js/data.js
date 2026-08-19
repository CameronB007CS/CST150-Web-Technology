/*
    data.js
    -------
    Placeholder product data. Field names match the "products" table columns
    exactly (product_id, product_title, product_description, cost_price,
    sell_price, product_image) so this array can be swapped for a fetch()
    call to the Flask API later without touching any other file.

    product_image currently just stores a short keyword - real product
    images/URLs will replace these once they're uploaded to the DB.
    Until then, product cards render an animated "waveform" placeholder
    instead of an actual image (see renderWaveform() in main.js).
*/

const PRODUCTS = [
    {
        product_id: 1,
        product_title: "Afterglow Live Set Vol. 1",
        product_description: "A 74-minute peak-time mix recorded live at our Season 2 closing party. Deep, hypnotic and built for a 3am dancefloor.",
        cost_price: 2.50,
        sell_price: 9.99,
        product_image: "mix-afterglow.jpg",
        category: "Mixes"
    },
    {
        product_id: 2,
        product_title: "Midnight Frequencies EP",
        product_description: "Four unreleased tracks blending dub techno textures with warm analog bass. Mastered for club systems.",
        cost_price: 3.00,
        sell_price: 12.99,
        product_image: "mix-midnight-frequencies.jpg",
        category: "Mixes"
    },
    {
        product_id: 3,
        product_title: "Neon Pulse Sample Pack",
        product_description: "120 one-shots and loops covering acid basslines, glassy stabs and driving percussion. Royalty-free, 24-bit WAV.",
        cost_price: 4.00,
        sell_price: 19.99,
        product_image: "samples-neon-pulse.jpg",
        category: "Samples"
    },
    {
        product_id: 4,
        product_title: "Chrome Drip VJ Loop Bundle",
        product_description: "40 seamless 4K visual loops built for live VJ sets - liquid chrome, scanlines and glitch transitions included.",
        cost_price: 5.00,
        sell_price: 24.99,
        product_image: "visuals-chrome-drip.jpg",
        category: "Visuals"
    },
    {
        product_id: 5,
        product_title: "Afterhours Access Pass - Season 3",
        product_description: "Your digital pass to every Nightwave Season 3 event. Skip the door queue and unlock member-only livestreams.",
        cost_price: 6.00,
        sell_price: 29.99,
        product_image: "pass-afterhours-s3.jpg",
        category: "Passes"
    },
    {
        product_id: 6,
        product_title: "Analog Ghosts Sample Pack",
        product_description: "Tape-warped pads, dusty breaks and haunted vocal chops recorded through real analog hardware.",
        cost_price: 3.50,
        sell_price: 14.99,
        product_image: "samples-analog-ghosts.jpg",
        category: "Samples"
    },
    {
        product_id: 7,
        product_title: "Synthwave Skyline Visual Loops",
        product_description: "25 retro-futurist cityscape loops in a magenta and cyan palette. Perfect backdrop for synthwave and electro sets.",
        cost_price: 4.50,
        sell_price: 17.99,
        product_image: "visuals-synthwave-skyline.jpg",
        category: "Visuals"
    },
    {
        product_id: 8,
        product_title: "Underglow Warehouse Set",
        product_description: "60 minutes of raw industrial techno recorded live in an actual warehouse. Unedited, unpolished, unforgettable.",
        cost_price: 2.75,
        sell_price: 11.99,
        product_image: "mix-underglow.jpg",
        category: "Mixes"
    },
    {
        product_id: 9,
        product_title: "Velvet Static Ambient Pack",
        product_description: "Slow-evolving drones and granular textures for intros, outros and downtempo transitions.",
        cost_price: 3.25,
        sell_price: 13.99,
        product_image: "samples-velvet-static.jpg",
        category: "Samples"
    },
    {
        product_id: 10,
        product_title: "Backstage VIP Digital Pass",
        product_description: "Full-season VIP access including backstage livestream feeds, DJ meet and greets, and early ticket drops.",
        cost_price: 8.00,
        sell_price: 39.99,
        product_image: "pass-backstage-vip.jpg",
        category: "Passes"
    },
    {
        product_id: 11,
        product_title: "Glass City Nights Mix",
        product_description: "A melodic techno journey through 70 minutes of glassy synths and rolling low end.",
        cost_price: 2.60,
        sell_price: 10.99,
        product_image: "mix-glass-city.jpg",
        category: "Mixes"
    },
    {
        product_id: 12,
        product_title: "Prism Drop Visual Kit",
        product_description: "30 kaleidoscopic loop transitions with built-in beat-sync markers for smoother live mixing.",
        cost_price: 5.50,
        sell_price: 22.99,
        product_image: "visuals-prism-drop.jpg",
        category: "Visuals"
    }
];
