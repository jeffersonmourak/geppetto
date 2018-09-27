# Geppetto the easest way to test pages

- **Installing**
Download the zip file or use npm
`$ npm install https://github.com/jeffersonmourak/geppetto`

- **Using it**.
	- over cli
		`node cli.js file.json`
	- on Node
    ```javascript
    const Geppetto = require('geppetto');
    const testSuite = require('testSuite.json');
    const geppetto = new Geppetto(testSuite, { ...options });
    ```

## API
**Node API**

|           Method          |      Params      |  Returns | Description                                                      |
|:-------------------------:|:----------------:|:--------:|------------------------------------------------------------------|
|          `run()`          |                  |          | Run the test suite.                                              |
|  `on(eventKey, callback)` | String, Function | Function | Subscribe to the key event and returns the unsubscribe function. |
| `off(eventKey, callback)` | String, Function |          | Unsubscribe function for given key and function.                 |
| `onSuiteEnd(callback)`    | Function         | Function | Subscribe to receive the event when any suite ends.              |
| `offSuiteEnd(callback)`   | Function         |          | Unsubscribe function for suite end events.                       |
| `onStepEnd(callback)`     | Function         | Function | Subscribe to receive the event when any step ends.               |
| `offStepEnd(callback)`    | Function         |          | Unsubscribe function for step end events.                        |
| `onBatteryEnd(callback)`  | Function         | Function | Subscribe to receive the event when any test battery ends.       |
| `offBatteryEnd(callback)` | Function         |          | Unsubscribe function for battery end events.                     |
| `enums`                   |                  | Object   | Returns the keys list of available to use.                       |

**CLI Api**

| Command    | Flag | Value Type | Required | Default | Example                                                                       |
|------------|------|------------|----------|---------|-------------------------------------------------------------------------------|
| --file     | -f   | Path       | Yes      | None    | `node cli.js --file path/to/file.json` or `node cli.js -f path/to/file.json`  |
| --graphic  |      | Boolean    | No       | False   | `node cli.js --graphic`                                                       |
| --silent   |      | Boolean    | No       | False   | `node cli.js --silent`                                                        |
| --devtools |      | Boolean    | No       | False   | `node cli.js --devtools`                                                      |

## Test Suite
```javascript
[
  {
    "url": "http://example.com",    // The for the page to be tested
    "credentials": {                // Optional parameter for authenticated pages
      "username": "username",
      "password": "password"
    },
    "noSession": true,              // Optional parameter for clear the session after every test
    "suite": [
      {
        "name": "Small description of test",
        "steps": []
      }
    ]
  }
]
```

## Steps
- Type a into input
  ```
  {
    "type": "value",
    "selector": "#selector",
    "value": "value"
   }
   ```
- Trigger an action
  ```
  {
    "type": "action",
    "selector": "#selector",
    "action": "Any JavaScript action"
   }
   ```
- Expect navigation
  ```
  {
    "type": "navigation",
    "url": "http://exaple.com/destination"
   }
   ```
- Expect display element
  ```
  {
    "type": "display",
    "url": "#selector"
   }
   ```
