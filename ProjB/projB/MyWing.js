/**
 * MyWing
 * @constructor
 */
class MyWing extends CGFobject {
    constructor(scene, width, length, offX, bodySize, midHeight, tipHeight) {
        console.log("inicializada wing");
        super(scene);
        this.scene = scene;
        this.width = width;
        this.length = length;
        this.midHeight = midHeight;
        this.tipHeight = tipHeight;
        this.offX = offX;
        this.bodySize = bodySize;

        this.initBuffers();
        console.log("fim da inicializaçao da wing");
    }
    initBuffers() {
        this.vertices=[
            //right wing
                //top
                0, 0, this.bodySize/2,
                this.width, 0, this.bodySize/2,
                this.offX, this.midHeight, this.bodySize/2+this.length/2,
                this.width+this.offX, this.midHeight, this.bodySize/2+this.length/2,
                this.offX, this.tipHeight, this.bodySize/2+this.length,
                // bottom
                0, 0, this.bodySize/2,
                this.width, 0, this.bodySize/2,
                this.offX, this.midHeight, this.bodySize/2+this.length/2,
                this.width+this.offX, this.midHeight, this.bodySize/2+this.length/2,
                this.offX, this.tipHeight, this.bodySize/2+this.length,
            //left wing
                //top
                0, 0, -this.bodySize/2,
                this.width, 0, -this.bodySize/2,
                this.offX, this.midHeight, -this.bodySize/2-this.length/2,
                this.width+this.offX, this.midHeight, -this.bodySize/2-this.length/2,
                this.offX, this.tipHeight, -this.bodySize/2-this.length,
                //bottom
                0, 0, -this.bodySize/2,
                this.width, 0, -this.bodySize/2,
                this.offX, this.midHeight, -this.bodySize/2-this.length/2,
                this.width+this.offX, this.midHeight, -this.bodySize/2-this.length/2,
                this.offX, this.tipHeight, -this.bodySize/2-this.length
        ];
        this.indices=[
            //top right
            0, 2, 1,
            1, 2, 3,
            2, 4, 3,
            //bottom right
            5, 6, 7,
            7, 6, 8,
            7, 8, 9,

            //top left
            10, 11, 12,
            12, 11, 13,
            12, 13, 14,
            //bottom left
            15, 17, 16,
            16, 17, 18,
            17, 19, 18
        ];
        this.normals=[
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0
        ];
        //this.texCoords=[];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
   
}