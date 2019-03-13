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

        this.materialBlue = new CGFappearance(this.scene);
        this.materialBlue.setAmbient(0.3, 0.3, 1.0, 1.0);
        this.materialBlue.setDiffuse(0.3, 0.3, 1.0, 0.4);
        this.materialBlue.setSpecular(0.3, 0.3, 1.0, 1.0);
        this.materialBlue.setShininess(10.0);

        this.materialPink = new CGFappearance(this.scene);
        this.materialPink.setAmbient (1.0, 0.5, 0.7, 1.0);
        this.materialPink.setDiffuse (1.0, 0.5, 0.7, 0.4);
        this.materialPink.setSpecular(1.0, 0.5, 0.7, 1.0);
        this.materialPink.setShininess(10.0);

        this.materialRed = new CGFappearance(this.scene);
        this.materialRed.setAmbient (1.0, 0, 0, 1.0);
        this.materialRed.setDiffuse (1.0, 0, 0, 0.4);
        this.materialRed.setSpecular(1.0, 0, 0, 1.0);
        this.materialRed.setShininess(10.0);

        this.materialPurple = new CGFappearance(this.scene);
        this.materialPurple.setAmbient (0.9, 0.1, 1.0, 1.0);
        this.materialPurple.setDiffuse (0.9, 0.1, 1.0, 0.4);
        this.materialPurple.setSpecular(0.9, 0.1, 1.0, 1.0);
        this.materialPurple.setShininess(10.0);

        this.materialYellow = new CGFappearance(this.scene);
        this.materialYellow.setAmbient (1.0, 1.0, 0, 1.0);
        this.materialYellow.setDiffuse (1.0, 1.0, 0, 0.4);
        this.materialYellow.setSpecular(1.0, 1.0, 0, 1.0);
        this.materialYellow.setShininess(10.0);

        this.materialOrange = new CGFappearance(this.scene);
        this.materialOrange.setAmbient (1.0, 0.5, 0.1, 1.0);
        this.materialOrange.setDiffuse (1.0, 0.5, 0.1, 0.4);
        this.materialOrange.setSpecular(1.0, 0.5, 0.1, 1.0);
        this.materialOrange.setShininess(10.0);
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
            this.scene.multMatrix(diamondMatrix);
            this.diamond.display();
            this.scene.popMatrix();


            //TRIANGLE
            this.scene.pushMatrix();
            this.materialPink.apply();
            this.scene.translate(-2, -1, 0);
            this.scene.rotate(Math.PI, 0, 0, 1);
            this.triangle.display();
            this.scene.popMatrix();


            //PARALLELOGRAM
            this.scene.pushMatrix();
            this.materialYellow.apply();
            this.scene.translate(0, 1, 0);
            this.scene.scale(1, -1, 1);
            this.parallelogram.display();
            this.scene.popMatrix();


            //BIG TRIANGLES
            this.scene.pushMatrix();
            this.materialOrange.apply();
            this.scene.translate(1, 0, 0);  
            this.triangleBig.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.materialBlue.apply();
            this.scene.translate(-1, 0, 0);
            this.scene.rotate(Math.PI, 0, 0, 1);
            this.triangleBig.display();
            this.scene.popMatrix();


            //SMALL TRIANGLES
            this.scene.pushMatrix();
            this.materialPurple.apply();
            this.scene.translate(1, 1, 0);
            this.triangleSmall.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.materialRed.apply();
            this.scene.translate(-1, -1, 0);
            this.scene.rotate(-Math.PI/2, 0, 0, 1);
            this.triangleSmall.display();
            this.scene.popMatrix();
    }

    updateBuffers(complexity) {
        
    }

    /*initNormalVizBuffers() {
        this.triangle.initNormalVizBuffers();
        this.diamond.initNormalVizBuffers();
        this.parallelogram.initNormalVizBuffers();
        this.triangleBig.initNormalVizBuffers();
        this.triangleSmall.initNormalVizBuffers();
    }*/

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