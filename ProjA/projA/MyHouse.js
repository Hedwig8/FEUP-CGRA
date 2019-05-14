/**
* MyHouse
* @constructor
*/
class MyHouse extends CGFobject {
    constructor(scene, frontTexture, sideTexture, roofTexture, pilarsTexture) {
        super(scene);

        this.scene = scene;

        this.frontTexture = frontTexture;
        this.sideTexture = sideTexture;
        this.roofTexture = roofTexture;
        this.pilarsTexture = pilarsTexture;

        this.roofSlices = 6;

        this.base = new MyUnitCubeQuad(this.scene, frontTexture, sideTexture);
        this.roof = new MyPyramid(this.scene, this.roofSlices, 2, 1);
        this.pilars = new MyPrism(this.scene, 10, 0.1, 1);
    }

    display() {

        //roof
        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.roofTexture.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.roof.display();
        this.scene.popMatrix();

        //base
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.base.display();
        this.scene.popMatrix();

        //pilars
        var alphaAng = 2 * Math.PI / this.roofSlices;

        this.scene.pushMatrix();
        this.pilarsTexture.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        for (var i = 0; i < this.roofSlices; i++) {
            var ang = i * alphaAng
            this.scene.pushMatrix();
            this.scene.translate(Math.cos(ang), 0, Math.sin(ang));
            this.pilars.display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
    }
}


