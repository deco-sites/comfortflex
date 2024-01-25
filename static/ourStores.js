"use strict";

function ownKeys(object, enumerableOnly) { let keys = Object.keys(object); if (Object.getOwnPropertySymbols) { let symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (let i = 1; i < arguments.length; i++) { let source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const mapStyle = [{
    'featureType': 'administrative',
    'elementType': 'all',
    'stylers': [{
        'visibility': 'on'
    }, {
        'lightness': 33
    }]
}, {
    'featureType': 'landscape',
    'elementType': 'all',
    'stylers': [{
        'color': '#f2e5d4'
    }]
}, {
    'featureType': 'poi.park',
    'elementType': 'geometry',
    'stylers': [{
        'color': '#c5dac6'
    }]
}, {
    'featureType': 'poi.park',
    'elementType': 'labels',
    'stylers': [{
        'visibility': 'on'
    }, {
        'lightness': 20
    }]
}, {
    'featureType': 'road',
    'elementType': 'all',
    'stylers': [{
        'lightness': 20
    }]
}, {
    'featureType': 'road.highway',
    'elementType': 'geometry',
    'stylers': [{
        'color': '#000'
    }]
}, {
    'featureType': 'road.arterial',
    'elementType': 'geometry',
    'stylers': [{
        'color': '#000'
    }]
}, {
    'featureType': 'road.local',
    'elementType': 'geometry',
    'stylers': [{
        'color': '#000'
    }]
}, {
    'featureType': 'water',
    'elementType': 'all',
    'stylers': [{
        'visibility': 'on'
    }, {
        'color': '#acbcc9'
    }]
}];

const rad = function rad(x) {
    return x * Math.PI / 180;
};

const getDistance = function getDistance(p1, p2) {
    let R = 6378137;
    let dLat = rad(p2.lat() - p1.lat());
    let dLong = rad(p2.lng() - p1.lng());
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d;
};

const getDistanceNotGoogle = function getDistanceNotGoogle(p1, p2) {
    let R = 6378137;
    let dLat = rad(p2.latitude - p1.latitude);
    let dLong = rad(p2.longitude - p1.longitude);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(p1.latitude)) * Math.cos(rad(p2.latitude)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d;
};

function mapFactory() {
    let originLocation = null;
    let MAP_RANGE_DISTANCE = 50000;
    let map = null;
    let infoWindow = new google.maps.InfoWindow();
    let storeIds = [];
    let allStoresData = [];

    const getDistanceMatrix = function getDistanceMatrix(service, parameters) {
        return new Promise(function (resolve, reject) {
            service.getDistanceMatrix(parameters, function (response, status) {
                if (status != google.maps.DistanceMatrixStatus.OK) {
                    reject(response);
                } else {
                    let distances = [];
                    let results = response.rows[0].elements;

                    for (let j = 0; j < results.length; j++) {
                        let element = results[j];
                        let distanceText = element.distance.text;
                        let distanceVal = element.distance.value;
                        let distanceObject = {
                            storeid: storeIds[j],
                            distanceText: distanceText,
                            distanceVal: distanceVal
                        };
                        distances.push(distanceObject);
                    }

                    resolve(distances);
                }
            });
        });
    };

    const getStoresInRange = function getStoresInRange(data) {
        return new Promise(function (resolve, reject) {
            const destinations = [];
            data.forEach(function (store) {
                let storeNum = store.getProperty('storeid');
                let storeLoc = store.getGeometry().get();
                storeIds.push(storeNum);
                destinations.push(_objectSpread(_objectSpread({}, storeLoc), {}, {
                    storeid: storeNum
                }));
            });
            const storeInRange = destinations.filter(function (item) {
                return getDistance(originLocation, item) < MAP_RANGE_DISTANCE;
            });
            return resolve(storeInRange);
        });
    };

    const groupStores = function groupStores(data, storesRef) {
        let resultsWrapper = document.querySelector('.map__results');
        resultsWrapper.innerHTML = "";
        let mapStores = storesRef.map(function (item) {
            return allStoresData[item.storeid];
        });
        document.querySelector('.map__stores--form .feedback').textContent = mapStores.length + " lojas encontradas.";

        if (mapStores.length) {
            mapStores.forEach(function (item) {
                resultsWrapper.insertAdjacentHTML('beforeend', "\n                    <div class=\"map__results--item\">\n                        <p class=\"map__results--item__title\">".concat(item.name, "</p>\n                        <div class=\"map__results--item__line\"></div>\n                        <p class=\"map__results--item__address\">").concat(item.address, "</p>\n                        <p class=\"map__results--item__cep\">CEP ").concat(item.cep.replace(/(\d{5})?(\d{3})/, "$1-$2"), "</p>\n                        <p class=\"map__results--item__city\">").concat(item.city, " - ").concat(item.UF, "</p>\n                        <p class=\"map__results--item__phone\"><i class=\"icon-phone\"></i>").concat(item.phone, "</p>\n                    </div>\n                "));
            });
            restStores(mapStores);
        } else {
            return;
        }
    };

    const restStores = function restStores(stores) {
        let resultsWrapper = document.querySelector('.map__results');
        let storeStates = stores.reduce(function (acumulador, valorAtual, index, self) {
            if (!acumulador.length) {
                return acumulador.concat(valorAtual.UF);
            } else if (!acumulador.find(function (item) {
                return item == valorAtual.UF;
            })) {
                return acumulador.concat(valorAtual.UF);
            } else {
                return acumulador;
            }
        }, []);
        storeStates.forEach(function (state) {
            fetch('/api/dataentities/ST/search?_fields=id,address,cep,city,name,phone,latitude,longitude,UF&_where=(UF=' + state + ')', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.vtex.ds.v10+json',
                    "REST-Range": "resources=0-500",
                    "v-cache": "false"
                }
            }).then(function (response) {
                return response.json();
            }).then(function (storesInState) {
                storesInState.forEach(function (item) {
                    const verification = getDistanceNotGoogle({
                        latitude: originLocation.lat(),
                        longitude: originLocation.lng()
                    }, item) < MAP_RANGE_DISTANCE;

                    if (verification) {
                        resultsWrapper.insertAdjacentHTML('beforeend', "\n                                <div class=\"map__results--item\">\n                                    <p class=\"map__results--item__title\">".concat(item.name, "</p>\n                                    <div class=\"map__results--item__line\"></div>\n                                    <p class=\"map__results--item__address\">").concat(item.address, "</p>\n                                    <p class=\"map__results--item__cep\">CEP ").concat(item.cep.replace(/(\d{5})?(\d{3})/, "$1-$2"), "</p>\n                                    <p class=\"map__results--item__city\">").concat(item.city, " - ").concat(item.UF, "</p>\n                                    <p class=\"map__results--item__phone\"><i class=\"icon-phone\"></i>").concat(item.phone, "</p>\n                                </div>\n                            "));
                    }
                });
            });
        });
        return;
    };

    return {
        getStores: function getStores(callback) {
            return new Promise(function (resolve, reject) {
                fetch("/api/dataentities/SM/search?_fields=id,address,cep,city,name,phone,latitude,longitude,UF&_where=(name is not null)", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/vnd.vtex.ds.v10+json',
                        "REST-Range": "resources=0-500",
                        "v-cache": "false"
                    }
                }).then(function (response) {
                    return response.json();
                }).then(function (json) {
                    allStoresData = json;
                    return resolve(json);
                })["catch"](function (error) {
                    return reject({
                        error: true,
                        data: error
                    });
                });
            });
        },
        createMap: function createMap(stores, styles) {
            map = new google.maps.Map(document.querySelector('.map__framemap'), {
                zoom: 5,
                center: {
                    lat: -15.78010,
                    lng: -47.9292
                },
                styles: styles
            });
            map.data.addGeoJson(stores);
        },
        formatData: function formatData(data) {
            const features = data.map(function (item, index) {
                return {
                    geometry: {
                        "type": "Point",
                        "coordinates": [parseFloat(item.longitude), parseFloat(item.latitude)]
                    },
                    type: "Feature",
                    properties: {
                        //"category": "patisserie",
                        //"hours": "10am - 6pm",
                        //"description": "Modern twists on classic pastries. We're part of a larger chain of patisseries and cafes.",
                        "name": item.name,
                        "phone": item.phone,
                        "storeid": index
                    }
                };
            });
            return {
                type: "FeatureCollection",
                features: features
            };
        },
        setPinIcon: function setPinIcon(url) {
            map.data.setStyle(function (feature) {
                return {
                    icon: {
                        url: url,
                        scaledSize: new google.maps.Size(50, 50)
                    }
                };
            });
        },
        showInfoOnClick: function showInfoOnClick() {
            map.data.addListener('click', function (event) {
                let name = event.feature.getProperty('name');
                let phone = event.feature.getProperty('phone');
                let position = event.feature.getGeometry().get();
                let content = "\n                <div>\n                    <h2>".concat(name, "</h2>\n                    <b>Phone:</b> ").concat(phone, "</p>\n                </div>\n            ");
                infoWindow.setContent(content);
                infoWindow.setPosition(position);
                infoWindow.setOptions({
                    pixelOffset: new google.maps.Size(0, -30)
                });
                infoWindow.open(map);
            });
        },
        search: function search(formElement) {
            const geocoder = new google.maps.Geocoder();

            const searchAddress = function searchAddress(e) {
                e.preventDefault();
                let form = formToJson(formElement);
                geocoder.geocode({
                    address: form.data
                }, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        originLocation = results[0].geometry.location;
                        map.setCenter(originLocation);
                        map.setZoom(9);
                        getStoresInRange(map.data).then(function (stores) {
                            groupStores(map.data, stores);
                        });
                    } else {
                        formElement.querySelector('.feedback').textContent = "EndereÃ§o nÃ£o encontrado";
                    }
                });
            };

            formElement.addEventListener('submit', searchAddress);
        }
    };
};

function initMap() {
    const api = mapFactory();
    api.getStores().then(function (data) {
        const stores = api.formatData(data);
        api.createMap(stores, []);
        api.setPinIcon('https://ramarim.vteximg.com.br/arquivos/ramarim_pin.png');
        api.showInfoOnClick();
        const formElement = document.querySelector('.map__stores--form');
        api.search(formElement);
    });
}