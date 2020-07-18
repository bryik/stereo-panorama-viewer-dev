<script>
  // This component explains how to use the app and provides a way to enter
  // direct links to panoramas.

  import GithubCorner from "./GithubCorner.svelte";
  import { remoteUrl } from "../stores.js";

  // API
  export let visible = true;

  // Local state
  const urlPlaceholder = "https://i.imgur.com/xLc3Kj7.jpg";
  let urlInputValue = $remoteUrl || "";
  let minimized = false;

  // TODO:
  //   - Add URL validation and error messages.

  function toggleMinimized() {
    minimized = !minimized;
  }

  function handleLoadClick() {
    if (urlInputValue === "") {
      urlInputValue = urlPlaceholder;
    }
    remoteUrl.set(urlInputValue);
  }
</script>

<style>
  .instructions {
    position: absolute;
    z-index: 10;
    left: 1rem;
    top: 1rem;
  }
</style>

<div style={!visible && `display: none`}>
  {#if minimized}
    <div
      class="instructions glow br2 ph3 pv2 mb2 dib bg-near-white fr o-20"
      style="cursor: pointer;"
      on:click={toggleMinimized}>
      ...
    </div>
  {:else}
    <div class="instructions avenir ma3 pa3 bg-near-white br3 shadow-4">
      <GithubCorner repoUrl="https://github.com/bryik/overunder-aframe" />
      <h1 class="f4 f3-ns lh-title">Stereo Panorama Viewer</h1>
      <p class="lh-copy f5 measure">
        Drag and drop a
        <a
          href="https://developers.google.com/vr/discover/360-degree-media#common_formats">
          stacked
        </a>
        (over/under) stereo panorama into this window. Alternatively, provide a
        URL below.
      </p>
      <div class="pa3 black-80">
        <div class="measure-narrow">
          <label for="pano-url" class="f6 b db mb2">URL</label>
          <input
            class="input-reset ba b--black-20 pa2 mb2 dib w-100"
            type="url"
            id="pano-url"
            aria-describedby="pano-desc"
            bind:value={urlInputValue}
            placeholder={urlPlaceholder} />
          <small id="pano-desc" class="f6 lh-copy black-60 db mb2">
            Must be a direct link to a stereo panorama hosted on a CORS-enabled
            host (e.g. Imgur).
          </small>
        </div>
      </div>
      <div
        id="load-button"
        class="f6 link dim br2 ph3 pv2 mb2 dib white bg-near-black"
        style="cursor: pointer;"
        on:click={handleLoadClick}>
        Load
      </div>
      <div
        id="close-button"
        class="f6 link dim br2 ph3 pv2 mb2 dib white bg-red fr"
        style="cursor: pointer;"
        on:click={toggleMinimized}>
        Close
      </div>
    </div>
  {/if}
</div>
