import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

let Limiter = 1;
export default class Background extends React.Component {
  static setupCubes() {
    const cubes = [];
    for (let i = 0; i < 500; i += 1) {
      cubes.push({
        x: ((i % 25) - 13),
        y: -2,
        z: (Math.floor(i / 25) * -1),
        color: 0x00ffff,
        id: Meteor.uuid(),
      });
    }
    return cubes;
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      cubeRotation: new THREE.Euler(),
      cubes: Background.setupCubes(),
      camera: {
        position: new THREE.Vector3(0, 10, -20),
        lookAt: new THREE.Vector3(0, 0, 0),
      },
    };

    this.onAnimate = () => {
      Limiter = Math.cos(new Date().getTime() / 10000000000000) + 1;
      this.setState({
        camera: {
          position: new THREE.Vector3(
            20 * Math.cos(new Date().getTime() * 0.0001),
            this.state.camera.position.y,
            20 * Math.sin(new Date().getTime() * 0.0001),
          ),
          lookAt: new THREE.Vector3(0, 0, -10),
        },
        cubes: this.state.cubes.map((cube, i) => ({
          color: cube.color,
          id: cube.id,
          x: 10 * Math.cos((i / Limiter) * (new Date().getTime() / 10000000)),
          y: 10 * Math.cos((i * Limiter) * (new Date().getTime() / 10000000)),
          z: 10 * Math.sin(i + (new Date().getTime() / 100000000)),
        })),
      });
    };
  }

  render() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    return (
      <div className="background">
        <React3
          mainCamera="camera"
          width={width}
          height={height}
          onAnimate={this.onAnimate}
          alpha
        >
          <scene>
            <perspectiveCamera
              name="camera"
              fov={75}
              aspect={width / height}
              near={0.1}
              far={1000}
              lookAt={this.state.camera.lookAt}
              position={this.state.camera.position}
            />
            <ambientLight
              color={0x505050}
            />
            {
              this.state.cubes.map(cube => (
                <mesh
                  key={cube.id}
                  rotation={this.state.cubeRotation}
                  position={new THREE.Vector3(cube.x, cube.y, cube.z)}
                >
                  <sphereGeometry
                    radius={0.1}
                    widthSegments={20}
                    heightSegments={20}
                  />
                  <meshPhongMaterial
                    color={cube.color}
                  />
                </mesh>
              ))
            }
            <spotLight
              color={0xffffff}
              intensity={0.5}
              position={this.state.camera.position}
              lookAt={new THREE.Vector3(0, 0, 0)}
              castShadow
              shadowCameraNear={200}
              shadowCameraFar={10000}
              shadowCameraFov={50}
              shadowBias={-0.00022}
              shadowMapWidth={2048}
              shadowMapHeight={2048}
            />
          </scene>
        </React3>
      </div>
    );
  }
}
