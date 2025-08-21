/**
 * A collection of strings that are used by the parser to produce markdown-formatted text
 */
export default class MarkdownSettings {
  /**
   * Line return character
   */
  static lineEnd = '\n';

  /**
   * Block end string
   */
  static blockEnd = '\n```';
  
  /**
   * Double line return string
   */
  static doubleReturn = '\n\n';
  
  /**
   * Link begin string
   */
  static linkBegin = '[';
  
  /**
   * Link middle string
   */
  static linkMid = '](';

  /**
   * Link end string
   */
  static linkEnd = ')';

  /**
   * String for denoting bold text
   */
  static bold = '**';
  
  /**
   * String for denoting italicized text
   */
  static italic = '*';

  /**
   * String for denoting underlined text
   */
  static underline = '__';

  /**
   * String for denoting striked-through text
   */
  static strike = '~~';

  /**
   * String for denoting in-line code
   */
  static codeLine = '`';
  
  /**
   * String for denoting multi-line code blocks
   */
  static codeBlock = '```';

  /**
   * String for denoting spoiler text
   */
  static spoiler = '||';
}
