// Pass 2 fragment shader
//
// Outputs the Laplacian, computed from depth buffer

#version 300 es

// texCoordInc = the x and y differences, in texture coordinates,
// between one texel and the next.  For a window that is 400x300, for
// example, texCoordInc would be (1/400,1/300).

uniform mediump vec2 texCoordInc;

// texCoords = the texture coordinates at this fragment

in mediump vec2 texCoords;

// depthSampler = texture sampler for the depths.

uniform mediump sampler2D depthSampler;

// fragLaplacian = an RGB value that is output from this shader.  All
// three components should be identical.  This RGB value will be
// stored in the Laplacian texture.

layout (location = 0) out mediump vec3 fragLaplacian;


void main()

{

  // YOUR CODE HERE.  You will have to compute the Laplacian by
  // evaluating a 3x3 filter kernel at the current texture
  // coordinates.  The Laplacian weights of the 3x3 kernel are
  //
  //      -1  -1  -1
  //      -1   8  -1
  //      -1  -1  -1
  //
  // Store a signed value for the Laplacian; do not take its absolute
  // value.
  mediump float laplac = 0.;

  for(int i = -1; i < 2; i++)
  {
	for(int j = -1; j < 2; j++)
	{

	  mediump float val = texture(depthSampler, texCoords + vec2(float(i) * texCoordInc.x, float(j) * texCoordInc.y)).r;

      if ( i == 0 && j == 0)
        laplac += 8. * val;
	  else
		laplac += -1. * val;
		
	}
		 
  }
  fragLaplacian = vec3(laplac, laplac, laplac);
}
