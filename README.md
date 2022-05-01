[![npm version][npm-image]][npm-url]
[![downloads][downloads-image]][npm-url]
[![build status][build-image]][build-url]
[![coverage status][coverage-image]][coverage-url]
[![Language grade: JavaScript][lgtm-image]][lgtm-url]


# json-cst

This package parses a JSON into CST (Concrete Syntax Tree), similar to an AST but more low-level and with ties to the lexer tokens. It uses `json-lexer` to parse the file into tokens. The speed is practically the same as [`json-to-ast`](https://www.npmjs.com/package/json-to-ast) (it's ~10% faster than `json-to-ast`), but it's far smaller (even including `json-lexer`). Pure package is 7x smaller, install size 12x smaller, bundling it makes it 6x smaller according to bundlephobia ([json-to-ast](https://bundlephobia.com/package/json-to-ast@2.1.0) vs [json-cst](https://bundlephobia.com/package/json-cst@1.0.0)).

It comes with TypeScript typings.


# Install

`npm i json-cst` or `yarn add json-cst`

This is a [pure ESM][pure-esm] package, and requires Node.js >=14.13.1


# Simple usage

### Exports

The package exports `parse(json: string, options: ParseCstOptions): CstNode`.

`options` is an optional object which can contain `includeValueTokens: true` to include the value tokens in the result, meaning, for objects and arrays, they will include the slice of tokens for the beginning and end of the object/array.


### Definition

The tokens are parsed into a hierarchy of nodes, each with a "kind" property:

```ts
type CstKindLiteral = 'literal'; // null, true, false
type CstKindNumber = 'number';
type CstKindString = 'string';
type CstKindObjectPropertyColon = 'object-property-colon';
type CstKindObjectProperty = 'object-property';
type CstKindObject = 'object';
type CstKindArrayElement = 'array-element';
type CstKindArray = 'array';
```

And the `CstNode` returned by `parse()` is a `CstValueNode`, i.e. one of:

 - `CstNodeLiteral`
 - `CstNodeNumber`
 - `CstNodeString`
 - `CstNodeObject`
 - `CstNodeArray`

Other nodes are:
 - `CstNodeObjectProperty`
 - `CstNodeObjectPropertyColon`
 - `CstNodeArrayElement`

Each token contain a `{ range: CstTokenRange }` where

```ts
interface CstTokenRange {
    start: number;
    end: number;
}
```

Each of the primitive tokens `CstNodeLiteral`, `CstNodeNumber` and `CstNodeString` contain `{ token: Token }` being the raw token from `json-lexer`.

Object and array tokens `CstNodeObject` and `CstNodeArray` contain a property `children` being an array of either `CstNodeObjectProperty` or `CstNodeArrayElement`.

A `CstNodeObjectProperty` has a `keyToken` property being the lexer token for the property name, and a `valueNode` being a `CstNode`. A `CstNodeArrayElement` also has a `valueNode`.

See [`types.ts`](https://github.com/grantila/json-cst/blob/master/lib/types.ts) for exact typings.


[npm-image]: https://img.shields.io/npm/v/json-cst.svg
[npm-url]: https://npmjs.org/package/json-cst
[downloads-image]: https://img.shields.io/npm/dm/json-cst.svg
[build-image]: https://img.shields.io/github/workflow/status/grantila/json-cst/Master.svg
[build-url]: https://github.com/grantila/json-cst/actions?query=workflow%3AMaster
[coverage-image]: https://coveralls.io/repos/github/grantila/json-cst/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/grantila/json-cst?branch=master
[lgtm-image]: https://img.shields.io/lgtm/grade/javascript/g/grantila/json-cst.svg?logo=lgtm&logoWidth=18
[lgtm-url]: https://lgtm.com/projects/g/grantila/json-cst/context:javascript
[pure-esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
