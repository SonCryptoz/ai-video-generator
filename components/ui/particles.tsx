"use client";
import * as THREE from "three";
import { useEffect, useRef } from "react";

export default function Particles() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000,
        );
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // ======================
        // PARTICLES
        // ======================
        const count = 4000;
        const particlesGeo = new THREE.BufferGeometry();

        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        // Store original positions
        const originalPositions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            const x = (Math.random() - 0.5) * 10;
            const y = (Math.random() - 0.5) * 10;
            const z = (Math.random() - 0.5) * 10;

            positions[i3] = x;
            positions[i3 + 1] = y;
            positions[i3 + 2] = z;

            originalPositions[i3] = x;
            originalPositions[i3 + 1] = y;
            originalPositions[i3 + 2] = z;

            colors[i3] = Math.random();
            colors[i3 + 1] = Math.random();
            colors[i3 + 2] = Math.random();
        }

        particlesGeo.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3),
        );
        particlesGeo.setAttribute(
            "color",
            new THREE.BufferAttribute(colors, 3),
        );

        const particlesMat = new THREE.PointsMaterial({
            size: 0.02,
            vertexColors: true,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide,
        });

        const particles = new THREE.Points(particlesGeo, particlesMat);
        scene.add(particles);

        // ======================
        // MOUSE + RAYCASTER
        // ======================
        const mouse = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();
        const rayOrigin = new THREE.Vector3();
        const rayDirection = new THREE.Vector3();

        const tempVector = new THREE.Vector3();
        const tempVector2 = new THREE.Vector3();

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        };

        window.addEventListener("mousemove", handleMouseMove);

        // ======================
        // ANIMATE
        // ======================
        const radius = 0.6; // vùng ảnh hưởng
        const force = 0.02; // lực đẩy

        const animate = () => {
            requestAnimationFrame(animate);

            raycaster.setFromCamera(mouse, camera);
            rayOrigin.copy(raycaster.ray.origin);
            rayDirection.copy(raycaster.ray.direction);

            const posAttr = particlesGeo.getAttribute(
                "position",
            ) as THREE.BufferAttribute;

            for (let i = 0; i < count; i++) {
                const i3 = i * 3;

                const px = posAttr.array[i3];
                const py = posAttr.array[i3 + 1];
                const pz = posAttr.array[i3 + 2];

                // vector từ ray origin → particle
                const v = tempVector.set(
                    px - rayOrigin.x,
                    py - rayOrigin.y,
                    pz - rayOrigin.z,
                );

                // project lên ray
                const t = v.dot(rayDirection);
                if (t < 0) continue;

                const closestPoint = tempVector2
                    .copy(rayDirection)
                    .multiplyScalar(t)
                    .add(rayOrigin);

                const dx = px - closestPoint.x;
                const dy = py - closestPoint.y;
                const dz = pz - closestPoint.z;
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < radius) {
                    const strength = (radius - dist) / radius;
                    posAttr.array[i3] += dx * strength * force;
                    posAttr.array[i3 + 1] += dy * strength * force;
                    posAttr.array[i3 + 2] += dz * strength * force;
                } else {
                    // return to original
                    posAttr.array[i3] +=
                        (originalPositions[i3] - posAttr.array[i3]) * 0.02;
                    posAttr.array[i3 + 1] +=
                        (originalPositions[i3 + 1] - posAttr.array[i3 + 1]) *
                        0.02;
                    posAttr.array[i3 + 2] +=
                        (originalPositions[i3 + 2] - posAttr.array[i3 + 2]) *
                        0.02;
                }
            }

            posAttr.needsUpdate = true;

            particles.rotation.y += 0.0003;
            renderer.render(scene, camera);
        };

        animate();

        // ======================
        // CLEANUP
        // ======================
        const handleResize = () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            container.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={containerRef} className="absolute inset-0" />;
}
