(function(){
    angular.module("NarrowItDownApp",[])
        .controller("NarrowItDownController",NarrowItDownController)
        .service("MenuSearchService",MenuSearchService)
        .directive("foundItems",FoundItemsDirective);

    function FoundItemsDirective(){
        var ddo = {
            restrict: 'AE',
            scope: {
                found: "<",
                error: "<",
                onRemove: '&'
            },
            templateUrl: 'foundItemsTemplate.html',
            controller:FoundItemsDirectiveController,
            controllerAs: 'FoundItemsDisrectiveCtrl',
            bindToController: true
        };
        return ddo;
    }

    function FoundItemsDirectiveController(){

    }

    MenuSearchService.$inject=['$http'];
    function MenuSearchService($http){
        var service = this;
        service.getMatchedMenuItems = function(searchTerm){
            var response = $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
                }).then(function (result) {

                var foundItems = result.data.menu_items.filter(function(item){
                    return item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
                });
                return foundItems;
            });
            return response;

        }

    }


    NarrowItDownController.$inject=["MenuSearchService"];
    function NarrowItDownController(MenuSearchService){
        var NarrowItDownCtrl = this;
        NarrowItDownCtrl.SearchTerm = "";
        NarrowItDownCtrl.foundItems = [];
        NarrowItDownCtrl.ErrorMessage = "";
        NarrowItDownCtrl.isLoading = false;

        NarrowItDownCtrl.SearchMenu = function () {
            NarrowItDownCtrl.isLoading = true;
            NarrowItDownCtrl.foundItems = [];
            NarrowItDownCtrl.ErrorMessage = "";
            if(NarrowItDownCtrl.SearchTerm.trim() === "")
            {
                NarrowItDownCtrl.ErrorMessage = "Nothing found";
                NarrowItDownCtrl.isLoading = false;
            }
            else {
                MenuSearchService.getMatchedMenuItems(NarrowItDownCtrl.SearchTerm).then(function(result){
                    NarrowItDownCtrl.foundItems = result;
                    if(NarrowItDownCtrl.foundItems.length === 0) {
                        NarrowItDownCtrl.ErrorMessage = "Nothing found";
                    }
                    NarrowItDownCtrl.isLoading = false;

                });
            }

        };

        NarrowItDownCtrl.RemoveItem = function (index) {
            NarrowItDownCtrl.foundItems.splice(index,1);
            if(NarrowItDownCtrl.foundItems.length === 0)
            {
                NarrowItDownCtrl.ErrorMessage = "Everything Removed";
            }
        };
    }
})();