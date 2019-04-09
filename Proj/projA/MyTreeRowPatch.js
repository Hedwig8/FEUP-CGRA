/**
 * MyTreeRowPatch
 * @constructor
 */
class MyTreeRowPatch extends CGFobject {
    constructor(scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius, trunkTexture, topTexture) {
        super(scene);
        this.scene = scene;
        this.treePositions = [];

        for (var i = 0; i < 6; i++) {
            this.treePositions.push( i*2+Math.random()/2 -0.25, Math.random()-0.5);
        }
    
        this.tree = new MyTree(this.scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius, trunkTexture, topTexture);
    }
    display() {
        for(var i = 0; i < this.treePositions.length; i+=2) {
            this.scene.pushMatrix();
            this.scene.translate(this.treePositions[i],0, this.treePositions[i+1]);
            this.tree.display();
            this.scene.popMatrix();
        }
    }
}