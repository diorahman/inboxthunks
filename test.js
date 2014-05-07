var inbox = require ('./');
var co = require ('co');

var client = inbox.init(false, 'imap.gmail.com', {
  secureConnection: true,
  auth : {
    user : 'mail@gmail.com',
    pass : 'pass'
  }
});

describe ('inbox imap client', function(){
  it ('should do client connect', function(done){
    var task = co (function * (){
      yield client.connect();
    });
    task (done);
  });

  it ('should get available mailboxes', function(done){
    var task = co (function * (){
      return yield client.listMailboxes();
    });

    task (function(err, mailboxes){
      if (err) return done(err);
      mailboxes.length.should.above(0);
      done();
    });
  });
});