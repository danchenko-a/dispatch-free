import { requestData, requestFail, requestSuccess } from "./reducers";

import mockDataService from "../services";

const loadData = () => async (dispatch) => {
  dispatch(requestData());

  try {
    const result = await mockDataService.fetch();
    dispatch(requestSuccess(result));
  } catch (error) {
    dispatch(requestFail(error));
  }
};

export default loadData;
