    /****** Update functions  ******/

    function redraw() {
        d3.selectAll('.node, .branch').remove();
        update();
    }

    function update() {

        const nodes = getNodesWithKeys();

        const node = global.svg.mmap.selectAll('.node').data( nodes );

        const nodeContainer = node.enter().append('g')
            .attr('class', 'node')
            .attr('id', n => n.key )
            .attr('transform', n => 'translate(' + n.x + ',' + n.y + ')')
            .call( drag )
            .on('dblclick', function( n ) {
                events.call('nodedblclick', this, n);
                d3.event.stopPropagation();
            });

        nodeContainer.append('text').text( n => n.name )
            .attr('fill', n => n['text-color'])
            .attr('font-size', n => n['font-size'])
            .attr('font-style', n => n['font-style'])
            .attr('font-weight', n => n['font-weight']);

        nodeContainer.insert('path', 'text')
            .style('fill', n => n['background-color'])
            .attr('d', drawBgShape );

        node.exit().remove();

        const branch = global.svg.mmap.selectAll('.branch').data( nodes.slice(1) );

        branch.enter().insert('path', 'g')
            .attr('class', 'branch')
            .attr('id', n => 'branchOf' + n.key )
            .style('fill', n => n['branch-color'])
            .style('stroke', n => n['branch-color'])
            .attr('d', drawBranch );

        branch.exit().remove();
    }

    function updateName( sel, v ) {
        const text = this.childNodes[1];
        const bg = this.childNodes[0];
        sel.name = text.innerHTML = v;
        sel.width = text.textLength.baseVal.value + 45;
        d3.select( bg ).attr('d', drawBgShape );
    }

    function updateBackgroundColor( sel, v ) {
        const bg = this.childNodes[0];
        bg.style.setProperty('fill', sel['background-color'] = v );
        bg.style.setProperty('stroke', d3.color( v ).darker( .5 ) );
    }

    function updateTextColor( sel, v ) {
        const text = this.childNodes[1];
        text.style.setProperty('fill', sel['text-color'] = v );
    }

    function updateFontSize( sel, v ) {
        const text = this.childNodes[1];
        const bg = this.childNodes[0];
        text.style.setProperty('font-size', sel['font-size'] = v );
        sel.width = text.textLength.baseVal.value + 45;
        sel.height = sel['font-size']*11/10 + 30;
        d3.select( bg ).attr('d', drawBgShape );
        d3.selectAll('.branch').attr('d', drawBranch );
    }

    function updateFontStyle( sel ) {
        const text = this.childNodes[1];
        sel['font-style'] = sel['font-style'] === 'normal' ? 'italic' : 'normal';
        text.style.setProperty('font-style', sel['font-style'] );
    }

    function updateFontWeight( sel ) {
        const text = this.childNodes[1];
        sel['font-weight'] = sel['font-weight'] === 'normal' ? 'bold' : 'normal';
        text.style.setProperty('font-weight', sel['font-weight'] );
    }

    function updateBranchColor( sel, v ) {
        if( sel.key !== 'node0' ) {
            const branch = document.getElementById('branchOf'+ sel.key );
            branch.style.setProperty('fill', sel['branch-color'] = v );
            branch.style.setProperty('stroke', sel['branch-color'] = v );
        } else {
            console.warn('The root node has no branches');
        }
    }