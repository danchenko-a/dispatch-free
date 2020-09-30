import { action, observable } from "mobx";

import { fetchData } from "../services";

class DataStore {
  constructor() {
    this.params = observable({
      loading: false,
      data: [],
    });
  }

  loadData = action(async () => {
    this.params.loading = true;

    try {
      const result = await fetchData();

      this.params.loading = false;
      this.params.data = result;
    } catch (error) {
      this.params.loading = false;
    }
  });
}

export default new DataStore();
