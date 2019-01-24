const wsHelper = require('./test-helper');

beforeEach(async () => {
  const host = process.env.CI === 'true' ? 'localhost' : 'host.docker.internal';
  const engine = process.env.CI === 'true' ? 'localhost' : 'qix-engine';
  const engineUrl = `http://${host}:1234/?engine_url=ws://${engine}:9076/`;

  const OPTS = {
    artifactsPath: 'test/e2e/__artifacts__/',
  };

  page = await browser.newPage();
  const client = page._client;
  await client.send('Animation.setPlaybackRate', { playbackRate: 1000 });

  wsHelper.init(client);

  global.host = host;
  global.engineUrl = engineUrl;
  global.OPTS = OPTS;
  global.wsHelper = wsHelper;
});

afterEach(async () => {
  console.log('Save coverage if possible');
});
