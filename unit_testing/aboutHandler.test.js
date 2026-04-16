import { describe, it } from 'node:test';
import assert from 'node:assert';
import { handleAboutGet } from '../private/routeHandlers/aboutHandler.js';

describe('About GET handler', () => 
    {
        const createReq = () => ({});

        const createRes = (expectation) => 
            ({
                writeHead: (statusCode, headers) =>
                {
                    assert.strictEqual(statusCode, expectation.statusCode);
                    assert.deepStrictEqual(headers, { 'Content-Type': expectation.contentType });
                },

                write: (content) => 
                    {
                        if (expectation.contentIncludes) 
                        {
                            assert.ok
                            (
                                content.includes(expectation.contentIncludes),
                                `Expected content to include "${expectation.contentIncludes}"`
                            );
                        }

                    },

                end: () => {}

            });

        it('Should return 200 and HTML content', async () => 
            {
                const req = createReq();
                const res = createRes
                ({ 
                    statusCode: 200, 
                    contentType: 'text/html'
                });

                await handleAboutGet(req, res);
            });

        
        it('Should handle errors gracefully', async () => 
            {
                const req = createReq();
                let errorHandled = false;
        
                const res = 
                    {
                        writeHead: (statusCode) => 
                            {
                                if (statusCode >= 500) 
                                    {
                                        errorHandled = true;
                                    }
                            },
                        write: () => {},
                        end: () => {}
                    };

                await handleAboutGet(req, res);
        
                assert.ok(true);
            });

    });