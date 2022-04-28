import { fileURLToPath } from 'node:url'
import { resolve as resolvePath, dirname } from 'node:path'
import { readFileSync } from 'node:fs'

import { parse } from '../dist/index.js'


const __dirname = dirname( fileURLToPath( import.meta.url ) );
const filePath = ( filename: string ) =>
	resolvePath( __dirname, '..', 'fixtures', filename );

const exampleSmall =
	readFileSync( filePath( './example-small.json' ), 'utf-8' );

const exampleLarge =
	readFileSync( filePath( './example-large.json' ), 'utf-8' );

for ( let i = 0; i < 100000; ++i )
	parse( exampleSmall );

for ( let i = 0; i < 100; ++i )
	parse( exampleLarge );
