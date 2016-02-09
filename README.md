## prismic.io Blog Starter for NodeJS (uses express and jade)

### Getting started

Blog Starter is a blog template backed by prismic.io CMS.

#### Setting up prismic.io

##### Create your own account and repo on [prismic.io](https://prismic.io/#create).

Create the Custom Type of your page in prismic.io Writing-room

* Navigate to `Setting` / `Custom types`

* Create a new `type-id` and and a `Type label` that correspond to a blog home. for example `bloghome`, `Blog's home`.

* Start with using this [sample bloghome Custom Type](/custom_types/bloghome.json).
  * This type contains a headline, description  and an image as well as children that correspond and links to posts.

* Create another `type-id` and and a `Type label` that correspond to a post. for example `post`, `Post`.

* Start with using this [sample post Custom Type](/custom_types/post.json).
  * This type contains mainly (a title, shortlede and an image) as a post header, and a slice that contains (text, quote and an image with its caption) as a post body.

##### Custom Type instance (document)

Create instances of your custom types

* Navigate to `Your documents` / `Write something`
* Choose the type `post` you have created.
* Start by adding the mandatory field `unique-identifier-for-blog-post-url` and then `Title`...
* Add as some slices to your post body by clicking on `Add a Content Slice...`
* Go to Metadata tab, add  a date, save and publish.

* Navigate again to `Your documents` / `Write something`
* Choose the type `bloghome` you have created.
* Start by adding your Blog home content `Main title`, `Sub-title` and an `Image`, save and publish.
* if you publish more than one Blog home document, you're gonna query the most recent one.


#### prismic.io Blog Starter for Javascript Node.JS

* Download the [latest release]()
* Unzip locally or on your server

Edit the `prismic-configuration.js` file to get the application connected to the right repository:

```
exports.Configuration = {

  apiEndpoint: 'https://lesbonneschoses.prismic.io/api',

  // -- Access token if the Master is not open
  // accessToken: 'xxxxxx',

  // OAuth
  // clientId: 'xxxxxx',
  // clientSecret: 'xxxxxx',
  ...
```

* Install [npm & node](https://www.npmjs.com/package/npm)

To run it on your local machine, 2 possibilities:

In command line:
* using [nodemon](https://github.com/remy/nodemon) (node wrapper)
```
npm install -g nodemon
```
```
nodemon app
```

* using node
```
npm install
```
```
node app
```
You are all set, just navigate to `/blog` to open your Blog...

#### Further development

This Website Starter uses [Jade - Template Engine](http://jade-lang.com/).

To adapt the design of your web site; you can modify the corresponding slices in jade  located in: `/views`.


#### Deploy your NodeJS application

An easy way to deploy your NodeJS application is to use [Heroku](http://www.heroku.com). Just follow these few simple steps once you have successfully [signed up](https://id.heroku.com/signup/www-header) and [installed the Heroku toolbelt](https://toolbelt.heroku.com/):

Create a `Procfile` file at your application root, to declare the server command:

```
web: node app.js
```

Create a new Heroku application

```
$ heroku create
```

Push your code to heroku:

```
$ git push heroku master
```

Ensure you have at least one node running:

```
$ heroku ps:scale web=1
```

You can now browse your application online:

```
$ heroku open
```

#### Get started with prismic.io

You can find out [how to get started with prismic.io](https://developers.prismic.io/documentation/UjBaQsuvzdIHvE4D/getting-started) on our [prismic.io developer's portal](https://developers.prismic.io/).

#### Understand the JavaScript development kit

You'll find more information about how to use the development kit included in this starter project, by reading [its README file](https://github.com/prismicio/javascript-kit/blob/master/README.md).

### Contribute to the starter project

Contribution is open to all developer levels, read our "[Contribute to the official kits](https://developers.prismic.io/documentation/UszOeAEAANUlwFpp/contribute-to-the-official-kits)" documentation to learn more.

### Licence

This software is licensed under the Apache 2 license, quoted below.

Copyright 2013 Zengularity (http://www.zengularity.com).

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this project except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
