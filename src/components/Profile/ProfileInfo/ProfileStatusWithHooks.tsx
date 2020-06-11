import React, {ChangeEvent, useEffect, useState} from "react";


const ProfileStatusWithHooks = (props: any) => {
    let [editMode, setEditMode] = useState (false);
    let [status, setStatus] = useState (props.status);

    useEffect( () => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    }
    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }


    return (
        <div>
            { !editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}> {status ? status : "change status on double click"}</span>
                </div>
            }
            {editMode &&
            <div>
                <input
                    onBlur={deactivateEditMode}
                    onChange={onChangeStatus}
                    value={status}
                    autoFocus={true}
                />
            </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;