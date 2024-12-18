import React, { useEffect } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import iconUrl from '/node_modules/leaflet/dist/images/marker-icon.png'
import shadowUrl from '/node_modules/leaflet/dist/images/marker-shadow.png'

const defaultIcon = new L.Icon({
  iconUrl: iconUrl.src, // Use .src to get the URL
  iconRetinaUrl: iconUrl.src, // Use .src to get the URL
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
  shadowUrl: shadowUrl.src, // Use .src to get the URL
  shadowSize: [41, 41],
})

interface Props {
  coord: [number, number]
  setCoord: (data: [number, number]) => void
  setAddress: (data: string) => void
}
const Map: React.FC<Props> = ({ coord, setCoord, setAddress }) => {
  const getAddress = async (coord: [number, number]) => {
    const response = await fetch(
      `https://api.neshan.org/v2/reverse?lat=${coord[0]}&lng=${coord[1]}`,
      {
        method: 'GET',
        headers: {
          'Api-Key': 'service.406fb49d15be4a65bf05a950e7ef5baa',
        },
      }
    )
    const result = await response.json()
    setAddress(`${result.formatted_address}`)
  }

  const LocationMarker: React.FC<{
    setCoord: (coord: [number, number]) => void
  }> = ({ setCoord }) => {
    useMapEvents({
      click(e) {
        setCoord([e.latlng.lat, e.latlng.lng])
        getAddress([e.latlng.lat, e.latlng.lng])
      },
    })
    return null
  }

  const DynamicZoom = ({ coord }: { coord: [number, number] }) => {
    const map = useMap()

    useEffect(() => {
      map.setView(coord, 13) // Set zoom level here if needed
    }, [coord, map])

    return null
  }

  return (
    <div>
      <MapContainer
        style={{
          height: '300px',
          width: '99.81%',
          zIndex: 1,
        }}
        center={coord}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={false}
        attributionControl={false} // Disable the default attribution control
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <Marker icon={defaultIcon} position={coord}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <LocationMarker setCoord={setCoord} />
        <DynamicZoom coord={coord} />
      </MapContainer>
    </div>
  )
}

export default Map

// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMapEvents,
// } from 'react-leaflet'
// import L from 'leaflet'
// import 'leaflet/dist/leaflet.css'
// import iconUrl from '/node_modules/leaflet/dist/images/marker-icon.png'
// import shadowUrl from '/node_modules/leaflet/dist/images/marker-shadow.png'

// const defaultIcon = new L.Icon({
//   iconUrl: iconUrl.src, // Use .src to get the URL
//   iconRetinaUrl: iconUrl.src, // Use .src to get the URL
//   iconSize: [25, 41],
//   iconAnchor: [12.5, 41],
//   popupAnchor: [0, -41],
//   shadowUrl: shadowUrl.src, // Use .src to get the URL
//   shadowSize: [41, 41],
// })

// interface Props {
//   coord: [number, number]
//   setCoord: (data: [number, number]) => void
//   setAddress: (data: string) => void
// }
// const Map: React.FC<Props> = ({ coord, setCoord, setAddress }) => {
//   const getAddress = async (coord: [number, number]) => {
//     const response = await fetch(
//       `https://api.neshan.org/v2/reverse?lat=${coord[0]}&lng=${coord[1]}`,
//       {
//         method: 'GET',
//         headers: {
//           'Api-Key': 'service.406fb49d15be4a65bf05a950e7ef5baa',
//         },
//       }
//     )
//     const result = await response.json()
//     setAddress(`${result.formatted_address}`)
//   }
//   const LocationMarker: React.FC<{
//     setCoord: (coord: [number, number]) => void
//   }> = ({ setCoord }) => {
//     useMapEvents({
//       click(e) {
//         setCoord([e.latlng.lat, e.latlng.lng])
//         getAddress([e.latlng.lat, e.latlng.lng])
//       },
//     })
//     return null
//   }
//   return (
//     <div>
//       <MapContainer
//         style={{
//           height: '40vh',
//           width: '99.81%',
//           zIndex: 1,
//         }}
//         center={coord}
//         zoom={13}
//         scrollWheelZoom={true}
//         attributionControl={false} // Disable the default attribution control
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
//         />

//         <Marker icon={defaultIcon} position={coord}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>
//         <LocationMarker setCoord={setCoord} />
//       </MapContainer>
//     </div>
//   )
// }

// export default Map
