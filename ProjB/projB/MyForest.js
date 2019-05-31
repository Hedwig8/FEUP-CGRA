/**
* MyForest
* @constructor
*/
class MyForest extends CGFobject {
    constructor(scene, widthX, widthZ) {
        super(scene);

        this.widthX = widthX;
        this.widthZ = widthZ;

        this.trees = [];
        this.treePositions = [];

        this.numTrees = this.widthX * this.widthZ / 5;

        this.constructTrees();
    }

    constructTrees() {
        for(var i = 0; i < this.numTrees; i++) {
            this.trees[i] = new MyLSPlant(this.scene);
            this.treePositions.push(Math.floor( (Math.random() * this.widthX) + 1), Math.floor( (Math.random() * this.widthZ) + 1));
        }
    }

    display() {
        
        for(var i = 0; i < this.treePositions.length; i=i+2) {
            this.scene.pushMatrix();
            this.scene.translate(this.treePositions[i], 0, this.treePositions[i+1]);
            this.trees[i/2].display();
            this.scene.popMatrix();
        }
    }

}