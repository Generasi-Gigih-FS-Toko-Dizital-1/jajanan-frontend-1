import { errorAlert } from '../components/elements/CustomAlert'

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
    errorAlert(
      'Geolocation Error',
      'Geolocation is not supported by this browser, please use another browser and try again.'
    )
  }
}
