const tsNode = require('ts-node');
const tsConfigPaths = require('tsconfig-paths');
const testTSConfig = require('./tests/tsconfig.json');

tsConfigPaths.register({
    baseUrl: './tests',
    paths: {
        ...testTSConfig.compilerOptions.paths
    }
});

tsNode.register({
    files: true,
    transpileOnly: true,
    project: './tests/tsconfig.json'
});
