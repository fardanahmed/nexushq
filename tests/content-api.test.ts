import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getFeatures } from '../src/lib/content-api.ts';

test('getFeatures falls back to mock features when the backend URL is unset', async () => {
  delete process.env.BACKEND_API_URL;
  delete process.env.PUBLIC_BACKEND_API_URL;
  const features = await getFeatures();
  assert.equal(features.length, 4);
  assert.equal(features[0].title, 'Smart Scheduling');
});

test('getFeatures falls back to mock features when the backend is unreachable', async () => {
  process.env.PUBLIC_BACKEND_API_URL = 'http://127.0.0.1:1';
  const features = await getFeatures();
  assert.equal(features.length, 4);
});
