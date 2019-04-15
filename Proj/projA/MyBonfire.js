/**
* MyBonfire
* @constructor
*/
class MyBonfire extends CGFobject {
    constructor(scene, stoneTexture, fireTexture) {
        super(scene);

        this.scene = scene;

        this.fireTexture = fireTexture;

        this.stone = new MyUnitCubeQuad(this.scene, stoneTexture, stoneTexture);
        this.fire = new MyCone(this.scene, 10, 0.75, 0.5);
    }

    display() {

        //Fire
        this.scene.pushMatrix();
        this.fireTexture.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.fire.display();
        this.scene.popMatrix();

        //Stones
        var numStones = 8;
        var alphaAng = 2 * Math.PI / numStones;

        for (var i = 0; i < numStones; i++) {
            var ang = i * alphaAng
            this.scene.pushMatrix();
            this.scene.translate(Math.cos(ang) * 0.5, 0.125, Math.sin(ang) * 0.5);
            this.scene.scale(0.25, 0.25, 0.25);
            this.stone.display();
            this.scene.popMatrix();
        }
    }
}


