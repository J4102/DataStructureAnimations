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
    this.data = [];
    this.treeHeight = 0;

    //1st node
    this.root = new Node(data[0], null, null);
    this.data.push(data[0]);

    this.numItems = 1;
    

    this.getRoot = function()
    {
        return this.root;
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

    this.findMinNode = function(parent) 
    { 
        // if left of a node is null 
        // then it must be minimum node 
        if(parent.left === null) 
            return parent; 
        else
            return this.findMinNode(parent.left); 
    } 

    this.insertNode = function(parent, node)
    {

        console.log(this.data);

        if(parent.x < node.x)
        {
            if(parent.right === null)
            {
                if(this.data.includes(node.x))
                {
                    window.alert("You cannot add duplicates to the tree!");
                    return;
                }

                parent.right = node;
                this.numItems++;
                this.data.push(node.x);
                this.updateTreeSpacing();
            }
            else
                this.insertNode(parent.right, node);
        }
        else
        {
            if(parent.left === null)
            {
                if(this.data.includes(node.x))
                {
                    window.alert("You cannot add duplicates to the tree!");
                    return;
                }

                parent.left = node;
                this.numItems++;
                this.data.push(node.x);
                this.updateTreeSpacing();
            }
            else
                this.insertNode(parent.left, node);
        }
    }

    this.delete = function(x)
    {
        this.root = this.deleteNode(this.root, x);
    }

    this.deleteNode = function(parent, x)
    {
        if(parent === null)
        {
            window.alert("Could not find value in tree!");
            return null;
        }
        else if(x < parent.x)
        {
            parent.left = this.deleteNode(parent.left, x);
            return parent;
        }
        else if(x > parent.x)
        {
            parent.right = this.deleteNode(parent.right, x);
            return parent;
        }
        //Found node
        else
        {
            //No children
            if(parent.left === null && parent.right === null)
            {
                parent = null;
                this.numItems--;

                const index = this.data.indexOf(x);
                this.data.splice(index, 1);

                return parent;
            }

            else if(parent.left === null)
            {
                this.numItems--;
                parent = parent.right;

                const index = this.data.indexOf(x);
                this.data.splice(index, 1);

                return parent;
            }
            else if(parent.right === null)
            {
                this.numItems--;
                parent = parent.left;

                const index = this.data.indexOf(x);
                this.data.splice(index, 1);

                return parent;
            }

                //For 2 children
                var tmp = this.findMinNode(parent.right);

                const index = this.data.indexOf(parent.x);
                this.data.splice(index, 1);

                parent.x = tmp.x;
                this.data.push(parent.x);
                parent.right = this.deleteNode(parent.right, tmp.x);

                console.log(this.data);
                return parent;
            

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
        for(var i = 1; i < data.length; i++)
        {
            this.insertNode(this.root, new Node(data[i], null, null));
        }
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

        this.resize(newY, newX);
    }

    this.resize = function(y, x)
    {
        if(y > animation.clientHeight)
        {
            var newHeight = animation.clientHeight + (3*(this.itemRadius + this.spacing))
            canvas.height = newHeight;
            canvas.style.height = ""+newHeight+"px";

            animation.style.height = ""+newHeight+"px";
            animation.height = newHeight;

        }

        if(x > animation.clientWidth || x < 0)
        {
            var newWidth = animation.clientWidth + (3*(this.itemRadius + this.spacing))
            canvas.width = newWidth;
            canvas.style.width = ""+newWidth+"px";

            animation.style.width = ""+newWidth+"px";
            animation.width = newWidth;

        }
    }

    //ex. 17 items, make the height related to 16
    //Create stats for the tree using this method
    //After every insert
    this.updateTreeSpacing = function()
    {
        //Compare size with lowest power of two
        var lowestPowOf2 = 1;

        while(lowestPowOf2 < this.numItems)
        {
            if(lowestPowOf2*2 > this.numItems)
            {
                break;
            }
            
            lowestPowOf2*=2;
        }

        var newSpacing = lowestPowOf2 *30 ;

        this.spacing = newSpacing;

    }
}