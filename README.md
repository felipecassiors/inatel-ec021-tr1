# inatel-ec021-tr1

A backend made in NodeJS using Restify and Sequelize with a MySQL database. **This is a class job.**

[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/felipecassiors/inatel-ec021-tr1)

This repository is ready-to-code with Gitpod, which will provide a running instance of MySQL in a Ubuntu container and a Visual Studio Code IDE like (based on Eclipse Theia) environment.

## Tips

### Import MySQL dump

```sh
mysql < resources/EC021_2020_1_NP1.sql
```

> NOTE: this done by default on opening the Gitpod environment

### Show MySQL databases

```sh
mysql -e "show databases;"
```

### Show tables from the MySQL database

```sh
mysql -e "use ec021_2020_1; show tables;"
```
