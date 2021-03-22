import LocationItem from '../locationItem/locationItem';
export default class GalleryApi {
    getLocationItems = () => {
        // TODO: Connect to Firestore (Mock Data) 
        return [
            new LocationItem(
                {
                    id: "23rfasd32apF32f",
                    title: "Lamia Office",
                    description: "Lamia on digitaalisen kasvun kumppani. Olemme liiketoiminnan kehittäjiä, digitaalisen kaupankäynnin asiantuntijoita ja teknologioiden edelläkävijöitä. Asiakkaamme luottavat meihin, koska tuotamme kestävää ja mitattavaa arvoa designin, ohjelmistokehityksen, pilven ja datan keinoin.",
                    openingHour: "09:00",
                    closingHour: "18:00",
                    geolocation: {lng: 24.928154339125673, lat: 60.17081237559105},
                    keywords: ["web", "it", "workplace"],
                    favourite: false
                }
            ).getItem()
        ];
    }
}