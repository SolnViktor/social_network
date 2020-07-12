import {UsersType} from '../types/types';

type newObjProps = {followed:boolean}
export const updateObjectInArray = (items: Array<UsersType>, itemId: number, objPropName: 'id', newObjProps: newObjProps) => {

    return items.map( (u:UsersType) => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u;
    })
}