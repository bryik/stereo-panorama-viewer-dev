import { writable } from "svelte/store";

import { updateQuerystring } from "./utils/querystring.js";

/**
 * Creates a store to hold a link to a remote panorama e.g. "https://i.imgur.com/PgAHSy8.jpg"
 * This is a light wrapper around a writable that only exposes 'subscribe' and
 * 'set'. Additionally, 'set' is augmented to ensure changes to remoteUrl are
 * reflected in the 'url' querystring parameter.
 */
function createRemoteUrl() {
  const remoteUrl = writable("");

  function augmentedSet(newRemoteUrl) {
    // Ensure changes to remoteUrl are reflected in the querystring.
    if (newRemoteUrl === "") {
      updateQuerystring({ url: null });
    } else {
      updateQuerystring({ url: newRemoteUrl });
    }

    remoteUrl.set(newRemoteUrl);
  }

  return {
    subscribe: remoteUrl.subscribe,
    set: augmentedSet,
  };
}
export const remoteUrl = createRemoteUrl();
