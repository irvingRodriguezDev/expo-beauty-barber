// src/aws-config.js

export const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_AWS_COGNITO_POOL_ID, // Tu User Pool ID de AWS
      userPoolClientId: import.meta.env.VITE_AWS_COGNITO_CLIENT_ID, // Tu App Client ID
      region: import.meta.env.VITE_AWS_REGION,
    },
  },
};
