# dojot-cli
Command line tool to interact with the dojot plataform

# Installing
This module is supposed to be used directly through command line, hence its recommended to install it globally

`npm install -g @znti/dojot-cli`

After installation is complete, you can use this module's features

# Configuring
CLI-tool configuration defaults to `http://localhost:8000` as the dojot host, using credentials `admin/admin`.

## Altering dojot host
To change the host this tool connects to, simply export the new value into the `DOJOT_HOST` environment variable.

`export DOJOT_HOST="myServerAddress.com"`

## Altering dojot credentials used
### Access with username/password
Export the environment variables DOJOT_USER and DOJOT_PWD to alter the used credentials for username/password access.
`export DOJOT_USER="myCustomUsername"`
`export DOJOT_HOST="myCustomPassword"`

## Hello world
Authenticates with dojot platform and list its templates and devices.

`dojot hello-world`

## Powerwash
Removes every template and device on your dojot installation

`dojot powerwash`
