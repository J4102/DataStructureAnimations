// getting a reference to our HTML element
const canvas = document.querySelector('canvas')

// getting 2D context of canvas
const c = canvas.getContext('2d')

canvas.width = 1500;
canvas.height = 1500;

/*
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
    ------------------------BINARY TREE DATASTRUCTURE  ----------------------------------------
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
*/

function Node(x, left, right)
{
    this.x = x;
    this.left = left;
    this.right = right;
}

function BinaryTree(x, y, itemRadius,spacing, data)
{
    this.x = x;
    this.y = y;
    this.itemRadius = itemRadius;
    this.spacing = spacing;
    
    //Data can only be numbers!
    this.data = data;
    this.numItems = this.data.length;
    this.treeHeight = 0;

    root = new Node(data[0], null, null);

    this.getRoot = function()
    {
        return root;
    }

    /* 
    ----------------------------------------------------------
    Node Information------------------------------------------
    -----------------------------------------------------------
    */

    //USE Height function and then work on formula 
    //Spacing / height - this formula for newX ensures no overlap
    this.getHeight = function(node)
    {
        if(node == null)
            return -1;

        leftHeight = this.getHeight(node.left);
        rightHeight = this.getHeight(node.right);

        if(leftHeight > rightHeight)
            return leftHeight + 1;
        else
            return rightHeight + 1;
            

    }

    this.insertNode = function(parent, node)
    {
        if(parent.x < node.x)
        {
            if(parent.right === null)
            {
                parent.right = node;
            }
            else
                this.insertNode(parent.right, node);
        }
        else
        {
            if(parent.left === null)
            {
                parent.left = node;
            }
            else
                this.insertNode(parent.left, node);
        }
    }

    this.deleteNode = function(parent, x)
    {
        if(parent === null)
        {
            return null;
        }
        else if(x < parent.data)
        {
            parent.left = deleteNode(parent.left, x);
            return parent;
        }
        else if(x > parent.x)
        {
            parent.right = deleteNode(parent.right, x);
            return parent;
        }
        //Found node
        else
        {
            //No children
            if(parent.left === null && parent.right === null)
            {
                parent = null;
                return parent;
            }

            if(parent.left === null)
            {
                parent = parent.right;

            }
        }
    }


    this.traverse = function(parent)
    {
        if(parent == null)
            return;
        
        this.traverse(parent.left);
        this.traverse(parent.right);
        console.log(parent.x);
    }

    this.initialize = function()
    {
        //data array is inserted into a binary tree structure in the order of items
        for(var i = 1; i < this.data.length; i++)
        {
            this.insertNode(root, new Node(data[i], null, null));
        }

        this.treeHeight = this.getHeight(root);
        this.spacing = 20*this.treeHeight;

        console.log(this.spacing);

    }

    this.draw = function(node,newX, newY, disFactor, lineDirec)
    {
        if(node == null)
        {
            disFactor/=2;
            return;
        }
        
        this.draw(node.left, newX-(this.spacing/disFactor), newY+(this.spacing), disFactor*2, "left");
        this.draw(node.right, newX+(this.spacing/disFactor), newY+(this.spacing), disFactor*2, "right");

        //Drawing of circle
        c.beginPath();
        c.arc(newX,newY, itemRadius, 0, Math.PI*2, false);
        c.fillStyle = "red";
        c.strokeStyle = "black";
        c.fill();
        c.stroke();

         //Text
        c.fillStyle = "#000000";
        c.font = '20px fantasy';
        c.fillText(node.x, newX-5, newY+5);

        //Drawing of connecting line
        if(lineDirec === "left")
        {
            c.beginPath();
            c.moveTo(newX, newY-this.itemRadius);
            c.lineTo(newX+(this.spacing/(disFactor/2)), newY-this.spacing+this.itemRadius);
            c.stroke();
        }
        else if(lineDirec === "right")
        {
            c.beginPath();
            c.moveTo(newX, newY-this.itemRadius);
            c.lineTo(newX-(this.spacing/(disFactor/2)), newY-this.spacing+this.itemRadius);
            c.stroke();

        }
    }



    


}

/*
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
    ------------------------LINKED LIST (DOUBLY) DATASTRUCTURE  -------------------------------
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
*/

function LinkedList(x, y, itemWidth, itemHeight, numItems, spacing, data)
{
    this.x = x;
    this.y = y;
    this.itemWidth = itemWidth;
    this.itemHeight = itemHeight;
    this.numItems = numItems;
    this.data = data;
    this.spacing = spacing;

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

            

            //Left line (prev)
            c.beginPath();
            c.moveTo(newX+(this.itemWidth/4), this.y);
            c.lineTo(newX+(this.itemWidth/4), this.y+this.itemHeight);
            c.stroke();

            //Right line (next)
            c.beginPath();
            c.moveTo(newX+((this.itemWidth/4)*3), this.y);
            c.lineTo(newX+((this.itemWidth/4)*3), this.y+this.itemHeight);
            c.stroke();


            //Text
            c.fillStyle = "#000000";
            c.font = '20px fantasy';
            c.fillText(this.data[i], newX+(itemWidth/2), (this.y + this.itemHeight/2), this.itemWidth, this.itemHeight);

            c.stroke();

            newX+= (this.itemWidth+spacing);
        }

        //Drawing arrows btn the rectangles
        newX = this.x;
        for(var i = 0; i < this.numItems-1; i++)
        {
            //---------------------Top Arrow (next)--------------------------------------

            c.beginPath();
            //Top Arrow - horizontal line
            c.moveTo(newX+this.itemWidth+(this.spacing/4), this.y+(this.itemHeight/6));
            c.lineTo(newX+this.itemWidth+((this.spacing/4)*3), this.y+(this.itemHeight/6));

            //Top arrow - top diagonal
            c.moveTo(newX+this.itemWidth+((this.spacing/4)*2), this.y); //move to tip of arrow
            c.lineTo(newX+this.itemWidth+((this.spacing/4)*3), this.y+(this.itemHeight/6)); //move back to horizontal
            
            //Top arrow - bottom diagonal
            c.lineTo(newX+this.itemWidth+((this.spacing/4)*2), this.y+((this.itemHeight/6)*2)); //draw down to tip of arrow

            c.stroke();


            //--------------------Bottom arrow (prev)----------------------------
            
            c.beginPath();

            //horizontal line
            c.moveTo(newX+this.itemWidth+(this.spacing/4), this.y+(this.itemHeight/6)*5);
            c.lineTo(newX+this.itemWidth+((this.spacing/4)*3), this.y+(this.itemHeight/6)*5);

            //Top diagonal 
            c.moveTo(newX+this.itemWidth+((this.spacing/4)*2), this.y+((this.itemHeight/6)*4)); //move to tip of arrow
            c.lineTo(newX+this.itemWidth+((this.spacing/4)), this.y+((this.itemHeight/6)*5)); //move back to horizontal

            //Bottom diagonal -
            c.moveTo(newX+this.itemWidth+(this.spacing/4)*2, this.y+this.itemHeight);
            c.lineTo(newX+this.itemWidth+((this.spacing/4)), this.y+((this.itemHeight/6)*5));

            
            c.stroke();

            newX+= (this.itemWidth+spacing);
        }

    }

    //Remove
    this.delete = function()
    {

        if(this.numItems == 0)
            return;
        
        this.numItems--;
        this.data.pop();
        this.colors.pop();

        var snd = new Audio("sounds/pop.flac");
        snd.play();
    }

    //Add
    this.insert = function(num)
    {
        this.numItems++;
        this.data.push(num);

        this.colors.push(this.availColors[this.numItems % 4]);

        var snd = new Audio("sounds/pop.flac");
        snd.play();
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

// var linkedList = new LinkedList(30, 1000, 100, 50, 4, 100, [1,2,3,4]);
// linkedList.draw();

var tree = new BinaryTree(100, 100, 20, 100,[10,3,15,17,2,4,12, 19,20,21, 1,0,13,12,11,4,5,6]);
tree.initialize();




function animate()
{
    //Creates animation for us, calls the function
    requestAnimationFrame(animate);

    //Refresh screen
    c.clearRect(0, 0, canvas.width, canvas.height);

    //Repeatedly draw the rectangle on the screen
    //queue.draw();
    //stack.draw();
    //linkedList.draw();
    tree.draw(tree.getRoot(), 500, 100, 1, "");

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

document.getElementById("deleteBtn").addEventListener("click",

    function()
    {
        linkedList.delete();
    }
);

document.getElementById("insertBtn").addEventListener("click",

    function()
    {
        linkedList.insert("1");
    }
);

document.getElementById("insertTreeNodeBtn").addEventListener("click",

    function()
    {
        tree.insertNode(tree.getRoot(), new Node(1, null, null));
    }
);