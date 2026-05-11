import { describe, it } from 'node:test';
import assert from 'node:assert';

import initializeDatabase from '../private/db/init.js';

describe('initializeDatabase component test', () => {

    it('should execute all SQL files', async () => {

        const executedQueries = [];

        // mock/fake db
        const mockDb = {
            query: async (sql) => {
                executedQueries.push(sql);
            }
        };

        // run db init
        await initializeDatabase(mockDb);

        // verify all SQL files were executed
        assert.strictEqual(
            executedQueries.length,
            4,
            'All SQL schema files should execute'
        );

        // verify SQL contains CREATE TABLE statements
        assert.ok(
            executedQueries.some(query =>
                query.includes('CREATE TABLE')
            ),
            'SQL queries should contain CREATE TABLE statements'
        );
    });

    it('should load and execute all SQL files', async () => {

        const originalError = console.error;
        console.error = () => { };

        try {
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
        } finally {
            console.error = originalError;
        }

    });

});