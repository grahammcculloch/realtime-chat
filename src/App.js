import React from "react";

import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";
import { ApolloProvider } from "react-apollo";
import appSyncConfig from "./AppSync";

import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import awsConfig from "./aws-exports";
import RealTimeChat from "./components/RealTimeChat";

Amplify.configure(awsConfig);

const client = new AWSAppSyncClient({
  url: appSyncConfig.graphqlEndpoint,
  region: appSyncConfig.region,
  auth: {
    type: appSyncConfig.authenticationType,
    apiKey: appSyncConfig.apiKey,
    jwtToken: async () =>
      (await Auth.currentSession()).getAccessToken().getJwtToken()
  }
});

const App = ({ authData }) => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <RealTimeChat authData={authData} />
    </Rehydrated>
  </ApolloProvider>
);

export default withAuthenticator(App);
