/**
* MyTree
* @constructor
*/
class MyTree extends CGFobject {
    constructor(scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius, trunkTexture, treeTopTexture) {
        super(scene);
        
        this.scene = scene;
        this.trunkHeight = trunkHeight;
        this.trunkTexture = trunkTexture;
        this.treeTopTexture = treeTopTexture;

        this.trunk = new MyCylinder(scene, 16, trunkHeight, trunkRadius);
        this.top = new MyCone(scene, 16, treeTopHeight, treeTopRadius);
    }
    
    display() {
        
        //Top
        this.scene.pushMatrix();
        this.scene.translate(0, this.trunkHeight, 0);
        this.treeTopTexture.apply();
        this.top.display();
        this.scene.popMatrix();

        //Trunk
        this.scene.pushMatrix();
        this.trunkTexture.apply();
        this.trunk.display();
        this.scene.popMatrix();
    }
}


