/**
 * MyTreeBranch
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTreeBranch extends CGFobject {
    constructor(scene, radius) {
        super(scene);
        this.scene = scene;

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
        this.branchMaterial.apply();
        this.cylinder.display();
        this.scene.popMatrix();
    }
}