import urlB64ToUint8Array from '../helper/urlB64ToUint8Array'

import { applicationServerPublicKey, baseURL } from '../constants/constants'
import restConnector from './RestConnector'

const setupNotificationModule = () => {
  const instance = { }

  instance.initSwRegistration = function (swRegistration) {
    instance.swRegistration = swRegistration

    instance.swRegistration.pushManager.getSubscription()
      .then(subscription => {
        if (!(localStorage.getItem('isAuth'))) {
          return;
        }
        if (subscription !== null) {
          console.log('User IS subscribed.');
        } else {
          console.log('User is NOT subscribed.');
          instance.subscribeUser();
        }
      });
  }

    instance.subscribeUser = function () {
      const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
      instance.swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey
      })
      .then(subscription => {
        console.log('User is subscribed:', subscription);
        return updateSubscriptionOnServer(subscription);
      })
      .catch(err => {
        if (Notification.permission === 'denied') {
          console.log('Permission for notifications was denied');
        } else {
          console.log('Failed to subscribe the user: ', err);
        }
      });
  }

  instance.unsubscribeUser = function () {
    instance.swRegistration.pushManager.getSubscription()
      .then(async subscription => {
        if (subscription) {
          await deleteSubscriptionOnServer(subscription);
          return subscription.unsubscribe();
        }
      })
      .catch(err => {
        console.log('Error unsubscribing', err);
      })
      .then(() => {
        updateSubscriptionOnServer(null);
        console.log('User is unsubscribed');
      });
  }

  async function updateSubscriptionOnServer(subscription) {
    // Here's where you would send the subscription to the application server
    // const url = `${baseURL}/pushSubscriptions`;
    const url = `http://localhost:3001/api/pushSubscriptions`;

    const { endpoint, expirationTime, keys } = JSON.parse(JSON.stringify(subscription));

    const data = {
      endpoint,
      expirationTime,
      keys,
      attachUser: true,
    }
    const { data: response } = await restConnector.post(url, data);
    localStorage.setItem('pushSubscriptionId', response.id);
  }

  async function deleteSubscriptionOnServer(subscription) {
    // Here's where you would send the subscription to the application server
    // const url = `${baseURL}/pushSubscriptions`;
    const pushSubscriptionId = localStorage.getItem('pushSubscriptionId');
    const url = `http://localhost:3001/api/pushSubscriptions/${pushSubscriptionId}`;
    
    localStorage.removeItem('pushSubscriptionId');

    return await restConnector.delete(url);
  }
  return instance
}

export default setupNotificationModule()