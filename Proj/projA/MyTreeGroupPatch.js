/**
 * MyTreeGroupPatch
 * @constructor
 */
class MyTreeGroupPatch extends CGFobject {
    constructor(scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius,trunkTexture, topTexture) {
        super(scene);
        this.scene = scene;
        this.treePositions = [];

        /*for (var i = 0; i < 3; i++) {
            for(var j = 0; j < 3; j++) {
                this.trees.push(new MyTree(this.scene, i*2+Math.random()-0.5, j*2+Math.random()-0.5, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius, trunkTexture, topTexture));
            }
        }*/

        this.tree=new MyTree(this.scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius, trunkTexture, topTexture);

        for(var i = 0; i < 3; i++)
            for(var j = 0; j<3; j++)
                this.treePositions.push(i*2+Math.random()-0.5, j*2+Math.random()-0.5);
    }
    display() {
        for(var i = 0; i < this.treePositions.length; i=i+2) {
            this.scene.pushMatrix();
            this.scene.translate(this.treePositions[i], 0, this.treePositions[i+1]);
            this.tree.display();
            this.scene.popMatrix();
        }
    }
}