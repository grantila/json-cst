import type {
	LexerTokens,
	AnyPrimitiveToken,
	WhitespaceToken,
	LexerToken,
} from 'json-lexer'

import type { TokensWithOffset, TokenWithOffset } from './types.js'


export function decorateOffsets( tokens: LexerTokens ): TokensWithOffset
{
	let offset = 0;

	return tokens.map( token =>
	{
		const offsetToken = token as TokenWithOffset;
		offsetToken.offset = offset;

		offset += token.raw.length;

		return offsetToken;
	} );
}

export function isPrimitiveToken( token: LexerToken )
: token is AnyPrimitiveToken
{
	return (
		token.type === 'string'
		||
		token.type === 'number'
		||
		token.type === 'literal'
	);
}

export interface JumpedWhitespace
{
	inc: 0 | 1;
	whitespaceToken?: TokenWithOffset< WhitespaceToken >;
};

/**
 * Returns 1 and the whitespace token, or 0
 */
export function jumpWhitespace( tokens: TokensWithOffset, pos: number )
: JumpedWhitespace
{
	const token = tokens[ pos ];

	return token?.type === 'whitespace'
		? { inc: 1, whitespaceToken: token }
		: { inc: 0 };
}

export interface NextToken extends Omit< JumpedWhitespace, 'inc' >
{
	token: TokenWithOffset;
	consumedTokens: number;
}

export function extractNextToken( tokens: TokensWithOffset, pos: number )
: NextToken
{
	const whitespace = jumpWhitespace( tokens, pos );
	const token = tokens[ pos + whitespace.inc ]!;
	++whitespace.inc;

	return {
		whitespaceToken: whitespace.whitespaceToken,
		consumedTokens: whitespace.inc,
		token,
	};
}

export function nextNonWhitespaceToken( tokens: TokensWithOffset, pos: number )
: TokenWithOffset
{
	const whitespace = jumpWhitespace( tokens, pos );
	return tokens[ pos + whitespace.inc ]!;
}
