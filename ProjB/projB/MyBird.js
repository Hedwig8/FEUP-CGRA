/**
 * MyBird
 * @constructor
 */
class MyBird extends CGFobject {
    constructor(scene) {
        super(scene);

        this.scene = scene;
        this.unitBody = new MySphere(scene, 1, 8, 8);
        this.beak = new MyPyramid(scene, 4, 0.2, 0.2, 0, 0);
        this.wing = new MyWing(scene, 0.7, 2, 0.3, 1, 0.1, 0);
        //this.bodyTops = new MyPyramid(scene, 4, 1, 1.5, Math.sqrt(2)/4, Math.sqrt(2)/4);
        //this.back = new MyPrism(scene, 3, 0.65, 1.2);
        this.tail = new MyTail(scene);
    }
    display() {
        //  body
        this.scene.pushMatrix();
        this.scene.translate(-0.2, 0, 0);
        this.scene.rotate(Math.PI/10, 0, 0, 1);
        this.scene.scale(0.9, 0.7, 0.8);
        this.unitBody.display();
        this.scene.popMatrix();

        /*//back
        this.scene.pushMatrix();
        this.scene.translate(-0.14, 2.175, 0.6);
        this.scene.rotate(Math.PI/6, 0, 0, 1);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.back.display();
        this.scene.popMatrix();*/

        //head
        this.scene.pushMatrix();
        this.scene.translate(0.45, 0.35, 0);
        this.scene.rotate(Math.PI/6, 0, 0, 1);
        this.scene.scale(0.75, 0.5, 0.5);
        this.unitBody.display();
        this.scene.popMatrix();

        //eyes
        this.scene.pushMatrix();
        this.scene.translate(0.7, 0.6, 0);
        this.scene.scale(0.2, 0.2, 0.45);
        this.unitBody.display();
        this.scene.popMatrix();

        // beak
        this.scene.pushMatrix();
        this.scene.translate(1.05,0.5, 0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.beak.display();
        this.scene.popMatrix();

        //tail
        this.scene.pushMatrix();
        this.scene.translate(-0.2, 0, 0);
        this.tail.display();
        this.scene.popMatrix();

        // wings
        this.scene.pushMatrix();
        this.scene.translate(-0.6, 0.2, 0);
        console.log("wing desenhada");
        this.wing.display();
        this.scene.popMatrix();
    }
}