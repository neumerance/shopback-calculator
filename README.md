# Shopback Calculator CLI

### How to make it work
I assume you have nodejs v10 or higher installed.

download the bundle file and extract it.

```cd calc```
```npm install```

### Run the test
```npm run test```

If everything is fine and passing, you are good to go.

### How to use it?
```shopback-calculator -a <action> -d <domain> amount [<amount>...]```

or just simply run 

```shopback-calculator```

A prompt will take you through out the course

### How to add a new action?
Just put your file here ```src/actions```

Make sure your class has property ```#process```

in example: ```Action.new.process()```

Please name your file as action name

Then update ```src/actions/index.js```

import your file then include it on
```export default { youractionname: <import> }```
