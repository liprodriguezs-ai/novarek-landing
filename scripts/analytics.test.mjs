import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

assert.ok(['enabled', 'disabled'].includes(process.env.ANALYTICS_EXPECTED), 'Set ANALYTICS_EXPECTED to enabled or disabled');
const enabled = process.env.ANALYTICS_EXPECTED === 'enabled';
const measurementId = 'G-2RWQQR8ZKN';
for (const route of ['index.html', 'contacto/index.html']) {
  test(`${route}: Google tag is ${enabled ? 'enabled once' : 'disabled'}`, async () => {
    const html = await readFile(new URL(`../dist/${route}`, import.meta.url), 'utf8');
    const head = html.match(/<head>[\s\S]*?<\/head>/)?.[0];
    assert.ok(head);
    const scripts = head.match(/<script\b[^>]*>[\s\S]*?<\/script>/g) ?? [];
    const loader = scripts.filter(script => script.includes('googletagmanager.com/gtag/js'));
    const config = scripts.filter(script => script.includes("gtag('config'"));
    assert.equal(loader.length, enabled ? 1 : 0);
    assert.equal(config.length, enabled ? 1 : 0);
    if (enabled) {
      assert.match(loader[0], /\basync\b/);
      assert.ok(loader[0].includes(`src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"`));
      assert.match(config[0], /window\.dataLayer = window\.dataLayer \|\| \[\]/);
      assert.match(config[0], /function gtag\(\)\{dataLayer\.push\(arguments\);\}/);
      assert.match(config[0], /gtag\('js', new Date\(\)\)/);
      assert.ok(config[0].includes(`gtag('config', '${measurementId}')`));
      assert.ok(head.indexOf(loader[0]) < head.indexOf(config[0]));
    } else {
      assert.ok(!html.includes(measurementId));
    }
    assert.match(head, /application\/ld\+json/);
    assert.match(head, /rel="canonical"/);
  });
}
