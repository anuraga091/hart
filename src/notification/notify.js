import urls from '../utils/urls';

export const sendNotification = async ({title = '', fcmToken = ''}) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(`${urls.PROD_URL}/notification/send`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({token: fcmToken, title, body: ''}),
    });

    const responseJson = await response.json();
    console.log('Notification sent successfully:', responseJson);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};
