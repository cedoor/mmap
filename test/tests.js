describe('Tests', function() {

    var should = chai.should(),
        expect = chai.expect;

    describe('', function() {

        describe('§ mmap.init()', function() {
            it('Should initialize the mind map without errors', function() {
                mmap.init
                    .should.to.not.throw( Error );
            });
            it('Should exist the svg node in the DOM', function() {
                var svg = document.getElementsByTagName('svg');
                svg.length
                    .should.not.to.equal(0);
            });
            it('Should exist the root node in the DOM', function() {
                var node = document.getElementById('node0');
                expect( node ).to.exist;
            });
        });

        describe('§ mmap.remove()', function() {
            it('Should remove the mind map without errors', function() {
                mmap.remove();
            });
            it('Should not exist the svg node in the DOM', function() {
                var svg = document.getElementsByTagName('svg');
                svg.length
                    .should.to.equal(0);
            });
            it('Should not exist the root node in the DOM', function() {
                var node = document.getElementById('node0');
                expect( node ).to.not.exist;
            });
        });

    });

    describe('', function() {

        before( function() {
            mmap.init();
        });

        describe('§ mmap.new()', function() {
            it('Should create a new mind map without errors', function() {
                mmap.new
                    .should.to.not.throw( Error );
            });
            it('Should exist the svg node in the DOM', function() {
                var svg = document.getElementsByTagName('svg');
                svg.length
                    .should.not.to.equal(0);
            });
            it('Should exist the root node in the DOM', function() {
                var node = document.getElementById('node0');
                expect( node ).to.exist;
            });
        });

        describe('§ mmap.zoomIn()', function() {
            it('Should zoom-in the mind map without errors', function() {
                mmap.zoomOut
                    .should.to.not.throw( Error );
            });
        });

        describe('§ mmap.zoomOut()', function() {
            it('Should zoom-out the mind map without errors', function() {
                mmap.zoomIn
                    .should.to.not.throw( Error );
            });
        });

        describe('§ mmap.center()', function() {
            it('Should center the mind map without errors', function() {
                mmap.center
                    .should.to.not.throw( Error );
            });
        });

        describe('§ mmap.undo()', function() {
            it('Should undo the mind map without errors', function() {
                mmap.undo
                    .should.to.not.throw( Error );
            });
        });

        describe('§ mmap.repeat()', function() {
            it('Should repeat the mind map without errors', function() {
                mmap.repeat
                    .should.to.not.throw( Error );
            });
        });

        describe('§ mmap.node.add()', function() {
            it('Should add a node without errors', function() {
                mmap.node.add
                    .should.to.not.throw( Error );
            });
            it('Should exist in the DOM', function() {
                var node = document.getElementById('node1');
                expect( node ).to.exist;
            });
            it('Should add a node with custom parameters', function() {
                mmap.node.add({
                    'name': 'Custom node',
                    'background-color': 'rgb(201, 223, 192)',
                    'image-src': 'img/logo.png'
                });
                var node = document.getElementById('node2'),
                    background = node.childNodes[0],
                    text = node.childNodes[1],
                    image = node.childNodes[2];
                background.style['fill'].should.to.equal('rgb(201, 223, 192)');
                text.innerHTML
                    .should.to.equal('Custom node');
                image
                    .should.to.exist;
            });
        });

        describe('§ mmap.node.select()', function() {
            it('Should get selection of a node without errors', function() {
                mmap.node.select
                    .should.to.not.throw( Error );
            });
            it('Should select a node', function() {
                mmap.node.select('node1');
                mmap.node.select()
                    .should.to.have.property('key').and.equal('node1');
            });
        });

        describe('§ mmap.node.remove()', function() {
            it('Should remove a node without errors', function() {
                mmap.node.select('node2');
                mmap.node.remove
                    .should.to.not.throw( Error );
            });
        });

        describe('§ mmap.node.moveTo()', function() {
            it('Should move a node', function() {
                var x = mmap.node.select().value.x;
                mmap.node.moveTo('right', 100 );
                mmap.node.select().value.x
                    .should.to.equal( x + 100 );
                mmap.node.moveTo('left', 100 );
                mmap.node.select().value.x
                    .should.to.equal( x );
            });
        });

        describe('§ mmap.node.selectTo()', function() {
            it('Should move the selection of a node', function() {
                var key = mmap.node.select().key;
                mmap.node.selectTo('left');
                mmap.node.select().key
                    .should.to.equal('node1');
                mmap.node.selectTo('right');
                mmap.node.select().key
                    .should.to.equal('node0');
            });
        });

        describe('§ mmap.node.update()', function() {
            it('Should update the properties of a node ( visual )', function() {
                var name = mmap.node.select().value.name;
                mmap.node.update('name', 'test', true );
                mmap.node.select().value.name
                    .should.to.equal( name );
            });
            it('Should update the properties of a node', function() {
                mmap.node.update('name', 'test');
                mmap.node.select().value.name
                    .should.to.equal('test');
            });
        });

        describe('§ mmap.data()', function() {
            it('Should get mind map data without errors', function() {
                mmap.data
                    .should.to.not.throw( Error );
            });
            it('Should have at least the first node', function() {
                var data = mmap.data();
                data[0]
                    .should.to.have.property('key')
                    .and.equal('node0');
            });
        });

        after( function() {
            // Remove links from suites for separate tests
            var links = document.querySelectorAll('.suite > h1 > a');
            links.forEach( function( a ) {
                var text = a.innerHTML, parent = a.parentNode;
                parent.removeChild( a );
                parent.innerHTML = text;
            });
            // Clear the console
            console.clear();
            console.log('%cTest were done!', 'font-size: 16px; color: #4C4527');
            // Load app.js
            var script = document.createElement('script');
            document.body.appendChild( script ); 
            script.onload = function() {
                // Recreate the mind map
                mmap.remove();
                mmap.init();
            }
            script.src = 'app.js';
        });

    });
});
