uniform vec2 uPoint;
uniform vec3 uColor;
uniform float uRadius;
uniform float uAspectRatio;
uniform int uNumAttractors;
uniform vec3 uAttractors[10];
uniform vec3 uAttractorForces[10];
uniform vec3 uGlobalForce;
uniform float uTime;


out vec4 fragColor;

void main()
{
    vec2 p;
    vec4 color = vec4(0.0);
    vec3 globalForce = uGlobalForce;
    
    for (int i = 0; i < uNumAttractors; i++){
        p = vUV.xy - uAttractors[i].xy ;
        p.x *= uAspectRatio;
        vec3 splat = exp(-dot(p,p)/(uRadius * uAttractors[i].z) ) * (uAttractorForces[i]*5); 
        splat += uGlobalForce;
        //splat = min(splat,vec3(1,1,0));
        vec3 base = texture(sTD2DInputs[0], vUV.st).xyz;
        color += vec4(base + splat, 1.0);
    }

    color.rgb /= uNumAttractors;
    
    /*
    p = vUV.xy - uPoint;
    p.x *= uAspectRatio;
    vec3 splat = exp(-dot(p,p)/uRadius) * uColor;       
    vec3 base = texture(sTD2DInputs[0], vUV.st).xyz;
    color = vec4(base + splat, 1.0);
    */

    fragColor = TDOutputSwizzle(color);
}
