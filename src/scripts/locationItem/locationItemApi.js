export default class LocationItemApi {
    addLocationItem = (item) => {

    }

    editLocationItem = (item) => {

    }

    deleteLocationItem = (item) => {

    }

    removeItem = async (item) => {
        let downloadedItemsRaw = await fetch('https://us-central1-lamia-application.cloudfunctions.net/removePlace', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
                },
                body: {
                    itemId : item.id
                }
        });

        downloadedItemsRaw = await downloadedItemsRaw.json();
        downloadedItemsRaw = downloadedItemsRaw.result;
    }
}