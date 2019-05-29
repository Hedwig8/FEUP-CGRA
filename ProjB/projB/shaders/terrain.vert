attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform sampler2D uSampler3;

varying vec2 vTextureCoord;
varying vec4 coords;

void main() {
	
	vTextureCoord = aTextureCoord;
	float maxHeight = 12.0;

	vec4 filter = texture2D(uSampler2, vTextureCoord);

	vec4 vertex = vec4(aVertexPosition + aVertexNormal*maxHeight*filter.b, 1.0);

	gl_Position = uPMatrix * uMVMatrix * vertex;

	coords = vertex / maxHeight;
}

