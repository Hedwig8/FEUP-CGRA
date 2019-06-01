/**
 * MyWing
 * @constructor
 */
class MyWing extends CGFobject {
    constructor(scene, width, length, offX, bodySize, midRotate, tipRotate) {
        super(scene);
        this.scene = scene;
        this.width = width;
        this.length = length;
        this.initMidRot = midRotate-6*Math.PI/7; //rotation of the wing + offset
        this.initTipRot = tipRotate - Math.PI/6; //rotation of the tip of the wing, comparing to the wing itself + offset
        this.midRotate = this.initMidRot;
        this.tipRotate = this.initTipRot;
        this.offX = offX;
        this.bodySize = bodySize;
        this.counter = 0;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices=[
            //right wing
                //top
                0, 0, this.bodySize/2,
                this.width, 0, this.bodySize/2,
                this.offX, this.length/2*Math.sin(this.midRotate), this.bodySize/2+this.length/2,
                this.width+this.offX, this.length/2*Math.sin(this.midRotate), this.bodySize/2+this.length/2,
                this.offX, this.length/2*Math.sin(this.midRotate)+this.length/2*Math.sin(this.midRotate+this.tipRotate), this.bodySize/2+this.length,
                // bottom
                0, 0, this.bodySize/2,
                this.width, 0, this.bodySize/2,
                this.offX, this.length/2*Math.sin(this.midRotate), this.bodySize/2+this.length/2,
                this.width+this.offX, this.length/2*Math.sin(this.midRotate), this.bodySize/2+this.length/2,
                this.offX, this.length/2*Math.sin(this.midRotate)+this.length/2*Math.sin(this.midRotate+this.tipRotate), this.bodySize/2+this.length,
            //left wing
                //top
                0, 0, -this.bodySize/2,
                this.width, 0, -this.bodySize/2,
                this.offX, this.length/2*Math.sin(this.midRotate), -this.bodySize/2-this.length/2,
                this.width+this.offX, this.length/2*Math.sin(this.midRotate), -this.bodySize/2-this.length/2,
                this.offX, this.length/2*Math.sin(this.midRotate)+this.length/2*Math.sin(this.midRotate+this.tipRotate), -this.bodySize/2-this.length,
                //bottom
                0, 0, -this.bodySize/2,
                this.width, 0, -this.bodySize/2,
                this.offX, this.length/2*Math.sin(this.midRotate), -this.bodySize/2-this.length/2,
                this.width+this.offX, this.length/2*Math.sin(this.midRotate), -this.bodySize/2-this.length/2,
                this.offX, this.length/2*Math.sin(this.midRotate)+this.length/2*Math.sin(this.midRotate+this.tipRotate), -this.bodySize/2-this.length
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
        this.texCoords=[
            0, 1,
            0, 0,
            1, 1,
            1, 0,
            0, 1,
            0, 1,
            0, 0,
            1, 1,
            1, 0,
            0, 1,
            0, 1,
            0, 0,
            1, 1,
            1, 0,
            0, 1,
            0, 1,
            0, 0,
            1, 1,
            1, 0,
            0, 1
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    update(t, delta) {

        this.midRotate = Math.sin(t/500 * Math.PI-this.initMidRot); 
        this.tipRotate = -1/2 + Math.sin(t/500 * Math.PI-this.initTipRot) + 0.5*Math.sin(t/250 * Math.PI-this.initTipRot);
       
        this.initBuffers();
        
    }
   
}