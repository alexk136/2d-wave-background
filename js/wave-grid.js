// Access the canvas element and its 2D drawing context
const canvas = document.getElementById('waveGridCanvas');
const ctx = canvas.getContext('2d');

// Variables to store canvas dimensions and mouse positions
let w, h;
let targetMouseX = 0.5; // Target X position of the mouse (normalized)
let targetMouseY = 0.5; // Target Y position of the mouse (normalized)
let currentMouseX = 0.5; // Current X position of the mouse (smoothed)
let currentMouseY = 0.5; // Current Y position of the mouse (smoothed)

// Configuration constants
const spacing = 18; // Distance between grid points
const depth = 5; // Depth factor for wave distortion
const amplitude = 2; // Amplitude of the wave
const baseSize = 100; // Base size of the circles

// Function to resize the canvas to fit the window
function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
resizeCanvas(); // Initial resize
window.addEventListener('resize', resizeCanvas); // Resize on window change

// Update target mouse positions on mouse move
window.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX / w; // Normalize X position
    targetMouseY = e.clientY / h; // Normalize Y position
});

// Easing function for smooth wave transitions
function easeInOutSine(t) {
    return -(Math.cos(Math.PI * t) - 1) / 2;
}

// Main draw function
function draw(time) {
    // Smoothly interpolate current mouse positions towards target positions
    currentMouseX += (targetMouseX - currentMouseX) * 0.05;
    currentMouseY += (targetMouseY - currentMouseY) * 0.05;

    // Clear the canvas for the new frame
    ctx.clearRect(0, 0, w, h);

    // Calculate the center of the canvas
    const centerX = w / 2;
    const centerY = h / 2;

    // Calculate tilt based on mouse position
    const tiltX = (currentMouseX - 0.5) * 40;
    const tiltY = (currentMouseY - 0.5) * 40;

    // Loop through grid points
    for (let x = -spacing; x < w + spacing; x += spacing) {
        for (let y = -spacing; y < h + spacing; y += spacing) {
            // Calculate distance and angle from center
            const dx = x - centerX;
            const dy = y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);

            // Calculate wave phase and value
            const wavePhase = (dist * 0.015) - time * 0.0015;
            const wave = easeInOutSine((Math.sin(wavePhase) + 1) / 2) * amplitude;

            // Calculate size variation based on wave
            const size = baseSize + easeInOutSine((Math.cos(wavePhase) + 1) / 2) * 1.8;

            // Calculate depth offset
            const z = wave * depth;

            // Calculate final position with tilt and depth
            const px = x + Math.cos(angle) * z + tiltX;
            const py = y + Math.sin(angle) * z + tiltY;

            // Calculate color components with time-based variation
            const r = 80 + Math.sin(dist * 0.008 + time * 0.0012) * 50;
            const g = 140 + Math.cos(dist * 0.008 + time * 0.0015) * 30;
            const b = 190 + Math.sin(time * 0.001) * 15;

            // Calculate alpha based on wave depth
            const alpha = 0.05 + (z / amplitude) * 0.05;

            // Set fill style and draw the circle
            ctx.fillStyle = `rgba(${r.toFixed()},${g.toFixed()},${b.toFixed()},${alpha.toFixed(2)})`;
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

// Animation loop
function loop(t) {
    draw(t); // Draw the current frame
    requestAnimationFrame(loop); // Request the next frame
}
loop(0);