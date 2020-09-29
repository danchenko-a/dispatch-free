const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

export default {
  async fetch() {
    await sleep(2500);
    return ["Taras", "Yulia", "Maks", "Dima", "Dima", "Andrey"];
  }
};
