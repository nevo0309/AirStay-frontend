import React, { useContext, useEffect, useState } from "react"
import { GoogleMap, useJsApiLoader, OverlayView } from "@react-google-maps/api"
import { homeSvg } from "../../../data/svgExport"
import { stayService } from "../../services/stay/stay.service.remote"
import { MapsKeyContext } from "../../contexts/MapsKeyContext"

const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "20px",
  marginBottom: "5rem"
}
const DEFAULT_ZOOM = 16

export function DetailsMap({ stay }) {
  const stayLoc = { lat: stay.loc.lat, lng: stay.loc.lng }
  const apiKey = useContext(MapsKeyContext)
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey
  })

  if (!isLoaded) return null

  return (
    <section className='details-map' id='map'>
      <div className='location-address'>
        <h2>Where you’ll be</h2>
        <p> {stay.loc.address}</p>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={stayLoc}
        zoom={DEFAULT_ZOOM}>
        <OverlayView
          position={stayLoc}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
          <div
            style={{
              justifySelf: "center",
              transform: "translate(-50%, -100%)",
              pointerEvents: "none",
              backgroundColor: "#222222",
              borderRadius: "20px",
              padding: "10px 10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              color: "white",
              fontWeight: "bold"
            }}>
            {homeSvg}
          </div>
        </OverlayView>
      </GoogleMap>
    </section>
  )
}
