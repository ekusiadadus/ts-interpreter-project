import { Token } from '../../lexer/src/token'

export interface Node {
  tokenLiteral(): string
  printString(): string
}

export enum StatementNodeType {
  Let = 'Let'
}

export type StatementNode = LetStatement

export enum ExpressionNodeType {
  Identifier = 'Identifier'
}

export type ExpressionNode = Identifier

export class Program implements Node {
  constructor(public statements: StatementNode[]) {}

  tokenLiteral(): string {
    if (this.statements.length > 0) {
      return this.statements[0].tokenLiteral()
    }
    return ''
  }

  printString(): string {
    let out = ''
    for (const statement of this.statements) {
      out += statement.printString()
    }
    return out
  }
}

export class LetStatement implements Node {
  constructor(
    public token: Token,
    public name: Identifier,
    public value: ExpressionNode | null
  ) {}

  tokenLiteral(): string {
    return this.token.literal
  }

  printString(): string {
    let out = ''
    out += `${this.tokenLiteral()} `
    out += `${this.name.printString()} = `
    if (this.value !== null) {
      out += this.value.printString()
    }
    out += ';'
    return out
  }
}

export class Identifier implements Node {
  constructor(public token: Token, public value: string) {}

  tokenLiteral(): string {
    return this.token.literal
  }

  printString(): string {
    return this.value
  }
}
