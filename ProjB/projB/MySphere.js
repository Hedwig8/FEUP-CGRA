/**
 * MySphere
 * @constructor
 */
class MySphere extends CGFobject {
    constructor(scene, radius, vertCount, horizCount) {
        super(scene);
        //this.samples = samples;
        this.radius = radius;
        this.vertCount = vertCount;
        this.horizCount = horizCount;

        this.initBuffers();
    }

    initBuffers() {

        this.vertices = [];
        this.normals = [];
        this.indices = [];
        this.texCoords = [];
/*
        var offset = 2 / this.samples;
        var increment = Math.PI * (3 - Math.sqrt(5));

        for (var i = 0; i < this.samples; i++) {
            var y = ((i * offset) - 1) + (offset / 2);
            var r = Math.sqrt(1 - Math.pow(y, 2));

            var phi = ((i) % this.samples) * increment;

            var x = Math.cos(phi) * r;
            var z = Math.sin(phi) * r;
            
            this.vertices.push(x, y, z);
        }*/

        
        var vertStep =  Math.PI / this.vertCount;
        var horizStep = 2* Math.PI / this.horizCount;
        var vertAngle, horizAngle;
        var lengthInv = 1 / this.radius; // to normalize normals

        for(var i = 0; i <= this.vertCount; i++) {
            vertAngle = Math.PI / 2 - i * vertStep;     // starting from pi/2 to -pi/2
            var xy = this.radius * Math.cos(vertAngle); // r * cos(u)
            var z = this.radius * Math.sin(vertAngle);  // r * sin(u)

            // add (horizCount+1) vertices per vertical
            // the first and last vertices have same position and normal but different texCoords
            for(var j = 0; j <= this.horizCount; j++) {
                horizAngle = j * horizStep; // starting from 0 to 2pi

                //vertex position
                var x = xy * Math.cos(horizAngle);  // r * cos(u) * cos(v)
                var y = xy * Math.sin(horizAngle);  // r * cos(u) * sin(v)
                this.vertices.push(x, y, z);

                // normalized vertex normal (nx, ny, nz)
                var nx = x * lengthInv;
                var ny = y * lengthInv;
                var nz = z * lengthInv;
                this.normals.push(nx, ny, nz);

                //vertex texCoords (s, t) range between [0, 1]
                var s = j / this.horizCount;
                var t = i / this.vertCount;
                this.texCoords.push(s, t);
            }
        }

        //indices
        for (var i = 0; i < this.vertCount; i++) {
            var k1 = i * (this.horizCount +1);   // beginning of current vert
            var k2 = k1 + this.horizCount + 1;   // beginning of next vert
        
            for (var j = 0; j < this.horizCount; j++, k1++, k2++) {
                // 2 triangles per horiz sector excluding first and last vert
                // k1 -> k2 -> k1+1
                if(i != 0) {
                    this.indices.push(k1, k2, k1+1);
                }
                if(i != (this.vertCount -1)) {
                    this.indices.push(k1+1, k2, k2+1);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}