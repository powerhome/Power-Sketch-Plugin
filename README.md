# Power Sketch Plugin

This is a sketch plugin that aims to keep a central repository of data we use to build and design software at Power Home Remodeling.

## Installation

- [Download](../../releases/latest/download/phrg.sketchplugin.zip) the latest release of the plugin
- Un-zip
- Double-click on phrg.sketchplugin

## Development Guide

_This plugin was created using `skpm`. For a detailed explanation on how things work, checkout the [skpm Readme](https://github.com/skpm/skpm/blob/master/README.md)._

### Add data locally

<details>
  <summary>Getting started</summary>
  <p>
    Clone repo
    
    git clone https://github.com/powerhome/Power-Sketch-Plugin.git
    
  </p>
 </details>

<details>
  <summary>Add a data set to the repo</summary>
  <p>

  After creating a branch, you would need to create a javascript file in the `constants` folder for the new data set constants. Follow the format below where `NEW_SET` is the name of the new data set.
  ```diff
  + const NEW_SET = [
  +   "Data 1",
  +   "Data 2",
  +   "Data 3"
  + ]
  +
  + module.exports = NEW_SET;
  ```

  In `manifest.json`, add an action (below) under the handler. Replace `NewSet` with the new data set name.

  ```diff
  "handlers": {
    "actions": {
      ...
  +   “SupplyNewSet”: “onSupplyNewSet”
    }
  }
  ```

  In `phrg.js`, add your data set to the list of constants, start up function, and export function. The user-facing name of the data set can be modified in the `Data Set Name`. Note that the export function also uses a randomizer function called `sample`.

  ```diff
  //constants
  + const NEW_SET = require(“../constants/new_set”);
  ```

  ```diff
  //startup
  export function onStartup () {
    ...
  + DataSupplier.registerDataSupplier(‘public.text’, 'Data Set Name', 'SupplyNewSet’);
  }
  ```

  ```diff
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

  </p>
</details>

<details>
  <summary>Testing in Sketch locally</summary>
  <p>
    <ol>
      <li>Quit Sketch</li>
      <li>Run `npm install` (terminal may ask you to install Sketch developer mode. If so, say yes.)</li>
      <li>Open Sketch again and check if it is working as expected</li>
    </ol>
    Note: You don't need to commit your changes to test locally.
 </p>
</details>

### Publishing a new version
*Important: Push and merge changes to the repo before publishing a new version on sketch plugin manager.*

Install Sketch plugin manager (skpm)

```
npm install -g skpm
```

Log in. You will be asked for a token ([how to generate a personal token](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token)). Check off "Repo" when creating the token.

```
skpm login
```

Publish new version. Make sure that you're on `main` and have pulled the latest from `main`.

```bash
skpm publish <bump> --skip-registry
```

`<bump>` can be `minor` or `patch`. Make sure to include `--skip-registry` so that the plugin does not get added to Sketch plugin registry.

| Version update  | Description |
| ------------- | ------------- |
| `minor`  | Adding, Deleting, or editing data sets  |
| `patch`  | Bugs, typos  |

*Note: `skpm publish` will create a new release on your GitHub repository and create an appcast file in order for Sketch users to be notified of the update.*

### Other


<details>
  <summary>Usage</summary>
  <p>
    Install the dependencies
  </p>
  
    npm install

  <p>
    Once the installation is done, you can run some commands inside the project folder:
  </p>

    npm run build

  <p>
    To watch for changes:
  </p>
    
    npm run watch

  </p>
</details>


<details>
  <summary>Debugging</summary>
  <p>
    To view the output of your `console.log`, you have a few different options:
    - Use the [`sketch-dev-tools`](https://github.com/skpm/sketch-dev-tools)
    - Open `Console.app` and look for the sketch logs
    - Look at the `~/Library/Logs/com.bohemiancoding.sketch3/Plugin Output.log` file
    Skpm provides a convenient way to do the latter:
  </p>
  
    skpm log

  <p>
    The `-f` option causes `skpm log` to not stop when the end of logs is reached, but rather to wait for additional data to be appended to the input
  </p>

</details>
