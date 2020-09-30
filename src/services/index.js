const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

export async function fetchData() {
  await sleep(2500);
  return ["Taras", "Yulia", "Maks", "Dima", "Dima", "Andrey"];
}
