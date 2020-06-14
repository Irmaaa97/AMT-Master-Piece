/*
Master Piece for the course AMT at the Univeristy of Twente
By Irma Harms
June 2020
*/


/*
variables for basic math
*/
var p0 = 1;
var p1 = 1;
var p2=1;
var p;

/*
array to store the padovan sequence
*/

var pad = [];

/*
variables for the buttons and sliders
*/
var enable_arc_button;         // Enable arc (for spiral)
var disable_arc_button;        // Disable arc (for spiral)
var arc_bool;                  // Boolean to enable/disable
 

var enable_square_button;      // Enable squares
var disable_square_button;     // Disable squares
var square_bool;               // Boolean to enable/disable

var enable_seq_button;         // Enable padovan sequence at corners
var disable_seq_button;        // Disable padovan sequence at corners
var seq_bool;                  // Boolean to enable/disable

var slider_rot;                // Modify sequence angle
var rot;                       // angle

var slider_scale;              // modify scale (relative size of triangles)
var s;                         // scale



function setup() {
//  rot = 60* PI /180;
  canvas_x = 950; canvas_y = 800;
  createCanvas(canvas_x, canvas_y);
  smooth();
  pad.length = 19-1;
  pad[0]=1;
  
    for ( var i = 1; i <= pad.length-1; i++ ) { 
    pad[i] = p0;
    p = p0 + p1;
    p0 = p1 ;
    p1 = p2;
    p2 = p;
//    print(pad + '\n');  // prints the padovan sequence that is stored in the array
  }
  
/*
Buttons and sliders
*/

  
  slider_rot = createSlider (0, 2*PI+0.5 , 60* PI /180, 0.01);
  slider_rot.position(width-150, 20);
  
  
  slider_scale = createSlider (3, 20, 10, 1);
  slider_scale.position(width-150, 60);
  
  
  arc_bool = false;
  enable_arc_button = createButton('ENABLE');
  enable_arc_button.position(width-150, 100);
  disable_arc_button = createButton('DISABLE');
  disable_arc_button.position(width-150+70, 100);
  
  
  square_bool = false;
  enable_square_button = createButton('ENABLE');
  enable_square_button.position(width-150, 140);
  disable_square_button = createButton('DISABLE');
  disable_square_button.position(width-150+70, 140);
  
  arc_bool = false;
  enable_seq_button = createButton('ENABLE');
  enable_seq_button.position(width-150, 180);
  disable_seq_button = createButton('DISABLE');
  disable_seq_button.position(width-150+70, 180);
  
}

function draw() {
  background(0);

  //Draw sliders and buttons background
  noStroke();
  fill(255, 20);
  rect(width-250, 0, 300, height)
  
  // Text for sliders and buttons
  textSize(13);
  fill(255);
  text('Rotation ' , width-225, 35)
  text('Scale ' , width-225, 75)
  text('Arcs ' , width-225, 115)
  text('Squares ' , width-225, 155)
  text('Triangle ' , width-225, 195)
  text('sequence at the corners ' , width-225, 215)
  
  // take values from sliders
  rot = slider_rot.value();
  s = slider_scale.value();

  
  // push&pop for triangles
  push();
  translate(width/2, height/2);
  rotate(-PI);
  strokeWeight(2);
  
  //Triangles + arcs + squares
  for ( let i = 1; i <= pad.length-1; i++ ) {
    translate( s* -1 * pad[i-1], s* 0);  // make sure each next triangle starts at the correct corner of the previous triangle
    rotate(-rot);  // lets the triangles move
    stroke(255);
    fill(150*(rot/2), 3*pad[i]*(rot/2), 30*pad[i],200)*(rot/2);
    triangle(0, 0, s*-1*pad[i], 0, s* -0.5 * pad[i], s* pad[i]* (sqrt(3)/2));  // drawing of the triangles with lengths according to the padovan sequence

    // red arcs at the bottom line of the triangles to create the padovan spiral when they are 'curled up', and/or red squares 

// enable or disable the arc
    if (arc_bool == true){
      stroke(200*(rot/2), 3*pad[i]*(rot/2), 30*pad[i]);
      noFill();
      push();
      strokeWeight(1);
      rotate(-PI);
      arc(0 + (s*0.5*pad[i]), 0, s*pad[i], s*pad[i]/6, 0, PI, OPEN);
      stroke(255);
      pop();
    }
    if (arc_bool == false){
       noFill();
    }
    enable_arc_button.mousePressed(enable_arc);
    disable_arc_button.mousePressed(disable_arc);
    //print("arc " + arc_bool + '\n');

// enable or disable the squares
    if (square_bool == true){
      stroke(200*(rot/2), 3*pad[i]*(rot/2), 30*pad[i]);
      fill(150*(rot/2), 3*pad[i]*(rot/2), 30*pad[i],30);
      push();
      strokeWeight(1);
      rotate(-PI);
      rect(0, 0, s*pad[i], s*pad[i]);
      stroke(255);
      pop();
    }
    if (square_bool == false){
       noFill();
    }
    enable_square_button.mousePressed(enable_square);
    disable_square_button.mousePressed(disable_square);
    //print("Square " + square_bool + '\n');
    
    // enable or disable the sequences at the corners
    if (seq_bool == true){
      push();
      strokeWeight(1);
      stroke(0,0,200,175);
      rotate(-rot);
      stroke(255);
      fill(150*(rot), 3*pad[i]*(rot), 30*pad[i],200)*(rot/2);
  //Triangles at corners
      for ( let j = 1; j <= pad.length-1; j++ ) {
        translate( (s/10)* -1 * pad[j-1], (s/10)* 0);  
        rotate(-rot);  
        triangle(0, 0, (s/10)*-1*pad[j], 0, (s/10)* -0.5 * pad[j], (s/10)* pad[j]* (sqrt(3)/2)); 
      }
        pop();
    }
    if (seq_bool == false){
       noFill();
    }
    enable_seq_button.mousePressed(enable_seq);
    disable_seq_button.mousePressed(disable_seq);
    print("Sequence " + seq_bool + '\n');
  }
  



  pop();
    
}

function enable_arc(){
  arc_bool = true;
}

function disable_arc(){
  arc_bool = false;
}

function enable_square(){
  square_bool = true;
}

function disable_square(){
  square_bool = false;
}

function enable_seq(){
  seq_bool = true;
}

function disable_seq(){
  seq_bool = false;
}
