// jest.config.js
module.exports = {
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest', // Only use babel-jest here
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/test/styleMock.js', // CSS goes here, not in transform
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(axios)/)', // allow axios to be transformed (if ESM)
  ],
  testEnvironment: 'jsdom',
};
