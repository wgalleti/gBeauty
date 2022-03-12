import http from "./http";
import CustomStore from "devextreme/data/custom_store";

export default class Model {
  constructor(resource, keyField = "id") {
    this.resource = resource;
    this.http = http;
    this.keyField = keyField;
  }

  async load(filters = {}) {
    try {
      const { data } = await this.http.get(this.resource, filters);
      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async loadDetail(detailName) {
    console.log(detailName);
    try {
      const { data } = await this.http.get(`${this.resource}/${detailName}`);
      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async save(key, item) {
    try {
      if (key) {
        const { data } = await this.http.patch(`${this.resource}/${key}`, item);
        return data;
      }

      const { data } = await this.http.post(this.resource, item);
      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async delete(key) {
    try {
      await this.http.delete(`${this.resource}/${key}`);
    } catch (e) {
      console.error(e);
    }
  }

  makeCustomStore() {
    return new CustomStore({
      keyField: this.keyField,
      load: async (options) => {
        try {
          const data = await this.load();

          return {
            data,
            dataCount: data.length,
          };
        } catch (e) {
          console.error(e);
        }
      },
      insert: (data) => this.save(null, data),
      update: (key, data) => this.save(key, data),
      remove: (key) => this.delete(key),
    });
  }
}
