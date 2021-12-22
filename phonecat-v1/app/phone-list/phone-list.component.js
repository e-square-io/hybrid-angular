"use strict";

// Register `phoneList` component, along with its associated controller and template
angular.module("phoneList").component("phoneList", {
  templateUrl: "phone-list/phone-list.template.html",
  controller: [
    "Phone",
    "HybridCommunication",
    "$rootScope",
    function PhoneListController(Phone, HybridCommunication, $rootScope) {
      this.query = "";
      HybridCommunication.registerSearchCb((term) => {
        this.query = term;
        $rootScope.$digest();
      });
      this.phones = Phone.query();
      this.orderProp = "age";
    },
  ],
});
