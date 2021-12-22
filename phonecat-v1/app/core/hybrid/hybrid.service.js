angular.module("hybrid").factory("HybridCommunication", [
  "$rootScope",
  "$state",
  ($rootScope, $state) => {
    let searchCb;

    window.addEventListener("message", (event) => {
      if (event?.data?.sessionId !== $rootScope.sessionId) {
        return;
      }

      const message = event.data;

      switch (message.subject) {
        case 2:
          const navState = message.payload.navState;

          if ($state.current.name !== navState) {
            $state.go(navState, message.payload.params, {
              reload: true,
              inherit: false,
            });
          }
          break;

        case 3:
          if (message.payload && typeof searchCb === "function") {
            searchCb(message.payload["term"]);
          }
      }
    });

    return {
      sendMessage: (subject, payload) => {
        window.parent.postMessage(
          { subject, sessionId: $rootScope.sessionId, payload },
          "*"
        );
      },
      registerSearchCb: (cb) => (searchCb = cb),
    };
  },
]);
