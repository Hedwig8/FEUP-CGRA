/**
 * MyBird
 * @constructor
 */
class MyBird extends CGFobject {
    constructor(scene, heading, x, y, z, texture, beak, eyes) {
        super(scene);

        this.heading = this.initHeading = heading;
        this.x = this.initX = x;
        this.y = this.initY = y;
        this.z = this.initZ = z;
        this.v = 0;
        this.featherText = texture;
        this.beakText = beak;
        this.eyesText = eyes;
        this.unitBody = new MySphere(scene, 1, 8, 8);
        this.beak = new MyPyramid(scene, 4, 0.2, 0.2, 0, 0);
        this.wing = new MyWing(scene, 0.7, 2, 0.3, 1, 0.1, 0);
        this.tail = new MyTail(scene);

        //this.initMaterials();
    }
/*
    initMaterials() {
        this.feather = new CGFappearance(this);
        this.feather.setAmbient(0.1, 0.1, 0.1, 1);
        this.feather.setDiffuse(0.7, 0.7, 0.7, 1);
        this.feather.setSpecular(0.4, 0.4, 0.4, 1);
        this.feather.setShininess(1.0);
        this.feather.loadTexture('images/feather_text.jpg');
        this.feather.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }*/

    update(t) {
        this.x += t*this.v*Math.cos(this.heading);
        this.z -= t*this.v*Math.sin(this.heading);
    }

    turn(v) {
        this.heading += v;
    }

    accelerate(v) {
        this.v += v;
        if(this.v < 0) this.v = 0;
    }

    reset() {
        this.x = this.initX;
        this.y = this.initY;
        this.z = this.initZ;
        this.v = 0;
        this.heading = this.initHeading;
    }

    display() {

        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        // bird rotation
        this.scene.rotate(this.heading, 0, 1, 0);
        // scaling down all the bird
        this.scene.scale(0.5, 0.5, 0.5);


        //  body
        this.scene.pushMatrix();
        this.scene.translate(-0.2, 0, 0);
        this.scene.rotate(Math.PI/10, 0, 0, 1);
        this.scene.scale(0.9, 0.7, 0.8);
        this.featherText.apply();
        this.unitBody.display();
        this.scene.popMatrix();

        //head
        this.scene.pushMatrix();
        this.scene.translate(0.45, 0.35, 0);
        this.scene.rotate(Math.PI/6, 0, 0, 1);
        this.scene.scale(0.75, 0.5, 0.5);
        this.unitBody.display();
        this.scene.popMatrix();

        //tail
        this.scene.pushMatrix();
        this.scene.translate(-0.2, 0, 0);
        this.tail.display();
        this.scene.popMatrix();

        // wings
        this.scene.pushMatrix();
        this.scene.translate(-0.6, 0.2, 0);
        this.wing.display();
        this.scene.popMatrix();
        
        //eyes
        this.scene.pushMatrix();
        this.scene.translate(0.7, 0.6, 0);
        this.scene.scale(0.2, 0.2, 0.45);
        this.eyesText.apply();
        this.unitBody.display();
        this.scene.popMatrix();

        // beak
        this.scene.pushMatrix();
        this.scene.translate(1.05,0.5, 0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.beakText.apply();
        this.beak.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}