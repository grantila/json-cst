import { fileURLToPath } from 'node:url'
import { resolve as resolvePath, dirname } from 'node:path'
import { readFileSync } from 'node:fs'

import Benchmark from 'benchmark'
// @ts-ignore
import jsonToAst from 'json-to-ast'
import lexer from 'json-lexer'

import { parse } from '../dist/index.js'


const __dirname = dirname( fileURLToPath( import.meta.url ) );
const filePath = ( filename: string ) =>
	resolvePath( __dirname, '..', 'fixtures', filename );

const dataSets = {
	small: readFileSync( filePath( './example-small.json' ), 'utf-8' ),
	medium: readFileSync( filePath( './example-medium.json' ), 'utf-8' ),
	large: readFileSync( filePath( './example-large.json' ), 'utf-8' ),
};

function runBenchmark( set: 'small' | 'medium' | 'large' )
{
	const suite = new Benchmark.Suite( );

	const exampleData = dataSets[ set ];

	suite.add( "json-to-ast", ( ) =>
	{
		try
		{
			jsonToAst( exampleData );
		}
		catch ( err )
		{
			;
		}
	} );

	suite.add( "lexer", ( ) =>
	{
		lexer( exampleData );
	} );

	suite.add( "json-cst", ( ) =>
	{
		parse( exampleData );
	} );

	suite.on( "cycle", ( event: any ) =>
	{
		console.log( event.target.toString( ) );
	} );

	suite.on( "complete", ( ) =>
	{
		console.log( '-----' );
	} );

	suite.run( { async: false } );
}

runBenchmark( 'small' );
runBenchmark( 'medium' );
runBenchmark( 'large' );
