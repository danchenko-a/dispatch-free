import { requestData, requestFail, requestSuccess } from "./reducers";

import { fetchData } from "../services";

const loadData = () => async (dispatch) => {
  dispatch(requestData());

  try {
    const result = await fetchData();
    dispatch(requestSuccess(result));
  } catch (error) {
    dispatch(requestFail(error));
  }
};

export default loadData;
