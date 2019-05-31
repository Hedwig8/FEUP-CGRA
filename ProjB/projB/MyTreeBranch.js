/**
 * MyTreeBranch
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTreeBranch extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;

        this.cylinder = new MyCylinder(scene, 7, 1, 0.6);

        this.branchMaterial = new CGFappearance(scene);
        this.branchMaterial.setAmbient(0.6, 0.4, 0.2, 1);
        this.branchMaterial.setDiffuse(0.6, 0.4, 0.2, 1);
        this.branchMaterial.setSpecular(0.6, 0.4, 0.2, 1);
        this.branchMaterial.setShininess(1.0);
    }

    display() {
        this.scene.pushMatrix();
        this.branchMaterial.apply();
        this.cylinder.display();
        this.scene.popMatrix();
    }
}