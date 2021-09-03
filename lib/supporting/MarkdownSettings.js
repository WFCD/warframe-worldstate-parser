'use strict';

/**
 * A collection of strings that are used by the parser to produce markdown-formatted text
 * @property {string} lineEnd      - Line return character
 * @property {string} blockEnd     - Block end string
 * @property {string} doubleReturn - Double line return string
 * @property {string} linkBegin    - Link begin string
 * @property {string} linkMid      - Link middle string
 * @property {string} linkEnd      - Link end string
 * @property {string} bold         - String for denoting bold text
 * @property {string} italic       - String for denoting italicized text
 * @property {string} underline    - String for denoting underlined text
 * @property {string} strike       - String for denoting striked-through text
 * @property {string} codeLine     - String for denoting in-line code
 * @property {string} codeBlock    - String for denoting multi-line code blocks
 */
module.exports = class MarkdownSettings {
  constructor() {
    this.lineEnd = '\n';
    this.blockEnd = '\n```';
    this.doubleReturn = '\n\n';
    this.linkBegin = '[';
    this.linkMid = '](';
    this.linkEnd = ')';
    this.bold = '**';
    this.italic = '*';
    this.underline = '__';
    this.strike = '~~';
    this.codeLine = '`';
    this.codeBlock = '```';
    this.spoiler = '||';
  }
};
