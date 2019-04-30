class MyLeaf extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;

        this.triangle = new MyTriangle(this.scene);

        this.leafMaterial = new CGFappearance(this.scene);
        this.leafMaterial.setAmbient(0.0, 1.0, 0.0, 1);
        this.leafMaterial.setDiffuse(0.0, 1.0, 0.0, 1);
        this.leafMaterial.setSpecular(0.0, 1.0, 0.0, 1);
        this.leafMaterial.setShininess(1.0);
    }

    display() {
        this.scene.pushMatrix();
        this.leafMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();
    }
}