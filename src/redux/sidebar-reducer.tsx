import {SidebarType} from "./store";
import {v1} from "uuid";


let initialState = {
   friends: [
      {id: v1(), name: "Andrew"},
      {id: v1(), name: "Sasha"},
      {id: v1(), name: "Misha"}
   ]
}

function sidebarReducer(state: SidebarType = initialState, action: any) {


   return state
}

export default sidebarReducer;