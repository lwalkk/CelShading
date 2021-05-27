# CelShading
### Author: Liam Walker

## Overview

This project explored multipass rendering and the use of compute shaders. Takes in .obj files and outputs a cel-shaded rendering. 

## Structure & Methods

The C++ code contained in src/ is responsible for importing the assets, and making all of the OpenGL calls. The entry point is defined in toon.cpp. In the Renderer class, a 3-stage rendering process is defined where color, normal, depth and laplacian values are stored in G-buffers. 

On the GPU side, the first pass shaders calculate the depth, the second pass calculates the Laplacian (used for edge detection), and the final pass uses these values and the color to output a cel shaded image to the screen. The cel shaded color is calculated in one line using a step function that thresholds the values. If the Laplacian is greater than some threshold, the fragment is near the edge and has a black border applied. This calculation results in a cartoonish art style similar to many popular games such as The Legend of Zelda: The Wind Waker. 

## Output

![celshader](https://user-images.githubusercontent.com/37026953/119873212-4db4f500-bef2-11eb-9d4c-f9fc4e51da67.PNG)
![cel2](https://user-images.githubusercontent.com/37026953/119873228-51e11280-bef2-11eb-83a4-1e081a855c94.PNG)
![cel3](https://user-images.githubusercontent.com/37026953/119873235-55749980-bef2-11eb-89a0-2ef71a090447.PNG)




