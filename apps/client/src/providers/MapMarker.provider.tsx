// External dependencies
import { createContext, useContext, useState } from 'react';

// Internal dependencies
import { MapMarker } from '$src/types/MapMarker.type';

const MapMarkerContext = createContext({} as [MapMarker[], React.Dispatch<React.SetStateAction<MapMarker[]>>]);

export const MapMarkerProvider = ({ children }: { children: React.ReactNode }) => {
	const [mapMarker, setMapMarker] = useState<MapMarker[]>([]);

	return <MapMarkerContext.Provider value={[mapMarker, setMapMarker]}>{children}</MapMarkerContext.Provider>;
};

export const useMapMarker = () => {
	const context = useContext(MapMarkerContext);

	if (!context) {
		throw new Error('useMapMarker must be used within a MapMarkerProvider');
	}

	return context;
};
