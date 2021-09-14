function ghora(pos){
    paths[pos[0]][pos[1]]=1
    points=[[2,1],[2,-1],[-2,1],[-2,-1],
            [1,2],[-1,2],[1,-2],[-1,-2]]
    for(let i=0;i<points.length;i++){
        let a=[pos[0]+points[i][0],pos[1]+points[i][1]]
        if(validpos(a[0],a[1])){
            if(type_ghuti(chess[pos[0]][pos[1]])!=type_ghuti(chess[a[0]][a[1]])){
                console.log(type_ghuti(chess[pos[0]][pos[1]]),type_ghuti(chess[a[0]][a[1]]))
                paths[a[0]][a[1]]=1
            }
        }
    }
    print(paths)
}
function bore(pos){
    paths[pos[0]][pos[1]]=1
    if(type_ghuti(chess[pos[0]][pos[1]])=="w"){
        points=[[-1,0],[-1,-1],[-1,1]]
    }else if(type_ghuti(chess[pos[0]][pos[1]])=="b"){
        points=[[1,0],[1,-1],[1,1]]
    }
    
    let i=0
    let a=[pos[0]+points[i][0],pos[1]+points[i][1]];print(a)
    if(type_ghuti(chess[a[0]][a[1]])=="o"){
        paths[a[0]][a[1]]=1; 
    }
    for(let j=1;j<points.length;j++){
        a=[pos[0]+points[j][0],pos[1]+points[j][1]]
        if(type_ghuti(chess[pos[0]][pos[1]])==oppose(type_ghuti(chess[a[0]][a[1]]))) {
            paths[a[0]][a[1]]=1; 
        }
    }


}


function nouka(pos){
    paths[pos[0]][pos[1]]=1
    points=[[0,1],[0,-1],[1,0],[-1,0]]
    for(let j=0;j<points.length;j++){
        let a=[pos[0],pos[1]];
        let touch=true;
        while((validpos(a[0],a[1])) && (touch)){  
            if(!eqpos(pos,a)){
                if((type_ghuti(chess[a[0]][a[1]])=="o") && (touch)){
                    paths[a[0]][a[1]]=1; 
                }
                else if((type_ghuti(chess[pos[0]][pos[1]])==oppose(type_ghuti(chess[a[0]][a[1]])))  && (touch)){
                    paths[a[0]][a[1]]=1; 
                    touch=false;
                }
                else if((type_ghuti(chess[pos[0]][pos[1]])==type_ghuti(chess[a[0]][a[1]])) && (touch)){
                    print(type_ghuti(chess[pos[0]][pos[1]]),type_ghuti(chess[a[0]][a[1]]))
                    console.log(pos,a)
                    touch=false;
                }
                console.log(a,touch)
            }
            a[0]=a[0]+points[j][0]
            a[1]=a[1]+points[j][1]

        }
    }
    
    console.log("paths",paths)
}

function hati(pos){
    paths[pos[0]][pos[1]]=1
    points=[1,-1]
    for(let i=0;i<points.length;i++){
        for(let j=0;j<points.length;j++){
            let a=[pos[0],pos[1]];
            let touch=true;
            while(validpos(a[0],a[1])){            
                if(!eqpos(pos,a)){
                    if((type_ghuti(chess[a[0]][a[1]])=="o") && (touch)){
                        paths[a[0]][a[1]]=1; 
                    }
                    else if((type_ghuti(chess[pos[0]][pos[1]])==oppose(type_ghuti(chess[a[0]][a[1]])))  && (touch)){
                        paths[a[0]][a[1]]=1; 
                        touch=false;
                    }
                    else if((type_ghuti(chess[pos[0]][pos[1]])==type_ghuti(chess[a[0]][a[1]])) && (touch)){
                        print(type_ghuti(chess[pos[0]][pos[1]]),type_ghuti(chess[a[0]][a[1]]))
                        console.log(pos,a)
                        touch=false;
                    }
                    console.log(a,touch)
                }
                a[0]=a[0]+points[i]
                a[1]=a[1]+points[j]
            }
        }
    }
    console.log("paths",paths)
}

function raja(pos){
    console.clear()
    paths[pos[0]][pos[1]]=1
    points=[[0,1],[0,-1],[1,0],[-1,0],[-1,1],[-1,-1],[1,1],[1,-1]]
    
    for(let j=0;j<points.length;j++){
        let a=[pos[0]+points[j][0],pos[1]+points[j][1]];print(a)
        if((!eqpos(pos,a)) && (validpos(a[0],a[1]))){           
            if(type_ghuti(chess[a[0]][a[1]])=="o"){
                paths[a[0]][a[1]]=1; 
            }else if((type_ghuti(chess[pos[0]][pos[1]])==oppose(type_ghuti(chess[a[0]][a[1]])))){
                paths[a[0]][a[1]]=1; 
                touch=false;
            }else if((type_ghuti(chess[pos[0]][pos[1]])==type_ghuti(chess[a[0]][a[1]]))){
                print(type_ghuti(chess[pos[0]][pos[1]]),type_ghuti(chess[a[0]][a[1]]))
                console.log(pos,a)
                touch=false;
            }
            
        }
    }
}


function reset(){
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
         paths[i][j]=0;
        }
    }
}


function validpos(x,y){
    if(((0<=x) && (x<8)) &&( (0<=y) && (y<8))){
            return true
    }else{
        return false
    }
}
function oppose(a){
    print("op",a)
    if(a=="w") {return "b"}
    else if(a=="b") {return "w"}
    else{return "x"}
}