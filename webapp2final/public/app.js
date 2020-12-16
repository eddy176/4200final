var getSightingsFromServer = function () {
    return fetch("http://localhost:3000/sightings");
};

var createSightingOnServer = function (newLocation, newHeight, newType, newSize, newColor) {
    var data = `location=${encodeURIComponent(newLocation)}`;
    data += `&height=${encodeURIComponent(newHeight)}`;
    data += `&type=${encodeURIComponent(newType)}`;
    data += `&size=${encodeURIComponent(newSize)}`;
    data += `&color=${encodeURIComponent(newColor)}`;
    return fetch("http://localhost:3000/sightings", {
        body: data,
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"

        }
    });
};

var app = new Vue ({
    el: "#app",
    data: {
        newLocation: "",
        newHeight: "",
        newType: "",
        newSize: "",
        newColor: "",
        sightings: [],
        tracksightings: []
    },
    methods: {
        goButtonClicked: function () {
            createSightingOnServer(this.newLocation, this.newHeight, this.newType, this.newSize, this.newColor).then((response) => {
                if (response.status == 201) {
                    this.showSightings();
                    this.newLocation = "";
                    this.newHeight = "";
                    this.newType = "";
                    this.newSize = "";
                    this.newColor = "";
                } else if (response.status == 422) {
                    //server validation error
                    this.errors.push("validation error");
                } else {
                    //unexpected server error
                    this.errors.push("something terrible has happened!");
                }     
            });

            
        },
        showSightings: function () {
            this.sightings = [];
            getSightingsFromServer().then((response) => {
                response.json().then((sightings) => {
                    sightings.forEach(sighting => {
                            this.sightings.push(sighting)
                        } 
                    );       
                });
            });
        },
        track: function (index) {
            this.tracksightings.push(this.sightings[index]);
        },
            
    },
    created: function () {
        console.log("VUE HAS LOADED!!!");
        this.showSightings();
    }
});