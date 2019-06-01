/**
 * MyNest
 * @constructor
 * @param scene
 */
class MyNest extends CGFobject {
    constructor(scene) {
        super(scene);

        this.radius = 1.5;
        this.bottomWidth = 2 * this.radius - this.radius /4;
        this.branchSize = 0.05;
        this.aroundSlices = 20 * this.radius;
        this.levels = 5;
        this.numBranches = this.aroundSlices * this.levels;
        this.eggRadius = 0.4;

        this.branch = new MyTreeBranch(this.scene, this.branchSize);
        this.bottom = new MyQuad(this.scene);
        this.egg = new MySphere(this.scene, 0.5, 8, 8);

        this.initRandomAngles();
        this.initMaterials();
    }

    initRandomAngles() {
        this.randomAngles = [];

        for(var i = 0; i < this.numBranches; i++) {
            this.randomAngles.push(Math.random() * Math.PI, Math.random() * Math.PI/4);
        }
        
    }

    initMaterials() {
        //Bottom
        this.bottomTexture = new CGFappearance(this.scene);
        this.bottomTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.bottomTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.bottomTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.bottomTexture.setShininess(1.0);
        this.bottomTexture.loadTexture('images/treeWood.jpg');
        this.bottomTexture.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        //Bottom
        this.eggTexture = new CGFappearance(this.scene);
        this.eggTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.eggTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.eggTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.eggTexture.setShininess(1.0);
        this.eggTexture.loadTexture('images/egg.jpg');
        this.eggTexture.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }

    display() {

        //Bottom
        this.scene.pushMatrix();
        this.scene.scale(this.bottomWidth, 1, this.bottomWidth);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.bottomTexture.apply();
        this.bottom.display();
        this.scene.popMatrix();

        //Egg
        this.scene.pushMatrix();
        this.scene.translate(0, this.eggRadius, 0);
        this.scene.scale(1, 1.5, 1);
        this.eggTexture.apply();
        this.egg.display();
        this.scene.popMatrix();

        //Around branches
        for(var j = 1; j <= this.levels; j++) {
            var alphaAng = 2 * Math.PI / this.aroundSlices;
            for(var i = 0; i < this.aroundSlices; i++) {
                var ang = i * alphaAng;
                this.scene.pushMatrix();
                this.scene.translate(Math.cos(ang) * this.radius, j*0.2, Math.sin(ang) * this.radius);
                this.scene.rotate(this.randomAngles[i*j+1], 1, 0, 0);
                this.scene.rotate(this.randomAngles[i*j], 0, 1, 0);
                this.scene.rotate(Math.PI/2, 1, 0, 0);
                this.scene.translate(0, -0.5, 0);
                this.branch.display();
                this.scene.popMatrix();
            }
        }

    }

}