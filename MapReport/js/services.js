myApp.factory('myService', function ($http, $q) {

    var cases = [
        { case_id: 66113, case_status_short_desc: "DEVELOPING" },
        { case_id: 66114, case_status_short_desc: "ACTIVE" },
        { case_id: 66115, case_status_short_desc: "PENDING" },
        { case_id: 66116, case_status_short_desc: "TARGETED" },
        { case_id: 66117, case_status_short_desc: "DEVELOPING" },
        { case_id: 66118, case_status_short_desc: "ACTIVE" },
        { case_id: 66119, case_status_short_desc: "PENDING" },
        { case_id: 66112, case_status_short_desc: "TARGETED" }
    ];


    /*
   var getCases = function()
   {
       return cases;
   };
   */

    var getCases = function () {
        var deferred = $q.defer();
        deferred.resolve(cases);
        return deferred.promise;
        /* Use this when restful services is working
        $http.get("some url").success(function (data) {
            cases.length = 0;
            for (var s in data) {
                cases.push(data[s])
            }
            deferred.resolve(cases);
        }).error(function (data, status) {

            deferred.reject();
        })
        return deferred.promise;
        */
    }


    // This will change to use promise when calling database
    var findCase = function (id) {
        var singleCase = null;
        for (var i = 0; i < cases.length; i++) {
            singleCase = cases[i];
            if (singleCase.case_id === id) {
                return singleCase;
            }
        }
    };

    /* This will change to use promise when calling database
    var getCase = function(id)
    {
        var singleCase = null;
        singleCase = findCase(id);
        return singleCase;
    }
    */

    var getCase = function (id) {
        var deferred = $q.defer();
        var singleCase = null;
        singleCase = findCase(id);
        deferred.resolve(singleCase);
        return deferred.promise;
        /* Use when restful services gets resolved
        $http.get("url/"+id).success(function (data) {
            singleCase = data;
            
            deferred.resolve(singleCase);
        }).error(function (data, status) {
            console.log(status);
            deferred.reject();
        });
        return deferred.promise;
        */
    }


    return {
        getCases: getCases,
        getCase: getCase
    };

});




