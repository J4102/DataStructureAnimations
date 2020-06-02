// getting a reference to our HTML element
const canvas = document.querySelector('canvas')

// getting 2D context of canvas
const c = canvas.getContext('2d')

canvas.width = 800;
canvas.height = 800;


/*
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
    ------------------------STACK DATASTRUCTURE  ----------------------------------------------
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
*/

//x & y == top left corner of stack
function Stack(x, y, itemWidth, itemHeight, numItems, speed, data)
{   
    //Current values - changes while items are being removed and added
    this.x = x;
    this.y = y;
    this.itemWidth = itemWidth;
    this.itemHeight = itemHeight;
    this.numItems = numItems;
    this.speed = speed;

    //Colors of the stack items
    this.colors = ["#257CAF", "#F79B0E", "#109D7F", "#D00636"]


    c.strokeStyle="black";
    
    
    //Current stack item value (remove/add)
    this.currX = this.x;
    this.currY = this.y;

    //Original values
    this.oX = x;
    this.oY = y;
    this.oNumItems = numItems;

    //Draws stack on screen
    //Call it everytime to continously draw on the screen
    this.draw = function()
    {
        newY = 0;

        for(var i = 0; i < this.numItems; i++)
        {
            
            //Starting height
            newY = this.y+(this.itemHeight*i);

            //Fill
            c.fillStyle = this.colors[i%this.colors.length];
            c.fillRect(this.x, newY, this.itemWidth, this.itemHeight-10);

            //Border
            c.lineWidth = 4;
            c.strokeRect(this.x, newY, this.itemWidth, this.itemHeight-10);

            //Text
            c.fillStyle = "#000000";
            c.font = '20px fantasy';
            c.fillText(data[i], this.x + (this.itemWidth/2), newY + (this.itemHeight/2), this.itemWidth, this.itemHeight);
        }

        //Container of stack
        c.beginPath();
        c.moveTo(this.x-10, this.y-20);
        c.lineTo(this.x-10, newY+this.itemHeight);
        c.lineTo(this.x+this.itemWidth+10, newY+this.itemHeight);
        c.lineTo(this.x+this.itemWidth+10, this.y-20);
        c.stroke();
    }

    this.pop = function()
    {

        if(this.numItems == 0)
            return;
        
        this.numItems--;
        this.y+=this.itemHeight;
        
        this.draw();

        var snd = new Audio("sounds/pop.flac");
        snd.play();
    }

    this.push = function(num)
    {
        this.numItems++;
        this.y-=this.itemHeight;
        data.unshift(num);

        this.draw();

        var snd = new Audio("sounds/pop.flac");
        snd.play();
    }

    this.reset = function()
    {
        this.x = this.oX;
        this.y = this.oY;
        this.currX = this.x;
        this.currY = this.y;
        this.numItems = this.oNumItems;

        this.draw();
    }
}



/*
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
    ------------------------ Initializing object ----------------------------------------------
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
*/

var stack = new Stack(100, 100, 200, 75, 4, 2, [4,3,2,1]);
stack.draw();

//These will determine which animations will be playing
var push = false;
var pop = true;
var removed = false;

var right = 0;
var down = 0;

var max = 3;

function animate()
{
    //Creates animation for us, calls the function
    requestAnimationFrame(animate);

    //Refresh screen
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    //Repeatedly draw the rectangle on the screen
    stack.draw();

}

animate();

document.getElementById("popBtn").addEventListener("click",

    function()
    {
        stack.pop();
    }
);

document.getElementById("pushBtn").addEventListener("click",

    function()
    {
        stack.push("yoyo");
    }
);

// init();
