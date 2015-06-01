
var myApp = angular.module('myApp', ['ngMap', 'passdown']);
myApp.controller("appController", function ($scope, myService) {
    $scope.currentTime = new Date().getTime();

    $scope.arList = [];
    $scope.kmlList = [];

    $scope.columnDefinition = [
        { title: 'REPORT NUMBER', attributeName: 'caseNumber' }
    ];

    $scope.reportSelected = function (selectedReport) {
        console.log('reportSelected()');
        console.log(selectedReport);
    }


    var baseURL = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/MapCasesReport/kml/";

    console.log(window.location.protocol);
    console.log(window.location.hostname);
    console.log(window.location.port);
    //    
    //        function displayAll() {
    //        var map = new google.maps.Map(document.getElementById('map-canvas'), {
    //            center: new google.maps.LatLng(-0, 0),
    //            zoom: 2,
    //            mapTypeId: google.maps.MapTypeId.TERRAIN
    //        });
    //        for (i = 0; i < $scope.caseList.length; i++) {
    //            var kmlURL = baseURL + $scope.caseList[i].case_id + ".kml";
    //            var myParser = new geoXML3.parser({map: map});
    //            myParser.parse(kmlURL);
    //        }
    //    }
    function displayAll() {
        var arAssociativeArray = {};
        for (i = 0; i < $scope.arList.length; i++) {
            //console.log($scope.arList[i]);

            var arId = $scope.arList[i].caseId;

            $scope.arList[i].kmlUrl = baseURL + arId + ".kml";
            arAssociativeArray[arId] = $scope.arList[i];

            $scope.mapListItems = arAssociativeArray;
            console.log($scope.mapListItems);
        }
    }




    /* Gets list of cases from service */
    getCases = function () {
        myService.getCases().then(function (data) {
            $scope.arList = data;
            displayAll();
        }, function (status) {
            console.log(status)
        });
    }

    // Populate cases when we enter controller


    $scope.showInContextWindow = function (event) {
        $scope.name = event.featureData.name;
        $scope.description = event.featureData.description;
    };

    // Create map and display all of the selected KLMs on it using geoXML3
    var displayKMLs = function () {
        var map = new google.maps.Map(document.getElementById('map-canvas'), {
            center: new google.maps.LatLng(-0, 0),
            zoom: 2,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        });
        var myParser = new geoXML3.parser({ map: map });
        for (var i = 0; i < $scope.kmlList.length; i++) {
            myParser.parse($scope.kmlList[i]);
        }
    };

    $scope.viewKML = function (id) {
        var kmlURL = baseURL + id + ".kml";
        if (document.getElementById(id).style.fontWeight !== "bolder") {
            var addToList = true;
            for (var i = 0; i < $scope.kmlList.length; i++) {
                if ($scope.kmlList[i] === kmlURL) {
                    addToList = false;
                }
            }
            if (addToList) {
                $scope.kmlList.push(kmlURL);
            }
            displayKMLs();
            console.log("adding KML-layer for " + id)
            document.getElementById(id).style.fontWeight = "bolder";
        }
        else {
            console.log("removing KML-layer for " + id)
            for (var i = 0; i < $scope.kmlList.length; i++) {
                if (kmlURL === $scope.kmlList[i]) {
                    $scope.kmlList.splice(i, 1);
                    document.getElementById(id).style.fontWeight = "";
                }
            }
            displayAll();
        }
        console.log("Number of KML-layers being displayed = " + $scope.kmlList.length)
        console.table($scope.kmlList);
    };
    //lets get the data that was sent over via the caseList widget
    OWF.ready(function () {
        console.log("Launch Data");
        var arList = OWF.Launcher.getLaunchData();
        console.log(arList);
        if (arList && arList.length) {
            $scope.arList = arList;
            displayAll();
        }
        else {
            getCases();
        }
    });
})








