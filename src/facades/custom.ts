import BaseFacade from "./base";

import ExampleCacheRepository, {
  exampleRepository as exampleCacheRepository,
} from "@/cache/repositories/custom";
import ExampleDBRepository, {
  exampleRepository as exampleDBRepository,
} from "@/database/repositories/custom";
import { Example } from "@/schemas/custom";

export default class SubtitleFacade extends BaseFacade<
  ExampleCacheRepository,
  ExampleDBRepository
> {
  constructor() {
    super(exampleCacheRepository, exampleDBRepository);
  }

  async get(id: number): Promise<Example | undefined> {
    const cached = await this.cacheRepository.get(id);
    if (cached) {
      return cached;
    }

    const result = await this.dbRepository.get(id);
    // if (result) {
    //   await this.cacheRepository.create(result);
    // }

    return result;
  }
}

export const subtitleFacade = new SubtitleFacade();
