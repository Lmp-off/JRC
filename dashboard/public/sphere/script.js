class CrystallineSphere {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });

        this.init();
        this.animate();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);
        document.body.appendChild(this.renderer.domElement);

        this.camera.position.z = 3;

        this.createSphere();
        this.setupLights();
        
        window.addEventListener('resize', () => this.onWindowResize());
    }

    setupLights() {
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);

        const light1 = new THREE.DirectionalLight(0x4d4dff, 0.8);
        light1.position.set(1, 3, 5);
        this.scene.add(light1);

        const light2 = new THREE.DirectionalLight(0x4da6ff, 0.4);
        light2.position.set(-5, -3, -2);
        this.scene.add(light2);
    }

    createSphere() {
        const geometry = new THREE.SphereGeometry(1.2, 500, 500);
        this.randomSeed = Math.random() * 1000;

        this.material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 2 },
                pulseSpeed: { value: 1.5 },
                noiseStrength: { value: 0.2 },
                patternScale: { value: 1.2 },
                randomSeed: { value: this.randomSeed },
                primaryColor: { value: new THREE.Vector3(0.1, 0.2, 0.8) },
                secondaryColor: { value: new THREE.Vector3(0.2, 0.4, 0.9) },
                edgeColor: { value: new THREE.Vector3(0.3, 0.6, 1.5) }
            },
            vertexShader: document.getElementById('vertexShader').textContent,
            fragmentShader: document.getElementById('fragmentShader').textContent,
            transparent: true,
            side: THREE.DoubleSide
        });

        this.sphere = new THREE.Mesh(geometry, this.material);
        this.scene.add(this.sphere);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = performance.now() * 0.001;

        // Update uniforms
        this.material.uniforms.time.value = time;

        // Dynamic colors
        this.material.uniforms.primaryColor.value.set(
            Math.sin(time * 0.3) * 0.1 + 0.1,
            Math.cos(time * 0.2) * 0.1 + 0.2,
            Math.sin(time * 0.4) * 0.2 + 0.8
        );

        this.material.uniforms.secondaryColor.value.set(
            Math.cos(time * 0.5) * 0.1 + 0.2,
            Math.sin(time * 0.3) * 0.1 + 0.4,
            Math.cos(time * 0.6) * 0.2 + 0.9
        );

        // Animate parameters
        this.material.uniforms.noiseStrength.value = 0.15 + Math.sin(time * 0.5) * 0.1;
        this.material.uniforms.patternScale.value = 1.0 + Math.sin(time * 0.3) * 0.3;

        // Rotate sphere
        this.sphere.rotation.x = time * 0.2 + Math.sin(time * 0.5) * 0.1;
        this.sphere.rotation.y = time * 0.25 + Math.cos(time * 0.3) * 0.1;
        this.sphere.scale.setScalar(1.0 + Math.sin(time * 1.5) * 0.05);

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    new CrystallineSphere();
});