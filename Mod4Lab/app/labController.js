app.controller('labController', [
    '$scope', '$timeout', '$q', '$http', 'gitHub',
    function ($scope, $timeout, $q, $http, gitHub) {
        $scope.model = {
            number: 0,
            result: 'Ready'
        };

        $scope.checkOddNumber = checkOddNumber;
        $scope.getRepos = getRepos;
        $scope.loadDetail = loadDetail;

        function loadDetail(name, search) {
            $scope.model.detail = null;
            $scope.model.detail = gitHub.getDetail ({
                org: search ,
                id: name
            });
        }

        function getRepos(search) {
            $scope.model.repos = gitHub.getAll ({
                org: search
            });
        }

        function checkOddNumber(input) {
            $scope.model.result = 'Working...';
            checkOddNumberHandler(input).then(function (result) {
                $scope.model.result = 'Success: ' + result;
            }, function (result) {
                $scope.model.result = 'Error: ' + result;
            })
        }

        function checkOddNumberHandler(input) {
            var defer = $q.defer();

            $timeout(function () {
                if (isNumberOdd(input)) {
                    defer.resolve('Yes, an odd number');
                } else {
                    defer.reject('Not an odd number');
                }
            }, 1000);

            return defer.promise;
        }

        function isNumberOdd(input) {
            return !isNaN(input) && input % 2 == 1;
        }
    }
]);