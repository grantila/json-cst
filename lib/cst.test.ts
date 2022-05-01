import { parse } from './cst.js'


describe( 'cst', ( ) =>
{
	it( 'simple json', ( ) =>
	{
		const cst = parse(
			'{ "foo": "bar", "childObj": { "a": "b" }, "childArr": [ 42 ] }',
			{ includeValueTokens: false }
		);

		expect( cst ).toMatchSnapshot( );
	} );

	it( 'compact objects', ( ) =>
	{
		const cst = parse(
			'{"foo":{"baz":{"bak":{"":{"bam":{"bar":{"bob":"bee"}}}}}}}',
			{ includeValueTokens: false }
		);

		expect( cst ).toMatchSnapshot( );
	} );

	it( 'compact arrays', ( ) =>
	{
		const cst = parse(
			'["foo",["baz",["bak",["",["bam",["bar",["bob","bee"]]]]]]]',
			{ includeValueTokens: false }
		);

		expect( cst ).toMatchSnapshot( );
	} );
} );
