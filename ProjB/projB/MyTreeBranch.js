/**
 * MyTreeBranch
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTreeBranch extends CGFobject {
    constructor(scene, radius, x, y, z, rotate) {
        super(scene);
        this.scene = scene;

        this.x = this.y = this.z = this.rotate = null;

        if(x != null) this.x = x;
        if(y != null) this.y = y;
        if(z != null) this.z = z;
        if(rotate != null) this.rotate = rotate;

        this.cylinder = new MyCylinder(scene, 7, 1, radius);

        this.branchMaterial = new CGFappearance(scene);
        this.branchMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.branchMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.branchMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.branchMaterial.setShininess(1.0);
        this.branchMaterial.loadTexture('images/treeWood.jpg');
        this.branchMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }

    display() {
        this.scene.pushMatrix();
        if(this.x != null && this.y != null && this.z != null)
            this.scene.translate(this.x, this.y, this.z);
        if(this.rotate != null) {
            this.scene.rotate(this.rotate, 0, 1, 0);
            this.scene.rotate(Math.PI/2, 0, 0, 1);
        }
        this.branchMaterial.apply();
        this.cylinder.display();
        this.scene.popMatrix();
    }
}