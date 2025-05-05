// Get the canvas element and its 2D drawing context
const canvas = document.getElementById('waveGridCanvas');
const ctx = canvas.getContext('2d');

// Canvas dimensions
let w, h;

// Configuration constants
const spacing = 32;        // Distance between grid squares
const amplitude = 42;      // Maximum wave displacement
const frequency = 0.002;   // Frequency of wave oscillation
const squareSize = 6;      // Base size of each square

// Resize canvas to fit the window
function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initial size setup

// Main drawing function
function drawWaveGrid(time) {
    // Clear the previous frame
    ctx.clearRect(0, 0, w, h);

    // Iterate through grid points
    for (let x = 0; x < w; x += spacing) {
        for (let y = 0; y < h; y += spacing) {
            // Calculate wave displacement based on sine and cosine functions
            const waveX = Math.sin((x + time * 0.3) * frequency) * amplitude;
            const waveY = Math.cos((y + time * 0.4) * frequency * 0.8) * amplitude;
            const offset = waveX + waveY; // Combine both waves for final offset

            // Calculate square size with subtle size animation
            const size = squareSize + Math.sin((time + x + y) * 0.005) * 2;

            // Calculate dynamic transparency (alpha) for each square
            const alpha = 0.04 + 0.06 * (Math.sin((x + y + time * 0.5) * 0.002));

            // Color components change over time and position for animated effect
            const r = 30 + 80 * Math.sin((x + time * 0.0008));
            const g = 100 + 100 * Math.sin((y + time * 0.0006));
            const b = 160 + 60 * Math.cos((x + y + time * 0.0004));

            // Set fill color with dynamic RGBA values
            ctx.fillStyle = `rgba(${r.toFixed(0)}, ${g.toFixed(0)}, ${b.toFixed(0)}, ${alpha.toFixed(2)})`;

            // Draw the animated square with offset and size variation
            ctx.fillRect(
                x + offset * 0.4,
                y + offset * 0.4,
                size,
                size
            );
        }
    }
}

// Animation loop
function animate(time) {
    drawWaveGrid(time);          // Draw current frame
    requestAnimationFrame(animate); // Schedule next frame
}

animate(0);