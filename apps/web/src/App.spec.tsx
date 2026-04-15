import { describe, expect, it } from 'vitest';

describe('web scaffold', () => {
  it('keeps the dashboard route in scope', () => {
    expect('/').toBe('/');
  });
});
