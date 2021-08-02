.
                var Canvas=function(x){
                var body = document.body;
                body.oncontextmenu = function() {
                    return false;
                };
                function enableContextMenu() {
                    body.oncontextmenu = function() {
                        return true;
                    };
                };
                
                // Gets the canvas element and allows the user to draw on the canvas.
                var canvas = document.querySelector(x);
                var ctx = canvas.getContext("2d");
                
                // Variables hold the width and height of the canvas.
                var width = canvas.width;
                var height = canvas.height;
                
                // Controls whether to draw the stroke or fill
                var isStroke = true;
                var isFill = true;
                
                // A draw function for animation.
                function draw() {};
                
                // A keyPressed function for key events.
                function keyPressed() {};
                
                // A keyReleased function for key events.
                function keyReleased() {};
                
                // A mouseClicked function for when the user clicks.
                function mouseClicked() {};
                
                // A mouseDragged function for when the user clicks and drags.
                function mouseDragged() {};
                
                // If the mouse is pressed.
                var mouseIsPressed;
                
                // The frameRate variable controls animation speed.
                var frameRate = 60;
                
                // Counts frames.
                var frameCount = 0;
                
                // Positions of the mouse.
                var mouseX = width / 2, mouseY = height / 2;
                var pmouseX = width / 2, pmouseY = height / 2;
                var mouseButton;
                
                // A keyCode variable.
                var keyCode;
                
                // Key code variables.
                var LEFT = 37,
                	RIGHT = 39,
                	UP = 38,
                	DOWN = 40;
                	
                // Alignment variables.
                var TOP = 0,
                	CENTER = 1,
                	BOTTOM = 2,
                	BASELINE = 3
                	
                var SQUARE = "butt";
                var ROUND = "round";
                var PROJECT = "square";
                var MITER = "miter";
                var BEVEL = "bevel";
                
                var cMode = "rgb";
                var RGB = "rgb";
                var HSB = "hsb";
                	
                // Aligment objects.
                var alignmentX = {
                	37 : "left",
                	1 : "center",
                	39 : "right",
                };
                var alignmentY = {
                	0 : "top",
                	1 : "middle",
                	2 : "bottom",
                	3 : "baseline"
                };
                	
                // Holds current text size.
                var txtSize = 20, ext = "", txtLead = 1;
                
                var mainFont = "sans-serif";
                
                /* Makes functions similar to the Processing JS functions. */
                // Returns a random number in a certain range.
                function random(min, max) {
                	if (!min) {
                		return Math.random();
                	}
                	if (!max) {
                		max = min;
                		min = 0;
                	}
                	return min + Math.random() * (max - min);
                };
                
                // Returns a number from a certain range.
                function lerp(num1, num2, amount) {
                	return num1 + (num2 - num1) * amount;
                };
                
                // Maps a number from one range to another.
                function map(num, start1, stop1, start2, stop2) {
                	return start2 + (num - start1) / stop1 * stop2;
                };
                
                // constrains a number to a certain range.
                function constrain(num, min, max) {
                	return Math.max(Math.min(num, max), min);
                };
                
                // Finds the distance between two points.
                function dist(x1, y1, x2, y2) {
                	return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
                };
                
                // Makes a color (returns a string).
                function color(r, g, b, a) {
                    if (Math.abs(r) > 255) {
                        if (g !== undefined && b === undefined) {
                            return color(red(r), green(r), blue(r), g);
                        }
                        return r;
                    }
                	a = a === undefined ? 255 : a;
                	r = Math.floor(r);
                	g = Math.floor(g);
                	b = Math.floor(b);
                	if (arguments.length === 0) {
                		r = 0;
                		g = 0;
                		b = 0;
                	} else if (arguments.length === 1 || arguments.length === 2) {
                		g = r;
                		b = r;
                	}
                	if (arguments.length === 2) {
                		a = g;
                	}
                	r = constrain(r, 0, 255);
                	g = constrain(g, 0, 255);
                	b = constrain(b, 0, 255);
                	a = constrain(a, 0, 255);
                	return a << 24 | r << 16 | g << 8 | b;
                };
                
                // Changes the color mode, can be RGB or HSB.
                function colorMode(mode) {
                	cMode = mode;
                };
                
                // Returns the red value of a color.
                function red(color) {
                	return (color >> 16) & 0xFF;
                };
                
                // Returns the green value of a color.
                function green(color) {
                	return (color >> 8) & 0xFF;
                };
                
                // Returns the blue value of a color.
                function blue(color) {
                	return color & 0xFF;
                };
                
                // Returns the opactiy of a color.
                function alpha(color) {
                	return (color >> 24) & 0xFF;
                };
                
                // Returns a string value color.
                function getUsableColor(c) {
                	if (typeof c === "string") {
                		return getColor(c);
                	} else if (typeof c === "number") {
                		if (red(c) < 0) {
                			return getColor(color(c));
                		}
                	}
                	return c;
                };
                
                // Return a color inbetween two colors.
                function lerpColor(c1, c2, amount) {
                    c1 = getUsableColor(c1);
                    c2 = getUsableColor(c2);
                    return color(
                        lerp(red(c1), red(c2), amount),
                        lerp(green(c1), green(c2), amount), 
                        lerp(blue(c1), blue(c2), amount), 
                        lerp(alpha(c1), alpha(c2), amount)
                    );
                };
                
                // Function for getting RGB values out of a hue value (credit to Stack Overflow / Wikipedia for help).
                function hToRGB (p, q, t) {
                	t += t < 0 ? 1 : t > 1 ? -1 : 0;
                	return (t < 1 / 6) ? (p + (q - p) * 6 * t) : 
                			(t < 1 / 2) ? q :
                			(t < 2 / 3) ? (p + (q - p) * (2 / 3 - t) * 6) :
                			p;
                };
                
                // Used for getting a color from a color object.
                function getColor(n1, n2, n3, n4) {
                	if (n1 === undefined) {
                		n1 = 0;
                		n2 = 0;
                		n3 = 0;
                		n4 = 1;
                	} else if (n2 === undefined) {
                		if (n1.isGrad) {
                			return n1.grad;
                		}
                		if (n1 < 0 || Math.abs(n1) > 255) {
                			let c = n1;
                			n1 = red(c) || 0;
                			n2 = green(c) || 0;
                			n3 = blue(c) || 0;
                			n4 = (alpha(c) / 255) || 1;
                		} else {
                			n2 = n1;
                			n3 = n1;
                			n4 = 1;
                		}
                	} else if (n3 === undefined) {
                		if (n1 < 0 || Math.abs(n1) > 255) {
                			let c = n1;
                			n4 = n2 / 255;
                			n1 = red(c);
                			n2 = green(c);
                			n3 = blue(c);
                		} else {
                			n2 = n1;
                			n3 = n1;
                			n4 = n2 / 255;
                		}
                	} else if (n4 === undefined) {
                		n4 = 1;
                	} else {
                		n4 /= 255;
                	}
                    if (cMode === "hsb") {
                		n1 /= 255;
                		n2 /= 255;
                		n3 /= 255 * 2;
                		let temp = n3;
                		n3 += (1 - n2) * temp;
                		
                		// Again, credit to Stack Overflow / Wikipedia for help with this part.
                		let q = n3 < 0.5 ? n3 * (1 - n2) : n3 + n2 - n3 * n2;
                		let p = 2 * n3 - q;
                		let r = hToRGB(p, q, n1 + 1 / 3);
                		let g = hToRGB(p, q, n1);
                		let b = hToRGB(p, q, n1 - 1 / 3);
                		n1 = Math.round(r * 255);
                		n2 = Math.round(g * 255);
                		n3 = Math.round(b * 255);
                	}
                	return "rgba(" + n1 + ", " + n2 + ", " + n3 + ", " + n4 + ")";
                };
                
                // Sets fill color.
                function fill(r, g, b, aVal) {
                	isFill = true;
                	ctx.fillStyle = getColor(r, g, b, aVal);
                };
                
                // Sets stroke color.
                function stroke(r, g, b, aVal) {
                	isStroke = true;
                	ctx.strokeStyle = getColor(r, g, b, aVal);
                };
                
                // Gets rid of stroke.
                function noStroke() {
                	isStroke = false;
                };
                
                // Gets rid of fill.
                function noFill() {
                	isFill = false;
                };
                
                // A sine function that converts from radians to degrees.
                function sin(angle) {
                	return Math.sin(angle / 180 * Math.PI);
                };
                
                // A cosine function that converts from radians to degrees.
                function cos(angle) {
                	return Math.cos(angle / 180 * Math.PI);
                };
                
                // An atan2 function.
                function atan2(x, y) {
                	return Math.atan2(x, y) / Math.PI * 180;
                };
                
                // Translates to a certain point.
                function translate(x, y) {
                	ctx.translate(x, y);
                };
                
                // Scales the drawing.
                function scale(w, h) {
                	if (h === undefined) {
                		ctx.scale(w, w);
                		return;
                	}
                	ctx.scale(w, h);
                };
                
                // Rotates the drawing.
                function rotate(angle) {
                	ctx.rotate(angle / 180 * Math.PI)
                };
                
                // Starts transformation.
                function pushMatrix() {
                	ctx.save();
                };
                
                // Finishes transformation.
                function popMatrix() {
                	ctx.restore();
                };
                
                // Sets the width of lines.
                function strokeWeight(width) {
                	ctx.lineWidth = width;
                };
                
                // Starts a complex shape.
                function beginShape() {
                	ctx.beginPath();
                };
                
                // Closes a complex shape.
                function endShape() {
                	if (isFill) {
                		ctx.fill();
                	}
                	if (isStroke) {
                		ctx.stroke();
                	}
                };
                
                // Sets the position of the path.
                function setPath(x, y) {
                	ctx.moveTo(x, y);
                };
                
                // Draws a vertex for a complex shape.
                function vertex(x, y) {
                	ctx.lineTo(x, y);
                };
                
                // Draws a curve vertex for a complex shape.
                function curveVertex(cx, cy, x, y) {
                	ctx.quadraticCurveTo(cx, cy, x, y);
                };
                
                // Draws a bezier vertex for a complex shape.
                function bezierVertex(cx1, cy1, cx2, cy2, x, y) {
                	ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x, y);
                };
                
                // Draws a curve.
                function curve(x1, y1, cx, cy, x2, y2) {
                	beginShape();
                	setPath(x1, y1);
                	curveVertex(cx, cy, x2, y2);
                	endShape();
                };
                
                // Draws a bezier.
                function bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2) {
                	beginShape();
                	setPath(x1, y1);
                	bezierVertex(cx1, cy1, cx2, cy2, x2, y2);
                	endShape();
                };
                
                // Draws a line.
                function line(x1, y1, x2, y2) {
                	beginShape();
                	vertex(x1, y1);
                	vertex(x2, y2);
                	endShape();
                };
                
                // Draws a rectangle.
                function rect(x, y, w, h, r, r2, r3, r4) {
                	r = r || 0;
                	r = constrain(r, -Math.min(w, h) / 2, Math.min(w, h) / 2);
                	if (r2 === undefined || r3 === undefined || r4 === undefined) {
                		r2 = r;
                		r3 = r;
                		r4 = r;
                	}
                	r2 = constrain(r2, -Math.min(w, h) / 2, Math.min(w, h) / 2);
                	r3 = constrain(r3, -Math.min(w, h) / 2, Math.min(w, h) / 2);
                	r4 = constrain(r4, -Math.min(w, h) / 2, Math.min(w, h) / 2);
                	beginShape();
                	setPath(x, y + r);
                	curveVertex(x, y, x + r, y);
                	vertex(x + w - r2, y);
                	curveVertex(x + w, y, x + w, y + r2);
                	vertex(x + w, y + h - r3);
                	curveVertex(x + w, y + h, x + w - r3, y + h);
                	vertex(x + r4, y + h);
                	curveVertex(x, y + h, x, y + h - r4);
                	vertex(x, y + r);
                	endShape();
                };
                
                // Draws an arc.
                function arc(x, y, w, h, start, stop) {
                	pushMatrix();
                	beginShape();
                	translate(x, y);
                	scale(1, h / w);
                	ctx.arc(0, 0, w / 2, start / 180 * Math.PI, stop / 180 * Math.PI);
                	endShape();
                	popMatrix();
                };
                
                // Draws an ellipse.
                function ellipse(x, y, w, h) {
                	w = Math.abs(w);
                	h = Math.abs(h);
                	arc(x, y, w, h, 0, 360);
                };
                
                // Draws a triangle.
                function triangle(x1, y1, x2, y2, x3, y3) {
                	beginShape();
                	vertex(x1, y1);
                	vertex(x2, y2);
                	vertex(x3, y3);
                	vertex(x1, y1);
                	endShape();
                };
                
                // Draws a quad.
                function quad(x1, y1, x2, y2, x3, y3, x4, y4) {
                	beginShape();
                	vertex(x1, y1);
                	vertex(x2, y2);
                	vertex(x3, y3);
                	vertex(x4, y4);
                	vertex(x1, y1);
                	endShape();
                };
                
                // Fills the background.
                function background(r, g, b, a) {
                	let prev = ctx.fillStyle;
                	var wasStroke;
                	if (isStroke) {
                		wasStroke = true;
                		isStroke = false;
                	}
                	fill(r, g, b, a);
                	ctx.fillRect(0, 0, width, height);
                	fill(prev);
                	if (wasStroke) {
                		isStroke = true;
                	}
                };
                
                // Sets text font.
                function textFont(font, size) {
                	ext = "";
                	if (font.toLowerCase().match(" small-caps")) {
                		font = font.substring(0, font.length - 11);
                		ext += "small-caps ";
                	}
                	if (font.toLowerCase().match(" italic")) {
                		font = font.substring(0, font.length - 7);
                		ext += "Italic ";
                	}
                	if (font.toLowerCase().match(" bold")) {
                		font = font.substring(0, font.length - 5);
                		ext += "Bold ";
                	} else if (font.toLowerCase().match(" black")) {
                		font = font.substring(0, font.length - 6);
                		ext += "Bolder ";
                	} else if (font.toLowerCase().match(" thin")) {
                		font = font.substring(0, font.length - 5);
                		ext += "Lighter ";
                	} else if (font.toLowerCase().match(" light")) {
                		font = font.substring(0, font.length - 6);
                		ext += "Lighter ";
                	}
                	size = size || txtSize;
                	txtSize = size;
                	mainFont = font;
                	ctx.font = ext + txtSize + "px " + mainFont;
                };
                
                // Sets text size.
                function textSize(size) {
                	txtSize = size || 20;
                	ctx.font = ext + txtSize + "px " + mainFont;
                };
                
                // Sets text alignment.
                function textAlign(align, baseline) {
                	ctx.textAlign = alignmentX[align];
                	ctx.textBaseline = alignmentY[baseline];
                };
                
                // Draws text.
                function text(txt, x, y) {
                	if (typeof txt !== "string") {
                		txt = txt.toString();
                	}
                	var txtList = [""];
                	for (var i = 0; i < txt.length; i++) {
                		if (txt.charAt(i) === "\n") {
                			txtList.push("");
                		} else {
                			txtList[txtList.length - 1] += txt.charAt(i);
                		}
                	}
                	for (var i = 0; i < txtList.length; i++) {
                		if (isFill) {
                			ctx.fillText(txtList[i], x, y - txtList.length * txtSize * txtLead / 2 + (i + 0.5) * txtSize * txtLead);
                		}
                		if (isStroke) {
                			ctx.strokeText(txtList[i], x, y - txtList.length * txtSize * txtLead / 2 + (i + 0.5) * txtSize * txtLead);
                		}
                	}
                };
                
                // Changes txtLead variable
                function textLeading(amount) {
                	txtLead = amount / 10;
                };
                
                // Changes the cursor.
                function cursor(name) {
                	document.body.style.cursor = name;
                };
                
                // Changes the a line's cap.
                function strokeCap(cap) {
                	ctx.lineCap = cap;
                };
                
                // Changes the joining mode between line segments.
                function strokeJoin(mode) {
                	ctx.lineJoin = mode;
                };
                
                // Creates a gradient.
                function createGradient(x1, y1, x2, y2) {
                	return {isGrad: true, grad: ctx.createLinearGradient(x1, y1, x2, y2)};
                };
                
                // Creates a gradient.
                function createRadGradient(x1, y1, r1, x2, y2, r2) {
                	return {isGrad: true, grad: ctx.createRadialGradient(x1, y1, r1, x2, y2, r2)};
                };
                
                // Adds a color to a gradient.
                function addColor(gradient, amount, color) {
                	gradient.grad.addColorStop(amount, getColor(color));
                };
                
                // My own function to create images.
                function getImage(shapes, width, height) {
                	let canvas = document.createElement("canvas");
                	canvas.width = width;
                	canvas.height = height;
                	canvas.display = "none";
                	
                	let prevContext = ctx;
                	ctx = canvas.getContext("2d");
                	
                	shapes();
                	
                	ctx = prevContext;
                	
                	return canvas;
                };
                
                // mask function "cuts out" one shape from another
                function mask() {
                	ctx.clip();
                };
                
                // Pixel manipulation
                function get(x, y, w, h) {
                	return ctx.getImageData(x, y, w, h);
                };
                
                function image(img, x, y, dX, dY, w, h) {
                	if (img instanceof ImageData) {
                		dX = arguments[3] || 0;
                		dY = arguments[4] || 0;
                		w = arguments[5] || img.width;
                		h = arguments[6] || img.height;
                		ctx.putImageData(img, x, y, dX, dY, w, h);
                	} else {
                		w = arguments[3] || img.width;
                		h = arguments[4] || img.height;
                		ctx.drawImage(img, x, y, w, h);
                	}
                };
                
                var imageData = get(0, 0, width, height);
                
                function getPixel(x, y) {
                	return x + y * width << 2;
                };
                
                function overwritePixel(x, y, c) {
                	var p = getPixel(x, y);
                	imageData.data[p] = red(c);
                	imageData.data[p + 1] = green(c);
                	imageData.data[p + 2] = blue(c);
                	imageData.data[p + 3] = alpha(c);
                };
                
                function editPixel(x, y, plus) {
                	var p = getPixel(x, y);
                	imageData.data[p] += plus;
                	imageData.data[p + 1] += plus;
                	imageData.data[p + 2] += plus;
                };
                
                function lerpPixel(x, y, c, l) {
                	var p = getPixel(x, y);
                	imageData.data[p] = lerp(imageData.data[p], red(c), l);
                	imageData.data[p + 1] = lerp(imageData.data[p + 1], green(c), l);
                	imageData.data[p + 2] = lerp(imageData.data[p + 2], blue(c), l);
                	imageData.data[p + 3] = lerp(imageData.data[p + 3], alpha(c), l);
                };		
                
                // My drawing functions
                function shear (theta, flip, h) {
                    rotate(-flip * theta / 2);
                    scale(sin(theta / 2), cos(theta / 2));
                    rotate(45);
                    scale(sqrt(2) / sin(theta), sqrt(2) * h);
                };
                
                function circQuad (x1, y1, x2, y2, x3, y3, x4, y4, lerpAmt) {
                    var pts = [
                        {x : lerp(x1, x2, 0.5), y : lerp(y1, y2, 0.5)},
                        {x : lerp(x2, x3, 0.5), y : lerp(y2, y3, 0.5)},
                        {x : lerp(x3, x4, 0.5), y : lerp(y3, y4, 0.5)},
                        {x : lerp(x4, x1, 0.5), y : lerp(y4, y1, 0.5)}
                    ];
                    
                    beginShape();
                    vertex(pts[0].x, pts[0].y);
                    bezierVertex(
                        lerp(pts[0].x, x2, lerpAmt),
                        lerp(pts[0].y, y2, lerpAmt), 
                        lerp(pts[1].x, x2, lerpAmt), 
                        lerp(pts[1].y, y2, lerpAmt),
                        pts[1].x,
                        pts[1].y
                    );
                    bezierVertex(
                        lerp(pts[1].x, x3, lerpAmt),
                        lerp(pts[1].y, y3, lerpAmt), 
                        lerp(pts[2].x, x3, lerpAmt), 
                        lerp(pts[2].y, y3, lerpAmt),
                        pts[2].x, 
                        pts[2].y
                    );
                    bezierVertex(
                        lerp(pts[2].x, x4, lerpAmt),
                        lerp(pts[2].y, y4, lerpAmt), 
                        lerp(pts[3].x, x4, lerpAmt), 
                        lerp(pts[3].y, y4, lerpAmt),
                        pts[3].x, 
                        pts[3].y
                    );
                    bezierVertex(
                        lerp(pts[3].x, x1, lerpAmt),
                        lerp(pts[3].y, y1, lerpAmt), 
                        lerp(pts[0].x, x1, lerpAmt), 
                        lerp(pts[0].y, y1, lerpAmt),
                        pts[0].x, 
                        pts[0].y
                    );
                    endShape();
                }
                
                function lerpFour (p1, p2, p3, p4, lx, ly, pers, vanish) {
                    var zs = [
                        (p1.z - vanish) / pers,
                        (p2.z - vanish) / pers,
                        (p3.z - vanish) / pers,
                        (p4.z - vanish) / pers
                    ];
                    
                    var topL = lerp(p1.x / zs[0], p2.x / zs[1], lx),
                        bottomL = lerp(p4.x / zs[3], p3.x / zs[2], lx),
                        leftL = lerp(p1.y / zs[0], p4.y / zs[3], ly),
                        rightL = lerp(p2.y / zs[1], p3.y / zs[2], ly);
                    
                    return {
                        x : lerp(topL, bottomL, ly),
                        y : lerp(leftL, rightL, lx)
                    };
                }
                
                // Special methods
                Array.prototype.random = function() {
                	return this[Math.floor(random(this.length))];
                };
                
                Number.prototype.smooth = function(dest, div) {
                	return (dest - this) / div;
                };
                
                String.prototype.reverse = function() {
                	let ret = "";
                	for (var i = this.length - 1; i >= 0; i--) {
                		ret += this.charAt(i);
                	}
                	return ret;
                };
                
                // Math functions
                Math.smooth = function(pos, dest, div) {
                	return (dest - pos) / div;
                };
                
                Math.equal = function(obj1, obj2) {
                	return obj1.x === obj2.x && obj1.y === obj2.y;
                };
                
                Math.overRect = function(x, y, w, h) {
                	return (mouseX > x && mouseX < x + w) && (mouseY > y && mouseY < y + h);
                };
                
                // Interactivity
                // Moves the mouseX and mouseY variables.
                document.body.addEventListener("mousemove", function(event) {
                    pmouseX = mouseX;
                    pmouseY = mouseY;
                	mouseX = event.pageX;
                	mouseY = event.pageY;
                	mouseButton = event.button;
                	
                	if (mouseIsPressed) {
                	    mouseDragged();
                	}
                }, false);
                
                // Moves the mouseX and mouseY variables.
                document.body.addEventListener("touchmove", function(event) {
                    pmouseX = mouseX;
                    pmouseY = mouseY;
                	mouseX = event.pageX;
                	mouseY = event.pageY;
                	mouseButton = event.button;
                	
                	if (mouseIsPressed) {
                	    mouseDragged();
                	}
                }, false);
                
                // Checks for key pressed events.
                body.addEventListener("keydown", function(event) {
                	event.preventDefault();
                	keyCode = event.keyCode;
                	keyPressed();
                }, false);
                
                // Checks for key released events.
                body.addEventListener("keyup", function(event) {
                	event.preventDefault();
                	keyCode = event.keyCode;
                	keyReleased();
                }, false);
                
                // Checks for when the mouse is clicked.
                body.addEventListener("mousedown", function(event) {
                	mouseIsPressed = true;
                	mouseButton = event.button;
                }, false);
                
                // Checks for when the mouse is clicked.
                body.addEventListener("touchstart", function(event) {
                	mouseIsPressed = true;
                	mouseButton = event.button;
                }, false);
                
                // Checks for when the mouse is clicked.
                body.addEventListener("mouseup", function(event) {
                	mouseClicked();
                	mouseIsPressed = false;
                	mouseButton = event.button;
                }, false);
                
                // Checks for when the mouse is clicked.
                body.addEventListener("touchend", function(event) {
                	mouseClicked();
                	mouseIsPressed = false;
                	mouseButton = event.button;
                }, false);
                
                // Uses the draw function and frameRate variable.
                function intervalId () {
                	setTimeout(function() {
                		frameCount ++;
                		draw();
                		intervalId();
                	}, 1000 / frameRate);
                };
                
                intervalId();
                };
