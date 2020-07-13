<script>
  import { onMount } from "svelte";

  import { remoteUrl } from "./stores.js";
  import { getQuerystring } from "./utils/querystring.js";
  import Instructions from "./components/Instructions.svelte";
  import Scene from "./components/Scene.svelte";

  // If true, the instructions will be hidden.
  let instructionsVisible = true;

  onMount(async () => {
    // Read and apply settings from querystring.
    const querystring = getQuerystring();

    if (querystring.has("url")) {
      // If the querystring contains a url to a panorama, update the panoUrl store.
      let url = querystring.get("url");
      remoteUrl.set(url);
    }

    if (querystring.has("embedded")) {
      // If the querystring contains 'embedded', hide instructions to make it
      // look less cluttered.
      instructionsVisible = false;
    }
  });
</script>

<Instructions visible={instructionsVisible} />
<Scene />
