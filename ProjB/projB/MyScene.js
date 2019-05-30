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
        this.groundHeight = 4;

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
        this.axis = new CGFaxis(this);
        
        this.terrain = new MyTerrain(this, this.terrainSize);
        
        this.house = new MyHouse(this, 3, this.houseFrontMaterial, this.houseWallMaterial, this.roofMaterial, this.pilaresMaterial);
        
        this.skybox = new MyCubeMap(this);
        
        this.lightning = new MyLightning(this);
        
        this.tree = new MyLSPlant(this);

        //Objects connected to MyInterface

    }
    initMaterials() {
        //House Materials
        this.houseFrontMaterial = new CGFappearance(this);
        this.houseFrontMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.houseFrontMaterial.setDiffuse(0.7, 0.7, 0.7, 1);
        this.houseFrontMaterial.setSpecular(0.4, 0.4, 0.4, 1);
        this.houseFrontMaterial.setShininess(1.0);
        this.houseFrontMaterial.loadTexture('images/houseDoor.png');
        this.houseFrontMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.houseWallMaterial = new CGFappearance(this);
        this.houseWallMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.houseWallMaterial.setDiffuse(0.7, 0.7, 0.7, 1);
        this.houseWallMaterial.setSpecular(0.4, 0.4, 0.4, 1);
        this.houseWallMaterial.setShininess(1.0);
        this.houseWallMaterial.loadTexture('images/houseWall.png');
        this.houseWallMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.roofMaterial = new CGFappearance(this);
        this.roofMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.roofMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.roofMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.roofMaterial.setShininess(1.0);
        this.roofMaterial.loadTexture('images/roof.png');
        this.roofMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.pilaresMaterial = new CGFappearance(this);
        this.pilaresMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.pilaresMaterial.setDiffuse(0.6, 0.6, 0.6, 1);
        this.pilaresMaterial.setSpecular(0.2, 0.2, 0.2, 1);
        this.pilaresMaterial.setShininess(1.0);
        this.pilaresMaterial.loadTexture('images/pilar.png');
        this.pilaresMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        //SkyMap Texture
        this.skymapTextDay = new CGFappearance(this);
        this.skymapTextDay.setAmbient(0.1, 0.1, 0.1, 1);
        this.skymapTextDay.setDiffuse(0.9, 0.9, 0.9, 1);
        this.skymapTextDay.setSpecular(0.1, 0.1, 0.1, 1);
        this.skymapTextDay.setShininess(1.0);
        this.skymapTextDay.loadTexture('images/forest_skybox_day1.jpg');
        this.skymapTextDay.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        //Lightning Texture
        this.lightningTexture = new CGFappearance(this);
        this.lightningTexture.setAmbient(0.49, 0.98, 1.0, 1.0);
        this.lightningTexture.setDiffuse(0.49, 0.98, 1.0, 1.0);
        this.lightningTexture.setSpecular(0.49, 0.98, 1.0, 1.0);
        this.lightningTexture.setShininess(1.0);
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
        if (keysPressed)
            console.log(text);
    }
    update(t){
        this.checkKeys(t);
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
        }
         
        this.timePassed += deltaT;

        this.bird.update(deltaT);
       
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
        this.axis.display();

        //Apply default appearance
        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section
        
        //Terrain
        this.pushMatrix();
        this.rotate(-0.5*Math.PI, 1, 0, 0);
        this.scale(this.terrainSize, this.terrainSize, 1);
        //this.terrain.display();
        this.popMatrix();

        //Skybox
        this.pushMatrix();
        this.scale(this.terrainSize, this.terrainSize, this.terrainSize);
        this.skymapTextDay.apply();
        //this.skybox.display();
        this.popMatrix();

        //House
        this.pushMatrix();
        this.translate(14, this.groundHeight, 0);
        this.house.display();
        this.popMatrix();
        
        //Tree
        this.pushMatrix();
        this.translate(10, this.groundHeight, 10);
        this.tree.display();
        this.popMatrix();

        //Lightning
        if(this.lightningActive) {
            this.pushMatrix();
            this.translate(0.0, 15.0, 0.0);
            this.scale(2.0, 2.0, 2.0);
            this.lightningTexture.apply();
            this.lightning.display();
            this.popMatrix();
        }


        //Bird
        this.pushMatrix();
        this.translate(0, this.birdY, 0);
        this.bird.display();
        this.popMatrix();

        // ---- END Primitive drawing section
    }
}