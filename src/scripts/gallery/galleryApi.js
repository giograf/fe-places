import LocationItem from '../locationItem/locationItem';
export default class GalleryApi {
    getLocationItems = (openNow, onlyFavourites, downloadedItems) => {
        // TODO: Connect to Firestore (Mock Data) 
        if (downloadedItems) {
            
        } else {
            downloadedItems = [
                new LocationItem(
                    {
                        id: "23rfasd32apF32f",
                        title: "Lamia Office",
                        description: "Lamia on digitaalisen kasvun kumppani. Olemme liiketoiminnan kehittäjiä, digitaalisen kaupankäynnin asiantuntijoita ja teknologioiden edelläkävijöitä. Asiakkaamme luottavat meihin, koska tuotamme kestävää ja mitattavaa arvoa designin, ohjelmistokehityksen, pilven ja datan keinoin.",
                        openingHour: {hour: 9, minute: 0},
                        closingHour: {hour: 18, minute: 0},
                        geolocation: {lng: 24.928154339125673, lat: 60.17081237559105},
                        keywords: ["web", "it", "workplace"],
                        favourite: true
                    }
                ).getLocationItem(),
                new LocationItem(
                    {
                        id: "asdssd32r234",
                        title: "Polar Electro Oy",
                        description: "Polar Electro Oy (globally known as Polar) is a manufacturer of sports training computers, particularly known for developing the world's first wireless heart rate monitor. The company is based in Kempele, Finland and was founded in 1977.",
                        openingHour: {hour: 8, minute: 0},
                        closingHour: {hour: 17, minute: 0},
                        geolocation: {lng: 25.447395680862304, lat: 64.94498659771413},
                        keywords: ["sports", "electronics", "it", "workplace"],
                        favourite: false
                    }
                ).getLocationItem()
            ];
        }

        if (openNow) {
            downloadedItems = downloadedItems.filter(downloadedLocationItem => {
                return this.isLocationItemOpenNow(downloadedLocationItem);
            });
        } else if (onlyFavourites) {
            downloadedItems = downloadedItems.filter(downloadedLocationItem => {
                return downloadedLocationItem.favourite;
            });
        } else if (openNow && onlyFavourites) {
            downloadedItems = downloadedItems.filter(downloadedLocationItem => {
                return downloadedLocationItem.favourite && this.isLocationItemOpenNow(downloadedLocationItem);
            });
        } 

        return downloadedItems;
    }

    isLocationItemOpenNow = (downloadedItem) => {
        const currentDate = new Date();

        const openingDate = new Date();
        openingDate.setHours(downloadedItem.openingHour.hour);
        openingDate.setMinutes(downloadedItem.openingHour.minute);
        const closingDate = new Date();
        closingDate.setHours(downloadedItem.closingHour.hour);
        closingDate.setMinutes(downloadedItem.closingHour.minute);

        if (currentDate.getTime() > openingDate.getTime() && currentDate.getTime() < closingDate.getTime()) {
            return true;
        }

        return false;
    }
}