// tests/parser.test.ts
import { describe, expect, it } from 'bun:test'
import { type Node, LetStatement } from '../src/ast'
import { Lexer } from '../../lexer/src/lexer'
import { Parser } from '../src/parser'

describe('Parser', () => {
  it('should parse let statements correctly', () => {
    const input = `
      let x = 5;
      let y = 10;
      let foobar = 838383;
    `

    const lexer = new Lexer(input)
    const parser = new Parser(lexer)
    const program = parser.parseProgram()

    expect(program).not.toBeNull()
    expect(program?.statements.length).toBe(3)

    const expected = ['x', 'y', 'foobar']
    for (let i = 0; i < expected.length; i++) {
      const exp = expected[i]
      const statement = program?.statements[i]
      testLetStatement(statement as Node, exp)
    }
  })
})

function testLetStatement(statement: Node, expected: string): void {
  expect(statement.tokenLiteral()).toBe('let')
  expect(statement).toBeInstanceOf(LetStatement)

  if (statement instanceof LetStatement) {
    expect(statement.name.value).toBe(expected)
    expect(statement.name.tokenLiteral()).toBe(expected)
  }
}
