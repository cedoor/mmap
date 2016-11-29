    /**
     * @name global
     * @description
     * Global dictionary that will contain all the properties of the
     * map shared by all functions within the module.
     *
     */
    const global = {};

    /**
     * @name init
     * @description
     * ...
     *
     * @param {string} selector The selector in which to draw
     */
    function init( selector ) {

        const frame = d3.select( selector );

        const g = frame.append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .append('g').call( zoom );

        g.append("rect")
            .attr("width", '100%')
            .attr("height", '100%')
            .attr("fill", "transparent")
            .attr("pointer-events", "all")
            .on('mousedown', deselectNode );

        // Set global variables
        global.svg = { main : g, mmap : g.append('g') };
        global.counter = 0;
        global.nodes = d3.map();

        global.nodes.set('node' + global.counter, {
            x : parseInt( frame.style('width') )/2,
            y : parseInt( frame.style('height') )/2,
            background : '#e6e6e6', textColor : '#828c82',
            font : 18, name : 'Root node'
        });

        global.selected = 'node0';
        update();
    }
