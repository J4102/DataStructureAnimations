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
        var newY = this.y-this.itemHeight;

        for(var i = this.numItems-1; i >= 0; i--)
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

            newY-=(this.itemHeight+10);

            this.resize(newY);
        }

        //Container of stack
        c.beginPath();
        c.moveTo(this.x-10, newY+5);
        c.lineTo(this.x-10, this.y+10);
        c.lineTo(this.x+this.itemWidth+10, this.y+10);
        c.lineTo(this.x+this.itemWidth+10, newY+5);
        c.stroke();

    }

    this.pop = function()
    {

        if(this.numItems == 0)
            return;
        
        this.numItems--;

        this.data.shift();
        this.colors.shift();
        
        
        this.draw();
    }

    this.push = function(num)
    {
        this.numItems++;

        this.data.unshift(num);
        this.colors.unshift(this.availColors[this.numItems % 4]);

        this.draw();
    }


    this.resize = function(y)
    {
        if(y-this.itemHeight < 0)
        {
            this.y+=(this.itemHeight*2);
            
            var newHeight = this.y+20;
            canvas.height = newHeight;
            canvas.style.height = ""+newHeight+"px";
            
            animation.style.height = ""+newHeight+"px";
            animation.height = newHeight;
        }
    }
    
}