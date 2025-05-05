# 🌀 Wave Grid Canvas

Animated canvas-based wave grid using JavaScript. Circles pulsate in a wave-like pattern based on mouse movement. No dependencies required.

## 🧩 Features

- Responsive full-screen canvas
- Smooth sine-based wave animation
- Mouse interaction with inertial tilt
- Customizable colors, spacing, depth, and animation speed

## 📦 Setup

Include the script in an HTML file with a canvas element:

```html
<canvas id="waveGridCanvas" style="position: fixed; top: 0; left: 0;"></canvas>
<script src="wave-grid.js"></script>
````

Or paste the entire script inline if you prefer.

## ⚙️ Customization Options

You can tweak the following constants in the script to adjust the visual style:

| Parameter    | Default  | Description                             |
| ------------ | -------- | --------------------------------------- |
| `spacing`    | `18`     | Distance between circles                |
| `depth`      | `5`      | Depth of wave distortion                |
| `amplitude`  | `2`      | Height of the wave                      |
| `baseSize`   | `100`    | Base radius of each circle              |
| `tiltX/Y`    | `±40`    | Max tilt offset by mouse                |
| `wave speed` | `0.0015` | Adjust via `wavePhase` timing           |
| `colors`     | Varies   | Change RGB formulas for creative styles |
| `alpha`      | Auto     | Based on wave height, can be fixed      |

### 🔄 Example Variants

#### 🌌 Starfield Mode

```js
const spacing = 30;
const depth = 10;
const amplitude = 4;
const baseSize = 1; // tiny dots
```

#### 💠 Soft Grid

```js
const spacing = 25;
const depth = 2;
const amplitude = 1.2;
const baseSize = 40;
```

#### 🟣 Vivid Psychedelic

Replace color formulas with something more dramatic:

```js
const r = 200 + Math.sin(dist * 0.02 + time * 0.002) * 55;
const g = 50 + Math.cos(dist * 0.015 + time * 0.003) * 100;
const b = 200 + Math.sin(time * 0.005) * 55;
```

## 🖱 Interaction

* Move your mouse to tilt the grid.
* Optional: You can extend the script to respond to clicks, scroll, or keyboard input.

## 📄 License

MIT — free to use, modify, and share.