/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);

        this.scene = scene;

        this.plane = new Plane(this.scene, 32);

        this.heightMap = new CGFtexture(this.scene, "images/heightmap.jpg");
        this.terrainTexture = new CGFtexture(this.scene, "images/terrain.jpg");
        this.altimetryTexture = new CGFtexture(this.scene, "images/altimetry.png")

        this.terrainShader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");

        this.terrainShader.setUniformsValues({ uSampler: 0 });
        this.terrainShader.setUniformsValues({ uSampler2: 1 });
        this.terrainShader.setUniformsValues({ uSampler3: 2 });

        this.terrainMaterial = new CGFappearance(this.scene);
        this.terrainMaterial.setTexture(this.terrainTexture);
        this.terrainMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }
    display() {
        this.terrainTexture.bind(0);
        this.heightMap.bind(1);
        this.altimetryTexture.bind(2);
        
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.terrainShader);
        

        this.terrainMaterial.apply();
        this.plane.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);

    }
}
