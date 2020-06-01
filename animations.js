// getting a reference to our HTML element
const canvas = document.querySelector('canvas')

// getting 2D context of canvas
const c = canvas.getContext('2d')

canvas.width = 800;
canvas.height = 800;



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

    c.fillStyle = "#ABCD05";
    c.strokeStyle="#000000";

    
    
    //Current stack item value (remove/add)
    this.currX = this.x;
    this.currY = this.y;

    //Original values
    this.oX = x;
    this.oY = y;
    this.oNumItems = numItems;

    //Draws stack on screen
    this.draw = function()
    {
        for(var i = 0; i < this.numItems; i++)
        {
            //Draw rectangle
            //100+0, 100+50, 100+100
            
            newY = this.y+(this.itemHeight*i);

            c.fillRect(this.x, newY, this.itemWidth, this.itemHeight);
            c.strokeRect(this.x, newY, this.itemWidth, this.itemHeight);
            
            c.fillStyle = "#000000";
            //Draw text on rectangle   
            c.fillText(data[i], this.x + (this.x/2), newY + (this.itemHeight/2), this.itemWidth, this.itemHeight);
            c.fillStyle = "#ABCD05";
        }
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

    /*
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
    ------------------------NON INTERACTIVE MOVING THE RECTANGLES -----------------------------
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
    */



    this.getItemWidth = function()
    {
        return this.itemWidth;
    }

    this.getitemHeight = function()
    {
        return this.itemHeight;
    }

    this.getHeight = function()
    {
        return this.numItems*this.itemHeight;
    }

    this.getSpeed = function()
    {
        return this.speed;
    }
}

/*
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
    ------------------------ Initializing object ----------------------------------------------
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
*/

var stack = new Stack(100, 100, 100, 100, 3, 2, [1,2,3]);
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
