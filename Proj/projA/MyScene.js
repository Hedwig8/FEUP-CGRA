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

        //Applied Materials

        //Tree materials
        this.treeTopMaterial = new CGFappearance(this);
        this.treeTopMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.treeTopMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.treeTopMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.treeTopMaterial.setShininess(10.0);
        this.treeTopMaterial.loadTexture('tangram.png');
        this.treeTopMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.trunkMaterial = new CGFappearance(this);
        this.trunkMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.trunkMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.trunkMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.trunkMaterial.setShininess(10.0);
        this.trunkMaterial.loadTexture('tangram.png');
        this.trunkMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        //House Materials
        this.frontMaterial = new CGFappearance(this);
        this.frontMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.frontMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.frontMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.frontMaterial.setShininess(10.0);
        this.frontMaterial.loadTexture('houseWall.png');
        this.frontMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.roofMaterial = new CGFappearance(this);
        this.roofMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.roofMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.roofMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.roofMaterial.setShininess(10.0);
        this.roofMaterial.loadTexture('roof.png');
        this.roofMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.pilaresMaterial = new CGFappearance(this);
        this.pilaresMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.pilaresMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.pilaresMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.pilaresMaterial.setShininess(10.0);
        this.pilaresMaterial.loadTexture('pilar.png');
        this.pilaresMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        //Terrain material
        this.terrainMaterial = new CGFappearance(this);
        this.terrainMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.terrainMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.terrainMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.terrainMaterial.setShininess(10.0);
        this.terrainMaterial.loadTexture('grass.jpg');
        this.terrainMaterial.setTextureWrap('REPEAT', 'REPEAT');

        //Initialize scene objects
        this.axis = new CGFaxis(this);

        this.terrainSize = 20;
        var terrainCoords = [
            0, 1,
            1 / this.terrainSize, 1,
            0, 0,
            1 / this.terrainSize, 0
        ]
        this.terrain = new MyQuad(this, terrainCoords);
        this.house = new MyHouse(this, this.frontMaterial, this.frontMaterial, this.roofMaterial, this.pilaresMaterial);
        this.tree = new MyTreeRowPatch(this, 0.5, 0.25, 1.5, 0.75, this.trunkMaterial, this.treeTopMaterial);
        this.hill = new MyVoxelHill(this, 4, this.frontMaterial, this.frontMaterial);
        
        //Objects connected to MyInterface
        
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
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
        this.scale(this.terrainSize, 1, this.terrainSize);
        this.rotate(-(Math.PI / 2), 1, 0, 0);
        this.terrainMaterial.apply();
        this.terrain.display();
        this.popMatrix();

        //House
        this.pushMatrix();
        this.translate(0, 0.5, 0);
        this.house.display();
        this.popMatrix();

        //Hills
        this.pushMatrix();
        this.translate(5, 0.5, 5);
        this.hill.display();
        this.popMatrix();

        // ---- END Primitive drawing section
    }
}