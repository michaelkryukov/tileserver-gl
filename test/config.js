const testPublicUrl = (publicUrl, expectation, end) => {
  const running = require('../src/server')({
    configPath: 'config.json',
    port: 8889,
    publicUrl,
  });

  try {
    supertest(running.app)
      .get('/styles/test-style/style.json', 'application/json')
      .expect(expectation)
      .end(end)
  } finally {
    running.server.close();
  }
};


describe('Server configuration', function () {
  it('Absolute "public_url" works', function (done) {
    testPublicUrl('https://domain.com/', function (res) {
      res.body.sprite.should.endWith('https://domain.com/styles/test-style/sprite');
    }, done);
  });

  it('Relative "public_url" works', function (done) {
    testPublicUrl('/test/', function (res) {
      res.body.sprite.should.endWith('/test/styles/test-style/sprite');
    }, done);
  });

  it('No "public_url" works', function (done) {
    testPublicUrl(null, function (res) {
      res.body.sprite.should.endWith('/styles/test-style/sprite');
    }, done);
  });
});
