// getting a reference to our HTML element
const canvas = document.querySelector('canvas')

// getting 2D context of canvas
const c = canvas.getContext('2d')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// var mouse = {
//     x: undefined, 
//     y: undefined
// }

// const MAX_RADIUS = 40;
// const MIN_RADIUS = 10;


window.addEventListener("mousemove", 

    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;

    }

);

window.addEventListener("resize", function(event)
{
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    // init();
});

// function Circle(x, y, dx, dy, radius)
// {
//     this.x = x;
//     this.y = y;
//     this.dx = dx;
//     this.dy = dy;
//     this.radius = radius
//     var r = Math.random() * 255;
//     var g = Math.random() * 255;
//     var b = Math.random() * 255;


//     this.draw = function()
//     {
//         c.beginPath();
//         c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);

//         c.fillStyle = "rgb("+r+","+g+","+b+")";
        
//         c.fill();

//     }

//     this.update = function()
//     {
//         if(this.x+30 > innerWidth || this.x-this.radius < 0)
//             this.dx = -this.dx;

//         if(this.y + radius > innerHeight || this.y-radius < 0)
//             this.dy = -this.dy;

//         this.x += this.dx;
//         this.y += this.dy;

//         this.draw();

//         //Interacting
//         if(Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y - this.y) < 50)
//         {
//             if(this.radius < MAX_RADIUS)
//             {
//                 this.radius+=1;
//             }
//         }
//         else if(this.radius > MIN_RADIUS)
//         {
//             this.radius-=1;
//         }


//     }
// }


// var circleArray = [];



// function init()
// {
//     circleArray = [];

//     for(var i = 0; i < 600; i++)
//     {
//     var rad = Math.random() * 15;
//     var x = (Math.random() * innerWidth) - rad*2 + rad;
//     var y = (Math.random() * innerHeight) -rad*2 + rad;
//     var dx = (Math.random() - 0.5) * 3;
//     var dy = (Math.random() - 0.5) * 3;
//     circleArray.push(new Circle(x, y, dx, dy, rad))
//     }
// }

//x & y == top left corner of stack
function Stack(x, y, itemWidth, itemHeight, numItems, speed)
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
            

            //Draw text on rectangle   
            //c.fillText("1", this.x, this.y, this.itemWidth, this.itemHeight);

        }
    }

    this.pop()
    {
        this.numItems--;
        this.y-=this.itemHeight;
        
        this.draw();
    }

    this.push()
    {
        this.numItems++;
        this.y+=this.itemHeight;

        this.draw();
    }

    /*
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
    ------------------------NON INTERACTIVE MOVING THE RECTANGLES -----------------------------
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
    */



    /*
    Remove item functions  

    1. Remove the item
    2. Move to the right
    3. Move it down
    */
    this.removeTopItem = function()
    {
        if(numItems == 0)
            console.log("No items to remove!");

        //Animate removing item here
        c.fillStyle = "#FFFFFF";
        c.strokeStyle = "#FFFFFF";
        c.fillRect(this.x, this.y, this.itemWidth, this.itemHeight);
        c.strokeRect(this.x, this.y, this.itemWidth, this.itemHeight);

        //Refreshes colors
        c.fillStyle = "#ABCD05";
        c.strokeStyle="#000000";
        
        //New stack height
        this.y+=this.itemHeight;
        
        this.numItems = this.numItems-1;

    }


    //Moves the top stack item to the right
    this.moveRight = function()
    {
        this.currX+=this.speed;
        c.beginPath();
        c.fillRect(this.currX, this.currY, this.itemWidth, this.itemHeight);
        c.strokeRect(this.currX, this.currY, this.itemWidth, this.itemHeight);

        this.draw();
    }

    //Moves the top stack item down
    this.moveDown = function()
    {
        this.currY+=this.speed;
        c.beginPath();
        c.fillRect(this.currX, this.currY, this.itemWidth, this.itemHeight);
        c.strokeRect(this.currX, this.currY, this.itemWidth, this.itemHeight);

        this.draw();
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

var stack = new Stack(100, 100, 100, 50, 3, 2);
stack.draw();

//These will determine which animations will be playing
var push = false;
var pop = true;
var removed = false;

var right = 0;
var down = 0;


function animate()
{
    //Creates animation for us, calls the function
    requestAnimationFrame(animate);

    //Refresh screen
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    if(pop)
    {
        if(!removed)
        {
            stack.removeTopItem();
            removed = true;
        }
        else if(right < stack.getItemWidth())
        {
            stack.moveRight();
            right+=stack.getSpeed();
        }
        else if(down < stack.getHeight())    
        {
            stack.moveDown();
            down+=stack.getSpeed();
        }
        //Repeat the animation again
        else
        {
            stack.reset();
            right = 0;
            down = 0;
            removed = false;

            //Wait 5 seconds here
        }
    }
    else if(push)
    {

    }


}

animate();

// init();
