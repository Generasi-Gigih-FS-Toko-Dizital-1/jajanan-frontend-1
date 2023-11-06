export default function getGeoLocation (fields: any, setFields: any): void {
  if (navigator.geolocation !== undefined) {
    navigator.geolocation.getCurrentPosition((position) => {
      setFields({
        ...fields,
        lastLatitude: position.coords.latitude,
        lastLongitude: position.coords.longitude
      })
    })
  } else {
    console.log('Geolocation is not supported by this browser.')
  }
}
