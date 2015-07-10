var getJSON = function (url, successHandler, errorHandler) {
    var xhr = typeof XMLHttpRequest != 'undefined'
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('get', url, true);
    xhr.onreadystatechange = function () {
        var status;
        var data;
        // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
        if (xhr.readyState == 4) { // `DONE`
            status = xhr.status;
            if (status == 200) {
                data = JSON.parse(xhr.responseText);
                successHandler && successHandler(data);
            } else {
                errorHandler && errorHandler(status);
            }
        }
    };
    xhr.send();
};


document.addEventListener("DOMContentLoaded", function () {
	var canvas =new fabric.Canvas('c');
	var myObj = new Array();
	getJSON('../javascripts/json.json', function (data) {
	    return data;
	}, function (status) {
	    alert('Something went wrong.');
	});
	console.log(data);
	canvas.loadFromJSON(myObj[0]);
    canvas.renderAll();
    //------------ The first wayout with virtual canvas
    var vCanvas = new fabric.Canvas();
    vCanvas.loadFromDatalessJSON(myObj[0]);
    vCanvas.forEachObject(function (obj) {
        canvas.add(obj)
    });
    canvas.renderAll();
	//canvas.loadFromJSON(json, canvas.renderAll.bind(canvas));

/*
	myObj[0] = {objects:[{type:"circle", originX:"center", originY:"center", left:100, top:60, width:160, height:160, fill:"", overlayFill:null, stroke:"rgb(0,0,0)", strokeWidth:5, strokeDashArray:null, scaleX:1, scaleY:0.7, angle:0, flipX:false, flipY:false, opacity:1, selectable:true, hasControls:true, hasBorders:true, hasRotatingPoint:true, transparentCorners:true, perPixelTargetFind:false, shadow:null, visible:true, radius:80}]};
	myObj[1] = {objects:[{type:"text", originX:"center", originY:"center", left:100, top:60, width:200, height:30, fill:"rgb(0,0,0)", overlayFill:null, stroke:null, strokeWidth:1, strokeDashArray:null, scaleX:1, scaleY:1, angle:0, flipX:false, flipY:false, opacity:1, selectable:true, hasControls:true, hasBorders:true, hasRotatingPoint:true, transparentCorners:true, perPixelTargetFind:false, shadow:null, visible:true, text:"Test Text", fontSize:30, fontWeight:"normal", fontFamily:"Arial", fontStyle:"", lineHeight:1.3, textDecoration:"", textShadow:"", textAlign:"left", path:null, strokeStyle:"", backgroundColor:"", textBackgroundColor:"", useNative:true}]};

	//------------ Will clear all previous objects
	canvas.loadFromDatalessJSON(myObj[0]);
	canvas.loadFromDatalessJSON(myObj[1]);



	canvas.renderAll();
	//------------ The first wayout with virtual canvas
	var vCanvas = new fabric.Canvas();
	vCanvas.loadFromDatalessJSON(myObj[0]);
	vCanvas.forEachObject(function(obj){
	  canvas.add(obj)
	});
	vCanvas.loadFromDatalessJSON(myObj[1]);
	vCanvas.forEachObject(function(obj){
	  canvas.add(obj)
	});


	canvas.renderAll();
*/

/*
		canvas.loadFromDatalessJSON(loadJSON(function(response) {
		  // Parse JSON string into object
		    var data = JSON.parse(response);
		    console.log(data);

		 }), function() {
  			alert(' this is a callback. invoked when canvas is loaded! ');
		});
*/
		/*
		canvas.loadFromJSON(json, canvas.renderAll.bind(canvas), function(o, object) {
	    	fabric.log(o, object);
		});
*/
	}
);