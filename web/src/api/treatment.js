import Model from "../plugins/model";
import CustomStore from "devextreme/data/custom_store";

export default class Treatment extends Model {
  constructor(filters = {}) {
    super("treatments", "id", filters);
    this.filters = filters;
  }

  statusDetail() {
    return {
      store: new CustomStore({
        key: "id",
        byKey: async (key) => {
          const data = await this.loadDetail("status");
          return data.filter((f) => f.id === key)[0];
        },
        load: async (options) => {
          const data = await this.loadDetail("status");
          return data;
        },
      }),
    };
  }
}
