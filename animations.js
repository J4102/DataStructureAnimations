// getting a reference to our HTML element
const canvas = document.querySelector('canvas')

// getting 2D context of canvas
const c = canvas.getContext('2d')

canvas.width = 800;
canvas.height = 800;

/*
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
    ------------------------LINKED LIST (DOUBLY) DATASTRUCTURE  -------------------------------
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
*/

function LinkedList(x, y, itemWidth, itemHeight, numItems, data)
{
    this.x = x;
    this.y = y;
    this.itemWidth = itemWidth;
    this.itemHeight = itemHeight;
    this.numItems = numItems;
    this.data = data;

    //Possible colors of the stack items
    this.availColors = ["#257CAF", "#F79B0E", "#109D7F", "#D00636"];

    //Colors being used
    this.colors = ["#257CAF", "#F79B0E", "#109D7F", "#D00636"];
    
    c.strokeStyle="black";

    //Draws stack on screen
    //Call it everytime to continously draw on the screen
    
    this.draw = function()
    {
        var newX = this.x;
        for(var i = 0; i < this.numItems; i++)
        {
            //Fill big rectangle
            c.fillStyle = this.colors[i];
            c.fillRect(newX, this.y, this.itemWidth, this.itemHeight);

            //Border of big rectangle
            c.lineWidth = 4;
            c.strokeRect(newX, this.y, this.itemWidth, this.itemHeight);

            

            //Left rectangle (prev)

            //Border left rectangle (prev)


            //Right rectangle (next)
            //Border right rectangle (next)


            //Text
            c.fillStyle = "#000000";
            c.font = '20px fantasy';
            c.fillText(this.data[i], newX+(itemWidth/2), (this.y + this.itemHeight/2), this.itemWidth, this.itemHeight);

            newX+= (this.itemWidth+50);
        }



        
        c.stroke();
    }
    
    
    


    
}



/*
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
    ------------------------QUEUE DATASTRUCTURE  ----------------------------------------------
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
*/

function Queue(x, y, itemWidth, itemHeight, numItems, data)
{
    //Current values - changes while items are being removed and added
    this.x = x;
    this.y = y;
    this.itemWidth = itemWidth;
    this.itemHeight = itemHeight;
    this.numItems = numItems;
    this.data = data;

    //Possible colors of the stack items
    this.availColors = ["#257CAF", "#F79B0E", "#109D7F", "#D00636"];

    //Colors being used
    this.colors = ["#257CAF", "#F79B0E", "#109D7F", "#D00636"];


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
        var newX = this.x;

        for(var i = 0; i < this.numItems; i++)
        {

            //Fill
            c.fillStyle = this.colors[i];
            c.fillRect(newX, this.y, this.itemWidth, this.itemHeight);

            //Border
            c.lineWidth = 4;
            c.strokeRect(newX, this.y, this.itemWidth, this.itemHeight);

            //Text
            c.fillStyle = "#000000";
            c.font = '20px fantasy';
            c.fillText(this.data[i], newX+(itemWidth/2), (this.y + this.itemHeight/2), this.itemWidth, this.itemHeight);

            newX+=(this.x+10);
        }

        
        c.stroke();
    }

    //Remove
    this.dequeue = function()
    {

        if(this.numItems == 0)
            return;
        
        this.numItems--;
        this.data.pop();
        this.colors.pop();
        
        this.draw();

        var snd = new Audio("sounds/pop.flac");
        snd.play();
    }

    //Add
    this.enqueue = function(num)
    {
        this.numItems++;
        this.data.unshift(num);

        this.colors.unshift(this.availColors[this.numItems % 4]);

        this.draw();

        var snd = new Audio("sounds/pop.flac");
        snd.play();
    }
}


/*
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
    ------------------------STACK DATASTRUCTURE  ----------------------------------------------
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
*/

//x & y == top left corner of stack
function Stack(x, y, itemWidth, itemHeight, numItems, data)
{   
    //Current values - changes while items are being removed and added
    this.x = x;
    this.y = y;
    this.itemWidth = itemWidth;
    this.itemHeight = itemHeight;
    this.numItems = numItems;
    this.data = data;

    //The possible color combinations
    this.availColors = ["#257CAF", "#F79B0E", "#109D7F", "#D00636"];

    //Colors of the stack items
    this.colors = ["#257CAF", "#F79B0E", "#109D7F", "#D00636"];



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
        var newY = this.y;

        for(var i = 0; i < this.numItems; i++)
        {
            
            //Fill
            c.fillStyle = this.colors[i];
            c.fillRect(this.x, newY, this.itemWidth, this.itemHeight);

            //Border
            c.lineWidth = 4;
            c.strokeRect(this.x, newY, this.itemWidth, this.itemHeight);

            //Text
            c.fillStyle = "#000000";
            c.font = '20px fantasy';
            c.fillText(this.data[i], this.x + (this.itemWidth/2), newY + (this.itemHeight/2), this.itemWidth, this.itemHeight);

            newY+=(this.itemHeight+10);
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

        this.data.shift();
        this.colors.shift();
        
        
        this.draw();

        var snd = new Audio("sounds/pop.flac");
        snd.play();
    }

    this.push = function(num)
    {
        this.numItems++;
        this.y-=this.itemHeight;

        this.data.unshift(num);
        this.colors.unshift(this.availColors[this.numItems % 4]);

        this.draw();

        var snd = new Audio("sounds/pop.flac");
        snd.play();
    }

}



/*
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
    ------------------------ Initializing object ----------------------------------------------
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
*/

// var stack = new Stack(100, 100, 200, 75, 4, [4,3,2,1]);
// stack.draw();

// var queue = new Queue(100, 100, 50, 125, 4, [1,2,3,4]);
// queue.draw();

var linkedList = new LinkedList(0, 300, 100, 50, 4, [1,2,3,4]);
linkedList.draw();




function animate()
{
    //Creates animation for us, calls the function
    requestAnimationFrame(animate);

    //Refresh screen
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    //Repeatedly draw the rectangle on the screen
    //queue.draw();
    //stack.draw();
    linkedList.draw();

}

animate();


/*
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
    ------------------------ Buttons Initialize- ----------------------------------------------
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
*/
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

document.getElementById("dequeueBtn").addEventListener("click",

    function()
    {
        queue.dequeue();
    }
);

document.getElementById("enqueueBtn").addEventListener("click",

    function()
    {
        queue.enqueue("1");
    }
);
