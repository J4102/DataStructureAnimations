/*
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
    ------------------------HASHTABLE DATASTRUCTURE  ------------------------------------------
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
*/

//x & y == top left corner of hashtable
function HashTable(x, y, itemWidth, itemHeight, size, initialData)
{   
    
    //Current values - changes while items are being removed and added
    this.x = x;
    this.y = y;
    this.itemWidth = itemWidth;
    this.itemHeight = itemHeight;
    this.size = size;

    //Data of hashtable
    this.initialData = initialData; //Only used once
    this.numItems = 0;
    this.data = [];

    this.needRehash = false;

    //The possible color combinations
    this.availColors = ["#257CAF", "#F79B0E", "#109D7F", "#D00636"];

    //Colors of items
    this.colors = [];

    c.strokeStyle="black";
        
    this.initialize = function()
    {
        for(var i = 0; i < this.size; i++)
        {
            this.data.push("");
            this.colors.unshift(this.availColors[this.data.length % 4]);
        }

        for(var i = 0; i < this.initialData.length; i++)
        {
            this.insert(this.initialData[i], false);
        }
    }

    //Draws hashtable on screen
    //Call it everytime to continously draw on the screen
    this.draw = function()
    {
        var newY = this.y-this.itemHeight;

        for(var i = this.size-1; i >= 0; i--)
        {
               
            //Fill
            c.fillStyle = this.colors[i];
            c.fillRect(this.x, newY, this.itemWidth, this.itemHeight);

            //Border
            c.lineWidth = 4;
            c.strokeRect(this.x, newY, this.itemWidth, this.itemHeight);

            newY-=(this.itemHeight+10);

            this.resize(newY);
        }

        
        var dataY = newY+(this.itemHeight+10);


        for(var i = 0; i < this.data.length; i++)
        {
            //Text
            c.fillStyle = "#000000";
            c.font = '20px fantasy';

            
            c.fillText(this.data[i], this.x + (this.itemWidth/2), dataY + (this.itemHeight/2), this.itemWidth, this.itemHeight);
            dataY+=(this.itemHeight+10);
        }

        //BUG 1 (below commented code)--------------------------------------------------------------
        //This container also appears inside the queue canvas for some reason
        //It gets called 4 times for some reason 
        //Think it's because javascript thinks that the queue is a hashtable b/c all the functions are the same
            //Maybe not b/ I changed the queue's method name and it didn't do anything

        //------------------------------------------------------------------------------

        //Container of stack
        // c.beginPath();
        // c.moveTo(this.x-10, newY+5);
        // c.lineTo(this.x-10, this.y+10);
        // c.lineTo(this.x+this.itemWidth+10, this.y+10);
        // c.lineTo(this.x+this.itemWidth+10, newY+5);
        // c.stroke();


        //If array is full
        if(this.numItems === this.data.length)
        {   
            this.needRehash = true;

            //Indicate increase in array size needed
            document.getElementById("incrSizeHashTableBtn").className = "other-btn-selected";
        }
    }


    //Check to see if this works
    this.remove = function(word)
    {
        if(this.data.includes(word))
        {
            const index = this.data.indexOf(word);
            this.data.splice(index, 1);
        }
        else
        {
            window.alert("HashTable: This element does not exist in the HashTable!");
        }

        this.numItems--;

        this.draw();

    }

    this.insert = function(word, init)
    {
        if(this.numItems === this.data.length)
        {
            
            window.alert("HashTable: There is no more available space in the HashTable, use the 'Increase Size' button!");
            return;
        }

        if(word.length > 4)
        {
            window.alert("HashTable: You may only insert strings of up to more than 4 characters!");
            return;
        }

        if(this.needRehash)
        {
            window.alert("HashTable: Please rehash your items before inserting more items!");
            return;
        }

        var index = this.hash(word);

        //Find available index in hashtable linear probing  (loop while there is index that are full)
        while(this.data[index] !== "")
        {

            index = ((index + 1) % this.data.length);
        }

        //PROBLEM: IT REPLACES WORDS THO

        this.data[index] = word;

        this.numItems++;

        this.draw();

    }

    this.hash = function(word)
    {
        var val = 7;

        for(var i = 0; i < word.length; i++)
        {
            val*=(word.charCodeAt(i));
            val+=331;

        }
        
        return (val % this.data.length);
    }

    this.resize = function(y)
    {
        if(y-this.itemHeight < 0)
        {
            this.y+=(this.itemHeight*1.5);

            var newHeight = this.y+20;
            canvas.height = newHeight;
            canvas.style.height = ""+newHeight+"px";

            animation.style.height = ""+newHeight+"px";
            animation.height = newHeight;
        }
    }

    //Helper function to find next available size
    this.getNextPrime = function(num) 
    {
        for (var i = num + 1;; i++) 
        {
            var isPrime = true;

            for (var d = 2; d * d <= i; d++) 
            {
                if (i % d === 0) 
                {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) 
            {
                return i;
            }
        }
    }

    this.rehash = function()
    {
        if(this.needRehash)
        {
            document.getElementById("rehashHashTableBtn").className = "other-btn";
            this.needRehash = false;
        }
        else
        {
            window.alert("HashTable: You may only rehash when the HashTable is full!");
            return;
        }

        //Copies old array into new array
        var newData = this.data.slice();

        //Resetting the array to empty vaues
        this.data = [];
        for(var i = 0; i < newData.length; i++)
        {
            this.data.push("");
        }

        //To increment it again through insert, set it to 0
        this.numItems = 0;

        for(var i = 0; i < newData.length; i++)
        {
            if(newData[i] !== "")
            {
                this.insert(newData[i]);
            }
        }

        
    }

    this.increaseSize = function()
    {
        document.getElementById("incrSizeHashTableBtn").className = "other-btn";

        this.size = this.getNextPrime(this.size);

        //Adding more empty items to fill in array
        while(this.data.length < this.size)
        {
            this.data.push("");
            this.colors.unshift(this.availColors[this.data.length % 4]);

        }

        if(this.needRehash)
        {
            document.getElementById("rehashHashTableBtn").className = "other-btn-selected";
        }

    }
}