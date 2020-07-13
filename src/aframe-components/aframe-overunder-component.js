/* global AFRAME */

if (typeof AFRAME === "undefined") {
  throw new Error(
    "Component attempted to register before AFRAME was available."
  );
}

/**
 * OverUnder Panorama Viewer component for A-Frame.
 *
 * Creates two sphere meshes, one for each eye. The left sphere is set to layer 1,
 * the right sphere is set to layer 2.
 *
 * This component takes a single prop: an 'overunder' style panorama image. This
 * image will be used to texture both spheres.
 *
 */
AFRAME.registerComponent("overunder", {
  schema: {
    type: "asset",
  },

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    const el = this.el;
    this.loader = new THREE.TextureLoader();
    this.material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    // Supply a dummy texture to avoid setting material.needsUpdate later
    this.material.map = new THREE.Texture();

    this.imageSphere = new THREE.Group();
    this.leftSphere = this.createImageSphere(this.material, "left");
    this.imageSphere.add(this.leftSphere);
    this.rightSphere = this.createImageSphere(this.material, "right");
    this.imageSphere.add(this.rightSphere);

    el.setObject3D("imageSphere", this.imageSphere);
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   *
   * Note: texture load progress has been taken out of three.js
   * https://github.com/mrdoob/three.js/issues/10439#issuecomment-293260145
   *
   */
  update: function (oldData) {
    const url = this.data;

    this.el.emit("textureLoadStart", { url });
    this.loader.load(url, onTextureLoad.bind(this), null, onError.bind(this));

    function onTextureLoad(texture) {
      // Avoid race conditions caused by rapid setAttribute() calls.
      if (url !== this.data) {
        // This texture loaded to late.
        texture.dispose();
        return;
      }
      const currentTexture = this.material.map;
      this.material.map = texture;
      currentTexture.dispose();
      this.el.emit("textureLoaded");
    }

    function onError(xhr) {
      this.el.emit("loadError", xhr);
    }
  },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () {
    this.material.map.dispose();
    this.material.dispose();
    this.leftSphere.dispose();
    this.rightSphere.dispose();
    this.el.removeObject3D("imageSpheres");
  },

  /**
   * A helper function that returns an ImageSphere mesh given a material
   * and whether it is meant for the left or right eye.
   */
  createImageSphere: function (material, side) {
    var geometry = new THREE.SphereGeometry(5000, 64, 64);
    var uvs = geometry.faceVertexUvs[0];
    var axis = "y";

    // Display half
    if (side === "left") {
      for (var i = 0; i < uvs.length; i++) {
        for (var j = 0; j < 3; j++) {
          uvs[i][j][axis] *= 0.5;
          uvs[i][j][axis] += 0.5;
        }
      }
    } else {
      for (var i = 0; i < uvs.length; i++) {
        for (var j = 0; j < 3; j++) {
          uvs[i][j][axis] *= 0.5;
        }
      }
    }

    var sphere = new THREE.Mesh(geometry, material);
    sphere.name = side === "left" ? "leftSphere" : "rightSphere";
    // left eye sees layer 1, right eye sees layer 2
    var layer = side === "left" ? 1 : 2;
    sphere.layers.set(layer);
    sphere.scale.x = -1; // like using THREE.Backside but avoids mirroring

    return sphere;
  },
});
