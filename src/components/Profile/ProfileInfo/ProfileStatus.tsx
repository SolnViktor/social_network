import React, {ChangeEvent} from "react";

type StateType = {
    editMode: boolean
    status: string
}
type PropsType = {
    status: string
    updateStatus: (status: string) => void
}
class ProfileStatus extends React.Component <PropsType, StateType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState ( {
            editMode: true
        } )
    }
    deactivateEditMode = () => {
        this.setState ( {
            editMode: false
        } );
        this.props.updateStatus(this.state.status);
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
       this.setState({
           status: e.currentTarget.value
       });
    }
    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<StateType>) {
        if(prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }


    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status? this.props.status : 'set your status'}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input
                        onChange={this.onStatusChange}
                        onBlur={this.deactivateEditMode}
                        value={this.state.status}
                        autoFocus={true}
                    />
                </div>
                }
            </div>
        )
    }
}
export default ProfileStatus;