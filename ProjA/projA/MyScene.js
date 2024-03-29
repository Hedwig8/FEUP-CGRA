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

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);

        this.initMaterials();

        //Initialize scene objects
        this.axis = new CGFaxis(this);

        this.skybox = new MyCubeMap(this);

        this.terrainSize = 70;
        var terrainRepeats = 6;
        var terrainCoords = [
            0, this.terrainSize / terrainRepeats,
            this.terrainSize / terrainRepeats, this.terrainSize / terrainRepeats,
            0, 0,
            this.terrainSize / terrainRepeats, 0
        ]
        this.terrain = new MyQuad(this, terrainCoords);

        this.house = new MyHouse(this, this.houseFrontMaterial, this.houseWallMaterial, this.roofMaterial, this.pilaresMaterial);
        this.treeRow = new MyTreeRowPatch(this, 1, 0.25, 1.5, 0.75, this.woodMaterial, this.treeTopMaterial);
        this.treeGroup = new MyTreeGroupPatch(this, 1, 0.25, 1.5, 0.75, this.woodMaterial, this.treeTopMaterial);
        this.hill = new MyVoxelHill(this, 4, this.topCubeTexture, this.sideCubeTexture);
        this.bonfire = new MyBonfire(this, this.stoneMaterial, this.fireMaterial);
        this.pool = new MyPool(this, 6, 4, this.stoneMaterial, this.waterMaterial);
        
        //Objects connected to MyInterface
        this.scaleFactor = 1.0;

        this.ambientLight = 0;
        this.ambientLight = { 'Day': 0, 'Night': 1 }; //dropdown
        this.viewTextures = true;
    }
    initLights() {
        //Day Light
        this.lights[0].setPosition(0, 25, 0, 1);
        this.lights[0].setDiffuse(1.0, 0.7, 0.5, 1.0);
        this.lights[0].setConstantAttenuation(0.0);
        this.lights[0].setLinearAttenuation(0.01);
        this.lights[0].setQuadraticAttenuation(0.0);
        this.lights[0].disable();

        //Night Light
        this.lights[1].setPosition(0, 25, 0, 1);
        this.lights[1].setDiffuse(0.5, 0.7, 1.0, 1.0);
        this.lights[1].setConstantAttenuation(0.0);
        this.lights[1].setLinearAttenuation(0.05);
        this.lights[1].setQuadraticAttenuation(0.0);
        this.lights[1].disable();

        //BonfireLight
        this.lights[2].setPosition(-2, 0.76, 2, 1);
        this.lights[2].setDiffuse(0.8, 0.3, 0.2, 1.0);
        this.lights[2].setConstantAttenuation(0.1);
        this.lights[2].setLinearAttenuation(0.5);
        this.lights[2].setQuadraticAttenuation(0.0);
        this.lights[2].disable();
    }
    initCameras() {
        this.camera = new CGFcamera(0.5, 0.1, 500, vec3.fromValues(12, 25, 40), vec3.fromValues(0, 3, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(1.0);
    }
    initMaterials() {
        //Tree materials
        this.treeTopMaterial = new CGFappearance(this);
        this.treeTopMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.treeTopMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.treeTopMaterial.setSpecular(0.3, 0.3, 0.3, 1);
        this.treeTopMaterial.setShininess(1.0);
        this.treeTopMaterial.loadTexture('images/treeTopTexture.png');
        this.treeTopMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.woodMaterial = new CGFappearance(this);
        this.woodMaterial.setAmbient(0.2, 0.2, 0.2, 1);
        this.woodMaterial.setDiffuse(0.8, 0.8, 0.8, 0.8);
        this.woodMaterial.setSpecular(0, 0, 0, 1);
        this.woodMaterial.setShininess(1.0);
        this.woodMaterial.loadTexture('images/woodTexture.png');
        this.woodMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

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

        //Terrain material
        this.terrainMaterial = new CGFappearance(this);
        this.terrainMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.terrainMaterial.setDiffuse(0.7, 0.7, 0.7, 1);
        this.terrainMaterial.setSpecular(0.2, 0.2, 0.2, 1);
        this.terrainMaterial.setShininess(1.0);
        this.terrainMaterial.loadTexture('images/grass.jpg');
        this.terrainMaterial.setTextureWrap('REPEAT', 'REPEAT');

        //Hills materials
        this.sideCubeTexture = new CGFappearance(this);
        this.sideCubeTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.sideCubeTexture.setDiffuse(0.7, 0.7, 0.7, 1);
        this.sideCubeTexture.setSpecular(0.2, 0.2, 0.2, 1);
        this.sideCubeTexture.setShininess(1.0);
        this.sideCubeTexture.loadTexture('images/mineSide.png');
        this.sideCubeTexture.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.topCubeTexture = new CGFappearance(this);
        this.topCubeTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.topCubeTexture.setDiffuse(0.7, 0.7, 0.7, 1);
        this.topCubeTexture.setSpecular(0.2, 0.2, 0.2, 1);
        this.topCubeTexture.setShininess(10.0);
        this.topCubeTexture.loadTexture('images/mineTop.png');
        this.topCubeTexture.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        //SkyMap Texture
        this.skymapTextDay = new CGFappearance(this);
        this.skymapTextDay.setAmbient(0.1, 0.1, 0.1, 1);
        this.skymapTextDay.setDiffuse(0.9, 0.9, 0.9, 1);
        this.skymapTextDay.setSpecular(0.1, 0.1, 0.1, 1);
        this.skymapTextDay.setShininess(1.0);
        this.skymapTextDay.loadTexture('images/forest_skybox_day1.jpg');
        this.skymapTextDay.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.skymapTextNight = new CGFappearance(this);
        this.skymapTextNight.setAmbient(0.1, 0.1, 0.1, 1);
        this.skymapTextNight.setDiffuse(0.9, 0.9, 0.9, 1);
        this.skymapTextNight.setSpecular(0.1, 0.1, 0.1, 1);
        this.skymapTextNight.setShininess(1.0);
        this.skymapTextNight.loadTexture('images/forest_skybox_night1.jpg');
        this.skymapTextNight.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        //Bonfire
        this.fireMaterial = new CGFappearance(this);
        this.fireMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.fireMaterial.setDiffuse(0.6, 0.6, 0.6, 1);
        this.fireMaterial.setSpecular(0.4, 0.4, 0.4, 1);
        this.fireMaterial.setShininess(1.0);
        this.fireMaterial.loadTexture('images/fireTexture.png');
        this.fireMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.stoneMaterial = new CGFappearance(this);
        this.stoneMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.stoneMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.stoneMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.stoneMaterial.setShininess(1.0);
        this.stoneMaterial.loadTexture('images/stoneTexture.png');
        this.stoneMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        //Pool
        this.waterMaterial = new CGFappearance(this);
        this.waterMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.waterMaterial.setDiffuse(0.1, 0.1, 0.1, 1);
        this.waterMaterial.setSpecular(0.9, 0.9, 0.9, 1);
        this.waterMaterial.setShininess(1.0);
        this.waterMaterial.loadTexture('images/waterTexture.png');
        this.waterMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
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

        this.enableTextures(this.viewTextures);

        if(this.ambientLight == 0) //Day
        {
            this.lights[0].enable();
            this.lights[1].disable();
            this.lights[2].disable();
        }
        else if(this.ambientLight == 1) //Night
        {
            this.lights[0].disable();
            this.lights[1].enable();
            this.lights[2].enable();
        }


        //Apply default appearance
        this.setDefaultAppearance();

        //Update bonfire light
        this.lights[2].setDiffuse(0.8+Math.random()/2-0.25, 0.3+Math.random()/4-0.125, 0.1+Math.random()/5-0.1);

        //Update lights
        this.lights[0].update();
        this.lights[1].update();
        this.lights[2].update();

        // ---- BEGIN Primitive drawing section
           
        this.pushMatrix();
        this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);

        //Skybox
        this.pushMatrix();
        this.scale(this.terrainSize, this.terrainSize, this.terrainSize);
        if(this.ambientLight == 0)
            this.skymapTextDay.apply();
        if(this.ambientLight == 1)
            this.skymapTextNight.apply();
        this.skybox.display();
        this.popMatrix();

        //Terrain
        this.pushMatrix();
        this.scale(this.terrainSize, 1, this.terrainSize);
        this.rotate(-(Math.PI / 2), 1, 0, 0);
        this.terrainMaterial.apply();
        this.terrain.display();
        this.popMatrix();
        
        //House 
        this.house.display();

        //Hills
        this.pushMatrix();
        this.translate(-5, 0.5, 5);
        this.hill.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-18, 0.5, -5);
        this.hill.display(3);
        this.popMatrix();

        this.pushMatrix();
        this.translate(10, 0.5, -15);
        this.hill.display(5);
        this.popMatrix();

        this.pushMatrix();
        this.translate(-1, 0.5, -10);
        this.hill.display(3);
        this.popMatrix();

        //TreeGroups
        this.pushMatrix();
        this.translate(-8, 0, -12);
        this.treeGroup.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(10, 0, 5);
        this.treeGroup.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-17, 0, 8);
        this.treeGroup.display();
        this.popMatrix();

        //TreeRows
        this.pushMatrix();
        this.translate(5, 0, -5);
        this.treeRow.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(5, 0, 12);
        this.rotate(Math.PI / 2, 0, 1, 0);
        this.treeRow.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-9, 0, 3);
        this.rotate(Math.PI / 4, 0, 1, 0);
        this.treeRow.display();
        this.popMatrix();

        //Bonfire
        this.pushMatrix();
        this.translate(-2, 0, 2);
        this.bonfire.display();
        this.popMatrix();

        //Pool
        this.pushMatrix();
        this.translate(12, 0, 0);
        this.pool.display();
        this.popMatrix();

        this.popMatrix();
        // ---- END Primitive drawing section
    }
}