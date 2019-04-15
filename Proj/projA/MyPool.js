/**
* MyPool
* @constructor
*/
class MyPool extends CGFobject {
    constructor(scene, length, width, stoneTexture, waterTexture) {
        super(scene);

        this.scene = scene;
        this.length = length;
        this.width = width;
        this.stoneTexture = stoneTexture;
        this.waterTexture = waterTexture;

        this.stone = new MyUnitCubeQuad(this.scene, stoneTexture, stoneTexture);
        this.water = new MyQuad(this.scene);
    }

    display() {

        //Water
        this.scene.pushMatrix();
        this.waterTexture.apply();
        this.scene.translate(0, 1, 0);
        this.scene.scale(this.length, 1, this.width);
        this.scene.rotate(-(Math.PI / 2), 1, 0, 0);
        this.water.display();
        this.scene.popMatrix();

        //Stones
        for (var i = 0; i < this.width + 2; i++) {

            this.scene.pushMatrix();
            this.scene.translate(-(0.5 + this.length / 2), 0.5, i - (0.5 + this.width / 2));
            this.stone.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0.5 + this.length / 2, 0.5, i - (0.5 + this.width / 2));
            this.stone.display();
            this.scene.popMatrix();
        }

        for (var i = 0; i < this.length + 2; i++) {

            this.scene.pushMatrix();
            this.scene.translate(i - (0.5 + this.length / 2), 0.5, - (0.5 + this.width / 2));
            this.stone.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(i - (0.5 + this.length / 2), 0.5, 0.5 + this.width / 2);
            this.stone.display();
            this.scene.popMatrix();
        }
    }
}


