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
    if (!cmd.new) {
      throw Error('miss arguments, plz checkout you command');
    }
    const fileName = cmd.new.split('.')[0];
    const fileSuffix = cmd.new.split('.')[1];
    if (!allowFiles.includes(fileSuffix)) {
      throw Error('It must be a markdown file');
    }
    const title = `title: ${fileName}`
    const date = `date: ${new Date().toLocaleString().replace(/\//g, '-')}`
    const template = `\`\`\`yaml\n${title}\n${date}\n\`\`\``;
    try {
      fs.writeFileSync(`${process.cwd()}/_post/${fileName}.md`, template, 'utf8');
    } catch (err) {
      throw Error(err);
    }
  })
  .parse(process.argv);
