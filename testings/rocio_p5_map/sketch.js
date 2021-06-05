class Particle {
// setting the co-ordinates, radius and the
// speed of a particle in both the co-ordinates axes.
  constructor(_name,_x,_y){
    this.x = _x;
    this.y = _y;
    this.name = _name;
    this.r = 10;
    this.xSpeed = 0;
    this.ySpeed = 0;
  }

// creation of a particle.
  createParticle() {
    noStroke();
    fill('rgba(200,169,169,0.5)');
    circle(this.x,this.y,this.r);
  }

// setting the particle in motion.
  moveParticle() {
    if(this.x < 0 || this.x > width)
      this.xSpeed*=-1;
    if(this.y < 0 || this.y > height)
      this.ySpeed*=-1;
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
  }

// this function creates the connections(lines)
// between particles which are less than a certain distance apart
  joinParticles(particles) {
    particles.forEach(element =>{
      let dis = dist(this.x,this.y,element.x,element.y);
      if(dis<85) {
        stroke('rgba(255,255,255,0.04)');
        line(this.x,this.y,element.x,element.y);
      }
    });
  }
} // FIN CLASE






// an array to add multiple particles
let particles = [];
let municipalNames = ["Bcn", "Salou", "Vila", "Pont", "Sant"];
let municipalX = [120, 20, 30, 40, 50];
let municipalY = [10, 20, 30, 40, 50];
let data;

// preload table data
function preload() {
  data = loadTable(
    'test_tiles.csv',
    'csv',
    'header');
}

function setup() {
  createCanvas(720, 400);
  background(50);
  stroke(255);
  /*for(let i = 0;i<municipalNames.length;i++){
    particles.push(new Particle(municipalNames[i], municipalX[i], municipalY[i]));
    console.log(particles[i]);
  }*/

  for (var i = 0; i < data.getRowCount(); i++) { 
    // draw temperatures
    let xpos = (data.getNum(i, "V1")/1000);
    let ypos = (data.getNum(i, "V2")/1000 - 4400) / -1 + 400;
    // data.getNum(m, n) evaluates to the value in the
    // cell for row m in column n.
    // replace "TEMP" with some other column name to
    // display a different column.
    point(xpos, ypos);
    console.log(ypos)
  }

  // how many rows?
  console.log(data.getRowCount());
  // what are the columns?
  console.log(data.columns);
  console.log(data.getNum(1, "V2"));
}

function draw() {
  //background('#0f0f0f');
  /*for(let i = 0;i<particles.length;i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
    particles[i].joinParticles(particles.slice(i));
  }*/
}
