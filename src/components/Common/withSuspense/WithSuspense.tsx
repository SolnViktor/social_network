import Preloader from "../Preloader/Preloader";
import React, {Suspense} from "react";


export const withSuspense = (Component:any) => {

    return (props:any) => {
        return <Suspense fallback={<Preloader/>} >
            <Component {...props} />
        </Suspense>
    }

}