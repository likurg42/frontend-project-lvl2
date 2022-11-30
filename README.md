# Diff Generator

[![hexlet-check](https://github.com/likurg42/frontend-project-lvl2/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/likurg42/frontend-project-lvl2/actions/workflows/hexlet-check.yml)
[![Node CI](https://github.com/likurg42/frontend-project-lvl2/actions/workflows/nodejs-ci.yml/badge.svg)](https://github.com/likurg42/frontend-project-lvl2/actions/workflows/nodejs-ci.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/8dd20c3b35f0f744561a/maintainability)](https://codeclimate.com/github/likurg42/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8dd20c3b35f0f744561a/test_coverage)](https://codeclimate.com/github/likurg42/frontend-project-lvl2/test_coverage)


> Command-line utility designed to display differences between two configuration
> files

- Supports JSON and Yaml files
- Display changes in 3 variations: stylish, plain and json
- Generate diff result in JSON format

## Installation Guide 📦

```bash
$ git clone https://github.com/likurg42/frontend-project-lvl2.git
$ make install
```

## Usage 🎯

```bash
Usage: gendiff [options] <filepath1> <filepath2>

Options:
  -V, --version              output the version number
  -f, --format <formatType>  output format (default: "stylish")
  -h, --help                 display help for command
```

### Format Options

`gendiff` allows to display changes in different formats

- `stylish`
- `plain`
- `json`

## Examples

### Working with JSON files

[![Working with json files asciinema](https://asciinema.org/a/4bjepcNVHk56emEYeJkBfrEhj.svg)](https://asciinema.org/a/4bjepcNVHk56emEYeJkBfrEhj)

### Working with Yaml files

[![Working with yaml files asciinema](https://asciinema.org/a/Uw1LVEyHxMUiQkaBimMrDIS0y.svg)](https://asciinema.org/a/Uw1LVEyHxMUiQkaBimMrDIS0y)

### Working with deep structure files

[![Working with files with deep structure asciinema](https://asciinema.org/a/DhnuUxQ5KnsWSPKPFx5DqYDy7.svg)](https://asciinema.org/a/DhnuUxQ5KnsWSPKPFx5DqYDy7)

### Display in plain format

[![Display in plain format asciinema](https://asciinema.org/a/F2etvNVTl84rl8c5V5b5kzxq9.svg)](https://asciinema.org/a/F2etvNVTl84rl8c5V5b5kzxq9)

### Display in json format

[![Display in json format asciinema](https://asciinema.org/a/QkqoadbgMGeZUP9DUN6G6bZwI.svg)](https://asciinema.org/a/QkqoadbgMGeZUP9DUN6G6bZwI)
