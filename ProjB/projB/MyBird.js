/**
 * MyBird
 * @constructor
 */
class MyBird extends CGFobject {
    constructor(scene, heading, x, y, z) {
        super(scene);

        this.heading = this.initHeading = heading;
        this.x = this.initX = x;
        this.y = this.initY = y;
        this.z = this.initZ = z;
        this.v = 0;
        this.unitBody = new MySphere(scene, 1, 8, 8);
        this.beak = new MyPyramid(scene, 4, 0.2, 0.2, 0, 0);
        this.wing = new MyWing(scene, 0.7, 2, 0.3, 1, 0, 0);
        this.tail = new MyTail(scene);
        this.branch = null;

        this.picking = false;
        this.initTime = 0;

        this.initMaterials();
    }

    initMaterials() {
        // bird body
        this.featherText = new CGFappearance(this.scene);
        this.featherText.setAmbient(0.1, 0.1, 0.1, 1);
        this.featherText.setDiffuse(0.7, 0.7, 0.7, 1);
        this.featherText.setSpecular(0.4, 0.4, 0.4, 1);
        this.featherText.setShininess(1.0);
        this.featherText.loadTexture('images/feather_text2.jpg');
        this.featherText.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        // bird eyes
        this.eyesText = new CGFappearance(this.scene);
        this.eyesText.setAmbient(0.1, 0.1, 0.1, 1);
        this.eyesText.setDiffuse(0.7, 0.7, 0.7, 1);
        this.eyesText.setSpecular(0.4, 0.4, 0.4, 1);
        this.eyesText.setShininess(1.0);
        this.eyesText.loadTexture('images/eyes_text.jpg');
        this.eyesText.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        // bird beak
        this.beakText = new CGFappearance(this.scene);
        this.beakText.setAmbient(0.1, 0.1, 0.1, 1);
        this.beakText.setDiffuse(0.7, 0.7, 0.7, 1);
        this.beakText.setSpecular(0.4, 0.4, 0.4, 1);
        this.beakText.setShininess(1.0);
        this.beakText.loadTexture('images/beak_text.png');
        this.beakText.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }

    pickBranch(t) {
        this.picking = true;
    }

    update(t, delta, speedFactor) {

        // normal movement
        if(!this.picking) {
            this.y = this.initY + Math.sin(t*speedFactor /500* Math.PI) * 0.12;
            this.initTime = t;
        } 
        else { // picking branch
            // counting 2s with dt
            var dt = t-this.initTime;
            // droping movement
            this.y = this.initY + Math.sin(dt/2000*Math.PI -Math.PI) *2.6;

            // close enough of the ground
            if(dt > 800 && dt < 1200) {
                if(this.branch == null) {// still has not branch 
                    this.branch = this.scene.catchBranch();
                    if(this.branch != null) {
                        this.hasBranch = true;
                        this.branch.x = 0;
                        this.branch.y = 0;
                        this.branch.z = 0;
                        this.branch.rotate = Math.PI/2;
                    }
                }
                else { // hs branch, drops in nest
                    this.scene.leaveBranchAtNest(this.branch);
                }
            }
            // end of 2s
            else if(dt > 2000) {
                this.picking = false;
            }
        }

        this.x += delta*speedFactor*this.v*Math.cos(this.heading);
        this.z -= delta*speedFactor*this.v*Math.sin(this.heading);

        this.wing.update(t*speedFactor, delta);
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

    display(scale) {

        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        // bird rotation
        this.scene.rotate(this.heading, 0, 1, 0);
        // scaling down all the bird
        this.scene.scale(0.5*scale, 0.5*scale, 0.5*scale);


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

        // branch
        if(this.branch!=null) {
            this.scene.pushMatrix();
            this.scene.translate(1.25, 0.5, -0.5);
            this.branch.display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();
    }
}