// getting a reference to our HTML element
const canvas = document.querySelector('canvas');

console.log("hi");
//var canvas = document.getElementById("canvas");

// getting 2D context of canvas
const c = canvas.getContext('2d');


//To match up canvas with animation's dimensions
const animation = document.getElementById("animation_container");

//Match up canvas dimenisons with actual box dimensions
canvas.height = animation.clientHeight;
canvas.width = animation.clientWidth;
canvas.style.width = ""+animation.clientWidth+"px";
canvas.style.height = ""+animation.clientHeight+"px";

//const btnMethods = document.getElementById("btn-methods");

//canvas.height = animation.clientHeight

//animation.style.height = ""+canvas.height+"px";

/*
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
    ------------------------ Initializing object ----------------------------------------------
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
*/

var stack = new Stack(canvas.width/2, canvas.height-20, 125, 40, 4, [4,3,2,1]);

var queue = new Queue(100, 100, 50, 125, 4, [1,2,3,4]);

var linkedListDoubly = new LinkedList(10, 100, 100, 50, 4, 100, "doubly",  [1,2,3,4]);
var linkedListSingly = new LinkedList(10, 100, 100, 50, 4, 100, "singly",  [1,2,3,4]);
var linkedListCircular = new LinkedList(40, 100, 100, 50, 4, 100, "circular",  [1,2,3,4]);

//Specific linked list to draw 
var linkedList;


//It doesn't matter what x & y for tree is
var tree = new BinaryTree(0, canvas.height, 20, 100,[10,3,15,17,2,4,12, 19,20,21, 1,0,13,12,11,4,5,6]);
tree.initialize();

var hashTable = new HashTable(canvas.width/2, canvas.height-20, 125, 40, 11, ["mo", "fun", "i", "huh"]);
hashTable.initialize();

var mode = "";
var webPage = window.location.pathname

setupBtns();

/*
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
    ------------------------ ANIMATION---------------------------------------------------------
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
*/

function animate()
{
    //Creates animation for us, calls the function
    requestAnimationFrame(animate);

    //Refresh screen
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    switch(mode)
    {
        case "linked_list_singly":
            linkedListSingly.draw();
            break;
        case "linked_list_doubly":
            linkedListDoubly.draw();
            break;
        case "linked_list_circular":
            linkedListCircular.draw();
            break;
        case "queue":
            queue.draw();
            break;
        case "stack":
            stack.draw();
            break;   
        case "tree":
            tree.draw(tree.getRoot(), canvas.width/2, 0, 1, "");
            break;
        case "hash_table":
            hashTable.draw();
            break;
    }


    //Repeatedly draw the rectangle on the screen
    //queue.draw();
    //stack.draw();
    //linkedList.draw();
    //tree.draw(tree.getRoot(), 500, 100, 1, "");

}

animate();

//Check if input size is 1 umber and is a number
function checkValidInput()
{
    var field = document.getElementById("inputField").value;
    return field.length == 1 && !isNaN(field);
}


/*
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
    ------------------------ Buttons Initialize- ----------------------------------------------
    -------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------
*/

function setupBtns()
{
    //LINKED LIST --------------------------------------------------------------
    if(webPage.includes("linkedlist.html"))
    {
        //By default, singly list will show
        mode = "linked_list_singly";
        document.getElementById("singlyBtn").className = "other-btn-selected";
        linkedList = linkedListSingly;

        var singlyBtn = document.getElementById("singlyBtn");
        var doublyBtn = document.getElementById("doublyBtn");
        var circularBtn = document.getElementById("circularBtn");

        //LINKED LIST------------------------------------------------------------
        document.getElementById("deleteBtn").addEventListener("click",

        function()
        {
            linkedList.delete();
        }
        );

        document.getElementById("insertBtn").addEventListener("click",

        function()
        {
            if(checkValidInput())
            {
                linkedList.insert(document.getElementById("inputField").value);
            }
            else
            {
                window.alert("Linked List: Please enter a single digit number!")
            }
        }
        );

        //Selected Modes of btns ----------------------------------------------------------

        singlyBtn.addEventListener("click",

        function()
        {
            mode= "linked_list_singly";
            singlyBtn.className = "other-btn-selected";
            doublyBtn.className = "other-btn";
            circularBtn.className = "other-btn";

            linkedList = linkedListSingly;
            
        }
        );

        doublyBtn.addEventListener("click",

        function()
        {
            mode= "linked_list_doubly";
            doublyBtn.className = "other-btn-selected";
            singlyBtn.className = "other-btn";
            circularBtn.className = "other-btn";

            linkedList = linkedListDoubly;
        }
        );

        circularBtn.addEventListener("click",

        function()
        {
            mode= "linked_list_circular";
            circularBtn.className = "other-btn-selected";
            doublyBtn.className = "other-btn";
            singlyBtn.className = "other-btn";

            linkedList = linkedListCircular;
        }
        );


        
    }

    //QUEUE --------------------------------------------------------------
    else if(webPage.includes("queue.html"))
    {
        document.getElementById("dequeueBtn").addEventListener("click",

        function()
        {
            queue.dequeue();
        }
        );

        document.getElementById("enqueueBtn").addEventListener("click",

        function()
        {
            if(checkValidInput())
            {
                queue.enqueue(document.getElementById("inputField").value);
            }
            else
            {
                window.alert("QUEUE: Please enter a single digit number!")
            }
        }
        );

        mode = "queue";
    }
    else if(webPage.includes("stack.html"))
    {
        document.getElementById("popBtn").addEventListener("click",

        function()
        {
            stack.pop();
        }
        );

        document.getElementById("pushBtn").addEventListener("click",

        function()
        {
            if(checkValidInput())
            {
                stack.push(document.getElementById("inputField").value);
            }
            else
            {
                window.alert("Stack: Please enter a single digit number!")
            }
        }
        );


        mode = "stack";
    }
    else if(webPage.includes("tree.html"))
    {
        document.getElementById("insertTreeNodeBtn").addEventListener("click",

            function()
            {
                if(checkValidInput())
                {
                    tree.insertNode(tree.getRoot(), new Node(document.getElementById("inputField").value, null, null));
                }
                else
                {
                    window.alert("Please enter a single digit number!")
                }
            }
            
        );

        mode = "tree";
    }
    else if(webPage.includes("hashtable.html"))
    {
        document.getElementById("insertHashTableBtn").addEventListener("click",

            function()
            {
                hashTable.insert(document.getElementById("inputField").value, false);
            }
        
        );

        document.getElementById("removeHashTableBtn").addEventListener("click",

            function()
            {
                hashTable.remove(document.getElementById("inputField").value);

            }
        
         );

         document.getElementById("rehashHashTableBtn").addEventListener("click",

            function()
            {
                hashTable.rehash();
            }
         
        );

        document.getElementById("incrSizeHashTableBtn").addEventListener("click",

            function()
            {
                hashTable.increaseSize();
            }
          
        );


        mode = "hash_table";
    }


}
