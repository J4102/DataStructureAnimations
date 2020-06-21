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