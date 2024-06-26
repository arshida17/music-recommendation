import Webcam from "react-webcam";
import { useCallback, useRef, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './webcam.css'
import { FaCamera } from "react-icons/fa";
import camera from '../assets/camera.png'
import face from '../assets/face-id.png'
import { useAuth } from "../context";
import { Navigate } from 'react-router-dom';

const CustomWebcam = () => {
    const navigate = useNavigate();

    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [emotion, setEmotion] = useState(null);
    const { userLoggedIn } = useAuth()

    const [location, setLocation] = useState({});
    const [placeName, setPlaceName] = useState('');



    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef]);

    const handleSubmit = () => {
        if (imgSrc) {
            console.log('calling')
            const formData = new FormData();
            formData.append('file', dataURItoBlob(imgSrc), 'capturedImage.png');
            formData.append('filename', 'capturedImage.png');
            fetch('http://127.0.0.1:5000/upload', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((body) => {
                    console.log(`Image uploaded successfully. URL: http://127.0.0.1:5000/${body.result}`);
                    const elements = placeName.split(',').map((item) => item.trim());
                    const secondLastElement = elements[elements.length - 2];
                    console.log(secondLastElement);
                    let language;

                    if (secondLastElement === 'Kerala') {
                        language = 'Malayalam';
                    } else if (secondLastElement === 'TamilNadu') {
                        language = 'Tamil';
                    } else {
                        language = 'English';
                    }

                    setEmotion(body.result);
                    console.log('emotion')
                    console.log(body.result)
                    console.log('emotion')
                    console.log('laguage')
                    console.log(language)
                    console.log('laguage')
                    navigate('/music', { state: { emt: body.result, place: language, loc: secondLastElement } })
                })
                .catch((error) => {
                    console.error('Error uploading image:', error);
                });
        }
    };


    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };


    useEffect(() => {
        // Function to get user's current location
        const getCurrentLocation = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });

                    // Call OpenCage API with latitude and longitude
                    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=824a808fa0d149cd83a79c888eff5d9e`;

                    fetch(apiUrl)
                        .then((response) => response.json())
                        .then((data) => {
                            // Extract and set place name from the API response
                            const placeName = data.results[0]?.formatted || 'Unknown';
                            setPlaceName(placeName);
                        })
                        .catch((error) => console.error('Error fetching data:', error));
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        };

        getCurrentLocation();
    }, []);

    const elements = placeName.split(',').map((item) => item.trim());
    const secondLastElement = elements[elements.length - 2];
    console.log(secondLastElement);


    return (
        <div className="bg">
            {!userLoggedIn && (<Navigate to={'/login'} replace={true} />)}

            <div className="container">
                {imgSrc ? (
                    <div>
                        <img src={imgSrc} className="preview" alt="webcam" />

                    </div>
                ) : <Webcam height={600} width={600} ref={webcamRef} mirrored={true} />}
            </div>

            {imgSrc ? <div className="click"> <div className="btn-container">
                <button onClick={handleSubmit}>
                    <img src={face} className="selfie" alt="webcam" />
                </button>
            </div>

            </div>
                : (
                    <div className="click">
                        <div className="btn-container">
                            <button className="click-image" onClick={capture}><FaCamera />
                            </button>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default CustomWebcam;