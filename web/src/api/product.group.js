import Model from "../plugins/model";
import CustomStore from "devextreme/data/custom_store";

export default class ProductGroupPage extends Model {
  constructor() {
    super("groups");
  }

  lookup() {
    return {
      store: new CustomStore({
        key: "id",
        byKey: async (key) => {
          const data = await this.load({ id: key });
          return data;
        },
        load: async (options) => {
          const data = await this.load();
          return data;
        },
      }),
    };
  }
}
