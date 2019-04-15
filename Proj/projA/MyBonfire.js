/**
* MyBonfire
* @constructor
*/
class MyBonfire extends CGFobject {
    constructor(scene, woodTexture, fireTexture) {
        super(scene);

        this.scene = scene;

        this.woodenStick = new MyCylinder(this.scene, 5, 0.1, 0.05);
        this.fire = new MyPyramid(this.scene, 5, 2);
    }

    display() {

        //roof
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.roofTexture.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.roof.display();
        this.scene.popMatrix();

        //base
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.base.display();
        this.scene.popMatrix();

        //pilars
        var alphaAng = 2 * Math.PI / this.roofSlices;

        for (var i = 0; i < this.roofSlices; i++) {
            var ang = i * alphaAng
            this.scene.pushMatrix();
            this.pilarsTexture.apply();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.scene.translate(Math.cos(ang), -0.5, Math.sin(ang));
            this.pilars.display();
            this.scene.popMatrix();
        }
    }
}


