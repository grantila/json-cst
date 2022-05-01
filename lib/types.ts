import {
	LexerToken,
	LiteralToken,
	NumberToken,
	PunctuatorToken,
	StringToken,
	WhitespaceToken,
} from 'json-lexer'

/**
 * Extends token type with the source JSON string offset of each token
 */
export type TokenWithOffset< TokenType extends LexerToken = LexerToken > =
	& TokenType
	& {
		offset: number;
	}

export type TokensWithOffset = TokenWithOffset[ ];

export interface CstTokenRange
{
	start: number;
	end: number;
}

export type CstKindLiteral = 'literal'; // null, true, false
export type CstKindNumber = 'number';
export type CstKindString = 'string';
export type CstKindObjectPropertyColon = 'object-property-colon';
export type CstKindObjectProperty = 'object-property';
export type CstKindObject = 'object';
export type CstKindArrayElement = 'array-element';
export type CstKindArray = 'array';
export type CstKind =
	| CstKindLiteral
	| CstKindNumber
	| CstKindString
	| CstKindObjectPropertyColon
	| CstKindObjectProperty
	| CstKindObject
	| CstKindArrayElement
	| CstKindArray

export interface CstNodeLiteral
{
	kind: CstKindLiteral;
	range: CstTokenRange;
	token: TokenWithOffset< LiteralToken >;
}

export interface CstNodeNumber
{
	kind: CstKindNumber;
	range: CstTokenRange;
	token: TokenWithOffset< NumberToken >;
}

export interface CstNodeString
{
	kind: CstKindString;
	range: CstTokenRange;
	token: TokenWithOffset< StringToken >;
}

export interface CstNodeObjectPropertyColon
{
	kind: CstKindObjectPropertyColon;
	range: CstTokenRange;
	whitespaceBefore?: TokenWithOffset< WhitespaceToken >;
	punctuatorToken?: TokenWithOffset< PunctuatorToken >;
	whitespaceAfter?: TokenWithOffset< WhitespaceToken >;
}
export interface CstNodeObjectProperty
{
	kind: CstKindObjectProperty;
	range: CstTokenRange;
	whitespaceBefore?: TokenWithOffset< WhitespaceToken >;
	keyToken: TokenWithOffset< StringToken >;
	key: string;
	colon: CstNodeObjectPropertyColon;
	valueTokens: TokensWithOffset;
	whitespaceBeforeComma?: TokenWithOffset< WhitespaceToken >;
	comma?: TokenWithOffset< PunctuatorToken >;

	valueNode: CstValueNode;
}

export interface CstNodeObject
{
	kind: CstKindObject;
	range: CstTokenRange;
	children: CstNodeObjectProperty[ ];
	whitespaceAfterChildren?: TokenWithOffset< WhitespaceToken >;
}

export interface CstNodeArrayElement
{
	kind: CstKindArrayElement;
	range: CstTokenRange;
	whitespaceBefore?: TokenWithOffset< WhitespaceToken >;
	valueTokens: TokensWithOffset;
	whitespaceBeforeComma?: TokenWithOffset< WhitespaceToken >;
	comma?: TokenWithOffset< PunctuatorToken >;

	valueNode: CstValueNode;
}

export interface CstNodeArray
{
	kind: CstKindArray;
	range: CstTokenRange;
	children: CstNodeArrayElement[ ];
	whitespaceAfterChildren?: TokenWithOffset< WhitespaceToken >;
}

export type CstValueNode =
	| CstNodeLiteral
	| CstNodeNumber
	| CstNodeString
	| CstNodeObject
	| CstNodeArray;

export type CstNode =
	| CstValueNode
	| CstNodeObjectProperty
	| CstNodeObjectPropertyColon
	| CstNodeArrayElement;

export interface CstDocument
{
	whitespaceBefore?: TokenWithOffset< WhitespaceToken >;
	valueTokens: TokensWithOffset;
	whitespaceAfter?: TokenWithOffset< WhitespaceToken >;

	root: CstValueNode;
}
