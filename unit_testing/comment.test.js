import { describe, it } from 'node:test';
import assert from 'node:assert';
import { isValidComment } from '../private/routeHandlers/postHandler.js';

describe('isValidComment', () => {

    it('should reject empty comment', () => {
        const result = isValidComment("");
        assert.strictEqual(result, false);
    });

    it('should reject spaces only', () => {
        const result = isValidComment("   ");
        assert.strictEqual(result, false);
    });

    it('should accept valid comment', () => {
        const result = isValidComment("Hello");
        assert.strictEqual(result, true);
    });

});