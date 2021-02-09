## Prismic & NodeJS Example Blog

[NodeJS](https://www.php.net/) example blog project with content managed in [Prismic](https://prismic.io/)

## Check out the dedicated article to get this project up and running
[Prismic project guide](https://user-guides.prismic.io/en/articles/868734-sample-blog-with-api-based-cms-in-node-js)

### 1. Install the prismic-cli
```
npm install -g prismic-cli
```
### 2. Run the theme command
This will create a new Prismic content repository, setup the custom types, and install the project code
```
prismic theme --theme-url https://github.com/prismicio/nodejs-blog --conf prismic-configuration.js
```

### 3. Run the project

Install nodemon
```
npm install -g nodemon
```
Then, run your project
```
nodemon
```
## Learn more about using Prismic with NodeJS

[Prismic + NodeJS Documentation](https://prismic.io/docs/technologies/nodejs)

### Licence

This software is licensed under the Apache 2 license, quoted below.

Copyright 2021 [Prismic.io](http://prismic.io).

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this project except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.