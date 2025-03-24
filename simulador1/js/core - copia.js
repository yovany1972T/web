
  var graphTitle,
   graphTitle_x,
   graphTitle_y,
   graphTitle,
   graphTitle_x,
   graphTitle_y,
   xTitle,
   xTitle_x,
   xTitle_y,
   yTitle,
   yTitle_x,
   yTitle_y;



  xTitle = 't(s)';
  xTitle_x = 30;
  xTitle_y = 0.5;

  yTitle = 'x(mts)';
  yTitle_x = 0;
  yTitle_y = 9;

 var picStr = "img/movil.png";  
 var logo = "img/logo.png";  

var board = JXG.JSXGraph.initBoard('box', {boundingbox: [-1, 10, 10, -8], axis: true, keepaspectratio: true,showCopyright:false, zoom: {
            factorX: 1.25,
            factorY: 1.25,
            wheel: false,
            needshift: false,
            //eps: 0.7
            min: 0.2, 
            max: 100.0
        }
  });


  
   //var  x0=board.create("slider",[[9,-0.5],[12,-0.5],[0,0,8]],{name:'x0',strokeColor:"#d00",fillColor:"#d00",size:4,withTicks:false});
   var  v0=board.create("slider",[[5,-6],[10,-6],[0,0.37,8]],{name:'V',strokeColor:"red",fillColor:"red",size:4,withTicks:false});

    
    ejey=board.create('line',[[0,0],[0,8]], {visible:false,straightFirst:false,straightLast:false});
    corte= board.create('glider',[0,0,ejey],{name:'',strokecolor:'#890074',fillcolor:'#890074',size:4});




//var curve = board.create('functiongraph', ['sin(x)', -3, 3]);
//var curve_id = curve.rendNode.getAttribute('id');
//var str = '<textPath xlink:href="#' + curve_id + '">This is the sine curve</textPath>';
//var txt = board.create('text', [1, 0.8, 'dummy'], {display:'internal', parse: false});
//txt.rendNode.innerHTML = str;

  

  board.create('text', [xTitle_x, xTitle_y, xTitle], {color:'green',fontSize:15});
  board.create('text', [yTitle_x, yTitle_y, yTitle], {color:'blue',fontSize:15});





// function and its derivative
var f = function(x) { return  v0.Value()*x+corte.Y(); };
var df = function(x) { return v0.Value(); };

JXG.Options.text.display = 'html';

 


var graph = board.create('functiongraph', [f, -1, 10], {strokeColor: 'green',fixed:true});

//var curve = board.create('functiongraph', ['sin(x)', -3, 3]);
var curve_id = graph.rendNode.getAttribute('id');
var str = '<textPath xlink:href="#' + curve_id + '">Y=m.x+b</textPath>';
var txt = board.create('text', [1, 1, 'dummy'], {display:'internal', parse: false,fontSize: 20, color: 'black'});
txt.rendNode.innerHTML = str;



var p = board.create('glider', [5, f(5), graph],
  {withLabel: true, name: '<i>f(t)</i>', size: 3, strokeColor: '#000000', fillColor: 'red', label: {offset: [-30, 10], fontSize: 15},fixed:false }
);



 var q = board.create('glider', [8, f(8), graph],
  {withLabel: true, name: '<i>f(t+&Delta;t)', size: 3, strokeColor: '#000000', fillColor: 'red', label: {offset: [-30, 10], fontSize: 15},fixed:false }
);







var tangent_line = board.create('line', 
  [ 
    [ function() { return p.X(); }, function() { return p.Y(); } ],
    [ function() { return p.X() + 1; }, function() { return df(p.X())+p.Y(); } ]
  ],
  {strokeColor: 'blue'}
);

var q_h_segment = board.create('segment', 
  [ 
    [ function() { return p.X(); }, function() { return p.Y(); } ],
    [ function() { return q.X(); }, function() { return p.Y(); } ]
  ],
  {withLabel: true, name: '<i>&Delta;t</i>', dash: 1, strokeColor: 'red', label: {fontSize: 15}}
);

var p_v_segment = board.create('segment', 
  [ 
    [ function() { return q.X(); }, function() { return p.Y(); } ],
    [ function() { return q.X(); }, function() { return q.Y(); } ]
  ],
  {withLabel: true,name: '<i>&Delta;x</i>', dash: 1, strokeColor: 'red', label: {fontSize: 15}}
);



var i = board.create('intersection', [p_v_segment, q_h_segment, 0]);


a = board.create('angle',[i, p, q], {radius:1});
a.setAngle(function() {
    return Math.PI / 3;
});

//var dval = board.create('text',[1, 6.5,
//  function(){return '<i><font color="red">v=&Delta;x/&Delta;t = '+((q.Y()-p.Y())/(q.X()-p.X())).toFixed(3) + '</font></i>';}],
//  {fontSize: 15}
//);

a.label.setText(function () {return ''+(180.0*a.Value()/Math.PI).toFixed(0)+"°"});

var heightVisible = true;
    board.create('text', [12,-6, '<input type="checkbox" id="showHeight" onChange="showHeight()" checked />Mostrar Pendiente']);
   
    showHeight = function(){
        heightVisible = !heightVisible;
        p.setProperty({visible:heightVisible});  
        q.setProperty({visible:heightVisible});    
        a.setProperty({visible:heightVisible});    
        i.setProperty({visible:heightVisible});  
        p_v_segment.setProperty({visible:heightVisible});    
        q_h_segment.setProperty({visible:heightVisible}); 
    };





//var fval = board.create('text', slider
 // [23, 5,
 //   function(){return "<i>f ( " + p.X().toFixed(2) + " ) = " + f(p.X()).toFixed(3) + "</i>";}
//  ],
//  {fontSize: 15}
//);


 var  x9=board.create("slider",[[5,-5],[10,-5],[0,0,25]],{name:'t',strokeColor:"green",fillColor:"green",size:4,withTicks:false});

boton = board.create('text', [1, -1, '<button id="boton">Animar On/Off</button>']),


document.getElementById("boton").addEventListener("click", function() {
    

    animate(x9, 50, 100);


    });

   // Animation
    var animated = false;

  function animate(point, direction, count) {
  if (animated) {
     point.stopAnimation();
     animated = false;
  } else 
  {
     point.startAnimation(direction, count);
     animated = true;
     // set the turtle to the correct direction
     z = board.create('point',[function(){ return x9.Value();}, function(){ return v0.Value()*x9.Value()+corte.Y();}], {size: 5, name: 'A', color: 'black',face:'cross',label:{visible : false}});


   }
  } 

  v0.on('drag', function() {  

   if (v0.Value()==0.0)
  {
     x9.stopAnimation();
     animated = false;

  }else
   animate(x9, 50, 100);



  });
 

  // User supplied function to be drawn.
 



//board.create('text',[function(){return x9.Value();},-0.1,"<b>t</b>"],{strokeColor:'black',fontSize:12});
//board.create('text',[-.5,function(){return v0.Value()*x9.Value()+corte.Y();},"<b>f(t)</b>"],{strokeColor:'black',fontSize:12});

board.create('line',[
    [function(){ return x9.Value();},-.125], 
    [function(){ return x9.Value();},.125]
    ],{straightFirst:false, straightLast:false,strokeColor:'#000000'});
board.create('line',[
    [-.125,function(){ return v0.Value()*x9.Value()+corte.Y();}], 
    [.125,function(){ return v0.Value()*x9.Value()+corte.Y();}]
    ],{straightFirst:false, straightLast:false,strokeColor:'gray'});

board.create('line',[
    [function(){ return x9.Value();},0], 
    [function(){ return x9.Value();},function(){ return v0.Value()*x9.Value()+corte.Y();}]
    ],{straightFirst:false, straightLast:false,dash:2,strokeColor:'gray'});

board.create('line',[
    [0,function(){ return v0.Value()*x9.Value()+corte.Y();}], 
    [function(){ return x9.Value();},function(){ return v0.Value()*x9.Value()+corte.Y();}]
    ],{straightFirst:false, straightLast:false,dash:2,strokeColor:'gray'});






  board.create('text',[5,-4,
  function() { 
  return '<font color="blue"> f(<font color="green">' + x9.Value().toFixed(2) + '</font>) = ' + (v0.Value()*x9.Value()+corte.Y()).toFixed(2) + '</font>';
  }], {fontSize:14});

  board.create('text',[5,-7,
  function() { 
  return '<font color="#890074"> '+ (corte.Y()).toFixed(2) + '</font>';
  }], {fontSize:14});


board.create('text',[-.5,function(){return v0.Value()*x9.Value()+corte.Y();},"<b>f(t)</b>"],{strokeColor:'black',fontSize:12});
  
var im = board.create('image',[picStr,[function(){return x9.Value()-0.5},0],[1, 1]], {rotate:0});





board.create('text', [1,-2,"<b>Modelado y Simulación: Movimiento lineal a velocidad constante"],{ fontSize: 20, color: 'black', cssClass: 'my-jsxgraph-label' }); 
board.create('text',[1,-3, "<b>Modelo físico:</b> <span id='infoValueText' style='color:blue;font-style:normal;font-size:120%'><b>d</span>=<span id='infoValueText' style='color:red;font-style:normal;font-size:120%'>V </span>*<span id='infoValueText' style='color:green;font-style:normal;font-size:120%'>t</span>+<span id='infoValueText' style='color:#890074;font-style:normal;font-size:120%'> xo</span><b> "],{fontSize:12, cssClass: 'my-jsxgraph-label',display: 'html'});
board.create('text',[1,-3.5, "<i>Variables:</i>"],{fontSize:10, cssClass: 'my-jsxgraph-label', color: '#808080 '});
board.create('text',[1,-5, "<span id='infoValueText' style='color:green;font-style:normal;font-size:120%'>Independiente: (t)</span>"],{fontSize:12, cssClass: 'my-jsxgraph-label',display: 'html'});
board.create('text',[1,-4, "<span id='infoValueText' style='color:blue;font-style:normal;font-size:120%'>Dependiente : (x)</span>"],{fontSize:12, cssClass: 'my-jsxgraph-label',display: 'html'});
board.create('text',[1,-6, "<span id='infoValueText' style='color:red;font-style:normal;font-size:120%'>Pendiente :(v)</span>"],{fontSize:12, cssClass: 'my-jsxgraph-label',display: 'html'});
board.create('text',[1,-7, "<span id='infoValueText' style='color:#890074;font-style:normal;font-size:120%'>Corte  :(xo)</span>"],{fontSize:12, cssClass: 'my-jsxgraph-label',display: 'html'});




board.create('text',[22,-6.2, "<i>Ing. Yovany Gutiérrez Pernia.  Tovar edo Mérida Venezuela-2008 </i>"],{fontSize:10, cssClass: 'my-jsxgraph-label', color: '#808080 '});
board.create('text',[22,-6.5, "Utiliza la <a href='http://jsxgraph.uni-bayreuth.de/wp/' rel='self'>JSXGraph</a> Librería de JavaScript ."],{fontSize:10, cssClass: 'my-jsxgraph-label', color: '#808080 ',display: 'html'});
board.create('image',[logo,[22,-7.8],[2, 1]], {rotate:0});
board.unsuspendUpdate();
