// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by s3.js.
import { name as packageName } from "meteor/pigeonworks:s3";

// Write your tests here!
// Here is an example.
Tinytest.add('s3 - example', function (test) {
  test.equal(packageName, "s3");
});
