/**
 * MyTreeRowPatch
 * @constructor
 */
class MyTreeRowPatch extends CGFobject {
    constructor(scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius, trunkTexture, topTexture) {
        super(scene);
        this.scene = scene;
        this.trees = [];

        for (var i = 0; i < 6; i++) {
            this.trees.push(new MyTree(this.scene, i*2+Math.random()/2 -0.25, Math.random()-0.5, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius, trunkTexture, topTexture));
        }
    }
    display() {
        for(var i = 0; i < this.trees.length; i++) {
            this.trees[i].display();
        }
    }
}