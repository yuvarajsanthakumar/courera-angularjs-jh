(function(){
    angular.module("ShoppingListCheckOff",[])
        .controller("ToBuyController",ToBuyController)
        .controller("AlreadyBoughtController",AlreadyBoughtController)
        .service("ShoppingListCheckOffService",ShoppingListCheckOffService);

    function ShoppingListCheckOffService(){
        var service = this;

        service.ItemsToBuy= [
            {
                name: "Cookies",
                quantity: 10
            },
            {
                name: "Chocolate",
                quantity: 10
            },
            {
                name: "Milk",
                quantity: 10
            },
            {
                name: "Coke",
                quantity: 10
            },
            {
                name: "Pepsi",
                quantity: 10
            },
            {
                name: "Lays",
                quantity: 10
            },
            {
                name: "Ice Cream",
                quantity: 10
            },
            {
                name: "Pan Cake",
                quantity: 10
            },
            {
                name: "Candy",
                quantity: 10
            },
            {
                name: "Doughnut",
                quantity: 10
            }

        ];

        service.ItemsBought = [];

        service.moveToBoughtList = function (index) {
            Array.prototype.push.apply(service.ItemsBought, service.ItemsToBuy.splice(index, 1));
        }
    }


    ToBuyController.$inject=["ShoppingListCheckOffService"];
    function ToBuyController(ShoppingListCheckOffService){
        var ToBuyCtrl = this;
        ToBuyCtrl.ItemsInList = ShoppingListCheckOffService.ItemsToBuy;

        ToBuyCtrl.moveToBoughtList = function (index) {
            ShoppingListCheckOffService.moveToBoughtList(index);
        };
    }

    AlreadyBoughtController.$inject=["ShoppingListCheckOffService"];
    function AlreadyBoughtController(ShoppingListCheckOffService){
        var AlreadyBoughtCtrl = this;
        AlreadyBoughtCtrl.ItemsInList = ShoppingListCheckOffService.ItemsBought;

    }
})();