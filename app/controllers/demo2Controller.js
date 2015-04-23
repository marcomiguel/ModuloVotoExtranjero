'use strict';

define(['app'], function (app) {

    app.register.controller('demo2Controller', ['$scope','$http','ajaxFactory','traslado', function ($scope,$http,ajaxFactory,traslado) {

        $scope.data = traslado.saludo;

    }]);
});
