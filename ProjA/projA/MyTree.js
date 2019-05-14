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

        this.trunk = new MyCylinder(scene, 8, trunkHeight, trunkRadius);
        this.top = new MyCone(scene, 8, treeTopHeight, treeTopRadius);

        this.roof = new MyPyramid(this.scene, 4);
    }
    
    display() {
        
        //Top
        this.scene.pushMatrix();
        this.scene.translate(0, this.trunkHeight, 0);
        this.treeTopTexture.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.top.display();
        this.scene.popMatrix();

        //Trunk
        this.scene.pushMatrix();
        this.trunkTexture.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.trunk.display();
        this.scene.popMatrix();

    }
}


