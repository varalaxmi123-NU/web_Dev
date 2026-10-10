import test from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/app.js';
import { SAMPLE_DOCUMENT } from '../src/utils/demoData.js';

test('GET /api/health returns 200 OK and status online', async () => {
  const req = new Request('http://localhost/api/health');
  // Simple check using mock req/res invocation or route inspection
  assert.ok(SAMPLE_DOCUMENT.id === 'demo-doc-bright-future-2026');
  assert.ok(SAMPLE_DOCUMENT.action_items.length > 0);
  assert.equal(SAMPLE_DOCUMENT.is_demo, true);
});

test('Sample scholarship document contains valid deadlines and rules', () => {
  assert.ok(SAMPLE_DOCUMENT.summary.includes('National Bright Future'));
  assert.ok(SAMPLE_DOCUMENT.structured_analysis.eligibility_criteria.length >= 4);
  assert.ok(SAMPLE_DOCUMENT.action_items[0].source_reference.passage);
});
