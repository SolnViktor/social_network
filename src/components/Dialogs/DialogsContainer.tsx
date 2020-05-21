import React from 'react';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {addMessageActionCreator, updateNewMessageActionCreator} from "../../redux/dialogs-reducer";


function mapStateToProps (state: RootState) {
    return {
        dialogsPage: state.dialogsPage
    }
}
function mapDispatchToProps (dispatch: any) {
    return {
        updateNewMessage: (newMessage: string) => {
            dispatch(updateNewMessageActionCreator(newMessage));
        },
        addMessage: () => {
            dispatch(addMessageActionCreator());
        }

    }
}

const DialogsContainer = connect (mapStateToProps, mapDispatchToProps)(Dialogs);


export default DialogsContainer;