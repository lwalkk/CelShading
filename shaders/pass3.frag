// Pass 3 fragment shader
//
// Output fragment colour based using
//    (a) Cel shaded diffuse surface
//    (b) wide silhouette in black
 
#version 300 es

uniform mediump vec3 lightDir;     // direction toward the light in the VCS
uniform mediump vec2 texCoordInc;  // texture coord difference between adjacent texels

in mediump vec2 texCoords;              // texture coordinates at this fragment

// The following four textures are now available and can be sampled
// using 'texCoords'

uniform sampler2D colourSampler;
uniform sampler2D normalSampler;
uniform sampler2D depthSampler;
uniform sampler2D laplacianSampler;

out mediump vec4 outputColour;          // the output fragment colour as RGBA with A=1


void main()

{

 // depth and laplacian lookup

  mediump float depth = texture(depthSampler, texCoords).r;
  mediump float laplac = texture(laplacianSampler, texCoords).r;

 // If background pixel, output the background color (white)
 
  if(depth >= 0.9 &&  abs(laplac) > 0.0)
  {
    outputColour = vec4(1.0, 1.0, 1.0, 1.0);
  }

  else
  {
	// look up color and normal

	mediump vec3 color = texture(colourSampler, texCoords).rgb;
	
	mediump vec3 normal = texture(normalSampler, texCoords).xyz;
	
	// incoming light intensity 
    mediump vec3 Iin = vec3(1.0, 1.0, 1.0);

	mediump float NdotL = dot(normal, lightDir);

	
	if(NdotL < 0.2)
	{
	  NdotL = 0.2;
	}
	
	const int numQuanta = 3;
	const mediump float H = 1.0;
	const mediump float L = 0.2; 

	// blending formula which is essentially a step function that maps all values to numQuanta quantization states
	// H is the maximum value (1), while L is the minimum (0.2 in this case) of N dot L. 
	NdotL = 0.2 + ((H - L) / (float(numQuanta) - 1.0) * float( floor( (NdotL - L) / ( (H - L) / (float(numQuanta) - 1.0)))));

	mediump vec3 Iout = color * NdotL * Iin;
	
	outputColour = vec4(Iout,1.0);
	
	

  // YOUR CODE HERE

  // [2 marks] Look at the fragments in the 3x3 neighbourhood of
  // this fragment.  Your code should use the 'kernelRadius'
  // below and check all fragments in the range
  //
  //    [-kernelRadius,+kernelRadius] x [-kernelRadius,+kernelRadius]
  //
  // around this fragment.
  //
  // Find the neighbouring fragments with a Laplacian beyond some
  // threshold.  Of those fragments, find the distance to the closest
  // one.  That distance, divided by the maximum possible distance
  // inside the kernel, is the blending factor.
  //
  // You can use a large kernelRadius here (e.g. 10) to see that
  // blending is being done correctly.  Do not use '3.0' or '-0.1' in
  // your code; use 'kernelRadius' and 'threshold'.

  const mediump float kernelRadius = 3.0;
  const mediump float threshold = -0.1;

  // YOUR CODE HERE

  // [1 mark] Output the fragment colour.  If there is an edge
  // fragment in the 3x3 neighbourhood of this fragment, output a grey
  // colour based on the blending factor.  The grey should be
  // completely black for an edge fragment, and should blend to the
  // Phong colour as distance from the edge increases.  If these is no
  // edge in the neighbourhood, output the cel-shaded colour.
  
  // YOUR CODE HERE
  }

}
