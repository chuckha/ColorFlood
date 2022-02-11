package internal

import "math/rand"

type Generator struct {
	Seed int64
	High int

	random *rand.Rand
}
type GeneratorOption func(*Generator)

func WithSeed(seed int64) GeneratorOption {
	return func(g *Generator) {
		g.Seed = seed
	}
}
func WithRange(high int) GeneratorOption {
	return func(g *Generator) {
		g.High = high
	}
}
func NewGenerator(opts ...GeneratorOption) *Generator {
	g := &Generator{High: 4}
	for _, o := range opts {
		o(g)
	}
	g.random = rand.New(rand.NewSource(g.Seed))
	return g
}

func (g *Generator) Next() int {
	return g.random.Intn(g.High + 1)
}

func (g *Generator) MaxNumber() int {
	return g.High
}
