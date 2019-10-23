import urlB64ToUint8Array from '../helper/urlB64ToUint8Array'

import { applicationServerPublicKey } from '../constants/constants'

const setupNotificationModule = (swRegistration) => {

  swRegistration.pushManager.getSubscription()
    .then(subscription => {
      // updateSubscriptionOnServer(subscription);
      if (subscription !== null) {
        console.log('User IS subscribed.');
      } else {
        console.log('User is NOT subscribed.');
        subscribeUser();
      }
    });

  function subscribeUser() {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey
    })
      .then(subscription => {
        console.log('User is subscribed:', subscription);
        updateSubscriptionOnServer(subscription);
      })
      .catch(err => {
        if (Notification.permission === 'denied') {
          console.log('Permission for notifications was denied');
        } else {
          console.log('Failed to subscribe the user: ', err);
        }
      });
  }

  function updateSubscriptionOnServer(subscription) {
    // Here's where you would send the subscription to the application server
    console.log(JSON.stringify(subscription));
  }
}

export default setupNotificationModule