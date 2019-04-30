/**
 * MyLeaf
 * @constructor
 * @param scene
 */
class MyLeaf extends CGFobject {
    constructor(scene, size) {
        super(scene);
        this.size = size;

        this.triangle = new MyTriangle(scene);

        this.leafMaterial = new CGFappearance(scene);
        this.leafMaterial.setAmbient(0.1, 0.6, 0.1, 1);
        this.leafMaterial.setDiffuse(0.1, 0.6, 0.1, 1);
        this.leafMaterial.setSpecular(0.1, 0.6, 0.1, 1);
        this.leafMaterial.setShininess(1.0);

    }
    display() {
        this.scene.pushMatrix();
        this.leafMaterial.apply();
        this.scene.scale(this.size, this.size, this.size);
        this.triangle.display();
        this.scene.popMatrix();
    }

}