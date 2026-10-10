import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const source = await readFile(new URL('../src/components/ContactForm.astro', import.meta.url), 'utf8');

function mount(fetch) {
  const script = source.match(/<script>([\s\S]*?)<\/script>/)?.[1];
  assert.ok(script, 'The form intercepts submission with a client script');
  const button = { disabled: false, textContent: 'Enviar mensaje' };
  const status = { textContent: '', dataset: {} };
  const values = { access_key: 'test-key', name: 'Ana', email: 'ana@example.com', message: 'Mi proyecto' };
  let listener;
  let resets = 0;
  const attributes = {};
  const form = {
    action: 'https://api.web3forms.com/submit',
    querySelector: (selector) => selector === 'button[type="submit"]' ? button : status,
    addEventListener: (event, callback) => { if (event === 'submit') listener = callback; },
    reportValidity: () => true,
    setAttribute: (key, value) => { attributes[key] = value; },
    reset: () => { resets++; },
  };
  vm.runInNewContext(ts.transpile(script), {
    document: { querySelectorAll: () => [form] },
    FormData: class { constructor() { return Object.entries(values)[Symbol.iterator](); } },
    fetch,
  });
  return { button, status, values, attributes, get resets() { return resets; }, submit() {
    let prevented = false;
    const done = listener({ preventDefault() { prevented = true; } });
    assert.equal(prevented, true, 'Submission must not navigate away');
    return done;
  } };
}

test('Submission stays on-page and sends the existing fields to Web3Forms', async () => {
  let request;
  const ui = mount(async (url, options) => {
    request = { url, options };
    return { ok: true, json: async () => ({ success: true }) };
  });
  await ui.submit();
  assert.equal(request.url, 'https://api.web3forms.com/submit');
  assert.equal(request.options.method, 'POST');
  assert.deepEqual(JSON.parse(request.options.body), ui.values);
  assert.match(ui.status.textContent, /¡Mensaje enviado!/);
  assert.equal(ui.status.dataset.state, 'success');
  assert.equal(ui.resets, 1);
});

test('Rapid submits and submits after success send only once until reload', async () => {
  let resolve;
  let calls = 0;
  const ui = mount(() => { calls++; return new Promise((done) => { resolve = done; }); });
  const pending = ui.submit();
  assert.equal(ui.button.disabled, true);
  assert.equal(ui.button.textContent, 'Enviando…');
  assert.equal(ui.attributes['aria-busy'], 'true');
  await ui.submit();
  assert.equal(calls, 1);
  resolve({ ok: true, json: async () => ({ success: true }) });
  await pending;
  await ui.submit();
  assert.equal(calls, 1);
  assert.equal(ui.button.disabled, true);
  assert.equal(ui.button.textContent, 'Mensaje enviado');
  assert.equal(ui.attributes['aria-busy'], 'false');
  const reloaded = mount(async () => { calls++; return { ok: true, json: async () => ({ success: true }) }; });
  assert.equal(reloaded.button.disabled, false);
  await reloaded.submit();
  assert.equal(calls, 2);
});

for (const failure of ['network', 'http', 'provider']) {
  test(`${failure} failure preserves the data and allows a retry`, async () => {
    let calls = 0;
    const ui = mount(async () => {
      if (++calls > 1) return { ok: true, json: async () => ({ success: true }) };
      if (failure === 'network') throw new Error('Offline');
      return { ok: failure !== 'http', json: async () => ({ success: false }) };
    });
    await ui.submit();
    assert.equal(ui.resets, 0);
    assert.equal(ui.values.message, 'Mi proyecto');
    assert.equal(ui.button.disabled, false);
    assert.equal(ui.button.textContent, 'Enviar mensaje');
    assert.equal(ui.status.dataset.state, 'error');
    assert.match(ui.status.textContent, /intenta de nuevo/);
    await ui.submit();
    assert.equal(calls, 2);
    assert.equal(ui.resets, 1);
  });
}
