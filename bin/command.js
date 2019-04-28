#!/usr/bin/env node
"use strict"
const program = require('commander');
const path = require('path');
const fs = require('fs');
const allowFiles = ['md'];

program
.version('0.0.1')
.option('-n, --new <file>', 'init an new article')
.action((cmd) => {
  if(!cmd.new) {
    throw Error('miss arguments, plz checkout you command');
  }
  const fileName = cmd.new.split('.')[0];
  const fileSuffix = cmd.new.split('.')[1];
  if(!allowFiles.includes(fileSuffix)) {
    throw Error('It must be a markdown file');
  }
  const title = `title: ${fileName}`
  const date = `date: ${new Date().toLocaleString().replace(/\//g, '-')}`
  const templatePath = path.resolve(__dirname, '../template');
  fs.readFile(`${templatePath}/template.md`, (err, data) => {
    if(err) {
      console.log(err);
      exit(1);
    }
    let contents = data.toString().split('\n');
    contents[1] = title;
    contents[2] = date;
    fs.writeFileSync(`${process.cwd()}/_post/${fileName}.md`, contents.join('\n'), 'utf8');
  });
})
.parse(process.argv);
