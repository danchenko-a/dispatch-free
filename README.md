# dispatch-free

## Мотивация
Мои предыдущие доводы в пользу того, чтобы не пробрасывать `dispatch` внутрь презентационных компонентов были разбросаны по чатам, поэтому я решил сделать наглядный пример и объяснить, по каким причинам я считаю такой подход более аккуратным и поддерживаемым, кроме нежелания писать `dispatch(actionCreator())`. Надеюсь, что все смогут ознакомиться, когда появится немного свободного времени, и высказать свои "за" и "против" о моих рассуждениях.

## Disclaimer
1. Я знаю, что тесты на презентационные компоненты мы пока не пишем, но слышал, что желание начинать эту практику есть. А тесты, кроме подтверждения работоспособности приложения, являются хорошим фундаментом для архитектуры, так как разработчики стараются не писать то, что будет сложно тестировать.
1. Я понимаю, что никто внезапно не решит менять state-менеджер в приложении такого масштаба, как airSlate

## Приложение
Предлагается достаточно незамысловатый функционал, когда пользователь может получить данные по нажатию на кнопку. Сервис получения данных представляет из себя муляж, который отвечает с задержкой набором фиксированных данных. Запустить и пощупать его можно на `localhost:3000`:
```bash
yarn install
yarn start
```
Реализация презентационного компонента без протекания слоя данных:
```javascript
// src/View/index.js
import React from "react";

const View = ({ loading = false, data = [], loadData }) => {
  return (
    <div>
      <p>Loading is {loading ? "in process" : "done"}!</p>
      <button onClick={loadData} disabled={loading}>
        Load team members
      </button>
      <p>Team members are:</p>
      {!data.length && <p>empty...</p>}
      {!!data.length && data.map((name, i) => <li key={String(i)}>{name}</li>)}
      <ul></ul>
    </div>
  );
};

export default View;
```
позволяет нам тестировать его, не создавая `store` и не заворачивая его в `Provider`, а также не мокать `loadData`, на реализацию которой мы были бы завязаны, или `dispatch`:
```javascript
// src/View/View.test.js
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import View from "./index";

describe("View", () => {
  it("should render correctly when not loading", () => {
    render(<View data={[]} loading={false} />);

    expect(screen.getByText("Loading is done!")).toBeInTheDocument();
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("should render correctly when loading", () => {
    render(<View data={[]} loading />);

    expect(screen.getByText("Loading is in process!")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should render correctly without data", () => {
    render(<View data={[]} />);

    expect(screen.getByText("empty...")).toBeInTheDocument();
  });

  it("should render correctly with data", () => {
    const data = ["apricot", "banana", "cherry", "durian"];
    render(<View data={data} />);

    data.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("should trigger a callback", () => {
    const loadData = jest.fn();
    render(<View loadData={loadData} />);

    fireEvent.click(screen.getByText(/load team members/i));

    expect(loadData).toBeCalledTimes(1);
  });
});
```
Части Redux'a: редюсеры, actionCreator'ы, thunk'и и селекторы тестируются отдельно. А компоненты и функции библиотеки `react-redux` протестированы ее создателями. Поэтому контейнер не нуждается в тестах, если он не использует сложные селекторы, а просто пробрасывает пропсы. И мы можем сразу приступить к интеграционным тестам приложения.
```javascript
// src/App.test.js
import React from "react";
import { screen, fireEvent, render, waitFor } from "@testing-library/react";

import ReduxApp from "./ReduxApp";
import MobxApp from "./MobxApp";

jest.mock("./services", () => {
  return {
    fetchData: jest.fn().mockImplementation(() => {
      return Promise.resolve(["apricot", "banana"]);
    }),
  };
});

const integrationTest = (provider, App) => {
  describe(`${provider}App integration`, () => {
    it("should handle successfull data loading", async () => {
      render(<App />);

      expect(screen.getByText("Loading is done!")).toBeInTheDocument();
      expect(screen.getByRole("button")).not.toBeDisabled();

      fireEvent.click(screen.getByText(/load team members/i));

      await waitFor(() => screen.getByText("Loading is done!"), {
        timeout: 3000,
      });

      ["apricot", "banana"].forEach((item) => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    });
  });
};

integrationTest("Redux", ReduxApp);
integrationTest("Mobx", MobxApp);
```
Можно прогнать тесты:
```bash
yarn test
```
и увидеть, что они усешно проходят для приложений с разными state-менеджерами (Redux и MobX), которые при этом используют один и тот же презентационный компонент, так как он не привязан к конкретной реализации слоя данных приложения.

## А как быть с useSelector и useDispatch?
По-моему, эти хуки точно так же привязывают компонент к реализации state-менеджера, как и прямое пробрасывание диспатча, и создают необходимость писать лишний boilerplate во время написания тестов.
