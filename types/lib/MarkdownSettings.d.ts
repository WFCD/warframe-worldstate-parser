export = MarkdownSettings;

/**
 * A collection of strings that are used by the parser to produce markdown-formatted text
 */
declare type MarkdownSettings = {
  /**
   * Line return character
   */
  lineEnd: String;
  blockEnd: String;
  doubleReturn: String;
  linkBegin: String;
  linkMid: String;
  linkEnd: String;
  bold: String;
  italic: String;
  underline: String;
  strike: String;
  codeLine: String;
  codeBlock: String;
};