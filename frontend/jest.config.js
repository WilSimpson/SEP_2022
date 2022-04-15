module.exports = async () => {
  return {
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
    coverageThreshold: {
      global: {
        branches: 0,
        functions: 0,
        lines: 0,
        statements: 0,
      }
    }
  };
};