// module.exports = {
//   servers: {
//     one: {
//       // TODO: set host address, username, and authentication method
//       host: '54.87.230.194',
//       username: 'ubuntu',
//       pem: './pigeonworks.pem'
//       // password: 'server-password'
//       // or neither for authenticate from ssh-agent
//     }
//   },
// 
//   app: {
//     // TODO: change app name and path
//     name: 'Pigeon-Works',
//     path: '../pigeon-works',
// 
//     servers: {
//       one: {},
//     },
// 
//     buildOptions: {
//       serverOnly: true,
//     },
// 
//     env: {
//       // TODO: Change to your app's url
//       // If you are using ssl, it needs to start with https://
//       ROOT_URL: 'http://pigeonworks.com',
//       MONGO_URL: "mongodb://citylims:kwl6mEUdfXgQpdOV@cluster0-shard-00-00-gu02w.mongodb.net:27017,cluster0-shard-00-01-gu02w.mongodb.net:27017,cluster0-shard-00-02-gu02w.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",
//     },
// 
//     // ssl: { // (optional)
//     //   // Enables let's encrypt (optional)
//     //   autogenerate: {
//     //     email: 'email.address@domain.com',
//     //     // comma separated list of domains
//     //     domains: 'website.com,www.website.com'
//     //   }
//     // },
// 
//     docker: {
//       // change to 'kadirahq/meteord' if your app is using Meteor 1.3 or older
//       image: 'abernix/meteord:base',
//     },
// 
//     // Show progress bar while uploading bundle to server
//     // You might need to disable it on CI servers
//     enableUploadProgressBar: true
//   },
// 
//   mongo: {
//     version: '3.4.1',
//     servers: {
//       one: {}
//     }
//   }
// };
