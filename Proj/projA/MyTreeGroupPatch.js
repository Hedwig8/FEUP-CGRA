/**
 * MyTreeGroupPatch
 * @constructor
 */
class MyTreeGroupPatch extends CGFobject {
    constructor(scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius,trunkTexture, topTexture) {
        super(scene);
        this.scene = scene;
        this.trees = [];

        for (var i = 0; i < 3; i++) {
            for(var j = 0; j < 3; j++) {
                this.trees.push(new MyTree(this.scene, i*2+Math.random()-0.5, j*2+Math.random()-0.5, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius, trunkTexture, topTexture));
            }
        }
    }
    display() {
        for(var i = 0; i < this.trees.length; i++) {
            this.trees[i].display();
        }
    }
}