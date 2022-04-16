import { connect } from "react-redux";
import { compose } from "redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import { activateTestingMode, deactivateTestingMode } from "../../redux/app-reducer";
import { AppStateType } from "../../redux/redux-store";
import Settings from "./Settings";


const mapStateToProps = (state:AppStateType) => ({
    testingMode: state.app.testingMode
})

export default compose<any>(
connect(mapStateToProps, {activateTestingMode,deactivateTestingMode}),
withAuthRedirect
)(Settings)
