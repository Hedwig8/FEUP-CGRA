/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject{
    constructor(scene) {
        super(scene);

        this.scene = scene;
        this.triangle = new MyTriangle(scene);
        this.diamond = new MyDiamond(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.triangleBig = new MyTriangleBig(scene);
        this.triangleSmall = new MyTriangleSmall(scene);

        this.tangramMaterial = new CGFappearance(this.scene);
        this.tangramMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.tangramMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setShininess(10.0);
        this.tangramMaterial.loadTexture('images/tangram.png');
        this.tangramMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }

    display() {
        
        var diamondMatrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, -2, 0, 1
        ];
            //DIAMOND
            this.scene.pushMatrix();
            this.tangramMaterial.apply();
            this.scene.multMatrix(diamondMatrix);
            this.diamond.display();
            this.scene.popMatrix();

            //TRIANGLE
            this.scene.pushMatrix();
            this.tangramMaterial.apply();
            this.scene.translate(-2, -1, 0);
            this.scene.rotate(Math.PI, 0, 0, 1);
            this.triangle.display();
            this.scene.popMatrix();

            //PARALLELOGRAM
            this.scene.pushMatrix();
            this.tangramMaterial.apply();
            this.scene.translate(0, 1, 0);
            this.scene.scale(1, -1, 1);
            this.parallelogram.display();
            this.scene.popMatrix();


            //BIG TRIANGLES
            this.scene.pushMatrix();
            this.tangramMaterial.apply();
            this.scene.translate(1, 0, 0);  
            this.triangleBig.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.tangramMaterial.apply();
            this.scene.translate(-1, 0, 0);
            this.scene.rotate(Math.PI, 0, 0, 1);
            this.triangleBig.display();
            this.scene.popMatrix();


            //SMALL TRIANGLES
            this.scene.pushMatrix();
            this.tangramMaterial.apply();
            this.scene.translate(1, 1, 0);
            this.triangleSmall.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.tangramMaterial.apply();
            this.scene.translate(-1, -1, 0);
            this.scene.rotate(-Math.PI/2, 0, 0, 1);
            this.triangleSmall.display();
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