 



           var logo = "../img/logo.png";       

            var board = JXG.JSXGraph.initBoard("box", {
                axis: true,
                originX: box.offsetWidth / 2,
                originY: box.offsetHeight / 2,
                unitX: 25,
                unitY: 25,
                grid: true,
                showNavigation: false,
                showCopyright: false
            });

            board.suspendUpdate();


          var m = board.create('slider', [[3, -2], [8, -2], [-12, 5, 12]], {
                name: 'm',
                strokeColor: 'red',
                fillColor:"red",
                precision: 2,
                size:4,
                snapWidth: 0.25,
                withTicks: true,
                point1: { frozen: true },
                point2: { frozen: true },
                label: { position: 'top' }
            });
            var c = board.create('slider', [[3, -3], [8, -3], [-12, -2, 12]], {
                name: 'b',
                strokeColor: 'purple',
                fillColor:"purple",
                precision: 2,
                size:4,
                precision: 2,
                snapWidth: 0.25,
                withTicks: true,
                point1: { frozen: true },
                point2: { frozen: true },
                label: {position: 'top'}
            });
            var f = function (x) { return (m.Value() * x) + c.Value(); }
            var plot = board.create('functiongraph', [f, -200, 200], { strokeWidth: 2 });

            board.create('text', [3, -4, function () {
                var mv = m.Value();
                var cv = c.Value();
                return 'y =  ' + dec(mv, 2) + 'x ' + (cv >= 0 ? '+ ' + dec(cv, 2) : dec(cv, 2));
            }], { fontSize: 15, strokeColor: 'blue', frozen: true, cssClass: 'my-jsxgraph-label' });


           board.create('text', [4, -1, function () {
                var mv = m.Value();
                var cv = c.Value();
                return (cv == 0) ? "Función Lineal" : 'Función Afin';
            }], { fontSize: 15, strokeColor: 'green', cssClass: 'my-jsxgraph-label' });


          
board.create('text',[-15,-5, "<i>Ing. Yovany Gutiérrez Pernia.  Tovar edo Mérida Venezuela-2008 </i>"],{fontSize:10, cssClass: 'my-jsxgraph-label', color: '#808080 '});
board.create('text',[-15,-5.5, "Utiliza la <a href='http://jsxgraph.uni-bayreuth.de/wp/' rel='self'>JSXGraph</a> Librería de JavaScript ."],{fontSize:10, cssClass: 'my-jsxgraph-label', color: '#808080 ',display: 'html'});
board.create('image',[logo,[-15,-7],[2, 1]], {rotate:0});

            board.unsuspendUpdate();

     function dec(num, dp) {
            var p = Math.pow(10, dp);
            var n = Math.round(num * p) / p;
            return n.toFixed(dp);
        }
     


