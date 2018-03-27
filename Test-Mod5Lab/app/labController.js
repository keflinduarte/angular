app.controller('labController', [
    '$scope', 'registration',
    function ($scope, registration) {
        $scope.reset = reset;
        $scope.submit = submit;
        $scope.token = null;
        
        reset();

        function submit(model) {
            registration.submit(model).$promise
                .then(function (response) {
                    $scope.token = response.token;
                    reset();
                },
                function (response) {
                    alert('Error!');
                });
                alert('Submitted\n' + JSON.stringify(model));
        }

        function reset() {
            $scope.model = {};
        }
    }
]);