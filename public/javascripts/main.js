var display;

function mkcolor (r,g,b) {
	return "rgb("+Math.round(r*2.55)+","+Math.round(g*2.55)+","+Math.round(b*2.55)+")";	
}

function decode(data) {

	if(!data) return;

	var dv = new DataView(data);

if(!dv) return;

	var x,y,c,fr,fg,fb,br,bg,bb;

	var len = dv.byteLength;

	console.log("drawing "+len+" bytes = "+(len/12.0)+" packets")

	for(var i=0; i < len; i+=12) {
		x = dv.getUint16(i  , true);
		y = dv.getUint16(i+2, true);
		c = String.fromCharCode(dv.getUint16(i+4, true));
		fr = dv.getUint8(i+6);
		br = dv.getUint8(i+7);
		fg = dv.getUint8(i+8);
		bg = dv.getUint8(i+9);
		fb = dv.getUint8(i+10);
		bb = dv.getUint8(i+11);
		display.draw(x,  y, c, mkcolor(br,bg,bb),mkcolor(fr,fg,fb));
	}
}


var client = new BinaryClient('ws://localhost:9000');
client.on('stream', function(stream, meta){    
    stream.on('data', function(data){
      decode(data);
    });
    // stream.on('end', function(){
    //   var img = document.createElement("img");
    //   img.src = (window.URL || window.webkitURL).createObjectURL(new Blob(parts));
    //   document.body.appendChild(img);
    // });
});


Zepto(function(){
	display = new ROT.Display({
		width:100, 
		height:34, 
		fontFamily: "Monaco", 
		fontSize: 14,
		//bg: '#0F061A',
		//fg: '#E5DDF0',
		spacing: 1.18
	});

	$('body').append(display.getContainer());

//	display.draw(5,  4, "@");
//	display.draw(15, 4, "%", "#0f0");          /* foreground color */
//	display.draw(25, 4, "#", "#f00", "#009");  /* and background color */

// 		var g = new TextGen("xsofy = :x`s of :y\n\
// x = Dungeon|Cavern|Depth|Catacomb|Mine|Labyrinth|ᖗᖶᘔᖽᗐᕕ|Maze|Gate|Corridor|Hall|Chamber|Realm|Tomb|Vault|Crypt\n\
// y = Suffering|Madness|Evil|Hell|Taxes|Tornment|Torture|Fear|Slime|Blood|Loathing|Pain|Rage|Despair|Terror|Misery|Blasphemy\n\
// ");

// 	display.drawText(0,0,"%b{#181A9E}"+g.make("xsofy"));
});

