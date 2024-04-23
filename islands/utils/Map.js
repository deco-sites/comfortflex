const storesURL = "/api/dataentities/SM/search?_fields=id,address,cep,city,name,phone,latitude,longitude,UF&_where=(name is not null)";
const fetchSettings = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.vtex.ds.v10+json',
        "REST-Range": "resources=0-500",
        "v-cache": "false"
    }
};

export function loadAPI(apiKey) {
  return new Promise((resolve, reject) => {
    const mapURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = mapURL;
    script.defer = true;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export async function getStores() {
    const allStoresData = [];
    const localStoresData = JSON.parse(localStorage.getItem("allStoresData"));
    if (localStoresData === null) {
        const fetchData = await fetch(storesURL, fetchSettings);
        const json = await fetchData.json();

        localStorage.setItem("allStoresData", JSON.stringify(json));

        allStoresData.push(...json);
    } else {
        allStoresData.push(...localStoresData);
    }

    return allStoresData;
}

export function setMarkers(stores, map) {
    const markers = [];
    stores.forEach(store => {
        markers.push(new google.maps.Marker({
            position: { lat: parseFloat(store.latitude), lng: parseFloat(store.longitude) },
            map,
            zIndex: 999,
            icon: {
                url: "https://ramarim.vteximg.com.br/arquivos/ramarim_pin.png"
            }
        }));
    });
    
    stores.forEach((store, index) => {
        const content = `
            <div style="padding:8px">
                <h2 style="font-weight:600;margin-bottom:4px;">${store.name}</h2>
                <b style="margin-right:4px">Phone:</b>${store.phone}
            </div> 
        `;

        const globalInfoWindow = new google.maps.InfoWindow();

        const marker = markers[index];
        google.maps.event.addListener(marker, 'click', (function (marker, content) {
            return function () {
                globalInfoWindow.setContent(content)
                globalInfoWindow.open(map, marker)
            }
        })(marker, content));
    });
}