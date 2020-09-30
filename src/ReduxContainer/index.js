import { connect } from "react-redux";

import View from "../View";

import loadData from "../reduxStore/loadData";

const mapStateToProps = (state) => state;

const mapDispatchToProps = {
  loadData,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
