class Controller {
  constructor (canvas) {
    this.canvas  = canvas.link;
    this.context = this.canvas.getContext('2d');
    this.checkbox = false;
    this.shields = [];
    this.timeout;
  }
  generateColor () {
    const generateNumber = Math.floor(8*Math.random());   // 0...7
    switch(generateNumber){
      case 0 : return 'blue';
      case 1 : return 'white';
      case 2 : return 'red';
      case 3 : return 'pink';
      case 4 : return 'orange';
      case 5 : return 'green';
      case 6 : return 'gray';
      case 7 : return 'purple';
    }
  }             

  start () {
    const counter = document.getElementById('score');
    if(!this.checkbox){
      let id = 0;
      counter.innerHTML = 0;          //counter reset 
      this.checkbox = true;
      const createSquare = () =>{
        id +=1;
        const generateCoordinateX = Math.floor(621*Math.random());  //0.....620
        const square = {posX:generateCoordinateX, posY:0, color: this.generateColor(), id:id}
        this.shields.push(square);

        const time = Math.floor(Math.random() * 51) + 5;  //5.....55
        const changeYCoordinate = setInterval(() => {
          square.posY +=1;
          if(square.posY > 480 ){
            clearInterval(changeYCoordinate);
            this.shields =  this.shields.filter(obj => obj.id !== square.id);
          }
        },time);

        // event per square
        this.canvas.addEventListener('click', (e) => {
          const CursorX = e.offsetX;
          const CursorY = e.offsetY;
          const squareX = square.posX;
          const squareY = square.posY;
          if  (CursorX >= squareX && CursorX <= squareX+20          //20 - square dimensions
            && CursorY >= squareY && CursorY<=squareY+20){
            counter.innerHTML ++;
            square.posY = 481;           // Y coordinate of the square went out of the field, the SetInterval stopped
            this.shields =  this.shields.filter(obj => obj.id !== square.id);
          }
        });
      }

      const generateTime = () => {
        if(!this.checkbox) return 0;

        const time = Math.floor(Math.random() * 7001) + 100;   // 100ms.....7s
        this.timeout = setTimeout(() =>{        
            createSquare();
            generateTime();
        },time)
      }

      generateTime();
      this.animate.call(this);
    }
  }

  stop () {
    if(this.checkbox){
      this.checkbox = false;
      this.shields =  this.shields.filter(obj => {
        obj.posY = 482;     
        return false; 
      });
      clearTimeout(this.timeout);
    }
  }

  animate () {
    this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientWidth);

    this.shields.forEach((square) => {
      this.context.fillStyle = square.color;
      this.context.fillRect(square.posX,square.posY,20,20);
    });
      if(this.checkbox){
      requestAnimationFrame(this.animate.bind(this));
    }
  }
}

let controller = new Controller(_canvas);
