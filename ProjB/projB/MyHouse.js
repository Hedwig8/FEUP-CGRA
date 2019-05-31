/**
* MyHouse
* @constructor
*/
class MyHouse extends CGFobject {
    constructor(scene, width) {
        super(scene);

        this.initMaterials();
           
        this.width = width;

        this.roofSlices = 6;

        this.base = new MyUnitCubeQuad(this.scene, this.houseFrontMaterial, this.houseWallMaterial);
        this.roof = new MyPyramid(this.scene, this.roofSlices, 2 * this.width, this.width);
        this.pilars = new MyPrism(this.scene, 10, 0.1 * this.width, this.width);
    }

    initMaterials() {

        //House Materials
        this.houseFrontMaterial = new CGFappearance(this.scene);
        this.houseFrontMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.houseFrontMaterial.setDiffuse(0.7, 0.7, 0.7, 1);
        this.houseFrontMaterial.setSpecular(0.4, 0.4, 0.4, 1);
        this.houseFrontMaterial.setShininess(1.0);
        this.houseFrontMaterial.loadTexture('images/houseDoor.png');
        this.houseFrontMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.houseWallMaterial = new CGFappearance(this.scene);
        this.houseWallMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.houseWallMaterial.setDiffuse(0.7, 0.7, 0.7, 1);
        this.houseWallMaterial.setSpecular(0.4, 0.4, 0.4, 1);
        this.houseWallMaterial.setShininess(1.0);
        this.houseWallMaterial.loadTexture('images/houseWall.png');
        this.houseWallMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.roofMaterial = new CGFappearance(this.scene);
        this.roofMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.roofMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.roofMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.roofMaterial.setShininess(1.0);
        this.roofMaterial.loadTexture('images/roof.png');
        this.roofMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.pilaresMaterial = new CGFappearance(this.scene);
        this.pilaresMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.pilaresMaterial.setDiffuse(0.6, 0.6, 0.6, 1);
        this.pilaresMaterial.setSpecular(0.2, 0.2, 0.2, 1);
        this.pilaresMaterial.setShininess(1.0);
        this.pilaresMaterial.loadTexture('images/pilar.png');
        this.pilaresMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }

    display() {

        //roof
        this.scene.pushMatrix();
        this.scene.translate(0, this.width, 0);
        this.roofMaterial.apply();
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
        this.pilaresMaterial.apply();
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


