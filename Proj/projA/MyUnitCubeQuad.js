/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);

        this.scene = scene;
        this.quad = new MyQuad(this.scene);

        this.mineSide = new CGFappearance(this.scene);
        this.mineSide.setAmbient(0.1, 0.1, 0.1, 1);
        this.mineSide.setDiffuse(0.9, 0.9, 0.9, 1);
        this.mineSide.setSpecular(0.1, 0.1, 0.1, 1);
        this.mineSide.setShininess(10.0);
        this.mineSide.loadTexture('images/mineSide.png');
        this.mineSide.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.mineTop = new CGFappearance(this.scene);
        this.mineTop.setAmbient(0.1, 0.1, 0.1, 1);
        this.mineTop.setDiffuse(0.9, 0.9, 0.9, 1);
        this.mineTop.setSpecular(0.1, 0.1, 0.1, 1);
        this.mineTop.setShininess(10.0);
        this.mineTop.loadTexture('images/mineTop.png');
        this.mineTop.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.mineBottom = new CGFappearance(this.scene);
        this.mineBottom.setAmbient(0.1, 0.1, 0.1, 1);
        this.mineBottom.setDiffuse(0.9, 0.9, 0.9, 1);
        this.mineBottom.setSpecular(0.1, 0.1, 0.1, 1);
        this.mineBottom.setShininess(10.0);
        this.mineBottom.loadTexture('images/mineBottom.png');
        this.mineBottom.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }

    display() {
        
        //+z 
        this.scene.pushMatrix();
        this.mineSide.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();

        //+x
        this.scene.pushMatrix();
        this.mineSide.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI / 2.0, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        //+y
        this.scene.pushMatrix();
        this.mineTop.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI / 2.0, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        //-z
        this.scene.pushMatrix();
        this.mineSide.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        //-x
        this.scene.pushMatrix();
        this.mineSide.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI / 2.0, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();
        
        //-y
        this.scene.pushMatrix();
        this.mineBottom.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
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