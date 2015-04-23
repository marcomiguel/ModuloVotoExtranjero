'use strict';

define(['modules/directives'], function (module) {



    module.directive('incremental', function ($resource) {
        return {
            restrict:'AE',
            replace:true,
            scope:{
                consulta:'=',
                url:'=',
                selected:'&'
            },
            controller:function($scope){
                $scope.retornar=function(value){
                    return value;
                }
            },
            link:function($scope, $element, $attr){

                $scope.$watch($element.children(),function(){

                    var input=$($element).find('input');

                    $(input).on('click',function(){
                        $(input).select();
                    });

                    $(input).on('keyup',function(){

                        var request = $resource(APP.DATA.CONFIG.URL_REST+'registrarDocumentos/documentos.json');

                        request.get().$promise.then(function(data){

                            $scope.consulta = data.lista;

                            $($element).children().each(function(index,child){

                                var ul=$(child).find('ul');
                                if($scope.consulta.length>0){
                                    $(child).addClass('open');
                                }else{
                                    $(child).removeClass('open');
                                }
                                $scope.$watch($(child).children(),function(){
                                    $(ul).children().each(function(index,child){
                                        $(child).on('click',function(){
                                            $(input).val($(child).find('a').text());
                                            $scope.selected=$scope.retornar($(child).val())
                                            console.log($(child).val())
                                        });
                                    });
                                });
                            });
                        });

                    });


                });



            },
            template:'<ul class="nav nav-pills">'+
                    '    <li class="dropdown">'+
                    '    <input class="" type="text" data-ng-model="modeloInput" data-toggle="dropdown" />'+
                    '    <ul data-ng-show="consulta.length>0" id="menu1" class="dropdown-menu" role="menu" aria-labelledby="drop4">'+
                    '      <li value="{{dato.id}}" class="opcion" data-ng-repeat="dato in consulta | filter:modeloInput" role="presentation"><a role="menuitem" tabindex="-1" href="">{{dato.documento}}</a></li>'+
                    /*'      <li role="presentation"><a role="menuitem" tabindex="-1" href="">Separated link</a></li>'+*/
                    '    </ul>'+
                    '    </li>'+
                    '</ul>'

        };
    });

});




