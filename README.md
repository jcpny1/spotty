# SPOTTY

[![GitHub version](https://badge.fury.io/gh/jcpny1%2Fspotty.svg)](https://badge.fury.io/gh/jcpny1%2Fspotty)
[![Build Status](https://travis-ci.org/jcpny1/spotty.svg?branch=master)](https://travis-ci.org/jcpny1/spotty)
[![Coverage Status](https://coveralls.io/repos/github/jcpny1/spotty/badge.svg?branch=master)](https://coveralls.io/github/jcpny1/spotty?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/2cf719fe5cd39a8faf59/maintainability)](https://codeclimate.com/github/jcpny1/spotty/maintainability)
[![Inline docs](http://inch-ci.org/github/jcpny1/spotty.svg)](http://inch-ci.org/github/jcpny1/spotty)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/00dbafbcb50c427693f4ec7126a011dc)](https://app.codacy.com/gh/jcpny1/spotty?utm_source=github.com&utm_medium=referral&utm_content=jcpny1/spotty&utm_campaign=Badge_Grade)

## Overview

The Spotty App is a tool to manage your Spotify playlists. (Currently, it is display-only.)

Spotty can identify duplicate tracks across playlists.

Spotty was developed using Express 4.17.1, React 17.0.1, and semantic-ui-react 2.0.0.

![Portfolio Analyzer Positions Page](https://github.com/jcpny1/spotty/blob/master/Screenshot-2020-11-06.png?raw=true "Spotty Home Page")

## History
```
20-Mar-22  1.0.2  Updated for Dependabot notices.
10-Dec-20  1.0.1  Updated Heroku stack to 20.
21-Nov-20  1.0.1  Updated a few packages.
03-Nov-20  1.0.0  Initial release.
15-Sep-20  0.0.1  Initial code upload.
```

## Installation

### Initialize the project
* Clone the [Spotty](https://github.com/jcpny1/spotty) repository.
* `cd spotty`.
* `npm install`
* `cd client`
* `npm install`

### Setup the Spotify keys
To connect to the Spotify API service, you will need to setup a .env in the project home directory containing a Spotify client id and client secret (REACT_APP_CLIENT_ID and REACT_APP_CLIENT_SECRET, respectively).

You will need to create the same .env in the client directory, containing only the REACT_APP_CLIENT_ID (but not the client secret).

For a Heroku installation, create these two environment variables in the Heroku dashboard. Do not commit the secret to a repository. Also, set NODE_ENV to production.

## Usage

In development,
* From the project home directory, type `yarn start`.
* From the client directory, type `yarn start`.

## Testing

To run the Jest test suite:
* Run `npm test` from the client directory.

## Deployment

TBD

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/jcpny1/portfolio-analyzer.
This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The application is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
