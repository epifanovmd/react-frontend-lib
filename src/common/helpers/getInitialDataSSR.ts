import { isArray, isObject } from "./typeGuards";

class InitialData {
  public data: any = {};

  public setData = (key: string, value: any) => {
    this.data[key] = value;
  };

  public clearData = () => {
    this.data = {};
  };

  public removeData = (key: string) => {
    this.data[key] = undefined;
  };

  public getData = (key: string) => this.data[key];
}

export const initialDataSSR = new InitialData();

export const getInitialDataSSR = (tid: string) => {
  if (typeof window !== "undefined") {
    if (window.__INITIAL_STATE__) {
      const d = window.__INITIAL_STATE__[tid];

      let data = undefined;

      if (isArray(d)) {
        data = [...d];
      }

      if (isObject(d)) {
        data = { ...d };
      }

      delete window.__INITIAL_STATE__[tid];

      return data;
    }

    return undefined;
  } else {
    return initialDataSSR.getData(tid);
  }
};
