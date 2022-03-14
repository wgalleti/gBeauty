import Model from "../plugins/model";
import CustomStore from "devextreme/data/custom_store";

export default class Product extends Model {
  constructor() {
    super("products");
  }

  lookup() {
    return {
      store: new CustomStore({
        key: "id",
        loadMode: "raw",
        load: async (options) => {
          const data = await this.load();
          return data;
        },
      }),
      sort: "name",
    };
  }
}
