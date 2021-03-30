import LocationItem from '../locationItem/locationItem';
export default class GalleryApi {
    downloadedItems = [];

    getLocationItems = async (
        openNow,
        onlyFavourites,
        searchQuery,
        keywordsMode,
    ) => {
        let downloadedItemsRaw = await fetch(
            'https://us-central1-lamia-application.cloudfunctions.net/getAllPlaces',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers':
                        'Access-Control-Allow-Headers' +
                        'Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
                },
            },
        );

        downloadedItemsRaw = await downloadedItemsRaw.json();
        downloadedItemsRaw = downloadedItemsRaw.result;

        this.downloadedItems = downloadedItemsRaw.map((downloadedItemRaw) => {
            return new LocationItem({
                id: downloadedItemRaw.id,
                title: downloadedItemRaw.title,
                description: downloadedItemRaw.description,
                openingHour: downloadedItemRaw.openingHour,
                closingHour: downloadedItemRaw.closingHour,
                geolocation: {
                    lng: downloadedItemRaw.geopoint?._longitude,
                    lat: downloadedItemRaw.geopoint?._latitude,
                },
                keywords: downloadedItemRaw.keywords,
                favourite: downloadedItemRaw.favourite,
            }).getLocationItem();
        });

        this.filterItemsBy(openNow, onlyFavourites, searchQuery, keywordsMode);

        return this.downloadedItems;
    };

    filterItemsBy = (openNow, onlyFavourites, searchQuery, keywordsMode) => {
        // TODO: move logic to BE in the future
        if (searchQuery) {
            if (keywordsMode) {
                this.downloadedItems = this.downloadedItems.filter(
                    (downloadedLocationItem) => {
                        return downloadedLocationItem.keywords?.length > 0 && downloadedLocationItem.keywords.includes(searchQuery)
                });
            } else {
                this.downloadedItems = this.downloadedItems.filter(
                    (downloadedLocationItem) => {
                        return (
                            downloadedLocationItem.title
                                .toLowerCase()
                                .search(searchQuery.toLowerCase()) !== -1 ||
                            downloadedLocationItem.description
                                .toLowerCase()
                                .search(searchQuery.toLowerCase()) !== -1
                        );
                    },
                );
            }
        }

        if (openNow && onlyFavourites) {
            this.downloadedItems = this.downloadedItems.filter(
                (downloadedLocationItem) => {
                    return (
                        downloadedLocationItem.favourite &&
                        this.isLocationItemOpenNow(downloadedLocationItem)
                    );
                },
            );
        } else if (openNow) {
            this.downloadedItems = this.downloadedItems.filter(
                (downloadedLocationItem) => {
                    return this.isLocationItemOpenNow(downloadedLocationItem);
                },
            );
        } else if (onlyFavourites) {
            this.downloadedItems = this.downloadedItems.filter(
                (downloadedLocationItem) => {
                    return downloadedLocationItem.favourite;
                },
            );
        }
    };

    isLocationItemOpenNow = (downloadedItem) => {
        const currentDate = new Date();

        if (downloadedItem.openingHour && downloadedItem.closingHour) {
            const openingDate = new Date();
            openingDate.setHours(downloadedItem.openingHour.hour);
            openingDate.setMinutes(downloadedItem.openingHour.minute);

            const closingDate = new Date();
            closingDate.setHours(downloadedItem.closingHour.hour);
            closingDate.setMinutes(downloadedItem.closingHour.minute);

            if (
                currentDate.getTime() > openingDate.getTime() &&
                currentDate.getTime() < closingDate.getTime()
            ) {
                return true;
            }
        }

        return false;
    };
}
