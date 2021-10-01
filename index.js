const express = require("express");
const app = express();
const port = 5000;
const axios = require('axios');
const path = require('path');
const pug = require('pug');
const { list } = require("postcss");


app.get('/hero-json', (req, res) => {

    //1-Hacer request a Open Dota y traerme los datos de la lista

    async function getHeroesJson() {
        const response = await axios({
            url: "https://api.opendota.com/api/heroes",
            method: "GET"
        })
        console.log(response.data)
        //2-Devolver el resultado en JSON al cliente
        res.json(response.data);
    }
    getHeroesJson();

});


//Gestión de los datos de los héroes en formato HTML
app.get('/hero-html', (req, res) => {

    //3-Devolver los datos en formato HTML
    async function getHeroesJson() {
        const response = await axios({
            url: "https://api.opendota.com/api/heroes",
            method: "GET"
        })

        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'pug');
        //app.use(express.static(path.join(__dirname, 'public')))
        app.use(express.static('css'));

        let idHeroes = response.data.map(x => x.id);
        let nombreHeroes = response.data.map(x => x.localized_name);
        let primary = response.data.map(x => x.primary_attr);
        let attack = response.data.map(x => x.attack_type);
        let roles = response.data.map(x => x.roles);
        res.render('hello.pug', {
            ides: idHeroes,
            nombre: nombreHeroes,
            primaryattr: primary,
            attacktype: attack,
            rolesTipo: roles
        });
    }
    getHeroesJson();
});

app.get('/hello', (req, res) => {

    res.render('hello.pug', { nombre: 'Usando Pug JS en Express' }); // Se muestra la plantilla hello.pug
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});

/*
# Copyright (c) 1993-2001 Microsoft Corp.
#
# This file has been automatically generated for use by Microsoft Internet
# Connection Sharing. It contains the mappings of IP addresses to host names
# for the home network. Please do not make changes to the HOSTS.ICS file.
# Any changes may result in a loss of connectivity between machines on the
# local network.
#172.21.0.1 DESKTOP-LOBDDB5.mshome.net # 2026 9 0 27 5 34 45 522

*/