import { describe, it } from 'node:test';
import assert from 'node:assert';

import initializeDatabase from '../private/db/init.js';

describe('initializeDatabase component test', () => {

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
        assert.strictEqual(
            executedQueries.length,
            4,
            'All SQL schema files should execute'
        );

        // verify SQL content exists
        assert.ok(
            executedQueries.some(query =>
                query.includes('CREATE TABLE')
            ),
            'SQL queries should contain CREATE TABLE statements'
        );

        console.log('Database initialization component test passed');
    });

    it('should throw an error if db query fails', async () => {

        const mockDb = {
            query: async () => {
                throw new Error('Database query failed');
            }
        };

        await assert.rejects(
            async () => {
                await initializeDatabase(mockDb);
            }
        );

        console.log('Database failure handling test passed');
    });

});