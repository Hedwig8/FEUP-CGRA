/**
* MyHouse
* @constructor
*/
class MyHouse extends CGFobject {
    constructor(scene, width, frontTexture, sideTexture, roofTexture, pilarsTexture) {
        super(scene);
           
        this.width = width;
        this.frontTexture = frontTexture;
        this.sideTexture = sideTexture;
        this.roofTexture = roofTexture;
        this.pilarsTexture = pilarsTexture;

        this.roofSlices = 6;

        this.base = new MyUnitCubeQuad(this.scene, frontTexture, sideTexture);
        this.roof = new MyPyramid(this.scene, this.roofSlices, 2 * this.width, this.width);
        this.pilars = new MyPrism(this.scene, 10, 0.1 * this.width, this.width);
    }

    display() {

        //roof
        this.scene.pushMatrix();
        this.scene.translate(0, this.width, 0);
        this.roofTexture.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.roof.display();
        this.scene.popMatrix();

        //base
        this.scene.pushMatrix();
        this.scene.translate(0, 1.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(this.width, this.width, this.width);
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
            this.scene.translate(Math.cos(ang) * this.width, 0, Math.sin(ang) * this.width);
            this.pilars.display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
    }
}


