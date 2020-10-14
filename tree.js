function Node(data) {
    this.data = data
    this.children = []
}

class Tree {
    constructor() {
        this.root = null
    }

    add(data, toNodeData) {
        const node = new Node(data);

        const parent = toNodeData ? this.findBFS(toNodeData) : null

        if (parent) {
            parent.children.push(node)
        } else {
            if (!this.root) {
                this.root = node
            } else {
                return "Tried to return node at root when root already exists"
            }
        }


    }

    delete(toNodeData) {
        const parent = toNodeData ? this.findParent(toNodeData) : null

        if (parent) {
            parent.children.forEach(child => {
                if (child.data == toNodeData) {
                    let index = parent.children.indexOf(child)
                    if (index > -1) {
                        parent.children.splice(index, 1);
                    }
                } else {
                    return "No such node present in the tree"
                }

            })
        }
    }

    findParent(data) {
        let _node = null

        this.traverseBFS((node) => {
            node.children.forEach(child => {
                if (child.data == data)
                    _node = node
            });
        })

        return _node
    }

    findBFS(data) {
        const queue = [this.root]
        let _node = null

        this.traverseBFS((node) => {
            if (node.data == data)
                _node = node
        })

        return _node
    }

    traverseBFS(cb) {
        const queue = [this.root]

        if (cb)
            while (queue.length) {
                const node = queue.shift()

                cb(node)

                for (const child of node.children) {
                    queue.push(child)
                }
            }
    }


}

const draw = node => {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();


    if (node.data.type === "Line") {
        console.log("Line => ", node)
        ctx.moveTo(node.data.startPoint[0], node.data.startPoint[1]);
        ctx.lineTo(node.data.endPoint[0], node.data.endPoint[1]);
    } else if (node.data.type === "Square") {
        console.log("Square => ", node)
        ctx.rect(node.data.startPoint[0], node.data.startPoint[1], node.data.length, node.data.length);
        ctx.font = "10px Arial";
        ctx.fillText("Circle", 10, 10)
    } else if (node.data.type === "Rectangle") {
        console.log("Rectangle => ", node)
        ctx.fillStyle = "#0000ff"
        ctx.fillRect(node.data.startPoint[0], node.data.startPoint[1], node.data.width, node.data.length);
        ctx.fillStyle = "white"
        ctx.font = "40px Arial";
        // ctx.fillText(node.data.text, node.data.startPoint[0] + 50, node.data.startPoint[1] + 60);

        if (node.data.text === "My_Window") {
            ctx.font = "40px Arial";
            ctx.fillText(node.data.text, node.data.startPoint[0] + 40, node.data.startPoint[1] + 100);
            ctx.fillText("x", node.data.startPoint[0] + 10, node.data.startPoint[1] + 40);
            ctx.fillText("_", node.data.startPoint[0] + 40, node.data.startPoint[1] + 30);
        } else{
            ctx.fillText(node.data.text, node.data.startPoint[0] + 50, node.data.startPoint[1] + 60);
        }
    } else if (node.data.type === "Circle") {
        console.log("Circle => ", node)
        ctx.arc(node.data.center[0], node.data.center[1], node.data.radius, node.data.startAngle, node.data.endAngle);
    }
    ctx.stroke();
}

(function () {
    let tree = new Tree();

    let node_1 = {
        id: "Node1",
        type: "Rectangle",
        startPoint: [250, 500],
        length: 100,
        width: 300,
        text: "My_Button"
    }
    tree.add(node_1)

    let node_2 = {
        id: "Node2",
        type: "Rectangle",
        startPoint: [1500, 1000],
        length: 300,
        width: 300,
        text: "My_Window"
    }
    tree.add(node_2, node_1)
    node_2.parentPointer = tree.findParent(node_2)

    let node_3 = {
        id: "Node3",
        type: "Rectangle",
        startPoint: [800, 800],
        length: 100,
        width: 300,
        text: "My_Menu"
    }
    tree.add(node_3, node_1)
    node_3.parentPointer = tree.findParent(node_3)

    let node_4 = {
        id: "Node4",
        type: "Rectangle",
        startPoint: [800, 910],
        length: 100,
        width: 300,
        text: "Item1"
    }
    tree.add(node_4, node_3)
    node_4.parentPointer = tree.findParent(node_4)

    let node_5 = {
        id: "Node4",
        type: "Rectangle",
        startPoint: [800, 1020],
        length: 100,
        width: 300,
        text: "Item2"
    }
    tree.add(node_5, node_3)
    node_5.parentPointer = tree.findParent(node_5)

    let node_6 = {
        id: "Node4",
        type: "Rectangle",
        startPoint: [800, 1130],
        length: 100,
        width: 300,
        text: "Item3"
    }
    tree.add(node_6, node_3)
    node_6.parentPointer = tree.findParent(node_6)

    let node_7 = {
        id: "Node5",
        type: "Rectangle",
        startPoint: [2000, 500],
        length: 100,
        width: 300,
        text: "My_TextBox"
    }
    tree.add(node_7, node_4)
    node_7.parentPointer = tree.findParent(node_7)


    tree.traverseBFS(node => { console.log("Current node: ", node); draw(node) })
})()