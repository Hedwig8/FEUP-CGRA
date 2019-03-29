class MyPrism extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var alphaAng = 2 * Math.PI / this.slices;

        for (var i = 0; i < this.slices; i++) {
            var ang = alphaAng * i;
            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            this.vertices.push(Math.cos(ang), 1, -Math.sin(ang));
            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            this.vertices.push(Math.cos(ang), 1, -Math.sin(ang));
        }

        for (var i = 0; i < this.slices; i++) {
            var size = this.vertices.length / 3;
            var x = (i * 4 + 2) % size;
            this.indices.push(x % size, (x + 2) % size, (x + 1) % size);
            this.indices.push((x + 1) % size, (x + 2) % size, (x + 3) % size);
        }

        for (var i = 0; i < this.slices; i++) {
            var ang = alphaAng * i - alphaAng / 2;
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));

            ang = alphaAng * i + alphaAng / 2;
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
        }

        for (var i = 0; i < this.slices * 2; i++) {
            this.texCoords.push(i / this.slices, 1);
            this.texCoords.push(i / this.slices, 0);
            this.texCoords.push(i / this.slices, 1);
            this.texCoords.push(i / this.slices, 0);
        }
        this.texCoords[0] = 1;
        this.texCoords[1] = 1;
        this.texCoords[2] = 1;
        this.texCoords[3] = 0;

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();

        this.initNormalVizBuffers();
        this.enableNormalViz();

    }
}