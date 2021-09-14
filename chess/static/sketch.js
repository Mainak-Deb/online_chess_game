var sx=440,sy=20,l=80;
var bb,bg,bh,bm,bn,br,wb,wg,wh,wm,wn,wr;
var ci=4,cj=4;
var ti,tj,fi,fj;
console.log(mytype,room_code,username)

var chess=[
  [4,1,2,3,5,2,1,4],
  [0,0,0,0,0,0,0,0],
  [100,100,100,100,100,100,100,100],
  [100,100,100,100,100,100,100,100],
  [100,100,100,100,100,100,100,100],
  [100,100,100,100,100,100,100,100],
  [6,6,6,6,6,6,6,6],
  [6+4,6+1,6+2,6+3,6+5,6+2,6+1,6+4]
]

var paths=[]
for (let i = 0; i < 8; i++) {
  let a=[]  
  for (let j = 0; j < 8; j++) {
    a.push(0)
  }paths.push(a)
}

var run=false;
var currentpos=[8,8];
var currentchar;



function preload() {
  bb = loadImage('https://mainak-deb.github.io/web-ChessBoard-/Image/b_bore-removebg-preview.png');
  bg = loadImage('https://mainak-deb.github.io/web-ChessBoard-/Image/b_ghora-removebg-preview.png');
  bm = loadImage('https://mainak-deb.github.io/web-ChessBoard-/Image/b_hati-removebg-preview.png');
  bh = loadImage('https://mainak-deb.github.io/web-ChessBoard-/Image/b_montri-removebg-preview.png');
  bn = loadImage('https://mainak-deb.github.io/web-ChessBoard-/Image/b_nouka-removebg-preview.png');
  br = loadImage('https://mainak-deb.github.io/web-ChessBoard-/Image/b_raja-removebg-preview.png');

  wb = loadImage('https://mainak-deb.github.io/web-ChessBoard-/Image/w_bore-removebg-preview.png');
  wg = loadImage('https://mainak-deb.github.io/web-ChessBoard-/Image/w_ghora-removebg-preview.png');
  wm = loadImage('https://mainak-deb.github.io/web-ChessBoard-/Image/w_hati-removebg-preview.png');
  wh = loadImage('https://mainak-deb.github.io/web-ChessBoard-/Image/w_montri-removebg-preview.png');
  wn = loadImage('https://mainak-deb.github.io/web-ChessBoard-/Image/w_nouka-removebg-preview.png');
  wr = loadImage('https://mainak-deb.github.io/web-ChessBoard-/Image/w_raja-removebg-preview.png');
}
function setup() {
  createCanvas(1530,700);
  print(paths)
}
function draw() {
  
  background(150);
  var ghuti=[bb,bg,bh,bm,bn,br,wb,wg,wh,wm,wn,wr];
  //black and white
  for (let i = 0; i < 8; i++) {  
    for (let j = 0; j < 8; j++) {
      
      if((i+j)%2==0) {
        fill(255,255,255);
      }else {
        fill(0,0,0);
      }
      if((run) && (paths[i][j]==1)){
        if((i+j)%2==0) {
          fill(51, 204, 255);
        }else {
          fill(1, 27, 112);
        }
      }
      rect(sx+j*l,sy+i*l,l,l);
      
      if((chess[i][j]<12)  && !( (i==currentpos[0]) && (j==currentpos[1]))){
        image(ghuti[chess[i][j]],sx+j*l,sy+i*l,l,l);
      }
      
    }
  }
  //green
  if((((sx<mouseX) && (mouseX<(sx+(l*8))) )&& ( (sy<mouseY) && (mouseY<(sy+(l*8))))) && (!run)){
    cj= parseInt((mouseX-sx)/l);
    ci= parseInt((mouseY-sy)/l);
    //print(ci,cj)
    fill(0,255,0);
    rect(sx+cj*l,sy+ci*l,l,l);
    
    if((chess[ci][cj]<12) && !((ci==currentpos[0]) && (cj==currentpos[1]))) {
      image(ghuti[chess[ci][cj]],sx+cj*l,sy+ci*l,l,l);
    }
    
  }
  if(run){
    let dragpos=getgrid(mouseX,mouseY);
    
    image(ghuti[chess[currentpos[0]][currentpos[1]]],mouseX-l/2,mouseY-l/2,l,l);
  }
  
}
function swap(i1,j1,i2,j2){
  var temp=chess[i1][j1];
  chess[i1][j1]=chess[i2][j2];
  chess[i2][j2]=temp;
}


function getgrid(x,y){
  return [parseInt((y-sy)/l),parseInt((x-sx)/l)]
  
}


function mousePressed() {
    print("pressed")
    if(((sx<=mouseX)  &&((sx+(l*8))>mouseX)) && ((sy<=mouseY) &&(((sy+(l*8))>mouseY)) )){
    let pos=getgrid(mouseX,mouseY)
    console.log("chess",chess[pos[0]][pos[1]])
    if(chess[pos[0]][pos[1]]!=100){
      if(!run){
        run=true;
        currentpos=pos
        currentchar=chess[pos[0]][pos[1]];
        if((currentchar%6)==1){
          ghora(currentpos)
        }else if((currentchar%6)==2){
          hati(currentpos)
        }else if((currentchar%6)==4){
          nouka(currentpos)
        }else if((currentchar%6)==3){
          nouka(currentpos)
          hati(currentpos)
        }
        else if((currentchar%6)==5){
          raja(currentpos)
        }else if((currentchar%6)==0){
          bore(currentpos)
        }
      }
    }

}
}
function mouseReleased() {
  print("released")
  if(((sx<=mouseX)  &&((sx+(l*8))>mouseX)) && ((sy<=mouseY) &&(((sy+(l*8))>mouseY)) )){
    let pos=getgrid(mouseX,mouseY)
    print(chess[pos[1]][pos[0]])
    if(run){
      
      console.log("nowpos",pos,"=",paths[pos[0]][pos[1]])
      if((!eqpos(pos,currentpos)) && (paths[pos[0]][pos[1]]==1)){  
        print(chess[pos[0]][pos[1]],chess[currentpos[0]][currentpos[1]])
        chess[pos[0]][pos[1]]=chess[currentpos[0]][currentpos[1]]
        chess[currentpos[0]][currentpos[1]]=100
        run=false;
        print(chess[pos[0]][pos[1]],chess[currentpos[0]][currentpos[1]])
        currentpos=[8,8]
      }else{
        run=false;
        currentpos=[8,8]
      }
      reset()
    }
  }
}



function eqpos(a,b){
    if((a[0]==b[0]) && (a[1]==b[1])){
        return true
    }
    else{
        return false;
    }
}

function type_ghuti(v){
  print(v)
  if((0<=v) &&(v<6)){
    return "b"
  }else if((6<=v) &&(v<12)){
    return "w"
  }else if(v==100){
    return "o"
  }
}