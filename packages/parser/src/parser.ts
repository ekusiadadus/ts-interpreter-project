import { Lexer } from '../../lexer/src/lexer'
import { Token, TokenType } from '../../lexer/src/token'
import { Identifier, LetStatement, Program } from './ast'

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

  public parseProgram(): Program {
    const statements = []

    while (this.curToken.type !== TokenType.Eof) {
      const statement = this.parseStatement()
      if (statement !== null) {
        statements.push(statement)
      }
      this.nextToken()
    }

    return new Program(statements)
  }

  private parseStatement(): LetStatement | null {
    switch (this.curToken.type) {
      case TokenType.Let:
        return this.parseLetStatement()
      default:
        return null
    }
  }

  private parseLetStatement(): LetStatement {
    const token = this.curToken
    this.expectPeek(TokenType.Ident)
    const name = new Identifier(this.curToken, this.curToken.literal)
    this.expectPeek(TokenType.Assign)
    this.nextToken()
    const value = null // Placeholder for now, you'll need to implement expression parsing later
    this.expectPeek(TokenType.Semicolon)
    return new LetStatement(token, name, value)
  }

  private expectPeek(tokenType: TokenType): void {
    if (this.peekToken.type === tokenType) {
      this.nextToken()
    } else {
      throw new Error(
        `Expected next token to be ${tokenType}, got ${this.peekToken.type} instead`
      )
    }
  }
}
