import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export default function ThreeScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth || 800;
    let height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0f1419, 26, 62);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(15, 8.5, 17);
    camera.lookAt(0, 2.5, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Studio environment lighting for believable PBR reflections (no external texture files needed)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;

    // Brand palette
    const COLOR_LIME = 0x9ee939;
    const COLOR_LIME_GLOW = 0xc4ff5c;
    const COLOR_WARM_LIGHT = 0xffd9a0;

    // ---------- Lighting ----------
    const hemi = new THREE.HemisphereLight(0x8fa8c9, 0x0c1410, 0.55);
    scene.add(hemi);

    const moonLight = new THREE.DirectionalLight(0x9fb4d9, 1.6);
    moonLight.position.set(18, 24, -10);
    moonLight.castShadow = true;
    moonLight.shadow.mapSize.set(2048, 2048);
    moonLight.shadow.camera.left = -18;
    moonLight.shadow.camera.right = 18;
    moonLight.shadow.camera.top = 18;
    moonLight.shadow.camera.bottom = -18;
    moonLight.shadow.bias = -0.0015;
    scene.add(moonLight);

    const rimLight = new THREE.DirectionalLight(COLOR_LIME_GLOW, 0.5);
    rimLight.position.set(-14, 8, -14);
    scene.add(rimLight);

    // ---------- Group ----------
    const houseGroup = new THREE.Group();
    scene.add(houseGroup);

    // ---------- Materials ----------
    const stuccoMat = new THREE.MeshStandardMaterial({ color: 0xe7e5df, roughness: 0.75, metalness: 0.02 });
    const stuccoDarkMat = new THREE.MeshStandardMaterial({ color: 0x2b2f33, roughness: 0.6, metalness: 0.05 });
    const concreteMat = new THREE.MeshStandardMaterial({ color: 0x9a9a94, roughness: 0.9, metalness: 0.0 });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x6b4a30, roughness: 0.55, metalness: 0.05 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x14171a, roughness: 0.4, metalness: 0.3 });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0d1f26,
      roughness: 0.05,
      metalness: 0.1,
      transparent: true,
      opacity: 0.35,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      reflectivity: 1,
      envMapIntensity: 1.4,
    });
    const mullionMat = new THREE.MeshStandardMaterial({ color: 0x1a1c1e, roughness: 0.4, metalness: 0.6 });
    const grassMat = new THREE.MeshStandardMaterial({ color: 0x1c2b1e, roughness: 1 });
    const waterMat = new THREE.MeshPhysicalMaterial({
      color: 0x1f8fbf,
      roughness: 0.05,
      metalness: 0,
      transparent: true,
      opacity: 0.85,
      clearcoat: 1,
      emissive: 0x0a3a4a,
      emissiveIntensity: 0.3,
    });
    const pathLightMat = new THREE.MeshStandardMaterial({
      color: COLOR_LIME,
      emissive: COLOR_LIME,
      emissiveIntensity: 2.2,
      roughness: 0.3,
    });
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x24361f, roughness: 0.95 });
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3a2a1c, roughness: 0.9 });
    const interiorGlowMat = new THREE.MeshStandardMaterial({
      color: COLOR_WARM_LIGHT,
      emissive: COLOR_WARM_LIGHT,
      emissiveIntensity: 1.4,
    });

    // ---------- Ground / Site ----------
    const groundGeo = new THREE.CircleGeometry(26, 48);
    const groundMesh = new THREE.Mesh(groundGeo, grassMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    houseGroup.add(groundMesh);

    const podiumGeo = new THREE.BoxGeometry(15.5, 0.3, 11.5);
    const podiumMesh = new THREE.Mesh(podiumGeo, concreteMat);
    podiumMesh.position.set(0, 0.15, 0);
    podiumMesh.receiveShadow = true;
    houseGroup.add(podiumMesh);

    // ---------- Ground Floor Volume ----------
    const groundFloorGeo = new THREE.BoxGeometry(9.5, 3.2, 6.8);
    const groundFloorMesh = new THREE.Mesh(groundFloorGeo, stuccoMat);
    groundFloorMesh.position.set(0.6, 1.9, -0.4);
    groundFloorMesh.castShadow = true;
    groundFloorMesh.receiveShadow = true;
    houseGroup.add(groundFloorMesh);

    // Glass curtain wall on the front face of the ground floor
    const frontGlassGeo = new THREE.BoxGeometry(8.8, 2.7, 0.08);
    const frontGlassMesh = new THREE.Mesh(frontGlassGeo, glassMat);
    frontGlassMesh.position.set(0.6, 1.85, 3.04);
    houseGroup.add(frontGlassMesh);

    // Warm interior glow behind the glass (reads as a lit interior at dusk)
    const glowPanelGeo = new THREE.PlaneGeometry(8.2, 2.3);
    const glowPanelMesh = new THREE.Mesh(glowPanelGeo, interiorGlowMat);
    glowPanelMesh.position.set(0.6, 1.85, 2.9);
    houseGroup.add(glowPanelMesh);

    // Vertical mullions across the glass wall
    const mullionCount = 8;
    for (let i = 0; i <= mullionCount; i++) {
      const x = 0.6 - 4.4 + (8.8 / mullionCount) * i;
      const mullionGeo = new THREE.BoxGeometry(0.06, 2.7, 0.1);
      const mullionMesh = new THREE.Mesh(mullionGeo, mullionMat);
      mullionMesh.position.set(x, 1.85, 3.06);
      houseGroup.add(mullionMesh);
    }

    // Interior point lights glowing through the glass
    const interiorLight1 = new THREE.PointLight(COLOR_WARM_LIGHT, 8, 8);
    interiorLight1.position.set(-2.2, 2.2, 1.8);
    houseGroup.add(interiorLight1);
    const interiorLight2 = new THREE.PointLight(COLOR_WARM_LIGHT, 6, 7);
    interiorLight2.position.set(2.4, 2.0, 1.8);
    houseGroup.add(interiorLight2);

    // Wood slat privacy screen on the side elevation
    const slatCount = 14;
    for (let i = 0; i < slatCount; i++) {
      const z = -3.7 + (6.8 / slatCount) * i;
      const slatGeo = new THREE.BoxGeometry(0.08, 2.9, 0.4);
      const slatMesh = new THREE.Mesh(slatGeo, woodMat);
      slatMesh.position.set(-4.55, 1.9, z);
      slatMesh.castShadow = true;
      houseGroup.add(slatMesh);
    }

    // Flat roof slab with overhang on ground floor
    const groundRoofGeo = new THREE.BoxGeometry(10.5, 0.25, 7.6);
    const groundRoofMesh = new THREE.Mesh(groundRoofGeo, roofMat);
    groundRoofMesh.position.set(0.6, 3.6, -0.4);
    groundRoofMesh.castShadow = true;
    houseGroup.add(groundRoofMesh);

    // ---------- Upper Floor Volume (cantilevered) ----------
    const upperFloorGeo = new THREE.BoxGeometry(6.4, 2.9, 5.4);
    const upperFloorMesh = new THREE.Mesh(upperFloorGeo, stuccoDarkMat);
    upperFloorMesh.position.set(-1.6, 5.15, -0.2);
    upperFloorMesh.castShadow = true;
    upperFloorMesh.receiveShadow = true;
    houseGroup.add(upperFloorMesh);

    const upperGlassGeo = new THREE.BoxGeometry(6.0, 2.3, 0.08);
    const upperGlassMesh = new THREE.Mesh(upperGlassGeo, glassMat);
    upperGlassMesh.position.set(-1.6, 5.15, 2.52);
    houseGroup.add(upperGlassMesh);

    const upperGlowGeo = new THREE.PlaneGeometry(5.6, 2.0);
    const upperGlowMesh = new THREE.Mesh(upperGlowGeo, interiorGlowMat);
    upperGlowMesh.position.set(-1.6, 5.15, 2.4);
    upperGlowMesh.material = interiorGlowMat.clone();
    upperGlowMesh.material.emissiveIntensity = 0.7;
    houseGroup.add(upperGlowMesh);

    const upperRoofGeo = new THREE.BoxGeometry(7.4, 0.25, 6.2);
    const upperRoofMesh = new THREE.Mesh(upperRoofGeo, roofMat);
    upperRoofMesh.position.set(-1.6, 6.65, -0.2);
    upperRoofMesh.castShadow = true;
    houseGroup.add(upperRoofMesh);

    // Slim steel columns supporting the cantilever
    const colPositions = [
      [-4.7, -2.6],
      [1.5, -2.6],
    ];
    colPositions.forEach(([x, z]) => {
      const colGeo = new THREE.CylinderGeometry(0.1, 0.1, 3.5, 12);
      const colMesh = new THREE.Mesh(colGeo, mullionMat);
      colMesh.position.set(x, 1.9, z);
      colMesh.castShadow = true;
      houseGroup.add(colMesh);
    });

    // Rooftop parapet accent line (lime edge lighting, brand touch)
    const edgeGlowGeo = new THREE.BoxGeometry(7.5, 0.05, 0.05);
    const edgeGlowMesh = new THREE.Mesh(edgeGlowGeo, pathLightMat);
    edgeGlowMesh.position.set(-1.6, 6.53, 2.62);
    houseGroup.add(edgeGlowMesh);

    // ---------- Infinity Pool ----------
    const poolBasinGeo = new THREE.BoxGeometry(6.5, 0.4, 3.4);
    const poolBasinMesh = new THREE.Mesh(poolBasinGeo, concreteMat);
    poolBasinMesh.position.set(1.4, 0.35, 5.3);
    poolBasinMesh.receiveShadow = true;
    houseGroup.add(poolBasinMesh);

    const poolWaterGeo = new THREE.BoxGeometry(6.0, 0.15, 2.9);
    const poolWaterMesh = new THREE.Mesh(poolWaterGeo, waterMat);
    poolWaterMesh.position.set(1.4, 0.53, 5.3);
    houseGroup.add(poolWaterMesh);

    // ---------- Driveway ----------
    const paverRows = 6;
    for (let i = 0; i < paverRows; i++) {
      const paverGeo = new THREE.BoxGeometry(1.6, 0.08, 0.9);
      const paverMesh = new THREE.Mesh(paverGeo, concreteMat);
      paverMesh.position.set(-9.5 + i * 1.9, 0.19, -3.6);
      paverMesh.receiveShadow = true;
      houseGroup.add(paverMesh);
    }

    // ---------- Landscaping ----------
    function createTree(x, z, scale = 1) {
      const tree = new THREE.Group();
      const trunkGeo = new THREE.CylinderGeometry(0.09 * scale, 0.13 * scale, 1.6 * scale, 8);
      const trunkMesh = new THREE.Mesh(trunkGeo, trunkMat);
      trunkMesh.position.y = 0.8 * scale;
      trunkMesh.castShadow = true;
      tree.add(trunkMesh);

      const canopyGeo = new THREE.SphereGeometry(0.85 * scale, 10, 8);
      const canopyMesh = new THREE.Mesh(canopyGeo, foliageMat);
      canopyMesh.position.y = 1.9 * scale;
      canopyMesh.scale.set(1, 0.85, 1);
      canopyMesh.castShadow = true;
      tree.add(canopyMesh);

      tree.position.set(x, 0.15, z);
      return tree;
    }

    const treePositions = [
      [-9, -6, 1.2],
      [8.5, -5.5, 1],
      [-9.5, 6.5, 0.9],
      [7.5, 7.5, 1.3],
      [5.5, -7, 0.8],
    ];
    treePositions.forEach(([x, z, s]) => houseGroup.add(createTree(x, z, s)));

    function createBush(x, z) {
      const bushGeo = new THREE.SphereGeometry(0.4, 8, 6);
      const bushMesh = new THREE.Mesh(bushGeo, foliageMat);
      bushMesh.position.set(x, 0.35, z);
      bushMesh.scale.set(1, 0.7, 1);
      bushMesh.castShadow = true;
      return bushMesh;
    }
    for (let i = -4; i <= 4; i += 2) {
      houseGroup.add(createBush(i, 4.6));
    }

    // Path / landscape uplights (brand lime accent, matches original UI accent color)
    const uplightPositions = [
      [-6.5, -3.6],
      [-3, -3.6],
      [1.5, -3.6],
      [5, -3.6],
      [-5.2, 3.9],
      [4.4, 4.4],
    ];
    uplightPositions.forEach(([x, z]) => {
      const baseGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.25, 8);
      const baseMesh = new THREE.Mesh(baseGeo, mullionMat);
      baseMesh.position.set(x, 0.28, z);
      houseGroup.add(baseMesh);

      const tipGeo = new THREE.SphereGeometry(0.05, 8, 8);
      const tipMesh = new THREE.Mesh(tipGeo, pathLightMat);
      tipMesh.position.set(x, 0.42, z);
      houseGroup.add(tipMesh);

      const spot = new THREE.PointLight(COLOR_LIME, 1.2, 3.5);
      spot.position.set(x, 0.5, z);
      houseGroup.add(spot);
    });

    // ---------- Interactivity (drag to rotate, gentle auto-rotate) ----------
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = 0.55;
    let targetRotX = 0.08;
    let autoRotate = true;
    let resumeTimeout = null;

    const dom = renderer.domElement;
    dom.style.cursor = "grab";

    function onMouseDown(e) {
      isDragging = true;
      autoRotate = false;
      dom.style.cursor = "grabbing";
      prevMouseX = e.clientX || (e.touches && e.touches[0].clientX);
      prevMouseY = e.clientY || (e.touches && e.touches[0].clientY);
    }

    function onMouseMove(e) {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      if (isDragging && clientX !== undefined && clientY !== undefined) {
        const deltaX = clientX - prevMouseX;
        const deltaY = clientY - prevMouseY;
        targetRotY += deltaX * 0.006;
        targetRotX += deltaY * 0.004;
        targetRotX = Math.max(-0.15, Math.min(0.45, targetRotX));
        prevMouseX = clientX;
        prevMouseY = clientY;
      }
    }

    function onMouseUp() {
      isDragging = false;
      dom.style.cursor = "grab";
      resumeTimeout = setTimeout(() => {
        if (!isDragging) autoRotate = true;
      }, 3500);
    }

    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    dom.addEventListener("touchstart", onMouseDown, { passive: true });
    window.addEventListener("touchmove", onMouseMove, { passive: true });
    window.addEventListener("touchend", onMouseUp, { passive: true });

    let mouseNormX = 0;
    let mouseNormY = 0;
    function onWindowMouseMove(e) {
      mouseNormX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNormY = -(e.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener("mousemove", onWindowMouseMove);

    function onResize() {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 600;
      width = w;
      height = h;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let frameId;

    function animate() {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (autoRotate) {
        targetRotY += 0.0022;
      }

      houseGroup.rotation.y += (targetRotY - houseGroup.rotation.y) * 0.07;
      houseGroup.rotation.x += (targetRotX - houseGroup.rotation.x) * 0.07;

      // Subtle water shimmer
      waterMat.emissiveIntensity = 0.28 + Math.sin(elapsed * 1.4) * 0.06;

      // Gentle flicker on interior warmth
      interiorLight1.intensity = 8 + Math.sin(elapsed * 1.8) * 0.6;
      interiorLight2.intensity = 6 + Math.cos(elapsed * 1.5) * 0.5;

      camera.position.x += (15 + mouseNormX * 2 - camera.position.x) * 0.04;
      camera.position.y += (8.5 + mouseNormY * 1.2 - camera.position.y) * 0.04;
      camera.lookAt(0, 2.6, 0);

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(resumeTimeout);
      dom.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      dom.removeEventListener("touchstart", onMouseDown);
      window.removeEventListener("touchmove", onMouseMove);
      window.removeEventListener("touchend", onMouseUp);
      window.removeEventListener("mousemove", onWindowMouseMove);
      window.removeEventListener("resize", onResize);

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      envTexture.dispose();
      pmremGenerator.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-[520px] lg:h-[640px] block" />;
}
