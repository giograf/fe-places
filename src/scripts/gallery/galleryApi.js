import LocationItem from '../locationItem/locationItem';
export default class GalleryApi {
    getLocationItems = async (openNow, onlyFavourites, downloadedItems) => {
        // TODO: Connect to Firestore (Mock Data) 
        if (downloadedItems) {
            
        } else {
            let downloadedItemsRaw = await fetch('https://us-central1-lamia-application.cloudfunctions.net/getAllPlaces', {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Access-Control-Allow-Headers" +
                    "Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
                }
            });

            downloadedItemsRaw = await downloadedItemsRaw.json();
            downloadedItemsRaw = downloadedItemsRaw.result;

            downloadedItems = downloadedItemsRaw.map(downloadedItemRaw => {
                return new LocationItem(
                    {
                        id: downloadedItemRaw.id,
                        title: downloadedItemRaw.title,
                        description: downloadedItemRaw.description,
                        openingHour: downloadedItemRaw.openingHour,
                        closingHour: downloadedItemRaw.closingHour,
                        geolocation: {lng: downloadedItemRaw.geopoint?._longitude, lat: downloadedItemRaw.geopoint?._latitude},
                        keywords: downloadedItemRaw.keywords,
                        favourite: downloadedItemRaw.favourite
                    }
                ).getLocationItem()
            })
        }

        if (openNow && onlyFavourites) {
            downloadedItems = downloadedItems.filter(downloadedLocationItem => {
                return downloadedLocationItem.favourite && this.isLocationItemOpenNow(downloadedLocationItem);
            });
        } else if (openNow) {
            downloadedItems = downloadedItems.filter(downloadedLocationItem => {
                return this.isLocationItemOpenNow(downloadedLocationItem);
            });
        } else if (onlyFavourites) {
            downloadedItems = downloadedItems.filter(downloadedLocationItem => {
                return downloadedLocationItem.favourite;
            });
        }

        return downloadedItems;
    }

    isLocationItemOpenNow = (downloadedItem) => {
        const currentDate = new Date();

        if (downloadedItem.openingHour) {
            const openingDate = new Date();
            openingDate.setHours(downloadedItem.openingHour.hour);
            openingDate.setMinutes(downloadedItem.openingHour.minute);
        }

        if (downloadedItem.closingHour) {
            const closingDate = new Date();
            closingDate.setHours(downloadedItem.closingHour.hour);
            closingDate.setMinutes(downloadedItem.closingHour.minute);
        }

        if (currentDate.getTime() > openingDate.getTime() && currentDate.getTime() < closingDate.getTime()) {
            return true;
        }

        return false;
    }
}