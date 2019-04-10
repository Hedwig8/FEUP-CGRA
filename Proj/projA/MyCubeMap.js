class MyCubeMap extends CGFobject{
    constructor(scene) {
        super(scene);

        this.scene = scene;
        this.initBuffers();
/*
        this.texture = new CGFappearance(this.scene);
        this.texture.setAmbient(0.1, 0.1, 0.1, 1);
        this.texture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.texture.setSpecular(0.1, 0.1, 0.1, 1);
        this.texture.setShininess(10.0);
        this.texture.loadTexture('images/mineSide.png');
        this.texture.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.topSide = new CGFappearance(this.scene);
        this.topSide.setAmbient(0.1, 0.1, 0.1, 1);
        this.topSide.setDiffuse(0.9, 0.9, 0.9, 1);
        this.topSide.setSpecular(0.1, 0.1, 0.1, 1);
        this.topSide.setShininess(10.0);
        this.topSide.loadTexture('images/sandcastle_up.tga');
        this.topSide.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.downSide = new CGFappearance(this.scene);
        this.downSide.setAmbient(0.1, 0.1, 0.1, 1);
        this.downSide.setDiffuse(0.9, 0.9, 0.9, 1);
        this.downSide.setSpecular(0.1, 0.1, 0.1, 1);
        this.downSide.setShininess(10.0);
        this.downSide.loadTexture('images/sandcastle_dn.tga');
        this.downSide.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.rightSide = new CGFappearance(this.scene);
        this.rightSide.setAmbient(0.1, 0.1, 0.1, 1);
        this.rightSide.setDiffuse(0.9, 0.9, 0.9, 1);
        this.rightSide.setSpecular(0.1, 0.1, 0.1, 1);
        this.rightSide.setShininess(10.0);
        this.rightSide.loadTexture('images/sandcastle_rt.tga');
        this.rightSide.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.leftSide = new CGFappearance(this.scene);
        this.leftSide.setAmbient(0.1, 0.1, 0.1, 1);
        this.leftSide.setDiffuse(0.9, 0.9, 0.9, 1);
        this.leftSide.setSpecular(0.1, 0.1, 0.1, 1);
        this.leftSide.setShininess(10.0);
        this.leftSide.loadTexture('images/sandcastle_lt.tga');
        this.leftSide.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.frontSide = new CGFappearance(this.scene);
        this.frontSide.setAmbient(0.1, 0.1, 0.1, 1);
        this.frontSide.setDiffuse(0.9, 0.9, 0.9, 1);
        this.frontSide.setSpecular(0.1, 0.1, 0.1, 1);
        this.frontSide.setShininess(10.0);
        this.frontSide.loadTexture('images/sandcastle_ft.tga');
        this.frontSide.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.backSide = new CGFappearance(this.scene);
        this.backSide.setAmbient(0.1, 0.1, 0.1, 1);
        this.backSide.setDiffuse(0.9, 0.9, 0.9, 1);
        this.backSide.setSpecular(0.1, 0.1, 0.1, 1);
        this.backSide.setShininess(10.0);
        this.backSide.loadTexture('images/sandcastle_bk.tga');
        this.backSide.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
*/
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
            0, 3, 1,
            0, 2, 3,
            //+x face
            8, 14, 10,
            8, 12, 14,
            //+y face
            16, 21, 20,
            16, 17, 21,
            //-z face
            4, 7, 6,
            4, 5, 7,
            //-x face
            9, 15, 13,
            9, 11, 15,
            //-y face
            18, 23, 19,
            18, 22, 23
        ];
        
        this.normals = [
            0, 0,  -1,
            0, 0,  -1,
            0, 0,  -1, 
            0, 0,  -1, //+z face

            0, 0, 1,
            0, 0, 1, 
            0, 0, 1,
            0, 0, 1, //-z face

            -1, 0, 0, 
             1, 0, 0,
            -1, 0, 0,
             1, 0, 0, //+x face

            -1, 0, 0,
             1, 0, 0,
            -1, 0, 0, 
             1, 0, 0, //-x face

            0, -1, 0,
            0, -1, 0, 
            0,  1, 0,
            0,  1, 0, //+y face

            0, -1, 0, 
            0, -1, 0,
            0,  1, 0,
            0,  1, 0  //-y face
        ];


        this.texCoords = [
            1/4, 1/3,
            1/2, 1/3,
            1/4, 2/3,
            1/2, 2/3,   //+z face

            1,   1/3,
            3/4, 1/3,
            1,   2/3,
            3/4, 2/3,   //-z face
            
            1/4, 1/3,   //8
            1/2, 1/3,
            1/4, 2/3,
            1/2, 2/3,   //11

            0, 1/3,     //12
            3/4, 1/3,   
            0, 2/3,
            3/4, 2/3,   //15

            1/4, 1/3,   //16
            1/2, 1/3,
            1/4, 2/3,
            1/2, 2/3,   //19

            1/4, 0,     //20
            1/2, 0,
            1/4, 1,
            1/2, 1      //23

        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        
        this.initGLBuffers();
    }
    updateBuffers() { }

}