
⚠️ **Deprecated!**

This repo was used to experiment with a rebuild of another project I was working on. The experiment was a success and the final version can be found in this repo: [stereo-panorama-viewer](https://github.com/bryik/stereo-panorama-viewer)


# stereo-panorama-viewer-dev

View stereoscopic panoramas in your browser!

## local development

Install the dependencies...

```bash
cd stereo-panorama-viewer
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see the app running.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

## building

To create an optimised version of the app:

```bash
npm run build
```

## deployment

`stereo-panorama-viewer` automatically deploys to GitHub Pages every time a commit is pushed to the `master` branch. Be sure to `npm run build` and commit the changes.
