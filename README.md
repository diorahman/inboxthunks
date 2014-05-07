# inboxthunks

Thunkified imap client

Based on [inbox](https://github.com/andris9/inbox)

# install 

```
npm install inboxthunks
```

# example

```js
var inbox = require ('./');
var co = require ('co');

var client = inbox.init(false, 'imap.gmail.com', {
  secureConnection: true,
  auth : {
    user : 'mail@gmail.com',
    pass : 'pass'
  }
});

co (function * (){
  // try
  yield client.connect();
  // catch the error

  // list mailboxes or other api call
  var mailboxes = yield client.listMailboxes();
  console.log (mailboxes);
  
  // try
  yield client.close();
  // catch the error
}
```

# license
MIT