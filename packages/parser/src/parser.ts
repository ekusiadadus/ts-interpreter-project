import { Lexer } from '../../lexer/src/lexer'
import { Token, TokenType } from '../../lexer/src/token'
import type { Program } from './ast'

export class Parser {
  private lexer: Lexer
  private curToken: Token
  private peekToken: Token

  constructor(lexer: Lexer) {
    this.lexer = lexer
    this.curToken = new Token(TokenType.Eof, '')
    this.peekToken = new Token(TokenType.Eof, '')
    this.nextToken()
    this.nextToken()
  }

  private nextToken(): void {
    this.curToken = this.peekToken
    this.peekToken = this.lexer.nextToken()
  }

  public parseProgram(): Program | null {
    return null
  }
}
