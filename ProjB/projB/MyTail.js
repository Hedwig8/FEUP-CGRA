/**
 * MyTail
 * @constructor
 */
class MyTail extends CGFobject {
    constructor(scene) {
        super(scene);

        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [
            0, 0, 0,
            -1.5, 0.5, -0.5,
            -1.5, 0.4, 0,
            -1.5, 0.5, 0.5,
            0, 0, 0,
            -1.5, 0.5, -0.5,
            -1.5, 0.4, 0,
            -1.5, 0.5, 0.5
        ];

        this.indices = [
            0, 1, 2,
            0, 2, 3,
            5, 4, 6,
            6, 4, 7
        ];

        this.normals = [
            0, 1, 0,
            0, Math.sqrt(3)/2, 0.5,
            0.5, Math.sqrt(3)/2, 0,
            0, Math.sqrt(3)/2, -0.5,
            0, -1, 0,
            0, -Math.sqrt(3)/2, -0.5,
            -0.5, -Math.sqrt(3)/2, 0,
            0, -Math.sqrt(3)/2, 0.5
        ];

        this.texCoords=[
            0.5, 0,
            0, 1,
            0.5, 1,
            1, 1,
            0.5, 0,
            1, 1,
            0.5, 1,
            0,1
        ];

        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

}