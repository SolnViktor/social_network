import React from 'react';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {addMessageActionCreator} from "../../redux/dialogs-reducer";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {reset} from "redux-form";


function mapStateToProps (state: RootState) {
    return {
        dialogsPage: state.dialogsPage,
    }
}
function mapDispatchToProps (dispatch: any) {
    return {
        addMessage: (newDialogMessage: string) => {
            dispatch(addMessageActionCreator(newDialogMessage));

        },
        resetForm:() => {
            dispatch(reset('dialog'))}
    }
}





const DialogsContainer:any = compose(
    connect (mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);


export default DialogsContainer;