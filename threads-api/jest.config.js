module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFiles: ['<rootDir>/__test__/setup-tests.ts'],
};
