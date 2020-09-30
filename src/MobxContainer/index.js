import React from "react";
import { inject, observer } from "mobx-react";

import View from "../View";

const MobxContainer = (props) => {
  console.log("props :>> ", props);

  return (
    <View
      loading={props.dataStore.params.loading}
      data={props.dataStore.params.data}
      loadData={props.dataStore.loadData}
    />
  );
};

export default inject("dataStore")(observer(MobxContainer));
