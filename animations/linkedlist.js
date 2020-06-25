/*
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
    ------------------------LINKED LIST (SINGLY,DOUBLY,CIRCULAR) DATASTRUCTURE  ---------------
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
*/

function LinkedList(x, y, itemWidth, itemHeight, numItems, spacing, mode,  data)
{
    this.x = x;
    this.y = y;
    this.itemWidth = itemWidth;
    this.itemHeight = itemHeight;
    this.numItems = numItems;
    this.data = [];

    for(var i = 0; i < data.length; i++)
    {
        this.data.push(data[i]);
    }
    this.spacing = spacing;
    this.mode = mode;

    console.log(this.data);

    //Possible colors of the stack items
    this.availColors = ["#257CAF", "#F79B0E", "#109D7F", "#D00636"];

    //Colors being used
    this.colors = ["#257CAF", "#F79B0E", "#109D7F", "#D00636"];
    
    c.strokeStyle="black";

    //Call it everytime to continously draw on the screen
    
    this.draw = function()
    {
        c.fillStyle = "#000000";
        c.font = '20px fantasy';


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
            c.fillText(this.data[i], newX+(this.itemWidth/2), (this.y + this.itemHeight/2), this.itemWidth, this.itemHeight);

            c.stroke();

            newX+= (this.itemWidth+spacing);

            
        }

        //Drawing arrows btn the rectangles
        newX = this.x;
        for(var i = 0; i < this.numItems-1; i++)
        {

            //Middle arrow
            if(mode === "singly" || mode === "circular")
            {
                c.beginPath();
                //Top Arrow - horizontal line
                c.moveTo(newX+this.itemWidth+(this.spacing/4), this.y+(this.itemHeight/2));
                c.lineTo(newX+this.itemWidth+((this.spacing/4)*3), this.y+(this.itemHeight/2));
    
                //Top arrow - top diagonal
                c.moveTo(newX+this.itemWidth+((this.spacing/4)*2), this.y+(this.itemHeight/4)); //move to tip of arrow
                c.lineTo(newX+this.itemWidth+((this.spacing/4)*3), this.y+(this.itemHeight/2)); //move back to horizontal
                
                //Top arrow - bottom diagonal
                c.lineTo(newX+this.itemWidth+((this.spacing/4)*2), this.y+((this.itemHeight/4)*3)); //draw down to tip of arrow
    
                c.stroke();
            }
            
            else
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

            }

            newX+= (this.itemWidth+spacing);

            this.resize(newX);
        }

        if(mode === "circular")
        {
            c.lineWidth = 4;

            //Circle arrow coords
            var arrowX = newX -(this.itemWidth/2) + this.spacing;
            var arrowY = this.y + this.itemHeight+this.spacing/4;

            //Connector
            c.moveTo(arrowX, arrowY);
            c.lineTo(arrowX, arrowY+ (this.spacing/4 *3));
            c.lineTo(40+(this.itemWidth/2), arrowY+ (this.spacing/4 *3));
            c.lineTo(40+(this.itemWidth/2), arrowY);

            //Arrows
            c.lineTo(40+(this.itemWidth/2)-10, arrowY+30);
            c.moveTo(40+(this.itemWidth/2), arrowY);
            c.lineTo(40+(this.itemWidth/2)+10, arrowY+30);

            c.stroke();
        }

    }

    //Remove
    this.delete = function(index)
    {

        if(this.numItems == 0)
        {
            window.alert("There are no elements!")
            return;
        }

        if(index > 0 || index > this.numItems)
        {
            window.alert("This element does not exist in the linked list!")
            return;
        }

        if(index > this.numItems || index < 0)
        {
            window.alert("This index is not between 0 and " + (this.numItems-1)+"!");
            return;
        }

        this.data.splice(index, 1);
        this.colors.splice(index, 1);
        
        this.numItems--;

        var snd = new Audio("sounds/pop.flac");
        snd.play();
    }

    //Add
    this.insert = function(index, num)
    {
        if(index > this.numItems || index < 0)
        {
            window.alert("This index is not between 0 and " + (this.numItems-1)+"!");
            return;
        }
        
        this.numItems++;
        this.data.splice(index, 0, num);

        this.colors.splice(index, 0, this.availColors[this.numItems % 4]);

        var snd = new Audio("sounds/pop.flac");
        snd.play();
    }
    
    this.resize = function(x)
    {
        if(this.itemWidth+x > animation.clientWidth)
        {
            var newWidth = animation.clientWidth + (3*(this.itemWidth + this.spacing))
            canvas.width = newWidth;
            canvas.style.width = ""+newWidth+"px";

            animation.style.width = ""+newWidth+"px";
            animation.width = newWidth;

        }
    }

    this.getSize = function()
    {
        return this.numItems;
    }
}
