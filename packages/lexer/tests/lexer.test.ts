// packages/lexer/tests/lexer.test.ts
import { describe, it, expect } from 'bun:test'
import { Lexer } from '../src/lexer'
import { Token, TokenType } from '../src/token'

describe('Lexer', () => {
  it('nextToken', () => {
    const input = '=+(){},;'
    const expected: Token[] = [
      new Token(TokenType.Assign, '='),
      new Token(TokenType.Plus, '+'),
      new Token(TokenType.LParen, '('),
      new Token(TokenType.RParen, ')'),
      new Token(TokenType.LBrace, '{'),
      new Token(TokenType.RBrace, '}'),
      new Token(TokenType.Comma, ','),
      new Token(TokenType.Semicolon, ';'),
      new Token(TokenType.Eof, '')
    ]

    const lexer = new Lexer(input)

    expected.forEach((expectedToken, idx) => {
      const receivedToken = lexer.nextToken()
      expect(receivedToken.type).toBe(expectedToken.type)
      expect(receivedToken.literal).toBe(expectedToken.literal)
    })
  })
})
