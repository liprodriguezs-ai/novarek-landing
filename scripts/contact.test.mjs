import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const home = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');

function checkForm(html) {
  const forms = html.match(/<form\b[^>]*>[\s\S]*?<\/form>/g) ?? [];
  assert.equal(forms.length, 1, 'Exactly one contact form is rendered');
  const form = forms[0];
  assert.match(form, /action="https:\/\/api.web3forms.com\/submit"/);
  assert.match(form, /method="POST"/);
  assert.match(form, /<input\b[^>]*name="access_key"[^>]*value="09202f1c-4bb2-4d21-89aa-f647112e373b"/);
  assert.doesNotMatch(form, /novalidate/);
  for (const [name, type] of [['name', 'text'], ['email', 'email']]) {
    const input = form.match(new RegExp(`<input\\b[^>]*name="${name}"[^>]*>`))?.[0];
    assert.ok(input, `${name} input exists`);
    assert.match(input, new RegExp(`type="${type}"`));
    assert.match(input, /\brequired\b/);
    const id = input.match(/id="([^"]+)"/)?.[1];
    assert.ok(id);
    assert.ok(form.includes(`for="${id}"`), `${name} has a label`);
  }
  const message = form.match(/<textarea\b[^>]*name="message"[^>]*>/)?.[0];
  assert.ok(message);
  assert.match(message, /\brequired\b/);
  const id = message.match(/id="([^"]+)"/)?.[1];
  assert.ok(form.includes(`for="${id}"`), 'Message has a label');
  assert.match(form, /<button\b[^>]*type="submit"/);
  return form;
}

test('Home provides a native Web3Forms contact form', () => checkForm(home));
test('Neither page displays the form provider note', async () => {
  for (const html of [home, await readFile(new URL('../dist/contacto/index.html', import.meta.url), 'utf8')]) {
    const form = checkForm(html);
    const visibleText = form.replace(/<[^>]*>/g, '');
    assert.doesNotMatch(visibleText, /Web3Forms/i);
    assert.doesNotMatch(form, /submission-note/);
  }
});
test('Contact page renders the same form and links back home', async () => {
  const contact = await readFile(new URL('../dist/contacto/index.html', import.meta.url), 'utf8');
  assert.equal(checkForm(contact), checkForm(home));
  assert.match(contact, /href="\/"/);
  assert.match(contact, /<h1\b/);
  assert.match(contact, /href="mailto:contact@novarek.mx"/);
  assert.match(contact, /rel="canonical" href="https:\/\/novarek.mx\/contacto\/?"/);
});
test('Contact email is updated while existing home navigation remains available', () => {
  assert.match(home, /href="mailto:contact@novarek.mx"/);
  assert.doesNotMatch(home, /contacto@novarek.mx/);
  assert.match(home, /"email":"contact@novarek.mx"/);
  for (const section of ['problemas', 'soluciones', 'proceso', 'contacto']) {
    assert.ok(home.includes(`href="#${section}"`));
    assert.ok(home.includes(`id="${section}"`));
  }
  assert.match(home, /href="\/contacto"/);
});
