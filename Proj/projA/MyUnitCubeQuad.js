/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
    constructor(scene, sideTexture) {
        super(scene);

        this.scene = scene;
        this.sideTexture = sideTexture;
        this.quad = new MyQuad(this.scene);

    }

    display() {
        
        //+z 
        this.scene.pushMatrix();
        this.sideTexture.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();

        //+x
        this.scene.pushMatrix();
        this.sideTexture.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI / 2.0, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        //+y
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI / 2.0, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        //-z
        this.scene.pushMatrix();
        this.sideTexture.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        //-x
        this.scene.pushMatrix();
        this.sideTexture.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI / 2.0, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();
        
        //-y
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI / 2.0, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

    }

    updateBuffers(complexity) {

    }

    enableNormalViz() {
        this.triangle.enableNormalViz();
        this.diamond.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.triangleBig.enableNormalViz();
        this.triangleSmall.enableNormalViz();
    }

    disableNormalViz() {
        this.triangle.disableNormalViz();
        this.diamond.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.triangleBig.disableNormalViz();
        this.triangleSmall.disableNormalViz();
    }
}