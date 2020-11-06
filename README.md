# SPOTTY

[![GitHub version](https://badge.fury.io/gh/jcpny1%2Fspotty.svg)](https://badge.fury.io/gh/jcpny1%2Fspotty)
[![Build Status](https://travis-ci.org/jcpny1/spotty.svg?branch=master)](https://travis-ci.org/jcpny1/spotty)
#[![Test Coverage](https://api.codeclimate.com/v1/badges/7ca3b07d0b24fbcd472b/test_coverage)](https://codeclimate.com/github/jcpny1/portfolio-analyzer/test_coverage)
#[![Maintainability](https://api.codeclimate.com/v1/badges/7ca3b07d0b24fbcd472b/maintainability)](https://codeclimate.com/github/jcpny1/portfolio-analyzer/maintainability)
#[![Inline docs](http://inch-ci.org/github/jcpny1/portfolio-analyzer.svg)](http://inch-ci.org/github/jcpny1/portfolio-analyzer)

## Overview

The Spotty App is a tool to manage your Spotify playlists. (Currently, it is display-only.)

Spotty can identify duplicate tracks across playlists.

Spotty was developed using Express 4.17.1, React 17.0.1, and semantic-ui-react 2.0.0.

#![Portfolio Analyzer Positions Page](https://github.com/jcpny1/portfolio-analyzer/blob/master/Screenshot-2017-11-13%20PortfolioAnalyzer.png?raw=true "Portfolio Analyzer Positions Page")


## History
```
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
To connect to the Spotify API service, you will need to setup a .env in the project home directory containing a Spotify client id and client secret (in REACT_APP_CLIENT_ID and REACT_APP_CLIENT_SECRET, respectively).

You will need to create the same .env in the client directory, containing only the REACT_APP_CLIENT_ID, but not the client secret.

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
