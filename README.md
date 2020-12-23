# Power Sketch Plugin

This is a sketch plugin that aims to keep a central repository of data we use to build and design software at Power Home Remodeling.

## Installation

- [Download](../../releases/latest/download/phrg.sketchplugin.zip) the latest release of the plugin
- Un-zip
- Double-click on phrg.sketchplugin

## Development Guide

_This plugin was created using `skpm`. For a detailed explanation on how things work, checkout the [skpm Readme](https://github.com/skpm/skpm/blob/master/README.md)._

### Add a data set locally

#### Getting started

Clone repo
```
git clone https://github.com/powerhome/Power-Sketch-Plugin.git
```
#### Adding to the repo

After creating a branch, you would need to create a javascript file in the constants folder for the new data set constants. Follow the format below where `NEW_SET` is the name of the new data set.
```
const NEW_SET = [
  "Data 1",
  "Data 2",
  "Data 3"
]

module.exports = NEW_SET;
```

In `manifest.json`, add an action (below) under the handler. Replace `NewSet` with the new data set name.

```
"handlers": {
  "actions": {
    "Startup": "onStartup",
    "Shutdown": "onShutdown",
+   “SupplyNewSet”: “onSupplyNewSet”
  }
}
```
 
In `phrg.js`, add your data set to the list of constants, start up function, and export function. The user-facing name of the data set can be modified in the `Data Set Name`. Note that the export function also uses a randomizer function called `sample`.

```
//constants
+ const NEW_SET = require(“../constants/new_set”);
```

```
//startup
export function onStartup () {
  ...
+ DataSupplier.registerDataSupplier(‘public.text’, 'Data Set Name', 'SupplyNewSet’);
}
```

```js
+ //new set
+ export function onSupplyNewSet(context) {
+   var dataKey = context.data.key;
+   var dataCount = context.data.requestedCount;
+ 
+   var dataIndex = 0;
+   while (dataIndex < dataCount) {
+       const new_set = sample(NEW_SET);
+       DataSupplier.supplyDataAtIndex(dataKey, new_set, dataIndex);
+       dataIndex++;
+   }
+ }
```

#### Testing in Sketch

1. Quit Sketch
2. Run `npm install`
3. Open Sketch again and check if it's working as expected

*Note: You don't need to commit your changes to test locally.*

### Publishing a new version

Run the command below where `bump` can be `major`, `minor` or `patch`. Make sure to include `--no-registry` so that the plugin does not get added to Sketch plugin registry.

```bash
skpm publish <bump> --no-registry
```

* `Major` – New data set added or deleted
* `Minor` – Existing data set edited
* `Patch` – Bugs, typos

*Note: `skpm publish` will create a new release on your GitHub repository and create an appcast file in order for Sketch users to be notified of the update.*

### Other

#### Usage

Install the dependencies

```bash
npm install
```

Once the installation is done, you can run some commands inside the project folder:

```bash
npm run build
```

To watch for changes:

```bash
npm run watch
```

#### Debugging

To view the output of your `console.log`, you have a few different options:

- Use the [`sketch-dev-tools`](https://github.com/skpm/sketch-dev-tools)
- Open `Console.app` and look for the sketch logs
- Look at the `~/Library/Logs/com.bohemiancoding.sketch3/Plugin Output.log` file

Skpm provides a convenient way to do the latter:

```bash
skpm log
```

The `-f` option causes `skpm log` to not stop when the end of logs is reached, but rather to wait for additional data to be appended to the input

