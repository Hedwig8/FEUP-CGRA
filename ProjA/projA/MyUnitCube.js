class MyUnitCube extends CGFobject{
    constructor(scene) {
        super(scene);

        this.scene = scene;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [
            0.5, 0.5, 0.5,      //0
            -0.5, 0.5, 0.5,     //1
            0.5, -0.5, 0.5,     //2
            -0.5, -0.5, 0.5,    //3
            0.5, 0.5, -0.5,     //4
            -0.5, 0.5, -0.5,    //5
            0.5, -0.5, -0.5,    //6
            -0.5, -0.5, -0.5,    //7

            0.5, 0.5, 0.5,      //0 - 8
            -0.5, 0.5, 0.5,     //1 - 9
            0.5, -0.5, 0.5,     //2 - 10
            -0.5, -0.5, 0.5,    //3 - 11
            0.5, 0.5, -0.5,     //4 - 12
            -0.5, 0.5, -0.5,    //5 - 13
            0.5, -0.5, -0.5,    //6 - 14
            -0.5, -0.5, -0.5,    //7- 15

            0.5, 0.5, 0.5,      //0 - 16
            -0.5, 0.5, 0.5,     //1
            0.5, -0.5, 0.5,     //2 - 18
            -0.5, -0.5, 0.5,    //3
            0.5, 0.5, -0.5,     //4 - 20
            -0.5, 0.5, -0.5,    //5
            0.5, -0.5, -0.5,    //6
            -0.5, -0.5, -0.5    //7 - 23
        ];

        this.indices = [
            //+z face
            0, 1, 3,
            0, 3, 2,
            //+x face
            8, 10, 14,
            8, 14, 12,
            //+y face
            16, 20, 21,
            16, 21, 17,
            //-z face
            4, 6, 7,
            4, 7, 5,
            //-x face
            9, 13, 15,
            9, 15, 11,
            //-y face
            18, 19, 23,
            18, 23, 22
        ];
        
        this.normals = [
            0, 0,  1,
            0, 0,  1,
            0, 0,  1, 
            0, 0,  1, //+z face
            0, 0, -1,
            0, 0, -1, 
            0, 0, -1,
            0, 0, -1, //-z face
             1, 0, 0, 
            -1, 0, 0,
             1, 0, 0,
            -1, 0, 0, //+x face
             1, 0, 0,
            -1, 0, 0,
             1, 0, 0, 
            -1, 0, 0, //-x face
            0,  1, 0,
            0,  1, 0, 
            0, -1, 0,
            0, -1, 0, //+y face
            0,  1, 0, 
            0,  1, 0,
            0, -1, 0,
            0, -1, 0  //-y face
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    updateBuffers() { }

}