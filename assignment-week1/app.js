(function () {
angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.inputText="";
  $scope.outputText;

  $scope.checkLunch = function(){
    if ($scope.inputText === undefined || $scope.inputText==="") {
      $scope.outputText = "Please enter data first";
    } else {
        var arrayOfFood = $scope.inputText.split(',');
        var items = arrayOfFood.filter(ValidItem)
        if (items.length <= 3) {
          $scope.outputText = "Enjoy!";
        } else {
            $scope.outputText = "Too much!";
        }
    }
  }

  function ValidItem(item) {
    if(item===undefined || item.trim()===""){
      return false;
    } else {
      return true;
    }
  }

  }
}());
