#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform sampler2D uSampler3;

varying vec2 vTextureCoord;
varying vec4 coords;
varying float maxHeight;

void main() {

	vec4 gradientColor  = texture2D(uSampler3, vec2(0.5, 1.0 - coords.z));
	vec4 originalColor  = texture2D(uSampler, vTextureCoord);

	vec4 finalColor = originalColor;

	finalColor.r = originalColor.r * 0.5 + gradientColor.r * 0.5;
	finalColor.g = originalColor.g * 0.5 + gradientColor.g * 0.5;
	finalColor.b = originalColor.b * 0.5 + gradientColor.b * 0.5;

	gl_FragColor = finalColor;
}
