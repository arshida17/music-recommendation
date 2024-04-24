import { Navigate } from "react-router-dom";
import { useAuth } from "../context";
import CustomWebcam from "./webcam";


function HomePage() {

    const { userLoggedIn } = useAuth()

    return (
        <>
            {!userLoggedIn && (<Navigate to={'/login'} replace={true} />)}

            <CustomWebcam />
        </>
    );
}

export default HomePage;