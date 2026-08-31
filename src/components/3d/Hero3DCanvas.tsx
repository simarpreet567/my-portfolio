"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffd4de, 2.0);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xcfe8f7, 1.8);
    dirLight2.position.set(-5, -4, 4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xfffbe6, 1.2, 12);
    pointLight.position.set(0, 2, 3);
    scene.add(pointLight);

    // Group for objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Materials
    const pastelPinkMat = new THREE.MeshStandardMaterial({
      color: 0xf7c9d4,
      roughness: 0.35,
      metalness: 0.05,
    });

    const pastelBlueMat = new THREE.MeshStandardMaterial({
      color: 0xbeddf2,
      roughness: 0.4,
      metalness: 0.05,
    });

    const pastelLavenderMat = new THREE.MeshStandardMaterial({
      color: 0xded4f7,
      roughness: 0.35,
      metalness: 0.05,
    });

    const pastelGoldMat = new THREE.MeshStandardMaterial({
      color: 0xfde08b,
      roughness: 0.25,
      metalness: 0.2,
    });

    const softCreamMat = new THREE.MeshStandardMaterial({
      color: 0xfffcf7,
      roughness: 0.3,
      metalness: 0.02,
    });

    const mintMat = new THREE.MeshStandardMaterial({
      color: 0xc8e3d2,
      roughness: 0.35,
      metalness: 0.05,
    });

    // 1. Central Floating Teddy Head / Torus
    const teddyGroup = new THREE.Group();

    // Central Sphere (Head)
    const headGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const head = new THREE.Mesh(headGeo, pastelPinkMat);
    teddyGroup.add(head);

    // Left Ear
    const earGeo = new THREE.SphereGeometry(0.42, 24, 24);
    const leftEar = new THREE.Mesh(earGeo, pastelPinkMat);
    leftEar.position.set(-0.95, 0.95, 0);
    teddyGroup.add(leftEar);

    const leftEarInner = new THREE.Mesh(new THREE.SphereGeometry(0.25, 20, 20), softCreamMat);
    leftEarInner.position.set(-0.95, 0.95, 0.2);
    teddyGroup.add(leftEarInner);

    // Right Ear
    const rightEar = new THREE.Mesh(earGeo, pastelPinkMat);
    rightEar.position.set(0.95, 0.95, 0);
    teddyGroup.add(rightEar);

    const rightEarInner = new THREE.Mesh(new THREE.SphereGeometry(0.25, 20, 20), softCreamMat);
    rightEarInner.position.set(0.95, 0.95, 0.2);
    teddyGroup.add(rightEarInner);

    // Snout
    const snoutGeo = new THREE.SphereGeometry(0.5, 24, 24);
    const snout = new THREE.Mesh(snoutGeo, softCreamMat);
    snout.position.set(0, -0.2, 0.9);
    snout.scale.set(1, 0.75, 0.7);
    teddyGroup.add(snout);

    // Nose
    const noseGeo = new THREE.SphereGeometry(0.16, 16, 16);
    const noseMat = new THREE.MeshStandardMaterial({ color: 0x493b3b, roughness: 0.4 });
    const nose = new THREE.Mesh(noseGeo, noseMat);
    nose.position.set(0, -0.05, 1.25);
    nose.scale.set(1.2, 0.9, 0.8);
    teddyGroup.add(nose);

    // Eyes
    const eyeGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const leftEye = new THREE.Mesh(eyeGeo, noseMat);
    leftEye.position.set(-0.42, 0.22, 1.05);
    teddyGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, noseMat);
    rightEye.position.set(0.42, 0.22, 1.05);
    teddyGroup.add(rightEye);

    mainGroup.add(teddyGroup);

    // 2. Floating 3D Baby Blocks
    const blockGeo = new THREE.BoxGeometry(0.65, 0.65, 0.65);

    const block1 = new THREE.Mesh(blockGeo, pastelBlueMat);
    block1.position.set(-2.2, -1.5, 0.8);
    block1.rotation.set(0.3, 0.5, -0.2);
    mainGroup.add(block1);

    const block2 = new THREE.Mesh(blockGeo, pastelLavenderMat);
    block2.position.set(2.3, -1.3, 0.6);
    block2.rotation.set(-0.2, -0.4, 0.3);
    mainGroup.add(block2);

    const block3 = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.55), mintMat);
    block3.position.set(-1.8, 1.8, -0.5);
    block3.rotation.set(0.5, -0.3, 0.4);
    mainGroup.add(block3);

    // 3. Floating Stars / Spheres
    const starGeo = new THREE.OctahedronGeometry(0.32, 0);
    const star1 = new THREE.Mesh(starGeo, pastelGoldMat);
    star1.position.set(2.1, 1.8, 0.4);
    mainGroup.add(star1);

    const star2 = new THREE.Mesh(starGeo, pastelGoldMat);
    star2.position.set(-2.5, 0.3, 0.2);
    star2.scale.setScalar(0.75);
    mainGroup.add(star2);

    const star3 = new THREE.Mesh(starGeo, pastelGoldMat);
    star3.position.set(0.2, -2.4, 0.5);
    star3.scale.setScalar(0.65);
    mainGroup.add(star3);

    // 4. Floating Cloud Spheres Cluster
    const cloudGroup = new THREE.Group();
    const cloudSphere1 = new THREE.Mesh(new THREE.SphereGeometry(0.45, 18, 18), softCreamMat);
    const cloudSphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 16), softCreamMat);
    cloudSphere2.position.set(0.35, -0.08, 0);
    const cloudSphere3 = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 16), softCreamMat);
    cloudSphere3.position.set(-0.35, -0.08, 0);
    cloudGroup.add(cloudSphere1, cloudSphere2, cloudSphere3);
    cloudGroup.position.set(1.8, -1.8, -0.8);
    mainGroup.add(cloudGroup);

    // 5. Floating Ring / Donut
    const ringGeo = new THREE.TorusGeometry(0.4, 0.14, 16, 32);
    const ring = new THREE.Mesh(ringGeo, pastelPinkMat);
    ring.position.set(-1.4, -2.1, 0.3);
    ring.rotation.set(1.2, 0.4, 0);
    mainGroup.add(ring);

    // Mouse Interaction
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 1.5;
      targetY = y * 1.5;
    };

    window.addEventListener("mousemove", handlePointerMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      mainGroup.rotation.y = currentX * 0.8;
      mainGroup.rotation.x = -currentY * 0.8;

      // Gentle floating physics
      teddyGroup.position.y = Math.sin(elapsedTime * 1.8) * 0.12;
      teddyGroup.rotation.z = Math.sin(elapsedTime * 1.2) * 0.04;

      block1.position.y = -1.5 + Math.sin(elapsedTime * 2.1 + 1) * 0.1;
      block1.rotation.x += 0.008;
      block1.rotation.y += 0.01;

      block2.position.y = -1.3 + Math.sin(elapsedTime * 1.9 + 2) * 0.12;
      block2.rotation.y += 0.012;
      block2.rotation.z += 0.006;

      block3.position.y = 1.8 + Math.cos(elapsedTime * 1.7) * 0.08;
      block3.rotation.x += 0.007;

      star1.rotation.y += 0.02;
      star1.position.y = 1.8 + Math.sin(elapsedTime * 2.4) * 0.1;

      star2.rotation.y += 0.015;
      star3.rotation.y += 0.018;

      cloudGroup.position.x = 1.8 + Math.sin(elapsedTime * 0.8) * 0.15;
      ring.rotation.x += 0.01;
      ring.rotation.y += 0.015;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[380px] sm:min-h-[460px] flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing"
    />
  );
};
