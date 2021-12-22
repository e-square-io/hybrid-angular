"use strict";

// Define the `phonecatApp` module
const phonecatApp = angular.module("phonecatApp", [
  "ngAnimate",
  "ui.router",
  "core",
  "phoneDetail",
  "phoneList",
]);

phonecatApp.config([
  "$stateProvider",
  "$locationProvider",
  ($stateProvider, $locationProvider) => {
    $locationProvider.html5Mode(true);
    $stateProvider
      .state("main", {
        url: "/",
        component: "phoneList",
      })
      .state("phone", {
        url: "phones/{phoneId}",
        template: "<phone-detail></phone-detail>",
      });
  },
]);

phonecatApp.run([
  "$rootScope",
  "HybridCommunication",
  ($rootScope, HybridCommunication) => {
    const nowTime = new Date().getTime();
    const randomString = Math.random().toString(36).substring(5);

    $rootScope.sessionId = `${nowTime}.${randomString}`;
    HybridCommunication.sendMessage(1);

    $rootScope.$on("$locationChangeStart", (event, url, current) => {
      if (url !== current) {
        HybridCommunication.sendMessage(2, {
          url: url.replace(window.location.origin, ""),
        });
      }
    });
  },
]);
