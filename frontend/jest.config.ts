import type {Config} from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
  return {
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  };
};