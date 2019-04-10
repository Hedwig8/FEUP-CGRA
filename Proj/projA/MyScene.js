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
        this.baseMaterial = new CGFappearance(this);
        this.baseMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.baseMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.baseMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.baseMaterial.setShininess(10.0);
        this.baseMaterial.loadTexture('tangram.png');
        this.baseMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.roofMaterial = new CGFappearance(this);
        this.roofMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.roofMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.roofMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.roofMaterial.setShininess(10.0);
        this.roofMaterial.loadTexture('tangram.png');
        this.roofMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.pilaresMaterial = new CGFappearance(this);
        this.pilaresMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.pilaresMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.pilaresMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.pilaresMaterial.setShininess(10.0);
        this.pilaresMaterial.loadTexture('tangram.png');
        this.pilaresMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        //Initialize scene objects
        this.axis = new CGFaxis(this);

        this.singleTree = new MyTree(this, 2, 1, 3, 2, this.trunkMaterial, this.treeTopMaterial);
        this.house = new MyHouse(this, this.baseMaterial, this.roofMaterial, this.pilaresMaterial);
        this.tree = new MyTreeRowPatch(this, 0.5, 0.25, 1.5, 0.75, this.trunkMaterial, this.treeTopMaterial);
        
        //Objects connected to MyInterface
        this.displayAxis = true;
        this.scaleFactor = 1.0;
        
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
        if(this.displayAxis)
            this.axis.display();

        //Apply default appearance
        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        this.pushMatrix();
        this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);

        //this.tree.display();
        this.house.display();
        //this.roofMaterial.apply();


        this.popMatrix();
        // ---- END Primitive drawing section
    }
}