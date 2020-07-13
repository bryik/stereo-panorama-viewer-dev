import App from "./App.svelte";

// Initialize A-Frame
import "aframe";
import "./aframe-components/aframe-overunder-component";
import "./aframe-components/aframe-stereocam-component";

const app = new App({
  target: document.body,
});

export default app;
