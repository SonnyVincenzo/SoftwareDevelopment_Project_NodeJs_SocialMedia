import { describe, it } from 'node:test';
import assert from 'node:assert';

import initializeDatabase from '../private/db/init.js';

describe('initializeDatabase', () => {

    it('should execute all SQL files', async () => {

        const executedQueries = [];

        // fake database
        const mockDb = {
            query: async (sql) => {
                executedQueries.push(sql);
            }
        };

        // run database initialization
        await initializeDatabase(mockDb);

        // verify all files were executed
        assert.strictEqual(executedQueries.length, 4);
    });

});