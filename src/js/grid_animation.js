document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("neural-canvas"); // Reusing the same canvas ID
    if (!canvas) {
        console.error("Canvas element #neural-canvas not found.");
        return;
    }
    const ctx = canvas.getContext("2d");

    let width, height;
    let particles = [];
    const particleCount = 80; // Adjust density
    const connectDistance = 150; // Max distance for connections
    const mouseRadius = 100; // Radius for mouse interaction
    const gridSpacing = 40; // Spacing for the background grid

    const mouse = {
        x: undefined,
        y: undefined
    };

    // Colors from CSS variables (fallback values provided)
    const primaryBg = getComputedStyle(document.documentElement).getPropertyValue("--primary-bg") || "#0A0F1A";
    const accentCyan = getComputedStyle(document.documentElement).getPropertyValue("--accent-cyan") || "#00F0FF";
    const gridColor = "rgba(0, 240, 255, 0.08)"; // Subtle grid color
    const particleColor = accentCyan;
    const connectionColor = "rgba(0, 240, 255, 0.2)";
    const highlightConnectionColor = "rgba(0, 240, 255, 0.8)";
    const highlightParticleColor = "#FFFFFF";

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 2 + 1; // Size 1 to 3
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 1;
            this.vx = (Math.random() - 0.5) * 0.5; // Slow velocity
            this.vy = (Math.random() - 0.5) * 0.5;
        }

        draw(isHighlighted) {
            ctx.fillStyle = isHighlighted ? highlightParticleColor : particleColor;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }

        update() {
            // Move particle
            this.x += this.vx;
            this.y += this.vy;

            // Boundary check (bounce)
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(Math.random() * width, Math.random() * height));
        }
    }

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        init(); // Reinitialize particles on resize
    }

    function drawGrid() {
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 0.5;

        for (let x = 0; x < width; x += gridSpacing) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSpacing) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectDistance) {
                    const opacity = 1 - (distance / connectDistance);
                    ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.2})`; // Base connection color
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function interactWithMouse() {
        if (mouse.x === undefined || mouse.y === undefined) return;

        for (let i = 0; i < particles.length; i++) {
            const dxMouse = particles[i].x - mouse.x;
            const dyMouse = particles[i].y - mouse.y;
            const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
            let isHighlighted = false;

            if (distanceMouse < mouseRadius) {
                isHighlighted = true;
                // Optional: Add a slight push effect
                // const forceDirectionX = dxMouse / distanceMouse;
                // const forceDirectionY = dyMouse / distanceMouse;
                // const force = (mouseRadius - distanceMouse) / mouseRadius;
                // particles[i].x += forceDirectionX * force * 0.5;
                // particles[i].y += forceDirectionY * force * 0.5;

                // Highlight connections near mouse
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectDistance) {
                         const dxMouseJ = particles[j].x - mouse.x;
                         const dyMouseJ = particles[j].y - mouse.y;
                         const distanceMouseJ = Math.sqrt(dxMouseJ * dxMouseJ + dyMouseJ * dyMouseJ);

                        // If both particles are near the mouse, highlight connection strongly
                        if (distanceMouseJ < mouseRadius) {
                             const opacity = 1 - (distance / connectDistance);
                             ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.8})`; // Highlighted connection
                             ctx.lineWidth = 1.5;
                             ctx.beginPath();
                             ctx.moveTo(particles[i].x, particles[i].y);
                             ctx.lineTo(particles[j].x, particles[j].y);
                             ctx.stroke();
                        }
                    }
                }
            }
            particles[i].draw(isHighlighted);
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw background grid
        drawGrid();

        // Draw connections first (base layer)
        connectParticles();

        // Update and draw particles, handle mouse interaction (draws highlighted particles/connections on top)
        particles.forEach(p => p.update());
        interactWithMouse(); // This will redraw highlighted particles and connections

        requestAnimationFrame(animate);
    }

    // Event Listeners
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });
    window.addEventListener("mouseout", () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    // Initial setup
    resizeCanvas();
    animate();
});

