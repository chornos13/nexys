export default async (): Promise<any> => {
  return {
    coverageReporters: ['json', 'lcov', 'text', 'clover', 'text-summary'],
    moduleDirectories: ['node_modules', 'src'],
    preset: 'ts-jest',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    verbose: true,
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    setupFilesAfterEnv: ['<rootDir>/jest/jest-setup.ts'],
    transform: {
      '.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/jest/__mocks__/file-mock.js',
      '.(css|less)$': '<rootDir>/jest/__mocks__/style-mock.js',
      '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
  }
}
