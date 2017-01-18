#! /usr/bin/env node

/*eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */
'use strict';
require('babel-polyfill');

const Promise = require('promise');
const jsonfile = require('jsonfile');
const fs = require('fs');
const path = require('path');
const ArgumentParser = require('argparse').ArgumentParser;
const ExtractSlides = require('../lib/extract_slides');
const DevServer = require('../lib/dev_presentation')
const opener = require('opener');
const readline = require('readline');
let slidesHtml;
function parseArguments() {
    var parser = new ArgumentParser({
        version: '1.0.0',
        addHelp: true,
        description: 'Markdown to Slides converter'
    });

    parser.addArgument(
        'file',
        {
            help: 'Path to markdown file to convert'
        }
    );
    parser.addArgument(
        [ '-u', '--user' ],
        {
            help: 'Email address of user',
            required: false,
            defaultValue: 'default'
        }
    );
    parser.addArgument(
        [ '-a', '--append'],
        {
            dest: 'id',
            help: 'Appends slides to an existing presentation',
            required: false
        }
    );
    parser.addArgument(
        [ '-e', '--erase'],
        {
            dest: 'erase',
            action: 'storeTrue',
            help: 'Erase existing slides prior to appending.',
            required: false
        }
    );
    parser.addArgument(
        [ '-n', '--no-browser'],
        {
            action: 'storeTrue',
            dest: 'headless',
            help: 'Headless mode - do not launch browsers, just shows URLs',
            required: false
        }
    );
    parser.addArgument(
        ['-s', '--style'],
        {
            help: 'Name of highlight.js theme for code formatting',
            dest: 'style',
            required: false,
            defaultValue: 'default'
        }
    );
    parser.addArgument(
        ['-t', '--title'],
        {
            help: 'Title of the presentation',
            dest: 'title',
            required: false
        }        
    );
    parser.addArgument(
        ['-d', '--dev'],
        {
            help: 'Run local dev server',
            dest: 'dev',
            required: false
        }        
    );
    return parser.parseArgs();
}

function handleError(err) {
    console.log('Unable to generate slides:', err);
    console.log(err.stack);
    console.log(JSON.stringify(err, null, 2));
}


const args = parseArguments();

function generateSlides() {
    const input = fs.readFileSync(args.file, { encoding: 'UTF-8'});    
    slidesHtml = ExtractSlides(input);
}

function displayResults() {
    if(args.dev){
        let presentationHtml = DevServer.createDevServerPresentation(slidesHtml);
        DevServer.run(3000,presentationHtml);
    }
}

generateSlides();
displayResults();
