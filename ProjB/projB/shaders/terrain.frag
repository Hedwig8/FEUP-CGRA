#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform sampler2D uSampler3;

varying vec2 vTextureCoord;
varying vec4 coords;

void main() {

	vec4 originalColor  = texture2D(uSampler, vTextureCoord);
	vec4 gradientColor  = texture2D(uSampler3, vec2(0.5, 1.0 - coords.z));

	gl_FragColor = originalColor * 0.5 + gradientColor * 0.5;
}
