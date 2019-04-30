class MyBranch extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;

        this.branch = new MyCylinder(this.scene, 4, 1, 0.5);

        this.branchMaterial = new CGFappearance(this.scene);
        this.branchMaterial.setAmbient(0.4, 0.2, 0.0, 1);
        this.branchMaterial.setDiffuse(0.4, 0.2, 0.0, 1);
        this.branchMaterial.setSpecular(0.4, 0.2, 0.0, 1);
        this.branchMaterial.setShininess(1.0);
    }

    display() {
        this.scene.pushMatrix();
        this.branchMaterial.apply();
        this.branch.display();
        this.scene.popMatrix();
    }
}