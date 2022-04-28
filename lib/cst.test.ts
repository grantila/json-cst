import { parse } from './cst.js'


describe( 'cst', ( ) =>
{
	it( 'simple json', ( ) =>
	{
		const cst = parse(
			'{ "foo": "bar", "childObj": { "a": "b" }, "childArr": [ 42 ] }'
		);

		expect( cst ).toMatchSnapshot( );
	} );
} );
