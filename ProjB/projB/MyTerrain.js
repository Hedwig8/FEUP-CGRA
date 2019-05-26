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

        this.terrainShader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.terrainShader.setUniformsValues({ usampler: 0 });
        this.terrainShader.setUniformsValues({ usampler2: 1 });

        this.terrainMaterial = new CGFappearance(this.scene);
        this.terrainMaterial.setTexture(this.terrainTexture);
        this.terrainMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }
    display() {
        this.scene.pushMatrix();
        this.terrainMaterial.apply();
        this.scene.setActiveShader(this.terrainShader);
        this.terrainTexture.bind(0);
        this.heightMap.bind(1);
        this.plane.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);

    }
}
