import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader, OverlayView } from '@react-google-maps/api'
import { xSvg } from '../../data/svgExport.jsx'
import { StayPreview } from './StayPreview.jsx'
const containerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '20px',
    marginBottom: '5rem',
}

const DEFAULT_ZOOM = 15

const lighStyle = [
    {
        "featureType": "administrative.country",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#beb8aa"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#beb8aa"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#beb8aa"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#beb8aa"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#beb8aa"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "stylers": [
            {
                "color": "#f4f2ee"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "stylers": [
            {
                "color": "#f4f2ee"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "labels.icon",
        "stylers": [
            {
                "color": "#fbac93"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "labels.icon",
        "stylers": [
            {
                "color": "#92cf5c"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "labels.icon",
        "stylers": [
            {
                "color": "#fbac93"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "labels.icon",
        "stylers": [
            {
                "color": "#fbac93"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "stylers": [
            {
                "color": "#d8f2c2"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.icon",
        "stylers": [
            {
                "color": "#fbac93"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "labels.icon",
        "stylers": [
            {
                "color": "#fbac93"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "labels.icon",
        "stylers": [
            {
                "color": "#fbac93"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "stylers": [
            {
                "color": "#d1cfc9"
            },
            {
                "visibility": "on"
            },
            {
                "weight": 0.5
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#d1cfc9"
            },
            {
                "weight": 1
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "weight": 0.5
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "visibility": "simplified"
            },
            {
                "weight": 1
            }
        ]
    },
    {
        "featureType": "transit.line",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#cbe7f3"
            },
            {
                "visibility": "on"
            }
        ]
    }
]

export function SearchMap({ stays , navigate}) {
    const center = stays[0]?.loc || { lat: 32.066, lng: 34.777 }
    const [openPreview, setOpenPreview] = useState('')
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyDpge7IgmfUfXiXFEqaeTr_PGBD5n3WRL0',
    })

    if (!isLoaded) return null

    return (
        <section className="map">

            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={DEFAULT_ZOOM}
                options={{
                    styles: lighStyle,
                    disableDefaultUI: true,
                }}
            >
                {stays.map(stay => (
                    <OverlayView
                        key={stay._id}
                        position={{ lat: stay.loc.lat, lng: stay.loc.lng }}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                        <div className='label flex'>
                            <div onClick={()=>setOpenPreview(stay._id)} className={openPreview === stay._id? 'preview-open' : ''}>₪{stay.price}</div>
                            {(openPreview === stay._id) && <div className='stay-map-preview' onClick={()=>navigate(`/stay/${stay._id}`)}>
                                <button className="close-btn" onClick={() => setOpenPreview('')}>{xSvg}</button>
                                <StayPreview stay={stay} />
                            </div>}
                        </div>
                    </OverlayView>
                ))}
            </GoogleMap>
        </section>
    )
}
