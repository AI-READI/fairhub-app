import type { Vmodule } from "./Vmodule";

export interface Dashboard {
  id: string;
  name: string;
  modules: Vmodule[];
}
