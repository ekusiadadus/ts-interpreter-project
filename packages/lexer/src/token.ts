export enum TokenType {
  Illegal = 'ILLEGAL',
  Eof = 'EOF',
  Ident = 'IDENT',
  Int = 'INT',
  Assign = '=',
  Plus = '+',
  Minus = '-',
  Bang = '!',
  Asterisk = '*',
  Slash = '/',
  Lt = '<',
  Gt = '>',
  Eq = '==',
  NotEq = '!=',
  Comma = ',',
  Semicolon = ';',
  LParen = '(',
  RParen = ')',
  LBrace = '{',
  RBrace = '}',
  Function = 'FUNCTION',
  Let = 'LET',
  If = 'IF',
  Else = 'ELSE',
  Return = 'RETURN',
  True = 'TRUE',
  False = 'FALSE'
}

export class Token {
  constructor(public type: TokenType, public literal: string) {}

  toString(): string {
    return `Token(${this.type}, "${this.literal}")`
  }
}

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class TokenTypeUtils {
  static lookupIdent(identifier: string): TokenType {
    switch (identifier) {
      case 'fn':
        return TokenType.Function
      case 'let':
        return TokenType.Let
      case 'if':
        return TokenType.If
      case 'else':
        return TokenType.Else
      case 'true':
        return TokenType.True
      case 'false':
        return TokenType.False
      case 'return':
        return TokenType.Return
      default:
        return TokenType.Ident
    }
  }
}
