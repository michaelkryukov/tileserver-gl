const testPublicUrl = (publicUrl, expectation, end) => {
  const { app, server } = require('../src/server')({
    configPath: 'config.json',
    port: 8889,
    publicUrl,
  });

  try {
    supertest(app)
      .get('/styles/test-style/style.json', /application\/json/)
      .expect(expectation)
      .end(end)
  } finally {
    server.close();
  }
};


describe('Server configuration', function() {
  it('Absolute "public_url" works', function(done) {
    testPublicUrl('https://domain.com/', function(res) {
      res.body.sprite.should.equal('https://domain.com/styles/test-style/sprite');
    }, done);
  });

  it('Absolute "public_url" works', function(done) {
    testPublicUrl('https://domain.com/', function(res) {
      res.body.sprite.should.equal('https://domain.com/styles/test-style/sprite');
    }, done);
  });

  it('Relative "public_url" works', function(done) {
    testPublicUrl('/test/', function(res) {
      res.body.sprite.should.endWith('/test/styles/test-style/sprite');
    }, done);
  });
});
