/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);

        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.triangleSmall = new MyTriangleSmall(scene);
        this.triangleBig = new MyTriangleBig(scene);
        this.parallelogram = new MyParallelogram(scene);
    }
    display(scene) {

        if (scene.viewTriangle) {
            scene.pushMatrix();
            scene.translate(-2, -1, 0);
            scene.rotate(Math.PI, 0, 0, 1);
            this.triangle.display();
            scene.popMatrix();
        }

        if (scene.viewDiamond) {
            scene.pushMatrix();
            var m = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, -2, 0, 1
            ];
            scene.multMatrix(m);
            this.diamond.display();
            scene.popMatrix();
        }

        if (scene.viewParall) {
            scene.pushMatrix();
            scene.translate(3, 0, 0);
            scene.scale(-1, 1, 1);
            this.parallelogram.display();
            scene.popMatrix();
        }

        if (scene.viewSmallTri) {
            scene.pushMatrix();
            scene.translate(1, 1, 0);
            this.triangleSmall.display();
            scene.popMatrix();

            scene.pushMatrix();
            scene.translate(-1, -1, 0);
            scene.rotate(-Math.PI / 2, 0, 0, 1);
            this.triangleSmall.display();
            scene.popMatrix();
        }

        if (scene.viewBigTri) {
            scene.pushMatrix();
            scene.translate(-1, 0, 0);
            this.triangleBig.display();
            scene.popMatrix();

            scene.pushMatrix();
            scene.translate(1, 0, 0);
            scene.rotate(Math.PI, 0, 0, 1);
            this.triangleBig.display();
            scene.popMatrix();
        }


    }
}