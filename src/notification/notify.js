export const sendNotification = async ({title = '', fcmToken = ''}) => {
  const accessToken =
    'ya29.a0AcM612zzJ5pOptmYJ2nzkAJnmWJfFNvhruGhUOJo-N9gC_VAw6fW5uk5rouxgp7mvEzpWxAx2UCohlOpzrxcBNleHxYfztgqcj3FrIcQ4UNCisDWp9FzdYQVGXidsEX9H851kLbDTq4RKLO3AXjIvmw0wMruypaTYEcvaCgYKARkSARMSFQHGX2Mis8M6xplzvZ-AhwNNo2pP_Q0171'; // Replace with your actual access token

  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(
      'https://servertest-o2u2.onrender.com/notify',
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({token: fcmToken, title}),
      },
    );

    const responseJson = await response.json();
    console.log('Notification sent successfully:', responseJson);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};
