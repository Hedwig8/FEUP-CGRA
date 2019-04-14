/**
 * MyVoxelHill
 * @constructor
 */
class MyVoxelHill extends CGFobject {
    constructor(scene, levels, topTexture, sideTexture) {
        super(scene);
        this.scene = scene;
        this.cube = new MyUnitCubeQuad(this.scene, topTexture, sideTexture);
        this.levels = levels;
        
    }
    display() {        
        
        for(var i = this.levels; i >0; i--) {
            var side = i*2-1;
            //display x-axis parallel sides
            for(var j = 0; j < side; j++) {
                this.scene.pushMatrix();
                this.scene.translate(this.levels-i+j, this.levels-i, this.levels-i);
                this.cube.display(); 
                this.scene.translate(0, 0, side-1);
                this.cube.display();
                this.scene.popMatrix();
            }

            //display z-axis parallel sides
            for(var j = 0; j < side; j++) {
                this.scene.pushMatrix();
                this.scene.translate(this.levels-i, this.levels-i, this.levels-i+j);
                this.cube.display();
                this.scene.translate(side, 0, 0);
                this.cube.display();
                this.scene.popMatrix();
            }
        }
    }

    updateLevels(levels) {
        this.levels = levels;
    }
}