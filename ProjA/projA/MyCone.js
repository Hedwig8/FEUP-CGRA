/**
* MyCone
* @constructor
*/
class MyCone extends CGFobject {
    constructor(scene, slices, height, radius) {
        super(scene);
        this.slices = slices;
        this.height = height;
        this.radius = radius;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++) {

            this.vertices.push(this.radius * Math.cos(ang), 0, this.radius * -Math.sin(ang));
            this.indices.push(i, (i+1) % this.slices, this.slices);
            this.normals.push(this.radius * Math.cos(ang), this.radius * Math.cos(Math.PI / 4.0), this.radius * -Math.sin(ang));
            ang+=alphaAng;
        }

        var slicesPerSide = this.slices / 4;
        //Bottom side 
        for (var i = 0; i < slicesPerSide; i++)
            this.texCoords.push((1 / slicesPerSide) * i, 1);

        //Right side
        for (var i = slicesPerSide; i > 0; i--)
            this.texCoords.push(1, (1 / slicesPerSide) * i);

        //Top side
        for (var i = slicesPerSide; i > 0; i--)
            this.texCoords.push((1 / slicesPerSide) * i, 0);

        //Left side
        for (var i = 0; i < slicesPerSide; i++)
            this.texCoords.push(0, (1 / slicesPerSide) * i);
        
        this.vertices.push(0, this.height, 0);
        this.normals.push(0, 1, 0);
        this.texCoords.push(0.5, 0.5);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
 
}


