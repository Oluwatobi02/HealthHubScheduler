import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
    useMap,
} from '@vis.gl/react-google-maps'
import { Marker, MarkerClusterer } from '@googlemaps/markerclusterer'
import { useEffect, useRef, useState } from 'react';
import { formatted, } from './people';

const GMap = () => {
    const position = { lat: 6.5283, lng: 3.3864 };
    const [open, setOpen] = useState(false)
    return (
        <div style={{ height: "100vh", width: '100%' }}>
            <APIProvider apiKey='AIzaSyBL3Es--QBC8t-FtCq4HunRy91oxObiir0' >
                <Map defaultZoom={11} center={position} mapId='9bec391a24a195fb'>
                    <AdvancedMarker position={position} onClick={() => setOpen(true)}>
                    <Pin background={"grey"} borderColor={'blue'} glyphColor={'yellow'} />

                    {open && <InfoWindow position={position} onCloseClick={() => setOpen(false)}><p>I'm in Baltimore</p></InfoWindow>}
                    </AdvancedMarker>

                    <Markers points={formatted} />

                </Map>
            </APIProvider>
        </div>
    )
}

export default GMap

type Point = google.maps.LatLngLiteral & { key: string }
type MarkerProps = { points: Point[] }
const Markers = ({ points }: MarkerProps) => {
    const map = useMap();
    const [markers, setMarkers] = useState<{ [key: string] : Marker}>({})
    const clusterer = useRef<MarkerClusterer | null>(null)

    useEffect(() => {
        if (!map) return;
        if (!clusterer.current) {
            clusterer.current = new MarkerClusterer({ map })
        }
    },[map])
    useEffect(() => {
        clusterer.current?.clearMarkers();
        clusterer.current?.addMarkers(Object.values(markers))
    },[markers])
    const setMarkerRef = (marker : Marker | null, key : string) => {
        if (marker && markers[key]) return;
        if (!marker && !markers[key]) return;
        setMarkers((prev) => {
            if (marker) {
                return {...prev, [key] : marker}
            } else {
                const newMarkers = {...prev};;
                delete newMarkers[key]
                return newMarkers
            }
        })
    }
    console.log(markers)
    return (
        <>
            {points.map((point) => (
                <AdvancedMarker position={point} key={point.key} ref={marker => setMarkerRef(marker, point.key)}>
                    <span style={{fontSize: '2rem'}}>👨‍⚕️</span>
                </AdvancedMarker>
            ))}
        </>
    )
}