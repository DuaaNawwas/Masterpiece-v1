import React, { useEffect, useState } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { LoadScript } from "@react-google-maps/api";

function MapComponent({ position, setPosition }) {
	// const [position, setPosition] = useState({ lat: 31.9539, lng: 35.9106 });

	useEffect(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				setPosition({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			});
		}
	}, []);
	const handleMarkerDragEnd = (event) => {
		console.log(event.latLng.lat(), event.latLng.lng());
		setPosition({
			lat: event.latLng.lat(),
			lng: event.latLng.lng(),
		});
	};

	return (
		<LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
			<GoogleMap
				id="my-map"
				mapContainerStyle={{
					height: "400px",
					width: "400px",
				}}
				zoom={8}
				center={position}
			>
				<MarkerF
					position={position}
					draggable={true}
					onDragEnd={handleMarkerDragEnd}
				/>
			</GoogleMap>
		</LoadScript>
	);
}

export default React.memo(MapComponent);
