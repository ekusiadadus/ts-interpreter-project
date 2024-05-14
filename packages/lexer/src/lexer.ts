import { Token, TokenType } from "./token";

// biome-ignore lint/suspicious/noExportsInTest: <explanation>
export class Lexer {
  private input: string[];
  private position: number;
  private readPosition: number;
  private ch: string;

  constructor(input: string) {
    this.input = input.split("");
    this.position = 0;
    this.readPosition = 0;
    this.ch = "";
    this.readChar();
  }

  private readChar() {
    if (this.readPosition >= this.input.length) {
      this.ch = "\0";
    } else {
      this.ch = this.input[this.readPosition];
    }

    this.position = this.readPosition;
    this.readPosition += 1;
  }

  public nextToken(): Token {
    this.skipWhitespace();

    let token: Token;
    switch (this.ch) {
      case "=":
        if (this.peekChar() === "=") {
          const ch = this.ch;
          this.readChar();
          token = new Token(TokenType.Eq, ch + this.ch);
        } else {
          token = new Token(TokenType.Assign, this.ch);
        }
        break;
      case ";":
        token = new Token(TokenType.Semicolon, this.ch);
        break;
      case "(":
        token = new Token(TokenType.LParen, this.ch);
        break;
      case ")":
        token = new Token(TokenType.RParen, this.ch);
        break;
      case ",":
        token = new Token(TokenType.Comma, this.ch);
        break;
      case "+":
        token = new Token(TokenType.Plus, this.ch);
        break;
      case "-":
        token = new Token(TokenType.Minus, this.ch);
        break;
      case "!":
        if (this.peekChar() === "=") {
          const ch = this.ch;
          this.readChar();
          token = new Token(TokenType.NotEq, ch + this.ch);
        } else {
          token = new Token(TokenType.Bang, this.ch);
        }
        break;
      case "*":
        token = new Token(TokenType.Asterisk, this.ch);
        break;
      case "/":
        token = new Token(TokenType.Slash, this.ch);
        break;
      case "<":
        token = new Token(TokenType.Lt, this.ch);
        break;
      case ">":
        token = new Token(TokenType.Gt, this.ch);
        break;
      case "{":
        token = new Token(TokenType.LBrace, this.ch);
        break;
      case "}":
        token = new Token(TokenType.RBrace, this.ch);
        break;
      case "\0":
        token = new Token(TokenType.Eof, "");
        break;
      default:
        if (this.isLetter(this.ch)) {
          const literal = this.readIdentifier();
          return new Token(TokenType.lookupIdent(literal), literal);
        } else if (this.isDigit(this.ch)) {
          const literal = this.readNumber();
          return new Token(TokenType.Int, literal);
        } else {
          token = new Token(TokenType.Illegal, this.ch);
        }
    }

    this.readChar();
    return token;
  }

  private isLetter(ch: string): boolean {
    return (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z") || ch === "_";
  }

  private isDigit(ch: string): boolean {
    return ch >= "0" && ch <= "9";
  }

  private readNumber(): string {
    const position = this.position;
    while (this.isDigit(this.ch)) {
      this.readChar();
    }
    return this.input.slice(position, this.position).join("");
  }

  private readIdentifier(): string {
    const position = this.position;
    while (this.isLetter(this.ch)) {
      this.readChar();
    }
    return this.input.slice(position, this.position).join("");
  }

  private peekChar(): string {
    if (this.readPosition >= this.input.length) {
      return "\0";
    } else {
      return this.input[this.readPosition];
    }
  }

  private skipWhitespace() {
    while (
      this.ch === " " ||
      this.ch === "\t" ||
      this.ch === "\n" ||
      this.ch === "\r"
    ) {
      this.readChar();
    }
  }
}
