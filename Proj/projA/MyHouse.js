/**
* MyHouse
* @constructor
*/
class MyHouse extends CGFobject {
    constructor(scene, baseTexture, roofTexture, pilarsTexture) {
        super(scene);

        this.scene = scene;

        this.baseTexture = baseTexture;
        this.roofTexture = roofTexture;
        this.pilarsTexture = pilarsTexture;

        this.base = new MyUnitCubeQuad(this.scene, baseTexture);
        this.roof = new MyPyramid(this.scene, 4, 2);
        this.pilars = new MyPrism(this.scene, 10, 0.1, 1);
    }

    display() {

        //roof
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI / 4, 0, 1, 0);
        this.roofTexture.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.roof.display();
        this.scene.popMatrix();

        //base
        this.base.display();

        //pilars
        var ang = Math.PI / 4;
        var alphaAng = Math.PI / 2;

        for (var i = 0; i < 4; i++) {
            this.scene.pushMatrix();
            this.roofTexture.apply();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.scene.translate(Math.cos(ang), -0.5, Math.sin(ang));
            this.pilars.display();
            this.scene.popMatrix();
            ang += alphaAng;
        }
    }
}


