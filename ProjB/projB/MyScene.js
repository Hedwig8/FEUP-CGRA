/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();
        this.initMaterials();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);
        this.setUpdatePeriod(50);

        //Scene Constants
        this.terrainSize = 60;
        this.groundHeight = 4.2;
        this.treeBranchesValues = [];
        this.numTreeBranches = 6;

        //Scene Variables

        //General Animation values
        this.lastTime = 0;
        this.timePassed = 0;

        //Bird animation
        this.initialBirdY = 3;
        this.birdY = this.initialBirdY; //Used when displaying bird
        this.birdOscillation = 0.5;
        this.birdOscillationSpeed = this.birdOscillation * 4;

        //Lightning animation
        this.lightningActive = false;

        //Initialize scene objects
        this.axis = new CGFaxis(this, 5, 5);
        
        this.terrain = new MyTerrain(this, this.terrainSize);
        
        this.skybox = new MyCubeMap(this);

        this.house = new MyHouse(this, 3);
        
        this.lightning = new MyLightning(this);
        
        this.forest = new MyForest(this, 20, 8);

        this.treeBranch = new MyTreeBranch(this);
        this.initTreeBranchesValues();

        this.bird = new MyBird(this, 0, 10, 5, 0, this.feather, this.beak, this.eyes);

        //Objects connected to MyInterface

    }

    initTreeBranchesValues() {
        for(var i = 0; i < this.numTreeBranches; i++) {
            this.treeBranchesValues.push(Math.floor( (Math.random() * 5) + 1), Math.floor( (Math.random() * 5) + 1));
            this.treeBranchesValues.push(Math.random() * Math.PI);
        }
    }

    initMaterials() {
        //SkyMap Texture
        this.skymapTextDay = new CGFappearance(this);
        this.skymapTextDay.setAmbient(0.1, 0.1, 0.1, 1);
        this.skymapTextDay.setDiffuse(0.9, 0.9, 0.9, 1);
        this.skymapTextDay.setSpecular(0.1, 0.1, 0.1, 1);
        this.skymapTextDay.setShininess(1.0);
        this.skymapTextDay.loadTexture('images/forest_skybox_day1.jpg');
        this.skymapTextDay.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(45, 45, 45), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    checkKeys(t) {
        var text = "Keys pressed: ";
        var keysPressed = false;
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            text += " W ";
            this.bird.accelerate(1);
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyS")) {
            text += " S ";
            this.bird.accelerate(-1);
            keysPressed = true;
        }
        if(this.gui.isKeyPressed("KeyA")) {
            text += " A ";
            this.bird.turn(0.2);
            keysPressed = true;
        }
        if(this.gui.isKeyPressed("KeyD")) {
            text += " D ";
            this.bird.turn(-0.2);
            keysPressed = true;
        }
        if(this.gui.isKeyPressed("KeyR")) {
            text += " R ";
            this.bird.reset();
            keysPressed = true;
        }
        if(this.gui.isKeyPressed("KeyL")) {
            this.lightningActive = true;
            this.lightning.startAnimation(t);
            text += " L ";
            keysPressed = true;
        }
        if(this.gui.isKeyPressed("KeyP")) {
            text += " P ";
            keysPressed = true;
        }
        if (keysPressed)
            console.log(text);
    }

    update(t){
        this.checkKeys(t);

        /*
        if (this.lastTime == 0) this.lastTime = t;
        var deltaT = (t - this.lastTime) / 1000;
        this.lastTime = t;
           
        this.birdY = this.birdY + (this.birdOscillationSpeed * deltaT);
        
        var maxY = (this.initialBirdY + this.birdOscillation);
        var minY = (this.initialBirdY - this.birdOscillation);
        if (this.birdY >= maxY) {
            this.birdY = maxY;
            this.birdOscillationSpeed *= -1;
        }
        else if (this.birdY <= minY) {
            this.birdY = minY;
            this.birdOscillationSpeed *= -1;
        }*/

        var delta = (t - this.lastTime) / 1000;
        this.lastTime = t;

         
        this.timePassed += delta;

        this.bird.update(t, delta);
       
        if(this.lightningActive) {
            this.lightningActive = this.lightning.update(t);
        }
      
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        //this.axis.display();

        //Apply default appearance
        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section
        
        //Terrain
        this.pushMatrix();
        this.rotate(-0.5*Math.PI, 1, 0, 0);
        this.scale(this.terrainSize, this.terrainSize, 1);
        this.terrain.display();
        this.popMatrix();

        //Skybox
        this.pushMatrix();
        this.scale(this.terrainSize, this.terrainSize, this.terrainSize);
        this.skymapTextDay.apply();
        this.skybox.display();
        this.popMatrix();

        //House
        this.pushMatrix();
        this.translate(14, this.groundHeight, -5);
        this.rotate(-0.5*Math.PI, 0, 1, 0);
        this.house.display();
        this.popMatrix();
        
        //Forest
        this.pushMatrix();
        this.translate(-5, this.groundHeight, 4);
        this.forest.display();
        this.popMatrix();

        //Bird
        this.pushMatrix();
        this.translate(0, 3, 0);
        this.bird.display();
        this.popMatrix();

        //Lightning
        if(this.lightningActive) {
            this.lightning.display();
        }

        //TreeBranches
        this.pushMatrix();
        this.translate(9, this.groundHeight + 0.1, -2);
        for(var i  = 0; i < this.treeBranchesValues.length; i+=3) {
            this.pushMatrix();
            this.translate(this.treeBranchesValues[i], 0, this.treeBranchesValues[i+1]);
            this.rotate(this.treeBranchesValues[i+2], 0, 1, 0);
            this.rotate(Math.PI/2, 0, 0, 1);
            this.scale(0.2, 1, 0.2);
            this.treeBranch.display();
            this.popMatrix();
        }
        this.popMatrix();

        // ---- END Primitive drawing section
    }
}